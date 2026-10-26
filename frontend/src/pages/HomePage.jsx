import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import AdvantagesSection from '../components/AdvantagesSection';
import HousesSection from '../components/HousesSection';
import CostCalculatorSection from '../components/CostCalculatorSection';
import Footer from '../components/Footer';

// Modals
import DiscussModal from '../components/DiscussModal';
import NavDrawer from '../components/NavDrawer';
import ProjectModal from '../components/ProjectModal';
import CatalogModal from '../components/CatalogModal';
import QuoteModal from '../components/QuoteModal';

export default function HomePage() {
  const [isDiscussOpen, setIsDiscussOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  
  const [selectedProject, setSelectedProject] = useState(null);
  const [quoteData, setQuoteData] = useState(null);

  const handleOpenDiscuss = () => {
    setIsDiscussOpen(true);
  };

  const handleOpenProject = (project) => {
    setSelectedProject(project);
  };

  const handleShowQuoteModal = (data) => {
    setQuoteData(data);
  };

  return (
    <div className="min-h-screen bg-[#e3ebd2] text-[#262523] flex flex-col font-sans selection:bg-[#262523] selection:text-[#e3ebd2]">
      {/* Top Architectural Header */}
      <Navbar 
        onOpenMenu={() => setIsNavOpen(true)}
        onOpenContact={handleOpenDiscuss}
      />

      {/* Main Landing Page Stream */}
      <main className="flex-1 w-full flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection 
          onOpenDiscuss={handleOpenDiscuss}
          onSelectModel={() => setIsCatalogOpen(true)}
        />

        {/* 2. About Section */}
        <AboutSection 
          onLearnMore={handleOpenDiscuss}
        />

        {/* 3. Services Section (Live connected to MongoDB & Admin Panel) */}
        <ServicesSection 
          onOpenDiscuss={handleOpenDiscuss}
        />

        {/* 4. Projects Showcase */}
        <ProjectsSection 
          onOpenProject={handleOpenProject}
        />

        {/* 5. Advantages with Axonometric Wireframe */}
        <AdvantagesSection 
          onOpenCatalog={() => setIsCatalogOpen(true)}
        />

        {/* 6. Houses Dark Container (Model S) */}
        <HousesSection 
          onOpenCatalog={() => setIsCatalogOpen(true)}
          onOpenModelDetail={() => setIsCatalogOpen(true)}
        />

        {/* 7. Calculate Project Cost Interactive Tool */}
        <CostCalculatorSection 
          onShowQuoteModal={handleShowQuoteModal}
        />
      </main>

      {/* Minimalist Swiss Architectural Footer */}
      <Footer 
        onOpenContact={handleOpenDiscuss}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Modals & Slide-overs */}
      <DiscussModal 
        isOpen={isDiscussOpen}
        onClose={() => setIsDiscussOpen(false)}
      />

      <NavDrawer 
        isOpen={isNavOpen}
        onClose={() => setIsNavOpen(false)}
        onOpenContact={handleOpenDiscuss}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onDiscussProject={handleOpenDiscuss}
      />

      <CatalogModal 
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectModelForInquiry={() => setIsDiscussOpen(true)}
      />

      <QuoteModal 
        quoteData={quoteData}
        isOpen={!!quoteData}
        onClose={() => setQuoteData(null)}
        onConfirmConsultation={handleOpenDiscuss}
      />
    </div>
  );
}
