import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/websiteData';
import { API_BASE } from '../config/api';

export default function ServicesSection({ onOpenDiscuss }) {
  const [services, setServices] = useState(SERVICES_DATA);
  const [loading, setLoading] = useState(false);

  // Fetch live services from Backend API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/services`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setServices(json.data);
        }
      }
    } catch (err) {
      console.warn('Backend API not responding, using local services data.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    
    // Listen for storage / custom event when admin edits service
    const handleRefresh = () => fetchServices();
    window.addEventListener('servicesUpdated', handleRefresh);
    return () => window.removeEventListener('servicesUpdated', handleRefresh);
  }, []);

  return (
    <section id="services" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Top Header Row with Section Tag */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#262523] uppercase">
              // SERVICES
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#262523]/10 text-[#262523] uppercase">
              Live from Database
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#262523] uppercase leading-[1.05] max-w-2xl">
            COMPREHENSIVE TURNKEY SERVICES.
            <span className="block text-[#81817d] font-normal text-2xl sm:text-3xl md:text-4xl mt-1">
              FROM BLUEPRINT TO REMOTE HANDOVER.
            </span>
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#262523] font-normal">
            We handle every architectural, fabrication, and logistical milestone in-house—eliminating contractor friction, ensuring passive-house grade thermal insulation, and completing projects in under 8 weeks.
          </p>
        </div>
      </div>

      {/* Services Grid with Swiss Architectural Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#262523]/20">
        {services.map((service, index) => (
          <motion.div
            key={service._id || service.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="border-r border-b border-[#262523]/20 p-6 sm:p-8 md:p-10 flex flex-col justify-between group hover:bg-[#262523] hover:text-[#e3ebd2] transition-colors duration-300 relative cursor-pointer"
            onClick={onOpenDiscuss}
          >
            {/* Top row: Number and Arrow */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-[#81817d] group-hover:text-[#b3b2ae] transition-colors">
                  {service.number || `0${index + 1}`}
                </span>
                <span className="text-lg font-light text-[#262523] group-hover:text-[#e3ebd2] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                  ↗
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl sm:text-2xl font-light tracking-tight uppercase mb-2 group-hover:text-white transition-colors">
                {service.title}
              </h3>
              {service.subtitle && (
                <p className="text-xs font-mono text-[#81817d] group-hover:text-[#b3b2ae] uppercase tracking-wider mb-4">
                  {service.subtitle}
                </p>
              )}

              {/* Description */}
              <p className="text-xs sm:text-[13px] leading-relaxed text-[#262523] group-hover:text-[#b3b2ae] font-normal mb-6 transition-colors">
                {service.description}
              </p>
            </div>

            {/* Bottom Deliverables Tag Pills */}
            {service.tags && service.tags.length > 0 && (
              <div className="pt-4 border-t border-[#262523]/10 group-hover:border-white/10 transition-colors">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#262523]/20 group-hover:border-white/20 text-[#81817d] group-hover:text-[#e3ebd2] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Bar */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 bg-[#262523] text-white">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#b3b2ae] block mb-1">
            Need a bespoke custom solution?
          </span>
          <h4 className="text-xl sm:text-2xl font-light tracking-tight uppercase">
            WE ENGINEER MODULAR STRUCTURES FOR ANY TERRAIN OR CLIMATE.
          </h4>
        </div>

        <button
          onClick={onOpenDiscuss}
          className="bg-white text-[#262523] hover:bg-[#e3ebd2] px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors duration-200 whitespace-nowrap cursor-pointer shrink-0"
        >
          CONSULT AN ARCHITECT
        </button>
      </div>
    </section>
  );
}
