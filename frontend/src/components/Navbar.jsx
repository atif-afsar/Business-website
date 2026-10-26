import React from 'react';

export default function Navbar({ onOpenMenu, onOpenContact }) {
  return (
    <header className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-center justify-between z-30 relative">
      {/* Brand Badge */}
      <div className="flex items-center">
        <a 
          href="#" 
          className="bg-[#262523] text-white text-xs sm:text-[13px] font-bold tracking-widest px-3.5 py-1.5 rounded-sm hover:opacity-90 transition-opacity uppercase inline-block"
        >
          MOD-7
        </a>
      </div>

      {/* Minimal Hamburger (Two horizontal lines) */}
      <button
        onClick={onOpenMenu}
        aria-label="Open Navigation Menu"
        className="group flex flex-col items-center justify-center gap-1.5 p-2 rounded hover:bg-black/5 transition-all cursor-pointer"
      >
        <span className="w-9 h-[2px] bg-[#262523] block transition-all group-hover:w-10"></span>
        <span className="w-9 h-[2px] bg-[#262523] block transition-all group-hover:w-10"></span>
      </button>

      {/* Contact Link */}
      <div className="flex items-center">
        <button
          onClick={onOpenContact}
          className="group flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold tracking-wider text-[#262523] uppercase hover:opacity-70 transition-all cursor-pointer"
        >
          <span>CONTACT</span>
          <span className="text-base font-light transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </button>
      </div>
    </header>
  );
}
