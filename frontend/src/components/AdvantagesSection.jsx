import React from 'react';
import { motion } from 'framer-motion';

export default function AdvantagesSection({ onOpenCatalog }) {
  return (
    <section id="advantages" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Section Tag */}
      <div className="flex items-center justify-between mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#262523] uppercase">
          // ADVANTAGES
        </span>

        <button
          onClick={onOpenCatalog}
          className="group hidden sm:flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold tracking-wider text-[#262523] uppercase hover:opacity-70 transition-all cursor-pointer"
        >
          <span>full catalog</span>
          <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>

      {/* 3 Columns Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 items-end">
        {/* Column 1: RAPID CONSTRUCTION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-end"
        >
          <div className="pb-3 border-b border-[#262523]/25 mb-4">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#262523] uppercase">
              RAPID CONSTRUCTION
            </h3>
          </div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#262523] font-normal">
            From the moment we arrive at your construction site, to the last finishing, takes less than 8 weeks. By eliminating any guesswork from the building process, we can operate precisely and efficiently across all construction phases, without the usual project stress
          </p>
        </motion.div>

        {/* Column 2: Axonometric Wireframe + BUILD ANYWHERE */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col"
        >
          {/* Wireframe Diagram */}
          <div className="w-full flex items-center justify-center mb-6">
            <div className="relative max-w-[200px] hover:scale-105 transition-transform duration-300">
              <img 
                src="/images/wireframe_axonometric.png" 
                alt="Axonometric Modular Blocks Diagram" 
                className="w-full h-auto object-contain opacity-90 mix-blend-multiply"
              />
            </div>
          </div>

          <div className="pb-3 border-b border-[#262523]/25 mb-4">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#262523] uppercase">
              BUILD ANYWHERE
            </h3>
          </div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#262523] font-normal">
            Every component is precisely manufactured in our production facilities and then transported to construction site. This allows us to build high-quality homes anywhere in the world – even in the quietest, most secluded corners – without compromising on quality
          </p>
        </motion.div>

        {/* Column 3: BEST INSULATION */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-end"
        >
          <div className="pb-3 border-b border-[#262523]/25 mb-4">
            <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#262523] uppercase">
              BEST INSULATION
            </h3>
          </div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#262523] font-normal">
            Each home is custom insulated to suit your region's year-round temperature and humidity. From a thermal perspective, wood-frame buildings are inherently more efficient than steel-frame or concrete constructions, delivering optimal comfort at all times.
          </p>
        </motion.div>
      </div>

      {/* Mobile catalog link */}
      <div className="mt-10 sm:hidden flex justify-end">
        <button
          onClick={onOpenCatalog}
          className="group flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#262523] uppercase"
        >
          <span>full catalog</span>
          <span className="text-base font-light">↗</span>
        </button>
      </div>
    </section>
  );
}
