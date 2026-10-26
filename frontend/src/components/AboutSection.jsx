import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection({ onLearnMore }) {
  return (
    <section id="about" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Section Tag */}
      <div className="mb-8 sm:mb-12">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#262523] uppercase">
          // ABOUT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Description & Learn More */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-8"
        >
          <p className="text-sm sm:text-base leading-relaxed text-[#262523] font-normal mb-8 max-w-md">
            MODE-7 its a new modern homes inspired by nature forms and materials. Our houses are design to achieve the optimal balance between functionality, quality, cost and construction times
          </p>

          <button
            onClick={onLearnMore}
            className="border border-[#262523] rounded-full px-7 py-2.5 text-xs sm:text-[13px] font-semibold uppercase tracking-wider text-[#262523] hover:bg-[#262523] hover:text-[#e3ebd2] transition-colors duration-200 cursor-pointer"
          >
            LEARN MORE
          </button>
        </motion.div>

        {/* Right Column: Architectural Metric Boxes */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-[560px] ml-auto">
            {/* Box 1: 100+ Completed Projects (Dark solid box) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#262523] text-white p-8 sm:p-10 aspect-square flex flex-col justify-between"
            >
              <div className="flex items-start">
                <span className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight">
                  100
                </span>
                <span className="text-2xl sm:text-3xl font-light text-[#b3b2ae] ml-1 mt-1">
                  +
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#b3b2ae] font-normal tracking-wide">
                Completed projects
              </p>
            </motion.div>

            {/* Box 2: 23 Professionals (Border box) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-[#262523]/25 p-8 sm:p-10 aspect-square flex flex-col justify-between bg-transparent"
            >
              <span className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#262523]">
                23
              </span>
              <p className="text-xs sm:text-sm text-[#81817d] font-normal tracking-wide">
                Professionals
              </p>
            </motion.div>

            {/* Empty space or offset filler if needed, and Box 3 */}
            <div className="hidden sm:block">
              {/* Intentional asymmetrical architectural void */}
            </div>

            {/* Box 3: 15 Years on the market (Border box) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border-t sm:border-t-0 border-x border-b border-[#262523]/25 p-8 sm:p-10 aspect-square flex flex-col justify-between bg-transparent"
            >
              <span className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#262523]">
                15
              </span>
              <p className="text-xs sm:text-sm text-[#81817d] font-normal tracking-wide">
                Years on the market
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
