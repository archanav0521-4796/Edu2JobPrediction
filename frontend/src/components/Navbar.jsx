import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LayoutDashboard, User, Brain, History, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-[#6f42c1] text-white shadow-md sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-tight text-white hover:text-purple-100 transition-colors">
              Edu2Job
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              <span>🏠</span> Home
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              <span>👤</span> Profile
            </NavLink>
            <NavLink 
              to="/predict" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              <span>🔮</span> Predict
            </NavLink>
            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/90'
                }`
              }
            >
              <span>📊</span> History
            </NavLink>
          </div>

          {/* Logout Button */}
          <div className="flex items-center">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-[#c0392b] hover:bg-[#a93226] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
