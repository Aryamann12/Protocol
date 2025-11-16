'use client';

import React from 'react';
import Navigation from '@/src/components/Navigation';
import HeroSection from '@/src/components/HeroSection'; // Old hero
import JourneySection from '@/src/components/JourneySection';
import ProjectsSection from '@/src/components/ProjectsSection';
import ResearchSection from '@/src/components/ResearchSection';
import ModernSkillsSection from '@/src/components/ModernSkillsSection';
import MusicSection from '@/src/components/MusicSection';
import ContactSection from '@/src/components/ContactSection';
import Footer from '@/src/components/Footer';
import { Toaster } from '@/src/components/ui/toaster';

export default function Home() {
  return (
    <div className="App bg-pro-dark">
      <Navigation />
      <HeroSection />

      <JourneySection />
      <ProjectsSection />
      <ResearchSection />
      <ModernSkillsSection />
      <MusicSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}

