import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscussModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    model: 'Model M',
    timeline: '3-6 months',
    location: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // auto close or let user close
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#262523]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#e3ebd2] border border-[#262523]/30 p-6 sm:p-10 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl font-light text-[#262523] hover:opacity-60 transition-opacity cursor-pointer p-1"
          >
            ✕
          </button>

          <div className="mb-6">
            <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase block mb-1">
              // CONSULTATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-[#262523] uppercase">
              DISCUSS YOUR PROJECT
            </h3>
            <p className="text-xs sm:text-[13px] text-[#81817d] mt-1.5">
              Connect directly with our architectural leads to discuss site feasibility, custom models, and turn-around timelines.
            </p>
          </div>

          {submitted ? (
            <div className="py-12 text-center">
              <div className="w-12 h-12 bg-[#262523] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                ✓
              </div>
              <h4 className="text-xl font-medium text-[#262523] mb-2 uppercase">
                Inquiry Received
              </h4>
              <p className="text-xs sm:text-sm text-[#81817d] max-w-sm mx-auto">
                Thank you, {formData.name}. An architectural coordinator will review your site specifics and contact you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[#262523] text-white rounded-full px-8 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Alexander Wright"
                    className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 text-xs text-[#262523] focus:outline-none focus:border-[#262523]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@domain.com"
                    className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 text-xs text-[#262523] focus:outline-none focus:border-[#262523]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1.5">
                    Preferred Model
                  </label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 text-xs text-[#262523] focus:outline-none focus:border-[#262523] cursor-pointer"
                  >
                    <option value="Model S">Model S (774 SF)</option>
                    <option value="Model M">Model M (1,280 SF)</option>
                    <option value="Model L">Model L (1,960 SF)</option>
                    <option value="Bespoke Modular">Bespoke Custom Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1.5">
                    Site / Land Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Region or GPS Coordinates"
                    className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 text-xs text-[#262523] focus:outline-none focus:border-[#262523]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#262523] mb-1.5">
                  Project Notes & Vision
                </label>
                <textarea
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about terrain, slope, utility connections, or recreation goals..."
                  className="w-full bg-transparent border border-[#262523]/30 rounded-2xl p-4 text-xs text-[#262523] focus:outline-none focus:border-[#262523]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#262523] text-white rounded-full py-3 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer"
                >
                  SCHEDULE CONSULTATION
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
