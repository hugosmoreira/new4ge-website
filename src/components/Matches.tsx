import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Globe, Target, Crown, Eye } from 'lucide-react';

const seasonInfo = {
  region: "North America",
  division: "Main",
  stage: "Regular Season",
  score: { wins: 13, losses: 1 },
  placement: "2nd"
};

const matches = [
  {
    opponent: "Lotus",
    logo: "🎮",
    date: "11/21/2024, 7:45 PM",
    result: "WIN",
    score: "13/7",
    map: "Anubis"
  },
  {
    opponent: "Outreach-Tech",
    logo: "🌐",
    date: "11/19/2024, 7:39 PM",
    result: "WIN",
    score: "13/3",
    map: "Ancient"
  },
  {
    opponent: "Mach 5",
    logo: "🚀",
    date: "11/14/2024, 7:49 PM",
    result: "WIN",
    score: "11/13",
    map: "Ancient"
  },
  {
    opponent: "GOOZPEEK",
    logo: "👀",
    date: "11/12/2024, 7:53 PM",
    result: "WIN",
    score: "13/9",
    map: "Ancient"
  },
  {
    opponent: "10 yrs of main",
    logo: "⏳",
    date: "11/7/2024, 7:39 PM",
    result: "WIN",
    score: "5/13",
    map: "Mirage"
  },
  {
    opponent: "Razed Esports",
    logo: "🎯",
    date: "10/24/2024, 7:53 PM",
    result: "WIN",
    score: "13/9",
    map: "Ancient"
  },
  {
    opponent: "powerFinesse",
    logo: "💪",
    date: "10/22/2024, 7:40 PM",
    result: "WIN",
    score: "4/13",
    map: "Mirage"
  },
  {
    opponent: "Hedgehogs",
    logo: "🦔",
    date: "10/17/2024, 7:43 PM",
    result: "WIN",
    score: "13/3",
    map: "Mirage"
  },
  {
    opponent: "Fisher College",
    logo: "🎓",
    date: "10/15/2024, 7:48 PM",
    result: "LOST",
    score: "13/5",
    map: "Ancient"
  },
  {
    opponent: "Apogee",
    logo: "🚀",
    date: "10/11/2024, 4:48 PM",
    result: "WIN",
    score: "13/9",
    map: "Ancient"
  }
];

export default function Matches() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-gray-900 min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Season Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold text-white">Season 51</h1>
            <div className="px-4 py-1 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold">
              Active Season
            </div>
          </div>

          {/* Season Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-white">Region</h3>
              </div>
              <p className="text-2xl font-bold text-white">{seasonInfo.region}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-white">Division</h3>
              </div>
              <p className="text-2xl font-bold text-white">{seasonInfo.division}</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-white">Score</h3>
              </div>
              <p className="text-2xl font-bold text-white">
                <span className="text-green-500">{seasonInfo.score.wins}W</span> - 
                <span className="text-red-500">{seasonInfo.score.losses}L</span>
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="h-6 w-6 text-red-500" />
                <h3 className="text-lg font-semibold text-white">Placement</h3>
              </div>
              <p className="text-2xl font-bold text-white">{seasonInfo.placement}</p>
            </div>
          </div>
        </div>

        {/* Matches List */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-gray-700">
            {matches.map((match, index) => (
              <div 
                key={index}
                className="p-6 hover:bg-gray-700/50 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-700 rounded-lg">
                      {match.logo}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{match.opponent}</h3>
                      <p className="text-gray-400">{match.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      match.result === 'WIN' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {match.result}
                    </span>
                    <button 
                      onClick={() => navigate(`/matches/${index}`)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}