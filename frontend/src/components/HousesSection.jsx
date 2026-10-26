import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOUSE_MODELS } from '../data/websiteData';

export default function HousesSection({ onOpenCatalog, onOpenModelDetail }) {
  const [modelIndex, setModelIndex] = useState(0);

  const prevModel = () => {
    setModelIndex((prev) => (prev === 0 ? HOUSE_MODELS.length - 1 : prev - 1));
  };

  const nextModel = () => {
    setModelIndex((prev) => (prev === HOUSE_MODELS.length - 1 ? 0 : prev + 1));
  };

  const current = HOUSE_MODELS[modelIndex];

  return (
    <section id="houses" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Section Header Row */}
      <div className="flex items-center justify-between mb-8 sm:mb-12">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#262523] uppercase">
          // HOUSES
        </span>

        <button
          onClick={onOpenCatalog}
          className="group flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold tracking-wider text-[#262523] uppercase hover:opacity-70 transition-all cursor-pointer"
        >
          <span>full catalog</span>
          <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>

      {/* Main Dark Charcoal Card */}
      <div className="bg-[#262523] text-white p-6 sm:p-10 md:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Specs, Title, View Project, Nav Arrows */}
          <div className="lg:col-span-5 flex flex-col justify-between z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Model Title */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-2 uppercase">
                  {current.name}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-[#b3b2ae] font-normal mb-8 sm:mb-10">
                  {current.subtitle}
                </p>

                {/* Specs Table */}
                <div className="space-y-4 mb-8 sm:mb-10 text-xs sm:text-[13px] border-t border-white/10 pt-4">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[#b3b2ae]">Dimensions</span>
                    <span className="font-mono text-white">{current.dimensions}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-white/10">
                    <span className="text-[#b3b2ae]">Square Feet</span>
                    <span className="font-mono text-white">{current.squareFeet}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-white/10">
                    <span className="text-[#b3b2ae]">Base Price</span>
                    <span className="font-mono text-white">from {current.basePrice}</span>
                  </div>
                </div>

                {/* View Project Button */}
                <div className="mb-10">
                  <button
                    onClick={() => onOpenModelDetail(current)}
                    className="bg-white text-[#262523] rounded-full px-7 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-wider hover:bg-[#e3ebd2] transition-colors duration-200 cursor-pointer"
                  >
                    VIEW PROJECT
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Slider Arrows */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <button
                onClick={prevModel}
                aria-label="Previous model"
                className="text-white hover:opacity-60 transition-opacity text-xl font-light cursor-pointer select-none p-1"
              >
                ←
              </button>
              <button
                onClick={nextModel}
                aria-label="Next model"
                className="text-white hover:opacity-60 transition-opacity text-xl font-light cursor-pointer select-none p-1"
              >
                →
              </button>
              <span className="text-xs text-[#81817d] font-mono ml-2">
                0{modelIndex + 1} / 0{HOUSE_MODELS.length}
              </span>
            </div>
          </div>

          {/* Right Column: 3D Isometric Render */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full flex items-center justify-center max-h-[460px]"
              >
                <img 
                  src={current.image} 
                  alt={`${current.name} Architectural Render`}
                  className="w-full max-w-[540px] h-auto object-contain select-none hover:scale-[1.02] transition-transform duration-500"
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
