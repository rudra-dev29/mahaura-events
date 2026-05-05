import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { AdminLogin } from './pages/AdminLogin';
import { AdminGallery } from './pages/AdminGallery';
import { LuxuryBackground } from './components/LuxuryBackground';
import { NebulaBackground } from './components/NebulaBackground';

const BackgroundManager: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return isAdmin ? <NebulaBackground /> : <LuxuryBackground />;
};

const App: React.FC = () => {
  return (
    <Router>
      <BackgroundManager />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
