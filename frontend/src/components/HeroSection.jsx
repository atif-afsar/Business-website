import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ onOpenDiscuss, onSelectModel }) {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 pt-4 sm:pt-6 pb-12 sm:pb-16 relative">
      {/* Row 1: MODULAR CONSTRUCTION IS OUR (left) + DISCUSS THE PROJECT (right) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2 sm:mb-3"
      >
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[2.9rem] xl:text-[3.4rem] font-medium tracking-tight text-[#262523] uppercase leading-none whitespace-normal sm:whitespace-nowrap">
          MODULAR CONSTRUCTION IS OUR
        </h1>

        <button
          onClick={onOpenDiscuss}
          className="border border-[#262523] rounded-full px-6 sm:px-7 py-2 sm:py-2.5 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#262523] hover:bg-[#262523] hover:text-[#e3ebd2] transition-colors duration-200 cursor-pointer whitespace-nowrap self-start sm:self-auto shrink-0"
        >
          DISCUSS THE PROJECT
        </button>
      </motion.div>


      {/* Row 2: Subtext (left) + NEW PHILOSOPHY. (right/center) */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 lg:gap-14 mb-4 sm:mb-6"
      >
        <div className="max-w-[260px] sm:max-w-[290px] text-xs sm:text-[13px] leading-relaxed text-[#262523] font-normal shrink-0 pt-1">
          <p>
            We design and build modern<br />
            turnkey modular houses<br />
            according to your needs<br />
            for living and recreation
          </p>
        </div>

        <div className="flex-1">
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-[-0.04em] text-[#262523] uppercase leading-[0.88] block">
            NEW PHILOSOPHY.
          </span>
        </div>
      </motion.div>

      {/* Hero Image Container with Model M Photo */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="relative w-full overflow-hidden group"
      >
        <div className="relative w-full">
          {/* Direct high-res hero photograph from Dribbble reference */}
          <img 
            src="/images/hero_model_m.png" 
            alt="MOD-7 Model M Turnkey Modular House in Nature"
            className="w-full h-auto object-cover select-none pointer-events-auto transition-transform duration-700 group-hover:scale-[1.01]"
            loading="eager"
          />

          {/* Interactive hotspot over 01 Model M label */}
          <div 
            onClick={() => onSelectModel('model-m')}
            title="Click to view Model M in Catalog"
            className="absolute bottom-3 sm:bottom-6 md:bottom-8 left-3 sm:left-6 md:left-8 w-36 h-20 cursor-pointer rounded-lg hover:bg-black/5 transition-colors"
          />
        </div>
      </motion.div>
    </section>
  );
}
