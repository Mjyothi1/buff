import React, { useState } from 'react';
import { FLAVORS_DATA } from '../data/flavors';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Star, Award, ShieldCheck, Flame, ArrowRight } from 'lucide-react';

interface HeroProps {
  onExploreFlavors: () => void;
  onOpenScoopLab: () => void;
  onSelectFlavor: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreFlavors,
  onOpenScoopLab,
  onSelectFlavor
}) => {
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const { addItem } = useCart();
  const heroFlavors = FLAVORS_DATA.slice(0, 4);
  const currentFlavor = heroFlavors[selectedHeroIndex];

  return (
    <section className="relative w-full bg-[#FAF8F5] pt-6 sm:pt-10 pb-16 overflow-hidden">
      {/* Background kinetic decorative grid marks */}
      <div className="absolute inset-0 bg-[radial-gradient(#121212_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>

      {/* Floating Jaunty Brutalist Stickers across the hero canvas */}
      <div className="hidden xl:block absolute top-8 left-12 transform -rotate-6 z-10 pointer-events-none">
        <div className="px-4 py-2 bg-[#D4FF00] text-[#121212] font-space font-extrabold text-xs tracking-wider rounded-full brutal-border brutal-shadow">
          💥 0% CHALK • 100% DOPAMINE
        </div>
      </div>
      <div className="hidden xl:block absolute top-12 right-16 transform rotate-3 z-10 pointer-events-none">
        <div className="px-4 py-2 bg-[#FF2E93] text-white font-space font-extrabold text-xs tracking-wider rounded-full brutal-border brutal-shadow">
          🔥 CLINICALLY DENSE GELATO MATRIX
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Poster Top Kicker */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5] text-[#121212] font-space font-bold text-xs tracking-wider uppercase rounded-full brutal-border brutal-shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] brutal-border"></span>
            <span>NEXT-GEN ANABOLIC CONFECTIONERY</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#2E4CFF] text-[#FAF8F5] font-space font-bold text-xs tracking-wider rounded-full brutal-border brutal-shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#D4FF00] text-[#D4FF00]" />
            <span>4.96/5 RATED BY 12,000+ ATHLETES</span>
          </div>
        </div>

        {/* Hero Mega Typography Title */}
        <div className="text-center max-w-5xl mx-auto mb-8 px-2 sm:px-4">
          <h1 className="font-syne font-black text-[#121212] uppercase tracking-tight text-center leading-[1.05] sm:leading-[0.95] mb-5">
            <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="inline-block tracking-tight">UNAPOLOGETIC</span>
              <span className="bg-[#D4FF00] px-2.5 sm:px-4 py-0.5 sm:py-1 inline-block brutal-border brutal-shadow transform -rotate-1 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                PROTEIN.
              </span>
            </span>
            <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 sm:mt-4">
              <span className="inline-block tracking-tight">ULTRA-ANABOLIC</span>
              <span className="inline-block text-[#FF2E93] underline decoration-[#121212] decoration-[3px] sm:decoration-[5px] underline-offset-4 sm:underline-offset-8">
                INDULGENCE.
              </span>
            </span>
          </h1>
          <p className="font-sans font-medium text-base sm:text-xl text-[#121212]/80 max-w-3xl mx-auto leading-relaxed">
            Forget dry whey chalk and iced diet foam. We cold-churn 100% micro-filtered grass-fed whey isolate with slow-simmered fudge, allulose nectar, and dense artisan swirls. <strong>28g–34g pure protein per pint. Zero sugar crash. Pure kinetic joy.</strong>
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            <button
              onClick={onExploreFlavors}
              className="px-7 py-4 bg-[#D4FF00] text-[#121212] font-space font-black text-sm sm:text-base tracking-wider uppercase rounded-full brutal-btn flex items-center gap-2.5 group"
            >
              <span>EXPLORE THE FLAVORS</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenScoopLab}
              className="px-7 py-4 bg-[#FF2E93] text-white font-space font-black text-sm sm:text-base tracking-wider uppercase rounded-full brutal-btn flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4FF00]" />
              <span>CUSTOMIZE IN SCOOP LAB</span>
            </button>
          </div>
        </div>

        {/* Interactive Hero Product Stage (Centerpiece) */}
        <div className="mt-8 lg:mt-12">
          <div className="relative bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl overflow-hidden p-6 sm:p-10">
            {/* Top Bar of the Container */}
            <div className="flex flex-wrap items-center justify-between pb-6 mb-6 brutal-border-b gap-4">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-[#FF2E93] brutal-border"></span>
                <span className="w-4 h-4 rounded-full bg-[#D4FF00] brutal-border"></span>
                <span className="w-4 h-4 rounded-full bg-[#2E4CFF] brutal-border"></span>
                <span className="font-space font-extrabold text-xs tracking-widest text-[#121212] uppercase ml-2">
                  FEATURED VAULT DROP // BATCH #2026-X
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#2E4CFF] text-white font-space font-bold text-xs rounded-full brutal-border">
                  FAST DRY-ICE FULFILLMENT
                </span>
              </div>
            </div>

            {/* Split Grid: Left Showcase Details, Right High-Impact Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Product Info & Live Nutrients */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 font-space font-extrabold text-xs uppercase rounded-full brutal-border"
                      style={{
                        backgroundColor: currentFlavor.badgeColor || '#D4FF00',
                        color: currentFlavor.badgeColor === '#2E4CFF' || currentFlavor.badgeColor === '#FF2E93' ? '#FFF' : '#121212'
                      }}
                    >
                      {currentFlavor.tag || 'FLAGSHIP PINT'}
                    </span>
                    <span className="font-space font-bold text-xs text-[#121212]/70">
                      ★ {currentFlavor.rating} ({currentFlavor.reviewCount} verified reviews)
                    </span>
                  </div>

                  <h2 className="font-syne font-extrabold text-3xl sm:text-4xl text-[#121212] tracking-tight leading-tight uppercase">
                    {currentFlavor.name}
                  </h2>
                  <p className="font-sans text-sm sm:text-base text-[#121212]/80 mt-2">
                    {currentFlavor.subtitle}
                  </p>
                </div>

                {/* Macro Nutrient Card Blocks - 4 Grid Neo-Brutalist Callout */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <div className="bg-[#D4FF00] brutal-border brutal-shadow-sm p-2.5 sm:p-3 rounded-lg text-center min-w-0">
                    <span className="block font-space font-bold text-[9px] sm:text-[10px] tracking-wider text-[#121212] uppercase mb-1">
                      PROTEIN
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl md:text-3xl text-[#121212] leading-none whitespace-nowrap">
                      {currentFlavor.protein}g
                    </span>
                  </div>
                  <div className="bg-[#FAF8F5] brutal-border brutal-shadow-sm p-2.5 sm:p-3 rounded-lg text-center min-w-0">
                    <span className="block font-space font-bold text-[9px] sm:text-[10px] tracking-wider text-[#121212] uppercase mb-1">
                      CALORIES
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl md:text-3xl text-[#121212] leading-none whitespace-nowrap">
                      {currentFlavor.calories}
                    </span>
                  </div>
                  <div className="bg-[#FAF8F5] brutal-border brutal-shadow-sm p-2.5 sm:p-3 rounded-lg text-center min-w-0">
                    <span className="block font-space font-bold text-[9px] sm:text-[10px] tracking-wider text-[#121212] uppercase mb-1">
                      NET CARBS
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl md:text-3xl text-[#121212] leading-none whitespace-nowrap">
                      {currentFlavor.netCarbs}g
                    </span>
                  </div>
                  <div className="bg-[#FF2E93] text-white brutal-border brutal-shadow-sm p-2.5 sm:p-3 rounded-lg text-center min-w-0">
                    <span className="block font-space font-bold text-[9px] sm:text-[10px] tracking-wider text-white uppercase mb-1">
                      ADDED SUGAR
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl md:text-3xl text-white leading-none whitespace-nowrap">
                      0g
                    </span>
                  </div>
                </div>

                {/* Key Tasting Notes Tags */}
                <div>
                  <span className="block font-space font-bold text-xs uppercase text-[#121212] mb-2 tracking-wider">
                    FLAVOR ARCHITECTURE & INGREDIENT DNA:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentFlavor.tastingNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white brutal-border text-xs font-space font-semibold rounded-full"
                      >
                        ⚡ {note}
                      </span>
                    ))}
                    <span className="px-3 py-1 bg-[#EDECFF] text-[#2E4CFF] brutal-border text-xs font-space font-bold rounded-full">
                      BCAA: {currentFlavor.aminoAcids.bcaa}
                    </span>
                  </div>
                </div>

                {/* Primary Buy / Quick Add Controls */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => addItem(currentFlavor, 1)}
                    className="flex-1 py-3.5 px-6 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>ADD TO PINT BOX (₹{currentFlavor.price})</span>
                  </button>

                  <button
                    onClick={() => onSelectFlavor(currentFlavor.id)}
                    className="py-3.5 px-5 bg-white text-[#121212] font-space font-bold text-sm tracking-wider uppercase rounded-full brutal-btn hover:bg-[#F0EDEC]"
                  >
                    FULL MACROS & SPECS
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Graphic Presentation with Stickers */}
              <div className="lg:col-span-6 relative flex flex-col items-center justify-center">
                <div className="relative w-full max-w-md aspect-square bg-[#F0EDEC] brutal-border brutal-shadow rounded-2xl overflow-hidden group">
                  <img
                    src={currentFlavor.image}
                    alt={currentFlavor.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* High protein rotated badge */}
                  <div className="absolute top-4 left-4 transform -rotate-3 z-10">
                    <div className="px-3 py-1.5 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider rounded-full brutal-border brutal-shadow-sm">
                      ⚡ {currentFlavor.protein}G PROTEIN MATRIX
                    </div>
                  </div>

                  {/* Zero Sugar badge */}
                  <div className="absolute bottom-4 right-4 transform rotate-2 z-10">
                    <div className="px-3 py-1.5 bg-[#FF2E93] text-white font-space font-black text-xs tracking-wider rounded-full brutal-border brutal-shadow-sm">
                      PURE ALLULOSE SWEETENED
                    </div>
                  </div>
                </div>

                {/* Quick flavor switcher strip beneath the image */}
                <div className="mt-5 w-full flex items-center justify-center gap-2">
                  {heroFlavors.map((flavor, index) => {
                    const isSelected = index === selectedHeroIndex;
                    return (
                      <button
                        key={flavor.id}
                        onClick={() => setSelectedHeroIndex(index)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-space font-bold rounded-lg transition-all ${
                          isSelected
                            ? 'bg-[#121212] text-[#D4FF00] brutal-shadow-sm scale-105'
                            : 'bg-white text-[#121212] brutal-border hover:bg-[#F0EDEC]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full brutal-border"
                          style={{ backgroundColor: flavor.secondaryColorHex }}
                        ></span>
                        <span className="hidden sm:inline">{flavor.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Feature Proof Pills below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
          <div className="bg-white p-3.5 brutal-border brutal-shadow-sm rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#D4FF00] brutal-border flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <div>
              <span className="block font-space font-bold text-xs uppercase text-[#121212]">
                100% WHEY ISOLATE
              </span>
              <span className="block text-[11px] text-[#121212]/70 font-sans">
                Cross-flow cold microfiltered
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 brutal-border brutal-shadow-sm rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF2E93] text-white brutal-border flex items-center justify-center font-bold text-lg">
              🍧
            </div>
            <div>
              <span className="block font-space font-bold text-xs uppercase text-[#121212]">
                0G ADDED SUGAR
              </span>
              <span className="block text-[11px] text-[#121212]/70 font-sans">
                Naturally sweetened allulose
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 brutal-border brutal-shadow-sm rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#2E4CFF] text-white brutal-border flex items-center justify-center font-bold text-lg">
              ❄️
            </div>
            <div>
              <span className="block font-space font-bold text-xs uppercase text-[#121212]">
                DRY ICE OVERNIGHT
              </span>
              <span className="block text-[11px] text-[#121212]/70 font-sans">
                Arrives sub-zero guaranteed
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 brutal-border brutal-shadow-sm rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] brutal-border flex items-center justify-center font-bold text-lg">
              🧪
            </div>
            <div>
              <span className="block font-space font-bold text-xs uppercase text-[#121212]">
                ZERO CHALK TEXTURE
              </span>
              <span className="block text-[11px] text-[#121212]/70 font-sans">
                True gelato overrun & silkiness
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy Confectionery Dripping SVG Divider */}
      <div className="w-full mt-12 overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="relative block w-full h-8 text-[#121212] fill-current"
        >
          <path d="M0,0 C150,55 350,-25 500,30 C650,85 850,-10 1000,40 C1100,70 1150,20 1200,35 L1200,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
};
