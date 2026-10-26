import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function CostCalculatorSection({ onShowQuoteModal }) {
  const [buildingType, setBuildingType] = useState('Living');
  const [squareFeet, setSquareFeet] = useState(774);
  const [floors, setFloors] = useState(2);
  const [terrace, setTerrace] = useState('Yes');
  const [bedrooms, setBedrooms] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  // Dynamic cost calculation
  const calculateEstimate = () => {
    const ratePerSqft = {
      'Living': 62,
      'Guest House': 58,
      'Studio': 55,
      'Sauna': 75,
      'Commercial': 80
    }[buildingType] || 62;

    const sqftVal = Number(squareFeet) || 500;
    const base = sqftVal * ratePerSqft;
    const floorMultiplier = floors === 1 ? 1 : 1 + (floors - 1) * 0.45;
    const terraceCost = terrace === 'Yes' ? 8500 : 0;
    const bedroomsCost = (bedrooms - 1) * 3500;

    return Math.round(base * floorMultiplier + terraceCost + bedroomsCost);
  };

  const estimatedTotal = calculateEstimate();

  const handleSubmit = (e) => {
    e.preventDefault();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#262523', '#81817d', '#b3b2ae', '#e3ebd2']
    });

    onShowQuoteModal({
      buildingType,
      squareFeet,
      floors,
      terrace,
      bedrooms,
      firstName,
      lastName,
      phone,
      estimatedTotal
    });
  };

  return (
    <section id="calculator" className="w-full max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 sm:py-20 border-t border-[#262523]/15">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#262523] uppercase">
          // CALCULATE PROJECT COST
        </span>

        {/* Live dynamic estimate badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-[#262523]/5 px-3.5 py-1.5 rounded-full border border-[#262523]/10">
          <span className="text-[11px] font-mono uppercase text-[#81817d]">Est. Total:</span>
          <span className="text-xs sm:text-sm font-mono font-bold text-[#262523]">
            ${estimatedTotal.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Form Fields matching the screenshot layout */}
      <form onSubmit={handleSubmit} className="mb-10 sm:mb-14">
        {/* Row 1: Building Type, Square Feet, Number of Floors, Terrace, Bedrooms */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 items-end mb-6">
          
          {/* Building Type */}
          <div className="col-span-1">
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              BUILDING TYPE
            </label>
            <div className="relative">
              <select
                value={buildingType}
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full appearance-none bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] focus:outline-none focus:border-[#262523] transition-colors cursor-pointer pr-8"
              >
                <option value="Living">Living</option>
                <option value="Guest House">Guest House</option>
                <option value="Studio">Studio</option>
                <option value="Sauna">Sauna & Spa</option>
                <option value="Commercial">Commercial</option>
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#262523]">
                ⌵
              </div>
            </div>
          </div>

          {/* Square Feet */}
          <div className="col-span-1">
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              SQUARE FEET
            </label>
            <input
              type="number"
              min="200"
              max="5000"
              step="50"
              value={squareFeet}
              onChange={(e) => setSquareFeet(Number(e.target.value))}
              placeholder="SQFT"
              className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] placeholder-[#81817d]/60 focus:outline-none focus:border-[#262523] transition-colors"
            />
          </div>

          {/* Number of Floors */}
          <div className="col-span-1">
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              NUMBER OF FLOORS
            </label>
            <div className="flex items-center justify-between border border-[#262523]/30 rounded-full px-3 py-1.5 sm:py-2 text-xs sm:text-[13px] text-[#262523]">
              <button
                type="button"
                onClick={() => setFloors((prev) => Math.max(1, prev - 1))}
                className="w-5 h-5 flex items-center justify-center text-xs font-mono hover:bg-black/10 rounded-full cursor-pointer select-none"
              >
                –
              </button>
              <span className="font-mono font-medium">{floors}</span>
              <button
                type="button"
                onClick={() => setFloors((prev) => Math.min(3, prev + 1))}
                className="w-5 h-5 flex items-center justify-center text-xs font-mono hover:bg-black/10 rounded-full cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Terrace */}
          <div className="col-span-1">
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              TERRACE
            </label>
            <div className="relative">
              <select
                value={terrace}
                onChange={(e) => setTerrace(e.target.value)}
                className="w-full appearance-none bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] focus:outline-none focus:border-[#262523] transition-colors cursor-pointer pr-8"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#262523]">
                ⌵
              </div>
            </div>
          </div>

          {/* Bedrooms */}
          <div className="col-span-1">
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              BEDROOMS
            </label>
            <div className="flex items-center justify-between border border-[#262523]/30 rounded-full px-3 py-1.5 sm:py-2 text-xs sm:text-[13px] text-[#262523]">
              <button
                type="button"
                onClick={() => setBedrooms((prev) => Math.max(1, prev - 1))}
                className="w-5 h-5 flex items-center justify-center text-xs font-mono hover:bg-black/10 rounded-full cursor-pointer select-none"
              >
                –
              </button>
              <span className="font-mono font-medium">{bedrooms}</span>
              <button
                type="button"
                onClick={() => setBedrooms((prev) => Math.min(5, prev + 1))}
                className="w-5 h-5 flex items-center justify-center text-xs font-mono hover:bg-black/10 rounded-full cursor-pointer select-none"
              >
                +
              </button>
            </div>
          </div>

        </div>

        {/* Row 2: First Name, Last Name, Phone Number, SUBMIT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end">
          
          {/* First Name */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              FIRST NAME
            </label>
            <input
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] placeholder-[#81817d]/60 focus:outline-none focus:border-[#262523] transition-colors"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              LAST NAME
            </label>
            <input
              type="text"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] placeholder-[#81817d]/60 focus:outline-none focus:border-[#262523] transition-colors"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#262523] mb-2">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 XXX-XXX-XXXX"
              className="w-full bg-transparent border border-[#262523]/30 rounded-full px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] text-[#262523] placeholder-[#81817d]/60 focus:outline-none focus:border-[#262523] transition-colors"
            />
          </div>

          {/* SUBMIT Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#262523] text-white rounded-full py-2.5 sm:py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-wider hover:bg-black transition-colors duration-200 cursor-pointer shadow-sm hover:shadow"
            >
              SUBMIT
            </button>
          </div>

        </div>
      </form>

      {/* Wide Bottom Photograph */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full overflow-hidden group relative"
      >
        <img 
          src="/images/forest_cabin_long.png" 
          alt="MOD-7 Precision Engineered Forest Pavilion House"
          className="w-full h-auto object-cover select-none transition-transform duration-700 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
      </motion.div>
    </section>
  );
}
