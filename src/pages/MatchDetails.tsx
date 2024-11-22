import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Map, Server, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Match data based on the image
const matchData = {
  id: '1',
  date: '2024-01-24T19:00:00',
  map: 'Anubis',
  server: 'Chicago',
  result: {
    winner: 'New4ge eSports',
    score: '16-14'
  },
  teams: {
    team1: {
      name: 'New4ge eSports',
      result: 'WIN',
      firstHalf: 9,
      secondHalf: 3,
      players: [
        {
          nickname: 'hu3s0s1k3',
          kills: 27,
          assists: 6,
          deaths: 22,
          krRatio: 0.9,
          kdRatio: 1.23,
          headshots: 15,
          headshotsPercentage: 56,
          mvps: 7,
          tripleKills: 1,
          quadroKills: 0,
          pentaKills: 0,
          adr: 89.7
        },
        {
          nickname: '_ers_',
          kills: 23,
          assists: 12,
          deaths: 22,
          krRatio: 0.77,
          kdRatio: 1.05,
          headshots: 12,
          headshotsPercentage: 52,
          mvps: 2,
          tripleKills: 2,
          quadroKills: 0,
          pentaKills: 0,
          adr: 93.7
        },
        {
          nickname: 'Wign-',
          kills: 22,
          assists: 7,
          deaths: 23,
          krRatio: 0.73,
          kdRatio: 0.96,
          headshots: 18,
          headshotsPercentage: 82,
          mvps: 1,
          tripleKills: 0,
          quadroKills: 1,
          pentaKills: 0,
          adr: 79.1
        },
        {
          nickname: 'BloodyK',
          kills: 21,
          assists: 5,
          deaths: 19,
          krRatio: 0.7,
          kdRatio: 1.11,
          headshots: 14,
          headshotsPercentage: 67,
          mvps: 4,
          tripleKills: 0,
          quadroKills: 0,
          pentaKills: 0,
          adr: 65.9
        },
        {
          nickname: '_s1lence',
          kills: 21,
          assists: 9,
          deaths: 17,
          krRatio: 0.7,
          kdRatio: 1.24,
          headshots: 8,
          headshotsPercentage: 38,
          mvps: 2,
          tripleKills: 2,
          quadroKills: 0,
          pentaKills: 0,
          adr: 74.0
        }
      ]
    },
    team2: {
      name: 'Lotus',
      result: 'LOSS',
      firstHalf: 3,
      secondHalf: 9,
      players: [
        {
          nickname: 'Fawx',
          kills: 27,
          assists: 9,
          deaths: 22,
          krRatio: 0.9,
          kdRatio: 1.23,
          headshots: 12,
          headshotsPercentage: 44,
          mvps: 7,
          tripleKills: 1,
          quadroKills: 2,
          pentaKills: 0,
          adr: 92.4
        },
        {
          nickname: 'Zazu',
          kills: 26,
          assists: 2,
          deaths: 22,
          krRatio: 0.87,
          kdRatio: 1.18,
          headshots: 17,
          headshotsPercentage: 65,
          mvps: 0,
          tripleKills: 3,
          quadroKills: 0,
          pentaKills: 0,
          adr: 89.7
        },
        {
          nickname: 'gadflyy',
          kills: 19,
          assists: 6,
          deaths: 22,
          krRatio: 0.63,
          kdRatio: 0.86,
          headshots: 8,
          headshotsPercentage: 42,
          mvps: 3,
          tripleKills: 1,
          quadroKills: 0,
          pentaKills: 0,
          adr: 71.5
        },
        {
          nickname: 'estrella',
          kills: 16,
          assists: 11,
          deaths: 23,
          krRatio: 0.53,
          kdRatio: 0.7,
          headshots: 8,
          headshotsPercentage: 50,
          mvps: 1,
          tripleKills: 0,
          quadroKills: 0,
          pentaKills: 0,
          adr: 74.8
        },
        {
          nickname: 'cass',
          kills: 15,
          assists: 4,
          deaths: 26,
          krRatio: 0.5,
          kdRatio: 0.58,
          headshots: 4,
          headshotsPercentage: 27,
          mvps: 3,
          tripleKills: 0,
          quadroKills: 0,
          pentaKills: 0,
          adr: 50.1
        }
      ]
    }
  }
};

export default function MatchDetails() {
  const navigate = useNavigate();

  const renderPlayerStats = (players: typeof matchData.teams.team1.players) => (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-sm border-b border-gray-700">
            <th className="py-3 px-4">Player</th>
            <th className="py-3 px-4">K</th>
            <th className="py-3 px-4">A</th>
            <th className="py-3 px-4">D</th>
            <th className="py-3 px-4">K/R</th>
            <th className="py-3 px-4">K/D</th>
            <th className="py-3 px-4">HS</th>
            <th className="py-3 px-4">HS%</th>
            <th className="py-3 px-4">MVPs</th>
            <th className="py-3 px-4">3K</th>
            <th className="py-3 px-4">4K</th>
            <th className="py-3 px-4">5K</th>
            <th className="py-3 px-4">ADR</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.nickname} className="text-gray-300 border-b border-gray-700/50">
              <td className="py-3 px-4 font-medium">{player.nickname}</td>
              <td className="py-3 px-4">{player.kills}</td>
              <td className="py-3 px-4">{player.assists}</td>
              <td className="py-3 px-4">{player.deaths}</td>
              <td className="py-3 px-4">{player.krRatio.toFixed(2)}</td>
              <td className="py-3 px-4">{player.kdRatio.toFixed(2)}</td>
              <td className="py-3 px-4">{player.headshots}</td>
              <td className="py-3 px-4">{player.headshotsPercentage}</td>
              <td className="py-3 px-4">{player.mvps}</td>
              <td className="py-3 px-4">{player.tripleKills}</td>
              <td className="py-3 px-4">{player.quadroKills}</td>
              <td className="py-3 px-4">{player.pentaKills}</td>
              <td className="py-3 px-4">{player.adr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/matches')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Matches
          </button>

          {/* Match Header */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  matchData.teams.team1.result === 'WIN' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-red-500/20 text-red-500'
                }`}>
                  {matchData.teams.team1.result}
                </div>
                <span className="text-gray-400">
                  {new Date(matchData.date).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  {matchData.map}
                </div>
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  {matchData.server}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{matchData.teams.team1.name}</h3>
                <div className="text-4xl font-bold text-white">16</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">First Half</div>
                <div className="text-xl font-medium text-white">
                  {matchData.teams.team1.firstHalf} : {matchData.teams.team2.firstHalf}
                </div>
                <div className="text-sm text-gray-400 mt-2">Second Half</div>
                <div className="text-xl font-medium text-white">
                  {matchData.teams.team1.secondHalf} : {matchData.teams.team2.secondHalf}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">{matchData.teams.team2.name}</h3>
                <div className="text-4xl font-bold text-white">14</div>
              </div>
            </div>
          </div>

          {/* Team Statistics */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                {matchData.teams.team1.name} Statistics
              </h3>
              {renderPlayerStats(matchData.teams.team1.players)}
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                {matchData.teams.team2.name} Statistics
              </h3>
              {renderPlayerStats(matchData.teams.team2.players)}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}