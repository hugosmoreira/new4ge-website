import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import type { NewsItem } from '../lib/firestore';

export default function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({
            id: docSnap.id,
            ...docSnap.data(),
            date: docSnap.data().date.toDate(),
            createdAt: docSnap.data().createdAt.toDate(),
          } as NewsItem);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-800 rounded w-3/4"></div>
            <div className="h-96 bg-gray-800 rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-800 rounded w-1/4"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to News
        </button>

        <h1 className="text-4xl font-bold text-white mb-6">{post.title}</h1>

        <div className="flex items-center gap-6 text-gray-400 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {post.date.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {post.author.name}
          </div>
        </div>

        <div className="aspect-video mb-8 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-6">{post.description}</p>
          <div className="text-gray-300 whitespace-pre-wrap">{post.content}</div>
        </div>
      </article>
    </div>
  );
}