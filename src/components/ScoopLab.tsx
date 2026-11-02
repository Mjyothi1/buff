import React, { useState, useId } from 'react';
import {
  SCOOP_LAB_BASES,
  SCOOP_LAB_SWIRLS,
  SCOOP_LAB_MIXINS,
  LABEL_COLOR_THEMES,
  BaseOption,
  SwirlOption,
  MixinOption
} from '../data/scoopLab';
import { CustomPint } from '../types';
import { useCart } from '../context/CartContext';
import { FlaskConical, Check, Sparkles, Plus, RefreshCw, Zap } from 'lucide-react';

export const ScoopLab: React.FC = () => {
  const { addCustomPint } = useCart();
  const [selectedBase, setSelectedBase] = useState<BaseOption>(SCOOP_LAB_BASES[0]);
  const [selectedSwirl, setSelectedSwirl] = useState<SwirlOption>(SCOOP_LAB_SWIRLS[1]);
  const [selectedMixins, setSelectedMixins] = useState<string[]>([
    SCOOP_LAB_MIXINS[0].id,
    SCOOP_LAB_MIXINS[1].id
  ]);
  const [pintName, setPintName] = useState<string>('MIDNIGHT FUDGE CRUNCH');
  const [selectedLabelColor, setSelectedLabelColor] = useState(LABEL_COLOR_THEMES[0]);

  // Mix-in toggle (max 3)
  const toggleMixin = (mixinId: string) => {
    if (selectedMixins.includes(mixinId)) {
      setSelectedMixins(selectedMixins.filter((id) => id !== mixinId));
    } else {
      if (selectedMixins.length < 3) {
        setSelectedMixins([...selectedMixins, mixinId]);
      }
    }
  };

  // Calculate dynamic macros
  const mixinObjects = SCOOP_LAB_MIXINS.filter((m) =>
    selectedMixins.includes(m.id)
  );

  const totalProtein =
    selectedBase.protein +
    selectedSwirl.protein +
    mixinObjects.reduce((acc, m) => acc + m.protein, 0);

  const totalCalories =
    selectedBase.calories +
    selectedSwirl.calories +
    mixinObjects.reduce((acc, m) => acc + m.calories, 0);

  const totalNetCarbs =
    selectedBase.netCarbs +
    selectedSwirl.netCarbs +
    mixinObjects.reduce((acc, m) => acc + m.netCarbs, 0);

  const totalFat =
    selectedBase.fat +
    selectedSwirl.fat +
    mixinObjects.reduce((acc, m) => acc + m.fat, 0);

  const pintPrice = 449;

  const handleAddCustomPint = () => {
    const customPint: CustomPint = {
      id: `custom-${Date.now()}`,
      name: pintName || 'CUSTOM ANABOLIC PINT',
      baseId: selectedBase.id,
      baseName: selectedBase.name,
      swirlId: selectedSwirl.id,
      swirlName: selectedSwirl.name,
      mixins: mixinObjects.map((m) => m.name),
      labelColor: selectedLabelColor.id,
      protein: Math.round(totalProtein),
      calories: Math.round(totalCalories),
      netCarbs: Math.round(totalNetCarbs),
      fat: Math.round(totalFat),
      price: pintPrice,
      quantity: 1
    };

    addCustomPint(customPint);
  };

  const handleRandomize = () => {
    const randomBase = SCOOP_LAB_BASES[Math.floor(Math.random() * SCOOP_LAB_BASES.length)];
    const randomSwirl = SCOOP_LAB_SWIRLS[Math.floor(Math.random() * SCOOP_LAB_SWIRLS.length)];
    const shuffledMixins = [...SCOOP_LAB_MIXINS].sort(() => 0.5 - Math.random());
    const randomMixins = [shuffledMixins[0].id, shuffledMixins[1].id];
    const randomColor = LABEL_COLOR_THEMES[Math.floor(Math.random() * LABEL_COLOR_THEMES.length)];

    const funNames = [
      'HYPER PROTO-VORTEX',
      'SUPER ANABOLIC BLAST',
      'MIDNIGHT BEAST CHURN',
      'NEON VOLTAGE CRUNCH',
      'GLITCH DULCE MONSTER'
    ];
    const randomName = funNames[Math.floor(Math.random() * funNames.length)];

    setSelectedBase(randomBase);
    setSelectedSwirl(randomSwirl);
    setSelectedMixins(randomMixins);
    setSelectedLabelColor(randomColor);
    setPintName(randomName);
  };

  return (
    <section id="scoop-lab" className="w-full bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 brutal-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF2E93] text-white font-space font-extrabold text-xs uppercase rounded-full brutal-border brutal-shadow-sm mb-3">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>INTERACTIVE CHURN STUDIO</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#121212] uppercase tracking-tight">
            THE SCOOP LAB
          </h2>
          <p className="font-sans text-base text-[#121212]/80 mt-2">
            Build your hyper-custom anabolic pint from scratch. Pick your cold-churned protein base, inject decadent molten swirls, overload with chunky mix-ins, and print your custom packaging.
          </p>

          <div className="mt-4">
            <button
              onClick={handleRandomize}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-[#121212] font-space font-bold text-xs uppercase rounded-full brutal-border hover:bg-[#F0EDEC] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RANDOMIZE FORMULATION</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split: Controls on Left, Live Pint Packaging & Macro Radar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 4-Step Builder Controls */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Base Selection */}
            <div className="bg-white brutal-border brutal-shadow p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#121212]/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4FF00] text-[#121212] font-space font-bold text-xs flex items-center justify-center brutal-border">
                    1
                  </span>
                  <h3 className="font-syne font-extrabold text-lg uppercase text-[#121212]">
                    SELECT HIGH-PROTEIN BASE GELATO
                  </h3>
                </div>
                <span className="text-xs font-space font-bold text-[#121212]/70 uppercase">
                  PICK 1 BASE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCOOP_LAB_BASES.map((base) => {
                  const isSelected = selectedBase.id === base.id;
                  return (
                    <button
                      key={base.id}
                      onClick={() => setSelectedBase(base)}
                      className={`text-left p-3.5 rounded-xl brutal-border transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#121212] text-[#FAF8F5] brutal-shadow-sm scale-[1.01]'
                          : 'bg-[#FAF8F5] text-[#121212] hover:bg-[#F0EDEC]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[10px] font-space font-bold px-2 py-0.5 rounded-full ${
                              isSelected
                                ? 'bg-[#D4FF00] text-[#121212]'
                                : 'bg-[#121212] text-white'
                            }`}
                          >
                            {base.tag}
                          </span>
                          <span className="font-syne font-extrabold text-sm text-[#FF2E93]">
                            +{base.protein}g PRO
                          </span>
                        </div>
                        <h4 className="font-syne font-extrabold text-sm uppercase leading-tight">
                          {base.name}
                        </h4>
                        <p className={`text-[11px] mt-1 ${isSelected ? 'text-white/80' : 'text-[#121212]/70'}`}>
                          {base.subtitle}
                        </p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-current/20 flex items-center justify-between text-[11px] font-space">
                        <span>{base.calories} kcal</span>
                        <span>{base.netCarbs}g Net Carb</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Swirl Injections */}
            <div className="bg-white brutal-border brutal-shadow p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#121212]/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#FF2E93] text-white font-space font-bold text-xs flex items-center justify-center brutal-border">
                    2
                  </span>
                  <h3 className="font-syne font-extrabold text-lg uppercase text-[#121212]">
                    CHOOSE SWIRL INJECTION
                  </h3>
                </div>
                <span className="text-xs font-space font-bold text-[#121212]/70 uppercase">
                  ZERO-SUGAR MOLTEN RIBBONS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SCOOP_LAB_SWIRLS.map((swirl) => {
                  const isSelected = selectedSwirl.id === swirl.id;
                  return (
                    <button
                      key={swirl.id}
                      onClick={() => setSelectedSwirl(swirl)}
                      className={`text-left p-3 rounded-xl brutal-border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#121212] text-[#FAF8F5] brutal-shadow-sm'
                          : 'bg-[#FAF8F5] text-[#121212] hover:bg-[#F0EDEC]'
                      }`}
                    >
                      <div>
                        <h4 className="font-syne font-extrabold text-xs uppercase leading-tight">
                          {swirl.name}
                        </h4>
                        <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#121212]/70'}`}>
                          {swirl.subtitle}
                        </p>
                      </div>
                      <div className="text-right pl-2">
                        <span className={`block font-space font-bold text-xs ${isSelected ? 'text-[#D4FF00]' : 'text-[#2E4CFF]'}`}>
                          +{swirl.protein}g PRO
                        </span>
                        <span className="block text-[10px] opacity-75">
                          {swirl.calories} cal
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Mix-ins */}
            <div className="bg-white brutal-border brutal-shadow p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#121212]/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2E4CFF] text-white font-space font-bold text-xs flex items-center justify-center brutal-border">
                    3
                  </span>
                  <h3 className="font-syne font-extrabold text-lg uppercase text-[#121212]">
                    OVERLOAD CHUNKY MIX-INS
                  </h3>
                </div>
                <span className="text-xs font-space font-bold text-[#FF2E93] uppercase">
                  SELECT UP TO 3 ({selectedMixins.length}/3 SELECTED)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SCOOP_LAB_MIXINS.map((mixin) => {
                  const isSelected = selectedMixins.includes(mixin.id);
                  return (
                    <button
                      key={mixin.id}
                      onClick={() => toggleMixin(mixin.id)}
                      className={`text-left p-3 rounded-xl brutal-border transition-all ${
                        isSelected
                          ? 'bg-[#D4FF00] text-[#121212] brutal-shadow-sm'
                          : 'bg-[#FAF8F5] text-[#121212] hover:bg-[#F0EDEC]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-base mb-1">
                        <span>{mixin.icon}</span>
                        {isSelected && <Check className="w-4 h-4 stroke-[3] text-[#121212]" />}
                      </div>
                      <h4 className="font-syne font-extrabold text-xs uppercase leading-tight">
                        {mixin.name}
                      </h4>
                      <div className="mt-2 text-[10px] font-space font-bold text-[#121212]/80">
                        +{mixin.protein}g Protein • {mixin.calories} cal
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Pint Custom Label & Name */}
            <div className="bg-white brutal-border brutal-shadow p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#121212]/20">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#121212] text-[#D4FF00] font-space font-bold text-xs flex items-center justify-center brutal-border">
                    4
                  </span>
                  <h3 className="font-syne font-extrabold text-lg uppercase text-[#121212]">
                    NAME YOUR PINT & PICK LABEL COLOR
                  </h3>
                </div>
                <span className="text-xs font-space font-bold text-[#121212]/70 uppercase">
                  PRINT PACKAGING
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-space font-bold text-[#121212] uppercase mb-1">
                    CUSTOM PINT TITLE (PRINTED ON CONTAINER):
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={pintName}
                    onChange={(e) => setPintName(e.target.value.toUpperCase())}
                    placeholder="E.G. MIDNIGHT BEAST GAINZ"
                    className="w-full px-4 py-2.5 bg-[#FAF8F5] text-[#121212] font-syne font-extrabold text-base brutal-border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4FF00] uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-space font-bold text-[#121212] uppercase mb-2">
                    SELECT CONTAINER LABEL COLORWAY:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LABEL_COLOR_THEMES.map((theme) => {
                      const isSelected = selectedLabelColor.id === theme.id;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedLabelColor(theme)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-space font-bold brutal-border transition-all flex items-center gap-2 ${
                            isSelected ? 'ring-2 ring-[#121212] scale-105' : 'opacity-85'
                          }`}
                          style={{ backgroundColor: theme.bg, color: theme.text }}
                        >
                          <span className="w-2.5 h-2.5 rounded-full border border-current"></span>
                          <span>{theme.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Pint Container Preview & Macro Summary */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            {/* The Live Interactive Pint Packaging Preview */}
            <div className="bg-white brutal-border brutal-shadow rounded-2xl p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#121212]/20">
                <span className="font-space font-bold text-xs uppercase tracking-wider text-[#121212]">
                  LIVE CONTAINER VISUALIZER
                </span>
                <span className="px-2 py-0.5 bg-[#D4FF00] text-[#121212] font-space font-extrabold text-[10px] rounded-full brutal-border">
                  CUSTOM CHURN
                </span>
              </div>

              {/* 3D-Like Neo-Brutalist Pint Mockup */}
              <div className="relative mx-auto w-64 h-80 rounded-2xl brutal-border overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300"
                style={{
                  backgroundColor: selectedLabelColor.bg,
                  color: selectedLabelColor.text,
                  borderColor: selectedLabelColor.border === '#D4FF00' ? '#D4FF00' : '#121212'
                }}
              >
                {/* Pint Lid Rim */}
                <div className="w-full bg-[#121212] text-[#FAF8F5] py-2 px-3 flex items-center justify-between border-b-[2.5px] border-[#121212]">
                  <span className="text-[10px] font-space font-black uppercase tracking-widest text-[#D4FF00]">
                    ⚡ BUFF LAB // 473 ML
                  </span>
                  <span className="text-[10px] font-space font-bold">
                    ANABOLIC CHURN
                  </span>
                </div>

                {/* Pint Center Graphic Band */}
                <div className="p-4 flex-1 flex flex-col justify-center items-center text-center space-y-2">
                  <div className="px-3 py-1 bg-[#121212] text-[#D4FF00] font-space font-black text-xs uppercase rounded-full brutal-border transform -rotate-3">
                    🔥 {totalProtein}G TOTAL PROTEIN
                  </div>

                  <h3 className="font-syne font-extrabold text-2xl uppercase tracking-tighter leading-tight max-w-[200px]">
                    {pintName || 'UNTITLED PINT'}
                  </h3>

                  <div className="text-[10px] font-space font-bold opacity-90 uppercase">
                    BASE: {selectedBase.name}
                  </div>

                  <div className="text-[10px] font-space opacity-80 uppercase">
                    SWIRL: {selectedSwirl.name}
                  </div>

                  {mixinObjects.length > 0 && (
                    <div className="text-[9px] font-space font-semibold bg-black/10 px-2 py-1 rounded">
                      CHUNKS: {mixinObjects.map((m) => m.name.split(' ')[0]).join(', ')}
                    </div>
                  )}
                </div>

                {/* Bottom Bar of Pint */}
                <div className="bg-[#121212] text-[#FAF8F5] py-2 px-3 text-center border-t-[2.5px] border-[#121212] text-[10px] font-space font-bold">
                  COLD-CHURNED WHEY MATRIX • 0G ADDED SUGAR
                </div>
              </div>

              {/* Recalculated Dynamic Macro Dashboard */}
              <div className="mt-6 pt-4 border-t border-[#121212]/20">
                <span className="block font-space font-bold text-xs uppercase text-[#121212] mb-3">
                  FORMULATION MACRO RADAR:
                </span>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-[#D4FF00] brutal-border p-2 rounded-lg min-w-0">
                    <span className="block text-[9px] font-space font-bold text-[#121212] uppercase mb-1">
                      PROTEIN
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl text-[#121212] leading-none whitespace-nowrap">
                      {totalProtein}g
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] brutal-border p-2 rounded-lg min-w-0">
                    <span className="block text-[9px] font-space font-bold text-[#121212] uppercase mb-1">
                      CALORIES
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl text-[#121212] leading-none whitespace-nowrap">
                      {totalCalories}
                    </span>
                  </div>

                  <div className="bg-[#FAF8F5] brutal-border p-2 rounded-lg min-w-0">
                    <span className="block text-[9px] font-space font-bold text-[#121212] uppercase mb-1">
                      NET CARBS
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl text-[#121212] leading-none whitespace-nowrap">
                      {totalNetCarbs}g
                    </span>
                  </div>

                  <div className="bg-[#FF2E93] text-white brutal-border p-2 rounded-lg min-w-0">
                    <span className="block text-[9px] font-space font-bold text-white uppercase mb-1">
                      FAT
                    </span>
                    <span className="block font-space font-black text-xl sm:text-2xl text-white leading-none whitespace-nowrap">
                      {totalFat}g
                    </span>
                  </div>
                </div>

                {/* Macro Progress Bar vs Standard Shake */}
                <div className="mt-4 p-3 bg-[#F6F3F2] brutal-border rounded-xl">
                  <div className="flex justify-between text-xs font-space font-bold mb-1">
                    <span>ANABOLIC DENSITY SCORE</span>
                    <span className="text-[#2E4CFF]">98/100 (ELITE)</span>
                  </div>
                  <div className="w-full h-3 bg-white brutal-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4FF00] via-[#FF2E93] to-[#2E4CFF]"
                      style={{ width: `${Math.min(100, (totalProtein / 35) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="block text-[10px] text-[#121212]/70 font-sans mt-1">
                    Surpasses 1 serving of isolate shake while tasting like handcrafted Italian gelato.
                  </span>
                </div>

                {/* Action CTA: Add Custom Pint to Cart */}
                <div className="mt-5 space-y-2">
                  <button
                    onClick={handleAddCustomPint}
                    className="w-full py-4 px-6 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 fill-[#121212]" />
                    <span>CHURN & ADD CUSTOM PINT (₹{pintPrice})</span>
                  </button>
                  <p className="text-center text-[11px] font-space font-bold text-[#121212]/70 uppercase">
                    FLASH FROZEN TO -30°F • SHIPS IN DRY-ICE COOLER
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
