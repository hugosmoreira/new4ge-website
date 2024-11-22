import React from 'react';
import { Twitter, Twitch, Instagram, Trophy, Star, Target, TrendingUp } from 'lucide-react';

const mainStats = {
  totalPlayed: 39,
  winRate: 92,
  longestWinStreak: 21,
  recentResults: ['W', 'W', 'W', 'W']
};

const players = [
  { nickname: '_s1lence' },
  { nickname: 'smkzao' },
  { nickname: 'mGerrr' },
  { nickname: 'adaHAHA' },
  { nickname: '_ers_' },
  { nickname: 'T3rrorblade' },
  { nickname: 'Wign-' },
  { nickname: 'BloodyK' },
  { nickname: 'hsmr' }
];

const recentMatches = [
  { date: '11/21/2024, 7:45 PM', mode: '5v5', result: 'WIN', score: '13/7', map: 'Anubis' },
  { date: '11/19/2024, 7:39 PM', mode: '5v5', result: 'WIN', score: '13/3', map: 'Ancient' },
  { date: '11/14/2024, 7:49 PM', mode: '5v5', result: 'WIN', score: '11/13', map: 'Ancient' },
  { date: '11/12/2024, 7:53 PM', mode: '5v5', result: 'WIN', score: '13/9', map: 'Ancient' },
  { date: '11/7/2024, 7:39 PM', mode: '5v5', result: 'WIN', score: '5/13', map: 'Mirage' }
];

const mapStats = [
  { name: 'Mirage', matches: 480, winRate: 54 },
  { name: 'Inferno', matches: 51, winRate: 49 },
  { name: 'Vertigo', matches: 75, winRate: 48 },
  { name: 'Nuke', matches: 45, winRate: 49 }
];

export default function Teams() {
  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Statistics */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Main Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-medium text-white">Total Played</h3>
              </div>
              <p className="text-3xl font-bold text-white">{mainStats.totalPlayed}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Star className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-medium text-white">Win Rate</h3>
              </div>
              <p className="text-3xl font-bold text-white">{mainStats.winRate}%</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-medium text-white">Win Streak</h3>
              </div>
              <p className="text-3xl font-bold text-white">{mainStats.longestWinStreak}</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-medium text-white">Recent Results</h3>
              </div>
              <div className="flex gap-2">
                {mainStats.recentResults.map((result, index) => (
                  <span
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                      result === 'W' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Players */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Active Roster</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {players.map((player, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center">
                <p className="text-lg font-semibold text-white">{player.nickname}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8">Recent Matches</h2>
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 bg-gray-700 p-4 text-sm font-medium text-gray-300">
              <div>Date</div>
              <div>Mode</div>
              <div>Result</div>
              <div>Score</div>
              <div>Map</div>
            </div>
            <div className="divide-y divide-gray-700">
              {recentMatches.map((match, index) => (
                <div key={index} className="grid grid-cols-5 p-4 text-gray-300 hover:bg-gray-700/50">
                  <div>{match.date}</div>
                  <div>{match.mode}</div>
                  <div>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      match.result === 'WIN' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {match.result}
                    </span>
                  </div>
                  <div>{match.score}</div>
                  <div>{match.map}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map Statistics */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Map Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mapStats.map((map) => (
              <div key={map.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">{map.name}</h3>
                  <span className="text-gray-400">{map.matches} matches</span>
                </div>
                <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-500"
                    style={{ width: `${map.winRate}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-white font-medium">{map.winRate}% Win Rate</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}