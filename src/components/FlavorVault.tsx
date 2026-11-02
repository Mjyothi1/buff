import React, { useState, useMemo } from 'react';
import { Flavor } from '../types';
import { FLAVORS_DATA } from '../data/flavors';
import { useCart } from '../context/CartContext';
import { Plus, Filter, Sparkles, ArrowUpDown, Check, Info } from 'lucide-react';

interface FlavorVaultProps {
  onSelectFlavor: (flavorId: string) => void;
  onOpenBoxBuilder: () => void;
}

export const FlavorVault: React.FC<FlavorVaultProps> = ({
  onSelectFlavor,
  onOpenBoxBuilder
}) => {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'ALL (10)' },
    { id: 'chocolate', label: 'CHOCOLATE OBSESSION' },
    { id: 'nutty-caramel', label: 'NUTTY & CARAMEL' },
    { id: 'fruity-fresh', label: 'FRUITY & FRESH' }
  ];

  const dietaryFilters = [
    { id: 'keto', label: 'KETO / LOW CARB' },
    { id: 'gluten-free', label: 'GLUTEN FREE' },
    { id: 'dairy-free', label: 'DAIRY FREE' },
    { id: 'nut-free', label: 'NUT FREE' }
  ];

  const toggleDietary = (id: string) => {
    setSelectedDietary((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const isFlavorInCategory = (flavor: Flavor, cat: string) => {
    if (cat === 'all') return true;
    if (cat === 'chocolate') {
      return (
        flavor.id.includes('brownie') ||
        flavor.id.includes('mint') ||
        flavor.id.includes('cookie')
      );
    }
    if (cat === 'nutty-caramel') {
      return (
        flavor.id.includes('peanut') ||
        flavor.id.includes('pistachio') ||
        flavor.id.includes('caramel') ||
        flavor.id.includes('vanilla')
      );
    }
    if (cat === 'fruity-fresh') {
      return (
        flavor.id.includes('strawberry') ||
        flavor.id.includes('mango') ||
        flavor.id.includes('confetti')
      );
    }
    return true;
  };

  const filteredFlavors = useMemo(() => {
    return FLAVORS_DATA.filter((flavor) => {
      // Category filter
      if (!isFlavorInCategory(flavor, activeCategory)) {
        return false;
      }
      // Dietary filter
      if (selectedDietary.length > 0) {
        const matchesAll = selectedDietary.every((d) =>
          flavor.dietary.includes(d as any)
        );
        if (!matchesAll) return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = flavor.name.toLowerCase().includes(query);
        const matchesNotes = flavor.tastingNotes.some((n) =>
          n.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesNotes) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'protein-high') return b.protein - a.protein;
      if (sortBy === 'carbs-low') return a.netCarbs - b.netCarbs;
      if (sortBy === 'calories-low') return a.calories - b.calories;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      return 0; // 'featured' preserves original order
    });
  }, [activeCategory, selectedDietary, sortBy, searchQuery]);

  return (
    <section id="flavors" className="w-full bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Neo-brutalist sticker styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 brutal-border-b gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4FF00] text-[#121212] font-space font-black text-xs uppercase rounded-full brutal-border brutal-shadow-sm mb-3">
              ⚡ 100% CLEAN FUEL
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-[#121212] tracking-tight uppercase">
              ALL THE FLAVORS. NO REGRETS.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#121212]/80 mt-1 max-w-2xl">
              Choose your daily muscle fuel. Every pint ships in chilled eco-boxes guaranteed frozen on arrival across India.
            </p>
          </div>

          {/* Quick Box Builder Promo Badge */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBoxBuilder}
              className="px-5 py-3 bg-[#FF2E93] text-white font-space font-black text-xs sm:text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
              <span>BUILD 6-PACK BUNDLE (SAVE ₹350)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="space-y-4 mb-8">
          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 font-space font-bold text-xs sm:text-sm tracking-wide uppercase rounded-full transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#121212] text-[#D4FF00] brutal-border brutal-shadow-sm'
                    : 'bg-white text-[#121212] brutal-border hover:bg-[#F0EDEC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Secondary Filter Row: Dietary toggles, Search, and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#F0EDEC] brutal-border rounded-xl">
            {/* Dietary Checkbox Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-space font-bold text-xs text-[#121212] uppercase mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> FILTERS:
              </span>
              {dietaryFilters.map((diet) => {
                const isSelected = selectedDietary.includes(diet.id);
                return (
                  <button
                    key={diet.id}
                    onClick={() => toggleDietary(diet.id)}
                    className={`px-3 py-1 text-xs font-space font-bold rounded-full flex items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#2E4CFF] text-white brutal-border'
                        : 'bg-white text-[#121212] brutal-border hover:bg-white/70'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{diet.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sort & Search Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {/* Search input */}
              <input
                type="text"
                placeholder="Search flavors, fudge, matcha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3.5 py-1.5 text-xs font-sans bg-white brutal-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4FF00] min-w-[180px]"
              />

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-white brutal-border px-3 py-1.5 rounded-lg text-xs font-space font-bold">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#121212]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="featured">Vault Catalog</option>
                  <option value="protein-high">Highest Protein</option>
                  <option value="carbs-low">Lowest Net Carbs</option>
                  <option value="calories-low">Lowest Calories</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs font-space font-bold text-[#121212]/80 uppercase">
          <span>SHOWING {filteredFlavors.length} BUFF HAND-CRAFTED PINTS</span>
          <span>SUB-ZERO COLD-CHAIN GUARANTEED</span>
        </div>

        {/* Flavor Cards Grid (Matching reference layout with 3 cols on tablet/desktop or 4 on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-7">
          {filteredFlavors.map((flavor) => {
            return (
              <div
                key={flavor.id}
                className="bg-white brutal-border brutal-card rounded-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image Stage with Overlaid Rotated Stickers */}
                  <div className="relative aspect-square sm:aspect-[4/3] bg-[#F0EDEC] overflow-hidden brutal-border-b">
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Stacked badges top-left matching reference image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="px-2.5 py-0.5 font-space font-black text-[10px] sm:text-[11px] uppercase rounded-full brutal-border bg-[#D4FF00] text-[#121212] shadow-sm transform -rotate-2">
                        {flavor.protein}G PROTEIN
                      </span>
                      <span className="px-2.5 py-0.5 font-space font-black text-[10px] sm:text-[11px] uppercase rounded-full brutal-border bg-white text-[#121212] shadow-sm transform rotate-1">
                        0G SUGAR
                      </span>
                      {flavor.tag && !flavor.tag.includes('PROTEIN') && (
                        <span
                          className="px-2.5 py-0.5 font-space font-black text-[9px] sm:text-[10px] uppercase rounded-full brutal-border shadow-sm transform -rotate-1 text-white"
                          style={{ backgroundColor: flavor.badgeColor || '#FF2E93' }}
                        >
                          {flavor.tag}
                        </span>
                      )}
                    </div>

                    {/* Price pill top-right */}
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-[#121212] text-[#FAF8F5] font-space font-black text-xs rounded-full brutal-border">
                        ₹{flavor.price}
                      </span>
                    </div>

                    {/* Dietary icons pill bottom-left */}
                    <div className="absolute bottom-2.5 left-3 flex gap-1 z-10">
                      {flavor.dietary.map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 bg-[#FAF8F5]/90 text-[#121212] text-[10px] font-space font-bold rounded-md brutal-border"
                        >
                          {d.replace('-', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs font-space font-bold text-[#121212]/70">
                      <span>★ {flavor.rating} ({flavor.reviewCount})</span>
                      <span className="text-[#2E4CFF] uppercase font-bold">{flavor.dietary[0] || 'ARTISAN'}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-syne font-extrabold text-base sm:text-lg text-[#121212] tracking-tight leading-tight uppercase group-hover:text-[#FF2E93] transition-colors">
                        {flavor.name}
                      </h3>
                      <span className="font-space font-black text-sm text-[#FF2E93] shrink-0">
                        ₹{flavor.price}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#121212]/75 line-clamp-2">
                      {flavor.subtitle}
                    </p>

                    {/* Macro Matrix 4-Box Row - Perfectly Aligned Zero Overflow */}
                    <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-[#FAF8F5] brutal-border rounded-lg text-center">
                      <div className="bg-[#D4FF00] rounded-md py-1.5 px-0.5 min-w-0 flex flex-col items-center justify-center border border-[#121212]">
                        <span className="text-[9px] font-space font-bold text-[#121212] uppercase tracking-wider leading-none mb-1">
                          PRO
                        </span>
                        <span className="text-xs sm:text-[13px] font-space font-black text-[#121212] leading-none whitespace-nowrap">
                          {flavor.protein}g
                        </span>
                      </div>
                      <div className="bg-white rounded-md py-1.5 px-0.5 min-w-0 flex flex-col items-center justify-center border border-[#121212]">
                        <span className="text-[9px] font-space font-bold text-[#121212]/70 uppercase tracking-wider leading-none mb-1">
                          CAL
                        </span>
                        <span className="text-xs sm:text-[13px] font-space font-black text-[#121212] leading-none whitespace-nowrap">
                          {flavor.calories}
                        </span>
                      </div>
                      <div className="bg-white rounded-md py-1.5 px-0.5 min-w-0 flex flex-col items-center justify-center border border-[#121212]">
                        <span className="text-[9px] font-space font-bold text-[#121212]/70 uppercase tracking-wider leading-none mb-1">
                          CARB
                        </span>
                        <span className="text-xs sm:text-[13px] font-space font-black text-[#121212] leading-none whitespace-nowrap">
                          {flavor.netCarbs}g
                        </span>
                      </div>
                      <div className="bg-white rounded-md py-1.5 px-0.5 min-w-0 flex flex-col items-center justify-center border border-[#121212]">
                        <span className="text-[9px] font-space font-bold text-[#121212]/70 uppercase tracking-wider leading-none mb-1">
                          SUGAR
                        </span>
                        <span className="text-xs sm:text-[13px] font-space font-black text-[#121212] leading-none whitespace-nowrap">
                          0g
                        </span>
                      </div>
                    </div>

                    {/* Tasting Notes */}
                    <div className="flex flex-wrap gap-1">
                      {flavor.tastingNotes.slice(0, 2).map((note, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-[#FAF8F5] text-[10px] font-space font-semibold rounded-full border border-[#121212]/40"
                        >
                          • {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons: matching ADD TO BUNDLE button in reference */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  <button
                    onClick={() => addItem(flavor, 1)}
                    className="w-full py-2.5 px-4 bg-[#D4FF00] text-[#121212] font-space font-black text-xs tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ADD TO BUNDLE</span>
                  </button>

                  <button
                    onClick={() => onSelectFlavor(flavor.id)}
                    className="w-full py-1.5 px-3 bg-white text-[#121212] font-space font-bold text-[11px] tracking-wider uppercase rounded-full border border-[#121212] hover:bg-[#F0EDEC] flex items-center justify-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    <span>MACRO BREAKDOWN & REVIEWS</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State if no flavors match */}
        {filteredFlavors.length === 0 && (
          <div className="text-center py-16 bg-white brutal-border rounded-xl p-8">
            <span className="text-4xl block mb-2">🍦</span>
            <h3 className="font-syne font-extrabold text-2xl text-[#121212] uppercase">
              NO PINTS FOUND FOR THOSE FILTERS
            </h3>
            <p className="font-sans text-sm text-[#121212]/70 mt-1 max-w-md mx-auto">
              Try clearing your dietary filters or search term to see all available BUFF flavor drops.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary([]);
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#D4FF00] text-[#121212] font-space font-bold text-xs uppercase rounded-full brutal-btn"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
