import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, Calendar } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';

interface Match {
  id: string;
  opponent: string;
  date: Date;
  result: 'WON' | 'LOST' | 'PENDING';
  score?: {
    team: number;
    opponent: number;
  };
  map: string;
  tournament: string;
  players: string[];
}

export default function AdminMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    opponent: '',
    date: '',
    result: 'PENDING',
    teamScore: '',
    opponentScore: '',
    map: '',
    tournament: '',
    players: [] as string[],
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'matches'));
      const matchesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })) as Match[];
      setMatches(matchesData.sort((a, b) => b.date.getTime() - a.date.getTime()));
    } catch (error) {
      console.error('Error fetching matches:', error);
      toast.error('Failed to load matches');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const matchData = {
      opponent: formData.opponent,
      date: new Date(formData.date),
      result: formData.result,
      score: formData.result !== 'PENDING' ? {
        team: parseInt(formData.teamScore),
        opponent: parseInt(formData.opponentScore),
      } : undefined,
      map: formData.map,
      tournament: formData.tournament,
      players: formData.players,
    };

    try {
      if (currentMatch) {
        await updateDoc(doc(db, 'matches', currentMatch.id), {
          ...matchData,
          updatedAt: Timestamp.now(),
        });
        toast.success('Match updated successfully');
      } else {
        await addDoc(collection(db, 'matches'), {
          ...matchData,
          createdAt: Timestamp.now(),
        });
        toast.success('Match added successfully');
      }

      setFormData({
        opponent: '',
        date: '',
        result: 'PENDING',
        teamScore: '',
        opponentScore: '',
        map: '',
        tournament: '',
        players: [],
      });
      setCurrentMatch(null);
      setIsEditing(false);
      fetchMatches();
    } catch (error) {
      console.error('Error saving match:', error);
      toast.error('Failed to save match');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (match: Match) => {
    setCurrentMatch(match);
    setFormData({
      opponent: match.opponent,
      date: match.date.toISOString().slice(0, 16),
      result: match.result,
      teamScore: match.score?.team.toString() || '',
      opponentScore: match.score?.opponent.toString() || '',
      map: match.map,
      tournament: match.tournament,
      players: match.players || [],
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this match?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'matches', id));
      toast.success('Match deleted successfully');
      fetchMatches();
    } catch (error) {
      console.error('Error deleting match:', error);
      toast.error('Failed to delete match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Matches</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add Match
        </button>
      </div>

      {/* Form */}
      {isEditing && (
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Opponent
                </label>
                <input
                  type="text"
                  value={formData.opponent}
                  onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Result
                </label>
                <select
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value as 'WON' | 'LOST' | 'PENDING' })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="PENDING">Pending</option>
                  <option value="WON">Won</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              {formData.result !== 'PENDING' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Team Score
                    </label>
                    <input
                      type="number"
                      value={formData.teamScore}
                      onChange={(e) => setFormData({ ...formData, teamScore: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Opponent Score
                    </label>
                    <input
                      type="number"
                      value={formData.opponentScore}
                      onChange={(e) => setFormData({ ...formData, opponentScore: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Map
                </label>
                <select
                  value={formData.map}
                  onChange={(e) => setFormData({ ...formData, map: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                >
                  <option value="">Select Map</option>
                  <option value="ANCIENT">Ancient</option>
                  <option value="INFERNO">Inferno</option>
                  <option value="MIRAGE">Mirage</option>
                  <option value="NUKE">Nuke</option>
                  <option value="OVERPASS">Overpass</option>
                  <option value="VERTIGO">Vertigo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tournament
                </label>
                <input
                  type="text"
                  value={formData.tournament}
                  onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentMatch(null);
                  setFormData({
                    opponent: '',
                    date: '',
                    result: 'PENDING',
                    teamScore: '',
                    opponentScore: '',
                    map: '',
                    tournament: '',
                    players: [],
                  });
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (currentMatch ? 'Update Match' : 'Add Match')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Matches List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            No matches found
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-800 p-6 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    vs {match.opponent}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {new Date(match.date).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      match.result === 'WON' ? 'bg-green-500/20 text-green-500' :
                      match.result === 'LOST' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {match.result}
                    </span>
                    {match.score && (
                      <span className="text-gray-400">
                        {match.score.team} - {match.score.opponent}
                      </span>
                    )}
                    <span className="text-gray-400">{match.map}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(match)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(match.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}