import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteModal({ quoteData, isOpen, onClose, onConfirmConsultation }) {
  if (!isOpen || !quoteData) return null;

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
          className="relative w-full max-w-lg bg-[#e3ebd2] border border-[#262523]/30 p-6 sm:p-10 shadow-2xl z-10"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-light text-[#262523] hover:opacity-60 transition-opacity cursor-pointer p-1"
          >
            ✕
          </button>

          <div className="mb-6">
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
              ESTIMATE SUMMARY // {quoteData.firstName || 'Client'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#262523] uppercase">
              PROJECT COST ESTIMATE
            </h3>
            <p className="text-xs text-[#81817d] mt-1">
              Preliminary modular calculation based on your selected parameters:
            </p>
          </div>

          <div className="bg-[#262523] text-white p-6 rounded-none mb-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#b3b2ae] block mb-1">
              Estimated Total (Turnkey)
            </span>
            <div className="text-4xl font-light tracking-tight text-white mb-4">
              ${quoteData.estimatedTotal.toLocaleString()}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3 text-xs text-[#b3b2ae]">
              <div className="flex justify-between">
                <span>Building Type:</span>
                <span className="text-white font-medium">{quoteData.buildingType}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Floor Area:</span>
                <span className="text-white font-medium">{quoteData.squareFeet} SQFT</span>
              </div>
              <div className="flex justify-between">
                <span>Configuration:</span>
                <span className="text-white font-medium">{quoteData.floors} Floor(s), {quoteData.bedrooms} Bed(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Terrace Deck:</span>
                <span className="text-white font-medium">{quoteData.terrace}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-[#81817d] space-y-2 mb-6">
            <p>
              * Includes prefabrication, high-performance thermal envelope, windows, doors, and foundation mounting.
            </p>
            <p>
              Our lead architectural engineer will review this estimate with you and verify site slope, access roads, and soil conditions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => { onClose(); onConfirmConsultation(); }}
              className="w-full bg-[#262523] text-white rounded-full py-3 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
            >
              FINALIZE WITH ARCHITECT
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto text-xs font-semibold uppercase tracking-wider text-[#262523] px-6 py-3 border border-[#262523]/30 rounded-full hover:bg-black/5"
            >
              CLOSE
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
