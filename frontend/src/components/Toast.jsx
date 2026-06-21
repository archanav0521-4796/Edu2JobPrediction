import React, { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeConfig = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-800',
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
      progress: 'bg-emerald-500'
    },
    error: {
      bg: 'bg-rose-50 border-rose-200',
      text: 'text-rose-800',
      icon: <XCircle className="h-5 w-5 text-rose-500" />,
      progress: 'bg-rose-500'
    },
    info: {
      bg: 'bg-indigo-50 border-indigo-200',
      text: 'text-indigo-800',
      icon: <Info className="h-5 w-5 text-indigo-500" />,
      progress: 'bg-indigo-500'
    }
  };

  const config = typeConfig[type] || typeConfig.success;

  return (
    <div className={`fixed bottom-4 right-4 z-50 flex max-w-sm items-center gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md animate-slide-up ${config.bg} ${config.text}`}>
      <div>{config.icon}</div>
      <div className="flex-1 text-sm font-medium">{message}</div>
      <button 
        onClick={onClose} 
        className="rounded-lg p-1 hover:bg-slate-200/50 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <div 
        className={`absolute bottom-0 left-0 h-1 rounded-bl-xl transition-all duration-3000 ease-linear ${config.progress}`}
        style={{ 
          width: '100%', 
          animation: `shrinkWidth ${duration}ms linear forwards` 
        }}
      />
      <style>{`
        @keyframes shrinkWidth {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
