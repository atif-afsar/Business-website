import React from 'react';

export default function Footer({ onOpenContact, onOpenCatalog }) {
  return (
    <footer className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 pt-16 pb-12 border-t border-[#262523]/15 text-[#262523]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#262523]/10">
        
        {/* Brand & Mission */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#262523] text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-sm uppercase inline-block">
                MOD-7
              </span>
              <span className="text-xs font-mono tracking-widest text-[#81817d] uppercase">
                Architecture & Modular Systems
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-[#81817d] max-w-sm leading-relaxed mb-6">
              Modular construction is our new philosophy. Precision off-site prefabrication meeting ecological site integration.
            </p>
          </div>

          {/* Design Palette Swatches (Honoring the style guide) */}
          <div className="pt-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#81817d] block mb-2">
              Color Palette:
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#262523] text-white text-[10px] font-mono px-2 py-1 rounded">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                #262523
              </div>
              <div className="flex items-center gap-1.5 bg-[#81817d] text-white text-[10px] font-mono px-2 py-1 rounded">
                #81817d
              </div>
              <div className="flex items-center gap-1.5 bg-[#b3b2ae] text-[#262523] text-[10px] font-mono px-2 py-1 rounded">
                #b3b2ae
              </div>
              <div className="flex items-center gap-1.5 bg-[#e3ebd2] border border-[#262523]/30 text-[#262523] text-[10px] font-mono px-2 py-1 rounded">
                #e3ebd2
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#262523] block mb-4">
            Navigation
          </span>
          <ul className="space-y-2.5 text-xs text-[#262523]">
            <li><a href="#about" className="hover:opacity-60 transition-opacity">About Studio</a></li>
            <li><a href="#services" className="hover:opacity-60 transition-opacity">Services & Capabilities</a></li>
            <li><a href="#projects" className="hover:opacity-60 transition-opacity">Selected Projects</a></li>
            <li><a href="#advantages" className="hover:opacity-60 transition-opacity">Advantages</a></li>
            <li><a href="#houses" className="hover:opacity-60 transition-opacity">House Models</a></li>
            <li><a href="#calculator" className="hover:opacity-60 transition-opacity">Cost Calculator</a></li>

            <li>
              <button onClick={onOpenCatalog} className="hover:opacity-60 transition-opacity text-left cursor-pointer">
                Full Catalog ↗
              </button>
            </li>
            <li className="pt-2 border-t border-[#262523]/10">
              <a href="/admin" className="font-mono text-xs text-[#262523] hover:opacity-60 transition-opacity flex items-center gap-1.5 font-semibold">
                Admin Portal ⚙ ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Contacts & Offices */}
        <div className="md:col-span-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#262523] block mb-4">
            Direct Inquiries
          </span>
          <p className="text-xs leading-relaxed text-[#262523] mb-4">
            General Inquiries: <a href="mailto:info@mod-7.com" className="font-medium underline hover:opacity-75">info@mod-7.com</a><br />
            Project Discussions: <a href="tel:+18004726637" className="font-medium underline hover:opacity-75">+1 (800) 472-MOD7</a>
          </p>
          <p className="text-xs text-[#81817d] leading-relaxed">
            Offices & Fabrication Facilities:<br />
            Oslo · Zurich · Vancouver · Seattle
          </p>
        </div>

      </div>

      {/* Bottom Legal Row */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#81817d]">
        <p>© {new Date().getFullYear()} MOD-7 Modular Architecture. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/admin" className="font-mono text-[#262523] hover:underline flex items-center gap-1 font-medium">
            <span>⚙</span> Admin Panel
          </a>
          <span className="hidden sm:inline font-mono">Typographic Identity: Suisse Intl & Geometric Grotesk</span>
        </div>
      </div>
    </footer>
  );
}
