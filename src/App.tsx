import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/defaultData';
import { PortfolioData, Project } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { PortfolioEditorModal } from './components/PortfolioEditorModal';

const STORAGE_KEY = 'portfolio_showcase_user_data_v1';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load portfolio from localStorage, using defaults.', e);
    }
    return initialPortfolioData;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Sync to localStorage whenever data changes
  const handleSaveData = (newData: PortfolioData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Failed to save portfolio to localStorage.', e);
    }
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    setData(initialPortfolioData);
  };

  const handleOpenContact = () => {
    const el = document.querySelector('#contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-emerald-500 selection:text-stone-950 font-sans antialiased">
      {/* Top sticky navigation */}
      <Navbar
        profile={data.profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection
          profile={data.profile}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={handleOpenContact}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <ProjectsSection
          projects={data.projects}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <ExperienceSection
          experiences={data.experiences}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        <SkillsSection categories={data.skillCategories} />

        <AboutSection profile={data.profile} />

        <ContactSection profile={data.profile} />
      </main>

      {/* Global Footer */}
      <Footer
        profile={data.profile}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Detailed Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Formatted Printable Resume Modal */}
      <ResumeModal
        data={data}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Interactive Portfolio Personalization Dialog */}
      <PortfolioEditorModal
        data={data}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
}
