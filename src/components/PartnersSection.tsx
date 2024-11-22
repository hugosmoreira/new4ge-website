import React from 'react';
import { Shield, Zap, Code, Target } from 'lucide-react';

const partners = [
  {
    id: 1,
    name: 'FACEIT',
    description: 'Leading competitive gaming platform',
    icon: Shield,
    color: 'text-orange-500'
  },
  {
    id: 2,
    name: 'ExitLag',
    description: 'Premium gaming network solution',
    icon: Zap,
    color: 'text-blue-500'
  },
  {
    id: 3,
    name: 'WebStudioLabs',
    description: 'Digital innovation partner',
    icon: Code,
    color: 'text-green-500'
  },
  {
    id: 4,
    name: 'ExploitHunters',
    description: 'Cybersecurity excellence',
    icon: Target,
    color: 'text-purple-500'
  }
];

export default function PartnersSection() {
  return (
    <section className="bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Our Partners</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Collaborating with industry leaders to deliver the best competitive gaming experience
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div 
                key={partner.id} 
                className="bg-gray-900 rounded-lg p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-red-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full ${partner.color} bg-opacity-10 mb-4`}>
                    <Icon className={`h-8 w-8 ${partner.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                  <p className="text-gray-400 text-sm">{partner.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Become a Partner</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join forces with New4ge and be part of the next generation of esports excellence
          </p>
          <a 
            href="#" 
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors duration-300"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}