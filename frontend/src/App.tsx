import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ImpactBentoGrid } from './components/ImpactBentoGrid';
import { ResearchSection } from './components/ResearchSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ProjectsAndGrantsSection } from './components/ProjectsAndGrantsSection';
import { LabHubSection } from './components/LabHubSection';
import { RecruitmentSection } from './components/RecruitmentSection';
import { Footer } from './components/Footer';
import { CitationModal } from './components/CitationModal';
import { CommandPalette } from './components/CommandPalette';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-academic-alabaster dark:bg-academic-midnight text-academic-obsidian dark:text-academic-text-dark font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ImpactBentoGrid />
        <ResearchSection />
        <PublicationsSection />
        <ProjectsAndGrantsSection />
        <LabHubSection />
        <RecruitmentSection />
      </main>
      <Footer />
      <CitationModal />
      <CommandPalette />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
