import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Teams from './components/Teams';
import Matches from './components/Matches';
import Shop from './components/Shop';
import Login from './pages/Login';
import Admin from './pages/Admin';
import BlogPost from './pages/BlogPost';
import BlogPostDetail from './pages/BlogPostDetail';
import MatchDetails from './pages/MatchDetails';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/admin/news" element={<BlogPost />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-900">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/teams" element={<Teams />} />
                  <Route path="/matches" element={<Matches />} />
                  <Route path="/matches/:id" element={<MatchDetails />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/news/:id" element={<BlogPostDetail />} />
                </Routes>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;