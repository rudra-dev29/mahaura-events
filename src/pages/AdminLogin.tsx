import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LuxuryBackground } from '../components/LuxuryBackground';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/gallery');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-white selection:bg-luxury-gold/30">
      <LuxuryBackground />
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-slate-300 text-sm">Please enter your credentials to manage the gallery.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all"
                placeholder="admin"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium backdrop-blur-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-luxury-gold hover:bg-luxury-gold/80 text-black font-bold rounded-xl transition-all shadow-lg hover:shadow-luxury-gold/20"
          >
            Sign In
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
