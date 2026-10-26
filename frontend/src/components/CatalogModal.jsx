import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOUSE_MODELS } from '../data/websiteData';

export default function CatalogModal({ isOpen, onClose, onSelectModelForInquiry }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#262523]/75 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-[#e3ebd2] border border-[#262523]/30 p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-light text-[#262523] hover:opacity-60 transition-opacity cursor-pointer p-1"
          >
            ✕
          </button>

          <div className="mb-8">
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
              ARCHITECTURAL CATALOG // 2026 EDITION
            </span>
            <h3 className="text-3xl sm:text-4xl font-light tracking-tight text-[#262523] uppercase">
              MODULAR HOUSES COLLECTION
            </h3>
            <p className="text-xs sm:text-sm text-[#81817d] mt-1 max-w-xl">
              Engineered off-site with millimeter accuracy. All models feature passive-grade thermal envelopes, integrated Scandinavian interiors, and customizable layouts.
            </p>
          </div>

          {/* Grid of Models */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {HOUSE_MODELS.map((model) => (
              <div 
                key={model.id}
                className="bg-[#262523] text-white p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow"
              >
                <div>
                  <div className="w-full h-44 mb-4 overflow-hidden flex items-center justify-center bg-black/20">
                    <img 
                      src={model.image} 
                      alt={model.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-2xl font-light tracking-tight mb-1">
                    {model.name}
                  </h4>
                  <p className="text-xs text-[#b3b2ae] mb-4 font-mono">
                    {model.subtitle}
                  </p>

                  <div className="space-y-2 border-t border-white/10 pt-3 mb-4 text-xs">
                    <div className="flex justify-between text-[#b3b2ae]">
                      <span>Dimensions:</span>
                      <span className="font-mono text-white">{model.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-[#b3b2ae]">
                      <span>Area:</span>
                      <span className="font-mono text-white">{model.squareFeet}</span>
                    </div>
                    <div className="flex justify-between text-[#b3b2ae]">
                      <span>Base Price:</span>
                      <span className="font-mono text-white font-bold">from {model.basePrice}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#b3b2ae] leading-relaxed mb-4">
                    {model.description}
                  </p>
                </div>

                <button
                  onClick={() => { onClose(); onSelectModelForInquiry(model.name); }}
                  className="w-full bg-white text-[#262523] rounded-full py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#e3ebd2] transition-colors cursor-pointer mt-2"
                >
                  DISCUSS THIS MODEL
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-[#262523]/20">
            <button
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-[#262523] hover:opacity-60"
            >
              CLOSE CATALOG
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
