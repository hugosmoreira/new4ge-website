import React from 'react';
import { Facebook, Twitter, Instagram, Twitch, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src="https://i.ibb.co/KDCSLtz/logo.png" alt="New4ge Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold">
                <span className="text-white">New</span>
                <span className="text-red-500">4</span>
                <span className="text-white">ge</span>
              </span>
            </div>
            <p className="mt-4 text-gray-400">Pushing the boundaries of competitive gaming.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Teams</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Schedule</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shop</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><Facebook className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Twitch className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Youtube className="h-6 w-6" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Newsletter</h4>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="mt-2 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} New4ge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}