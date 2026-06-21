import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired') === 'true') {
      setToastMessage('Your session has expired. Please log in again.');
      setToastType('info');
    } else if (params.get('registered') === 'true') {
      setToastMessage('Registered Successfully!');
      setToastType('success');
    }
  }, [location]);

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email is required';
    }
    if (!password) {
      tempErrors.password = 'Password is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4 py-8">
      {/* Split Card Layout */}
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/80 min-h-[550px] animate-slide-up">
        
        {/* Left Panel: Graphic Desk Background */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop')` 
          }}
        />

        {/* Right Panel: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="space-y-6 max-w-sm mx-auto w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-sky-500 tracking-tight">
                Welcome to Edu2Job
              </h2>
            </div>

            {submitError && (
              <div className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-xs text-rose-800 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="font-semibold">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-3 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                      errors.email ? 'border-rose-300' : 'border-slate-200'
                    }`}
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                </div>
                {errors.email && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.email}</span>}
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-3 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                      errors.password ? 'border-rose-300' : 'border-slate-200'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.password}</span>}
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 text-xs shadow-md active:scale-[0.98] transition-all mt-6"
              >
                Login
              </button>

              {/* Links */}
              <div className="flex justify-between items-center text-xs pt-2">
                <Link to="/reset-password" className="text-sky-500 hover:underline font-semibold">
                  Forgot Password?
                </Link>
                <Link to="/register" className="text-sky-500 hover:underline font-semibold">
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>

      </div>

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      )}
    </div>
  );
};

export default Login;
