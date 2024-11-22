import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    id: string;
    name: string;
  };
  date: Timestamp;
  createdAt: Timestamp;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsRef = collection(db, 'news');
        const q = query(newsRef, orderBy('date', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);
        
        const newsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as NewsItem[];
        
        setNews(newsData);
        setError(null);
      } catch (error) {
        console.error('Error getting news:', error);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-700"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8">Latest News</h2>
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Unable to load news at the moment.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 text-red-500 hover:text-red-400 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Latest News</h2>
        {news.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No news posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="text-red-500 text-sm">
                    {item.date.toDate().toLocaleDateString()}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                  <p className="text-gray-400 mt-2">{item.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link 
                      to={`/news/${item.id}`}
                      className="text-red-500 hover:text-red-400"
                    >
                      Read More →
                    </Link>
                    <span className="text-sm text-gray-400">By {item.author.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}