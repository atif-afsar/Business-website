import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, isOpen, onClose, onDiscussProject }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#262523]/75 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#e3ebd2] border border-[#262523]/30 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-light text-[#262523] hover:opacity-60 transition-opacity cursor-pointer p-1"
          >
            ✕
          </button>

          {/* Header */}
          <div className="mb-6">
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
              ARCHITECTURAL ARCHIVE // {project.number}
            </span>
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-[#262523] uppercase">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#81817d] mt-1 font-mono">
              {project.location} · Completed {project.year} · {project.area}
            </p>
          </div>

          {/* Dual Imagery */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
            <div className="md:col-span-8 overflow-hidden bg-black/5">
              <img 
                src={project.exteriorImage} 
                alt={`${project.title} Exterior`}
                className="w-full h-[260px] sm:h-[340px] object-cover"
              />
            </div>
            <div className="md:col-span-4 overflow-hidden bg-black/5">
              <img 
                src={project.interiorImage} 
                alt={`${project.title} Interior`}
                className="w-full h-[260px] sm:h-[340px] object-cover"
              />
            </div>
          </div>

          {/* Description & Technical Blueprint */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-[#262523]/20 mb-6 text-xs sm:text-[13px]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#81817d] block mb-1">
                Structural System
              </span>
              <p className="text-[#262523]">Cross-laminated timber (CLT) with standing-seam zinc alloy facade.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#81817d] block mb-1">
                Thermal Performance
              </span>
              <p className="text-[#262523]">Triple-glazed argon low-E curtain wall with R-40 continuous exterior insulation.</p>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#81817d] block mb-1">
                Turnkey Assembly
              </span>
              <p className="text-[#262523]">Factory precision prefabrication: 4 weeks. On-site installation: 5 days.</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm leading-relaxed text-[#262523] mb-8">
            {project.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262523]/20">
            <button
              onClick={() => { onClose(); onDiscussProject(); }}
              className="w-full sm:w-auto bg-[#262523] text-white rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
            >
              INQUIRE ABOUT THIS SPECIFICATION
            </button>
            <button
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-[#262523] hover:opacity-60"
            >
              CLOSE PREVIEW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
