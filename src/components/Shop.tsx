import React, { useState } from 'react';
import { ShoppingBag, Timer, Bell, Mail } from 'lucide-react';

export default function Shop() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <ShoppingBag className="h-24 w-24 text-red-500 animate-pulse" />
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2">
              <Timer className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-extrabold text-white mb-6">
            Our Shop is
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent"> Coming Soon</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            We're working hard to bring you the ultimate New4ge merchandise collection. 
            Get ready for exclusive jerseys, gaming gear, and limited edition items.
          </p>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="h-6 w-6 text-red-500" />
              <h2 className="text-xl font-bold text-white">Get Notified</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full py-3 justify-center"
              >
                Notify Me
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-4">
              Be the first to know when our shop launches and get exclusive early access!
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Pro Jerseys</h3>
              <p className="text-gray-400">Official team jerseys worn by our pro players</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Gaming Gear</h3>
              <p className="text-gray-400">Professional equipment used by our team</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-2">Limited Editions</h3>
              <p className="text-gray-400">Exclusive merchandise and collectibles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}