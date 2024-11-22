import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import toast from 'react-hot-toast';
import type { NewsItem } from '../../lib/firestore';

export default function AdminNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'news'));
      const newsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate(),
      })) as NewsItem[];
      setNews(newsData.sort((a, b) => b.date.getTime() - a.date.getTime()));
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentItem) {
        // Update existing news
        await updateDoc(doc(db, 'news', currentItem.id), {
          ...formData,
          updatedAt: Timestamp.now(),
        });
        toast.success('News updated successfully');
      } else {
        // Add new news
        await addDoc(collection(db, 'news'), {
          ...formData,
          date: Timestamp.now(),
          createdAt: Timestamp.now(),
        });
        toast.success('News created successfully');
      }

      setFormData({ title: '', description: '', image: '' });
      setCurrentItem(null);
      setIsEditing(false);
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      toast.error('Failed to save news');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setCurrentItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteDoc(doc(db, 'news', id));
      toast.success('News deleted successfully');
      fetchNews();
    } catch (error) {
      console.error('Error deleting news:', error);
      toast.error('Failed to delete news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage News</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add News
        </button>
      </div>

      {/* Form */}
      {isEditing && (
        <div className="mb-8 bg-gray-800 p-6 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setCurrentItem(null);
                  setFormData({ title: '', description: '', image: '' });
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
                {loading ? 'Saving...' : (currentItem ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* News List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500 mx-auto"></div>
          </div>
        ) : news.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No news items found</p>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="bg-gray-800 p-6 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
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