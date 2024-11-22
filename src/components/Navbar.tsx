import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trophy, Calendar, Menu, X, LogIn, LogOut, ChevronDown, Settings, PenSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../lib/firestore';
import { ADMIN_EMAILS } from '../lib/firestore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const profile = await getUserProfile(user.uid);
          setIsAdmin(profile?.role === 'admin' || ADMIN_EMAILS.includes(user.email?.toLowerCase() || ''));
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <img src="https://i.ibb.co/KDCSLtz/logo.png" alt="New4ge Logo" className="h-8 w-8" />
                <span className="text-2xl font-bold">
                  <span className="text-white">New</span>
                  <span className="text-red-500">4</span>
                  <span className="text-white">ge</span>
                </span>
              </div>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/teams" className="nav-link flex items-center gap-1">
                  <Trophy className="w-4 h-4" />Teams
                </Link>
                <Link to="/matches" className="nav-link flex items-center gap-1">
                  <Calendar className="w-4 h-4" />Matches
                </Link>
                <Link to="/shop" className="nav-link flex items-center gap-1">
                  <ShoppingBag className="w-4 h-4" />Shop
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  {user.email}
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </div>
                      </Link>
                    )}
                    <Link
                      to="/admin/news"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <div className="flex items-center gap-2">
                        <PenSquare className="w-4 h-4" />
                        Make Blog Post
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={() => navigate('/login')}
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
          <Link to="/" className="nav-link block">Home</Link>
          <Link to="/teams" className="nav-link block">Teams</Link>
          <Link to="/matches" className="nav-link block">Matches</Link>
          <Link to="/shop" className="nav-link block">Shop</Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="nav-link block">Admin Panel</Link>
              )}
              <Link to="/admin/news" className="nav-link block">
                <div className="flex items-center gap-2">
                  <PenSquare className="w-4 h-4" />
                  Make Blog Post
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="nav-link block w-full text-left"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </div>
              </button>
            </>
          ) : (
            <button 
              className="btn-primary w-full mt-4"
              onClick={() => navigate('/login')}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}