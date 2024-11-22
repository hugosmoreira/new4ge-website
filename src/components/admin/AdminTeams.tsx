import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Save } from 'lucide-react';
import { collection, doc, setDoc, updateDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

interface TeamStats {
  totalPlayed: number;
  winRate: number;
  longestWinStreak: number;
  recentResults: string[];
}

interface MapStats {
  name: string;
  matches: number;
  winRate: number;
}

interface Player {
  nickname: string;
}

interface Match {
  date: string;
  mode: string;
  result: string;
  score: string;
  map: string;
}

export default function AdminTeams() {
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // Stats State
  const [mainStats, setMainStats] = useState<TeamStats>({
    totalPlayed: 39,
    winRate: 92,
    longestWinStreak: 21,
    recentResults: ['W', 'W', 'W', 'W']
  });

  // Players State
  const [players, setPlayers] = useState<Player[]>([
    { nickname: '_s1lence' },
    { nickname: 'smkzao' },
    { nickname: 'mGerrr' },
    { nickname: 'adaHAHA' },
    { nickname: '_ers_' },
    { nickname: 'T3rrorblade' },
    { nickname: 'Wign-' },
    { nickname: 'BloodyK' },
    { nickname: 'hsmr' }
  ]);

  // Map Stats State
  const [mapStats, setMapStats] = useState<MapStats[]>([
    { name: 'Mirage', matches: 480, winRate: 54 },
    { name: 'Inferno', matches: 51, winRate: 49 },
    { name: 'Vertigo', matches: 75, winRate: 48 },
    { name: 'Nuke', matches: 45, winRate: 49 }
  ]);

  // Recent Matches State
  const [recentMatches, setRecentMatches] = useState<Match[]>([
    { date: '11/21/2024, 7:45 PM', mode: '5v5', result: 'WIN', score: '13/7', map: 'Anubis' },
    { date: '11/19/2024, 7:39 PM', mode: '5v5', result: 'WIN', score: '13/3', map: 'Ancient' },
    { date: '11/14/2024, 7:49 PM', mode: '5v5', result: 'WIN', score: '11/13', map: 'Ancient' },
    { date: '11/12/2024, 7:53 PM', mode: '5v5', result: 'WIN', score: '13/9', map: 'Ancient' },
    { date: '11/7/2024, 7:39 PM', mode: '5v5', result: 'WIN', score: '5/13', map: 'Mirage' }
  ]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamsRef = collection(db, 'teams');
        const snapshot = await getDocs(teamsRef);
        
        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();
          setMainStats(data.mainStats);
          setPlayers(data.players);
          setMapStats(data.mapStats);
          setRecentMatches(data.recentMatches);
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        toast.error('Failed to load team data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const teamsRef = doc(collection(db, 'teams'), 'main');
      await setDoc(teamsRef, {
        mainStats,
        players,
        mapStats,
        recentMatches,
        updatedAt: new Date()
      });
      toast.success('Team data updated successfully');
      setEditingSection(null);
    } catch (error) {
      console.error('Error saving team data:', error);
      toast.error('Failed to save team data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Main Statistics */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Main Statistics</h3>
          <button
            onClick={() => setEditingSection(editingSection === 'stats' ? null : 'stats')}
            className="text-gray-400 hover:text-white"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        </div>

        {editingSection === 'stats' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Total Played
              </label>
              <input
                type="number"
                value={mainStats.totalPlayed}
                onChange={(e) => setMainStats({ ...mainStats, totalPlayed: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Win Rate (%)
              </label>
              <input
                type="number"
                value={mainStats.winRate}
                onChange={(e) => setMainStats({ ...mainStats, winRate: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Longest Win Streak
              </label>
              <input
                type="number"
                value={mainStats.longestWinStreak}
                onChange={(e) => setMainStats({ ...mainStats, longestWinStreak: parseInt(e.target.value) })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-400">Total Played</p>
              <p className="text-2xl font-bold text-white">{mainStats.totalPlayed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Win Rate</p>
              <p className="text-2xl font-bold text-white">{mainStats.winRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Win Streak</p>
              <p className="text-2xl font-bold text-white">{mainStats.longestWinStreak}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Recent Results</p>
              <div className="flex gap-1">
                {mainStats.recentResults.map((result, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                      result === 'W' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Players */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Players</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setPlayers([...players, { nickname: '' }]);
                setEditingSection('players');
              }}
              className="text-gray-400 hover:text-white"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => setEditingSection(editingSection === 'players' ? null : 'players')}
              className="text-gray-400 hover:text-white"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {editingSection === 'players' ? (
          <div className="space-y-4">
            {players.map((player, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={player.nickname}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[index].nickname = e.target.value;
                    setPlayers(newPlayers);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Player Nickname"
                />
                <button
                  onClick={() => {
                    setPlayers(players.filter((_, i) => i !== index));
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {players.map((player, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <p className="text-white font-medium">{player.nickname}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Statistics */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Map Statistics</h3>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMapStats([...mapStats, { name: '', matches: 0, winRate: 0 }]);
                setEditingSection('maps');
              }}
              className="text-gray-400 hover:text-white"
            >
              <PlusCircle className="h-5 w-5" />
            </button>
            <button
              onClick={() => setEditingSection(editingSection === 'maps' ? null : 'maps')}
              className="text-gray-400 hover:text-white"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {editingSection === 'maps' ? (
          <div className="space-y-4">
            {mapStats.map((map, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="text"
                  value={map.name}
                  onChange={(e) => {
                    const newMapStats = [...mapStats];
                    newMapStats[index].name = e.target.value;
                    setMapStats(newMapStats);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Map Name"
                />
                <input
                  type="number"
                  value={map.matches}
                  onChange={(e) => {
                    const newMapStats = [...mapStats];
                    newMapStats[index].matches = parseInt(e.target.value);
                    setMapStats(newMapStats);
                  }}
                  className="w-24 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Matches"
                />
                <input
                  type="number"
                  value={map.winRate}
                  onChange={(e) => {
                    const newMapStats = [...mapStats];
                    newMapStats[index].winRate = parseInt(e.target.value);
                    setMapStats(newMapStats);
                  }}
                  className="w-24 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Win Rate"
                />
                <button
                  onClick={() => {
                    setMapStats(mapStats.filter((_, i) => i !== index));
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Save className="h-5 w-5" />
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mapStats.map((map, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-white font-medium">{map.name}</p>
                  <p className="text-gray-400">{map.matches} matches</p>
                </div>
                <div className="relative h-2 bg-gray-600 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 rounded-full"
                    style={{ width: `${map.winRate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-1">{map.winRate}% Win Rate</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}