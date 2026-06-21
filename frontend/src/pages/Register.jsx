import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const tempErrors = {};
    if (!fullName) {
      tempErrors.fullName = 'Name is required';
    }
    
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email address is invalid';
    }



    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    const result = await register(fullName, email, password);
    if (result.success) {
      setToastMessage('Registered Successfully!');
      setTimeout(() => {
        navigate('/login?registered=true');
      }, 2000);
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4 py-8">
      {/* Split Card Layout */}
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/80 min-h-[600px] animate-slide-up">
        
        {/* Left Panel: Graphic Desk Background */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop')` 
          }}
        />

        {/* Right Panel: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div className="space-y-6 max-w-sm mx-auto w-full">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-sky-500 tracking-tight">
                Register an Account
              </h2>
            </div>

            {submitError && (
              <div className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-rose-50 p-3 text-xs text-rose-800 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="font-semibold">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                    errors.fullName ? 'border-rose-300' : 'border-slate-200'
                  }`}
                  placeholder="Enter your name"
                />
                {errors.fullName && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.fullName}</span>}
              </div>

              {/* Email */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                    errors.email ? 'border-rose-300' : 'border-slate-200'
                  }`}
                  placeholder="Enter email address"
                />
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
                    className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-2.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                      errors.password ? 'border-rose-300' : 'border-slate-200'
                    }`}
                    placeholder="Enter password"
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

              {/* Retype Password */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>Retype Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-2.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                      errors.confirmPassword ? 'border-rose-300' : 'border-slate-200'
                    }`}
                    placeholder="Retype password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.confirmPassword}</span>}
              </div>

              {/* Buttons */}
              <button
                type="submit"
                className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 text-xs shadow-md active:scale-[0.98] transition-all mt-6"
              >
                Register
              </button>

              <Link
                to="/login"
                className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-slate-700 font-bold py-3 rounded-xl text-xs shadow-sm active:scale-[0.98] transition-all"
              >
                Back to Login
              </Link>
            </form>
          </div>
        </div>
      </div>

      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type="success" 
          onClose={() => setToastMessage('')} 
        />
      )}
    </div>
  );
};

export default Register;
