import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS_DATA } from '../data/websiteData';

export default function ProjectsSection({ onOpenProject }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProject = () => {
    setCurrentIndex((prev) => (prev === 0 ? PROJECTS_DATA.length - 1 : prev - 1));
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev === PROJECTS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = PROJECTS_DATA[currentIndex];

  return (
    <section id="projects" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Top Header Row with Project Number, Arrows, and View Project */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#262523] uppercase">
            {current.number}
          </span>
          <span className="hidden sm:inline-block ml-4 text-xs text-[#81817d]">
            — {current.title} ({current.location})
          </span>
        </div>

        <div className="flex items-center gap-6 sm:gap-10">
          {/* Navigation Arrows */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevProject}
              aria-label="Previous project"
              className="text-[#262523] hover:opacity-60 transition-opacity text-lg sm:text-xl font-light cursor-pointer select-none p-1"
            >
              ←
            </button>
            <button
              onClick={nextProject}
              aria-label="Next project"
              className="text-[#262523] hover:opacity-60 transition-opacity text-lg sm:text-xl font-light cursor-pointer select-none p-1"
            >
              →
            </button>
          </div>

          {/* View Project Link */}
          <button
            onClick={() => onOpenProject(current)}
            className="group flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold tracking-wider text-[#262523] uppercase hover:opacity-70 transition-all cursor-pointer"
          >
            <span>view project</span>
            <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </button>
        </div>
      </div>

      {/* Project Images Layout matching screenshot */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
        >
          {/* Exterior Main Cabin Photo (Wide) */}
          <div 
            onClick={() => onOpenProject(current)}
            className="md:col-span-8 overflow-hidden cursor-pointer group relative bg-black/5"
          >
            <img 
              src={current.exteriorImage} 
              alt={`${current.number} Exterior View`} 
              className="w-full h-[260px] sm:h-[380px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 bg-[#262523]/80 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              {current.type} · {current.area}
            </div>
          </div>

          {/* Interior Tall Photo (Portrait) */}
          <div 
            onClick={() => onOpenProject(current)}
            className="md:col-span-4 flex justify-center md:justify-end"
          >
            <div className="w-full max-w-[280px] md:max-w-none overflow-hidden cursor-pointer group relative bg-black/5">
              <img 
                src={current.interiorImage} 
                alt={`${current.number} Interior Lake View`} 
                className="w-full h-[260px] sm:h-[380px] md:h-[440px] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 bg-[#262523]/80 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                Interior Lake Glazing
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
