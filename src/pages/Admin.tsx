import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../lib/firestore';
import { Shield, Users, Trophy, Newspaper, Settings, LogOut, Home, UserPlus } from 'lucide-react';
import AdminNews from '../components/admin/AdminNews';
import AdminTeams from '../components/admin/AdminTeams';
import AdminMatches from '../components/admin/AdminMatches';
import AdminSettings from '../components/admin/AdminSettings';
import AdminUsers from '../components/admin/AdminUsers';
import { ADMIN_EMAILS } from '../lib/firestore';

type TabType = 'news' | 'teams' | 'matches' | 'settings' | 'users';

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('news');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        navigate('/login');
        return;
      }

      try {
        const profile = await getUserProfile(user.uid);
        const isAdminUser = profile?.role === 'admin' || ADMIN_EMAILS.includes(user.email?.toLowerCase() || '');
        
        if (!isAdminUser) {
          navigate('/');
          return;
        }
        
        setIsAdmin(true);
      } catch (error) {
        console.error('Error checking admin status:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: 'news' as TabType, label: 'News', icon: Newspaper },
    { id: 'teams' as TabType, label: 'Teams', icon: Users },
    { id: 'matches' as TabType, label: 'Matches', icon: Trophy },
    { id: 'users' as TabType, label: 'Users', icon: UserPlus },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-8">
              <Shield className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => navigate('/')}
                className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                Back to Home
              </button>

              <div className="my-4 border-t border-gray-700"></div>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-500 text-white'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {activeTab === 'news' && <AdminNews />}
            {activeTab === 'teams' && <AdminTeams />}
            {activeTab === 'matches' && <AdminMatches />}
            {activeTab === 'users' && <AdminUsers />}
            {activeTab === 'settings' && <AdminSettings />}
          </div>
        </div>
      </div>
    </div>
  );
}