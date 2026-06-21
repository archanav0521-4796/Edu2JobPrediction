import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, Brain, History } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-between bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full my-auto">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          
          {/* Left Panel: Plain Welcome Text */}
          <div className="lg:col-span-2 space-y-3">
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-800 tracking-tight leading-tight">
              Welcome to
            </h1>
            <h1 className="text-5xl sm:text-6xl font-extrabold text-amber-500 tracking-tight">
              Edu2Job
            </h1>
            <p className="text-slate-400 text-xs font-semibold pt-1">
              The platform that guides your career choices with smart predictions.
            </p>
          </div>

          {/* Right Panel: Large White Action Card */}
          <div className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 animate-slide-up">
            {/* Greeting */}
            <div>
              <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                Hello, <span className="text-sky-400">{user?.fullName?.toUpperCase()}</span> <span className="animate-wiggle">👋</span>
              </h2>
            </div>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Your Profile */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-3" role="img" aria-label="profile">👤</span>
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Your Profile</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-semibold leading-relaxed">
                    View & update your details
                  </p>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-[10px] font-bold py-2.5 px-4 rounded-xl shadow-sm mt-5 transition-all active:scale-[0.97]"
                >
                  View Profile
                </button>
              </div>

              {/* Card 2: Job Prediction */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-3" role="img" aria-label="predict">🔮</span>
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Job Prediction</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-semibold leading-relaxed">
                    Find your best-fit job role
                  </p>
                </div>
                <button
                  onClick={() => navigate('/predict')}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-[10px] font-bold py-2.5 px-4 rounded-xl shadow-sm mt-5 transition-all active:scale-[0.97]"
                >
                  Get Started
                </button>
              </div>

              {/* Card 3: Prediction History */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-200">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-3" role="img" aria-label="history">📊</span>
                  <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Prediction History</h3>
                  <p className="text-slate-400 text-[10px] mt-1 font-semibold leading-relaxed">
                    See your prediction trends
                  </p>
                </div>
                <button
                  onClick={() => navigate('/history')}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white text-[10px] font-bold py-2.5 px-4 rounded-xl shadow-sm mt-5 transition-all active:scale-[0.97]"
                >
                  View History
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
