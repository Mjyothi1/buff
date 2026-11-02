import React, { useState } from 'react';
import { STORE_LOCATIONS } from '../data/locations';
import { StoreLocation } from '../types';
import { MapPin, Clock, Phone, Sparkles, Navigation, CheckCircle2, Search } from 'lucide-react';

export const ScoopBars: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchZip, setSearchZip] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<StoreLocation | null>(null);
  const [pickupConfirmed, setPickupConfirmed] = useState(false);

  const filteredLocations = STORE_LOCATIONS.filter((loc) => {
    if (selectedType !== 'all' && loc.type !== selectedType) return false;
    if (searchZip.trim() !== '') {
      const q = searchZip.toLowerCase();
      const matchCity = loc.city.toLowerCase().includes(q);
      const matchName = loc.name.toLowerCase().includes(q);
      const matchAddress = loc.address.toLowerCase().includes(q);
      if (!matchCity && !matchName && !matchAddress) return false;
    }
    return true;
  });

  const handleOrderAhead = (loc: StoreLocation) => {
    setPickupLocation(loc);
    setPickupConfirmed(false);
  };

  const handleConfirmPickup = () => {
    setPickupConfirmed(true);
    setTimeout(() => {
      setPickupLocation(null);
      setPickupConfirmed(false);
    }, 2800);
  };

  return (
    <section id="locations" className="w-full bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 brutal-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4FF00] text-[#121212] font-space font-extrabold text-xs uppercase rounded-full brutal-border brutal-shadow-sm mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>BRICK & MORTAR PINT STATIONS</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#121212] uppercase tracking-tight">
            FLAGSHIP SCOOP BARS
          </h2>
          <p className="font-sans text-base text-[#121212]/80 mt-2">
            Experience sub-zero anabolic soft-serve, custom freshly spun scoops, and high-protein waffle cones live at our neon brutalist scoop bars or grab pints at premium grocers.
          </p>
        </div>

        {/* Filter & Zip Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F0EDEC] brutal-border rounded-2xl mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'ALL SPOTS' },
              { id: 'Flagship Scoop Bar', label: 'FLAGSHIP SCOOP BARS' },
              { id: 'Specialty Grocery', label: 'SPECIALTY GROCERS' },
              { id: 'Athletic Club', label: 'CULT.FIT / GYM BARS' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 font-space font-bold text-xs uppercase rounded-full transition-all ${
                  selectedType === type.id
                    ? 'bg-[#121212] text-[#D4FF00] brutal-border brutal-shadow-sm'
                    : 'bg-white text-[#121212] brutal-border hover:bg-white/80'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#121212]/60" />
              <input
                type="text"
                placeholder="Search city, Indiranagar, Bandra, PIN..."
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white brutal-border rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
              />
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((loc) => {
            const isFlagship = loc.type === 'Flagship Scoop Bar';
            return (
              <div
                key={loc.id}
                className="bg-white brutal-border brutal-card rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-space font-extrabold uppercase rounded-full brutal-border ${
                        isFlagship ? 'bg-[#D4FF00] text-[#121212]' : 'bg-[#EDECFF] text-[#2E4CFF]'
                      }`}
                    >
                      {loc.type}
                    </span>
                    <span className="font-space font-bold text-xs text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      OPEN NOW
                    </span>
                  </div>

                  <h3 className="font-syne font-extrabold text-xl uppercase text-[#121212] leading-tight">
                    {loc.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-space font-bold text-[#FF2E93] mt-1">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>{loc.distance || 'Near you'} • {loc.city}</span>
                  </div>

                  <div className="mt-4 space-y-2 text-xs font-sans text-[#121212]/80">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#121212] shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-[#121212] shrink-0 mt-0.5" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-[#121212] shrink-0 mt-0.5" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>

                  {/* Taps on Rotation */}
                  <div className="mt-5 p-3 bg-[#FAF8F5] brutal-border rounded-xl">
                    <span className="block font-space font-bold text-[10px] uppercase text-[#121212] mb-1.5">
                      🍦 TODAY'S LIVE TAP ROTATION:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.tapsToday.map((tap, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-white text-[10px] font-space font-semibold rounded-md border border-[#121212]/30"
                        >
                          {tap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Button */}
                <div className="mt-6 pt-4 border-t border-[#121212]/20">
                  <button
                    onClick={() => handleOrderAhead(loc)}
                    className="w-full py-2.5 px-4 bg-[#D4FF00] text-[#121212] font-space font-black text-xs uppercase tracking-wider rounded-full brutal-btn flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-[#121212]" />
                    <span>ORDER AHEAD FOR PICKUP</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pickup Modal */}
        {pickupLocation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-xs">
            <div className="bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#121212]">
                <h3 className="font-syne font-extrabold text-lg uppercase">
                  COUNTER PICKUP RESERVATION
                </h3>
                <button
                  onClick={() => setPickupLocation(null)}
                  className="font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              {pickupConfirmed ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-syne font-black text-xl uppercase">
                    SCOOP ORDER RESERVED!
                  </h4>
                  <p className="text-xs font-sans text-[#121212]/80">
                    Your pints are being packed in a sub-zero cooler box at <strong>{pickupLocation.name}</strong>. Ready at the counter in 15 minutes!
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-white brutal-border rounded-xl space-y-1">
                    <span className="font-space font-bold text-xs uppercase text-[#FF2E93] block">
                      LOCATION:
                    </span>
                    <h4 className="font-syne font-extrabold text-base text-[#121212]">
                      {pickupLocation.name}
                    </h4>
                    <p className="text-xs text-[#121212]/70 font-sans">
                      {pickupLocation.address}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-space font-bold uppercase">
                      PICKUP TIME:
                    </label>
                    <select className="w-full p-2.5 bg-white brutal-border rounded-xl text-xs font-space font-bold">
                      <option>In 15 minutes (Express Ready)</option>
                      <option>In 30 minutes</option>
                      <option>In 1 hour</option>
                      <option>Later today (between 4pm-7pm)</option>
                    </select>
                  </div>

                  <button
                    onClick={handleConfirmPickup}
                    className="w-full py-3 bg-[#D4FF00] text-[#121212] font-space font-black text-xs uppercase rounded-full brutal-btn"
                  >
                    CONFIRM PICKUP RESERVATION
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
