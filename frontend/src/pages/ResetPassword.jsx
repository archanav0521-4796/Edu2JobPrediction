import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const tempErrors = {};
    if (!email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (!newPassword) {
      tempErrors.newPassword = 'New password is required';
    } else if (newPassword.length < 6) {
      tempErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await API.post('/auth/reset-password', {
        email,
        newPassword
      });
      setToastMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'Incorrect security answer or details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-sky-100 px-4 py-8">
      {/* Split Card Layout */}
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200/80 min-h-[580px] animate-slide-up">
        
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
                Reset Password
              </h2>
            </div>

            {submitError && (
              <div className="flex items-center gap-2.5 rounded-xl border border-rose-100 bg-rose-50 p-3 text-xs text-rose-800 animate-fade-in">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="font-semibold">{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your email"
                />
                {errors.email && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.email}</span>}
              </div>



              {/* Password */}
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  <span className="text-rose-500 font-bold mr-1">*</span>New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                    }}
                    className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-2.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 transition-all ${
                      errors.newPassword ? 'border-rose-300' : 'border-slate-200'
                    }`}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.newPassword && <span className="text-[10px] text-rose-500 font-semibold mt-1 block">{errors.newPassword}</span>}
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
                    placeholder="Retype new password"
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
                disabled={loading}
                className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-3 text-xs shadow-md active:scale-[0.98] transition-all mt-6 disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
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
export default ResetPassword;
