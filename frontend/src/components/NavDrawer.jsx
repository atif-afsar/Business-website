import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavDrawer({ isOpen, onClose, onOpenContact, onOpenCatalog }) {
  if (!isOpen) return null;

  const links = [
    { num: '01', title: 'Philosophy', href: '#' },
    { num: '02', title: 'About Studio', href: '#about' },
    { num: '03', title: 'Services', href: '#services' },
    { num: '04', title: 'Projects', href: '#projects' },
    { num: '05', title: 'Advantages', href: '#advantages' },
    { num: '06', title: 'House Models', href: '#houses' },
    { num: '07', title: 'Cost Calculator', href: '#calculator' },
  ];


  const handleLinkClick = (href) => {
    onClose();
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#262523]/60 backdrop-blur-sm"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          className="fixed top-0 right-0 bottom-0 w-full max-w-md sm:max-w-lg bg-[#e3ebd2] border-l border-[#262523]/20 p-8 sm:p-12 flex flex-col justify-between shadow-2xl z-10"
        >
          {/* Top Row: Brand & Close */}
          <div className="flex items-center justify-between">
            <span className="bg-[#262523] text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-sm uppercase">
              MOD-7
            </span>
            <button
              onClick={onClose}
              className="text-2xl font-light text-[#262523] hover:opacity-60 transition-opacity p-2 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Links list */}
          <nav className="my-auto py-8">
            <ul className="space-y-4 sm:space-y-6">
              {links.map((link) => (
                <li key={link.num}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="group flex items-baseline gap-4 text-left w-full cursor-pointer hover:translate-x-2 transition-transform duration-200"
                  >
                    <span className="text-xs sm:text-sm font-mono text-[#81817d]">
                      {link.num}
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-light uppercase tracking-tight text-[#262523] group-hover:opacity-70 transition-opacity">
                      {link.title}
                    </span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => { onClose(); onOpenCatalog(); }}
                  className="group flex items-baseline gap-4 text-left w-full cursor-pointer hover:translate-x-2 transition-transform duration-200 pt-2"
                >
                  <span className="text-xs sm:text-sm font-mono text-[#81817d]">08</span>
                  <span className="text-2xl sm:text-3xl font-light uppercase tracking-tight text-[#262523] flex items-center gap-2">
                    Full Catalog <span className="text-xl font-light">↗</span>
                  </span>
                </button>
              </li>
              <li className="pt-2 border-t border-[#262523]/15">
                <a
                  href="/admin"
                  className="group flex items-baseline gap-4 text-left w-full cursor-pointer hover:translate-x-2 transition-transform duration-200"
                >
                  <span className="text-xs sm:text-sm font-mono text-[#81817d]">ADM</span>
                  <span className="text-xl sm:text-2xl font-light uppercase tracking-tight text-[#262523] flex items-center gap-2">
                    Admin Portal <span className="text-base font-light">⚙ ↗</span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Drawer Footer with Contact */}
          <div className="border-t border-[#262523]/15 pt-6 flex flex-col gap-4">
            <button
              onClick={() => { onClose(); onOpenContact(); }}
              className="w-full bg-[#262523] text-white rounded-full py-3 text-xs font-semibold uppercase tracking-wider hover:bg-black transition-colors"
            >
              DISCUSS YOUR PROJECT
            </button>
            <div className="flex justify-between items-center text-xs text-[#81817d] font-mono">
              <span>info@mod-7.com</span>
              <span>+1 (800) 472-MOD7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
