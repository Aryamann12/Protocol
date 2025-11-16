import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import JourneySection from './components/JourneySection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ResearchSection from './components/ResearchSection';
import ModernSkillsSection from './components/ModernSkillsSection';
import MusicSection from './components/MusicSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateDashboard from './pages/PrivateDashboard';

// Public Home Component
const PublicHome = () => {
  return (
    <div className="App" style={{ backgroundColor: '#0a0e27' }}>
      <Navigation />
      <HeroSection />
      <JourneySection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <ModernSkillsSection />
      <MusicSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route
            path="/private"
            element={
              <ProtectedRoute>
                <PrivateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/private/*"
            element={
              <ProtectedRoute>
                <PrivateDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
