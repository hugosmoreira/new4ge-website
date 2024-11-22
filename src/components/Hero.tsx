import React, { useState, useEffect } from 'react';
import { Play, Calendar } from 'lucide-react';

const backgroundImages = [
  "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1609017604163-a4544952cfa9?auto=format&fit=crop&q=80"
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-gray-900 h-screen overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentImageIndex === index ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={`Esports Background ${index + 1}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
      
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
            Live Now: CS2 ESEA 51 Main League
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600 animate-pulse-slow">
              New4ge
            </span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-3xl">
            Dominating the competitive CS2 scene with passion and precision. 
            Join us on our journey to the top.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="btn-primary group">
              <Play className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" />
              Watch Live
            </button>
            <button className="btn-secondary group">
              <Calendar className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" />
              View Schedule
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center space-x-3">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  currentImageIndex === index 
                    ? 'bg-red-500 scale-110' 
                    : 'bg-gray-500 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}