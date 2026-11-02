import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Zap, Activity, Flame, Check, X, ArrowRight } from 'lucide-react';

interface TheScienceProps {
  onExploreFlavors: () => void;
}

export const TheScience: React.FC<TheScienceProps> = ({ onExploreFlavors }) => {
  const [targetWeight, setTargetWeight] = useState(175);
  const [proteinGoalMultiplier, setProteinGoalMultiplier] = useState(1.0); // grams per lb

  const dailyProteinTarget = Math.round(targetWeight * proteinGoalMultiplier);
  const pintsNeeded = (dailyProteinTarget / 30).toFixed(1);
  const scoopsNeeded = (dailyProteinTarget / 15).toFixed(1);

  const comparisonRows = [
    {
      metric: 'PROTEIN PER PINT',
      buff: '28g – 34g (Clean Isolate)',
      supermarket: '6g – 8g (Traces only)',
      dietTubs: '20g (Low-grade concentrate)'
    },
    {
      metric: 'ADDED REFINED SUGAR',
      buff: '0g (Rare Allulose & Monkfruit)',
      supermarket: '75g – 96g (High Fructose/Cane)',
      dietTubs: '12g – 24g (Sugar alcohol blend)'
    },
    {
      metric: 'TEXTURAL CHALKINESS',
      buff: '0% (Micro-milled cold churn)',
      supermarket: '0% (Masked by 40g butterfat)',
      dietTubs: 'High (Icy, dry, crumbly sponge)'
    },
    {
      metric: 'DIGESTIVE BLOAT INDEX',
      buff: 'ZERO (Prebiotic fiber matrix)',
      supermarket: 'High (Lactose + heavy sugar spike)',
      dietTubs: 'Severe (Erythritol/Maltitol distress)'
    },
    {
      metric: 'OVERRUN (AIR CONTENT)',
      buff: '40% (Dense Italian Gelato)',
      supermarket: '50% (Standard ice cream)',
      dietTubs: '110% (Whipped foam filler)'
    },
    {
      metric: 'mTOR ACTIVATION (LEUCINE)',
      buff: '3.6g+ (Exceeds anabolic threshold)',
      supermarket: '<0.5g (Negligible)',
      dietTubs: '1.4g (Sub-optimal)'
    }
  ];

  const pillars = [
    {
      number: '01',
      title: 'CROSS-FLOW COLD ISOLATE',
      color: '#D4FF00',
      description: 'Unlike commercial whey dried under brutal heat towers that scramble amino chains into chalk, our whey is micro-filtered at 38°F. The protein chains remain native and silky.'
    },
    {
      number: '02',
      title: 'ALLULOSE RARE-SUGAR MATRIX',
      color: '#FF2E93',
      description: 'Found naturally in figs and maple syrup, allulose mirrors real sugar’s freezing-point depression and caramelization, but is excreted without metabolizing into glucose. 0 glycemic spikes.'
    },
    {
      number: '03',
      title: 'DENSE 40% ITALIAN OVERRUN',
      color: '#2E4CFF',
      description: 'Commercial "low cal" brands pump pints with 100%+ air so you’re eating frozen gas. We churn with ultra-low overrun, delivering real heft, slow melting, and thick mouthfeel.'
    },
    {
      number: '04',
      title: 'PREBIOTIC FLUID DYNAMICS',
      color: '#FAF8F5',
      description: 'Chicory root inulin and acacia gum hold water molecules tightly during freezing, eliminating ice crystal crunch and feeding beneficial gut flora.'
    }
  ];

  return (
    <section id="science" className="w-full bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 brutal-border-t">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#2E4CFF] text-white font-space font-extrabold text-xs uppercase rounded-full brutal-border brutal-shadow-sm mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>MOLECULAR REVOLUTION IN ICE CREAM</span>
          </div>
          <h2 className="font-syne font-extrabold text-4xl sm:text-6xl text-[#121212] uppercase tracking-tight">
            THE ANABOLIC CHURN
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#121212]/80 mt-2">
            Why does BUFF taste like a premium ₹500 European artisan bakery gelato while packing more clean protein than a chicken breast? It’s not magic—it’s food science without compromise.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white brutal-border brutal-shadow p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl brutal-border flex items-center justify-center font-syne font-black text-xl mb-4"
                  style={{ backgroundColor: pillar.color, color: pillar.color === '#2E4CFF' || pillar.color === '#FF2E93' ? '#FFF' : '#121212' }}
                >
                  {pillar.number}
                </div>
                <h3 className="font-syne font-extrabold text-xl uppercase tracking-tight text-[#121212] mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#121212]/80 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#121212]/20 flex items-center justify-between text-[11px] font-space font-bold uppercase text-[#121212]/60">
                <span>LAB TESTED</span>
                <span>FSSAI & ISO-22000</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brutalist Comparison Table */}
        <div className="bg-white brutal-border brutal-shadow rounded-2xl overflow-hidden mb-16">
          <div className="bg-[#121212] text-white p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-space font-bold text-xs text-[#D4FF00] uppercase tracking-widest">
                HEAD-TO-HEAD SPECIFICATION MATRIX
              </span>
              <h3 className="font-syne font-extrabold text-2xl uppercase">
                BUFF VS TRADITIONAL BRANDS IN INDIA
              </h3>
            </div>
            <span className="px-3 py-1 bg-[#D4FF00] text-[#121212] text-xs font-space font-bold rounded-full brutal-border">
              TESTED OCT 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-space text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-[2.5px] border-[#121212] bg-[#FAF8F5]">
                  <th className="p-4 font-black uppercase text-[#121212]">METRIC SPEC</th>
                  <th className="p-4 font-black uppercase bg-[#D4FF00] text-[#121212] border-x-[2.5px] border-[#121212]">
                    ⚡ BUFF ICE CREAM
                  </th>
                  <th className="p-4 font-black uppercase text-[#121212]">
                    COMMERCIAL PINTS (BASKIN / AMUL / NATURALS)
                  </th>
                  <th className="p-4 font-black uppercase text-[#121212]">
                    CONVENTIONAL "DIET" TUBS
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-[#121212]/20 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'
                    }`}
                  >
                    <td className="p-4 font-bold text-[#121212] uppercase">
                      {row.metric}
                    </td>
                    <td className="p-4 font-extrabold bg-[#D4FF00]/25 text-[#121212] border-x-[2.5px] border-[#121212] flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3]" />
                      <span>{row.buff}</span>
                    </td>
                    <td className="p-4 text-[#121212]/80">
                      {row.supermarket}
                    </td>
                    <td className="p-4 text-[#121212]/80">
                      {row.dietTubs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Anabolic Goal Calculator */}
        <div className="bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2E93] text-white font-space font-bold text-xs uppercase rounded-full brutal-border">
                ⚡ MACRO OPTIMIZER
              </div>
              <h3 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase text-[#121212]">
                HOW MUCH ANABOLIC ICE CREAM DOES YOUR PHYSIQUE NEED?
              </h3>
              <p className="font-sans text-sm text-[#121212]/80">
                Adjust your bodyweight and intensity multiplier to calculate your daily target and see how swapping a bland liquid whey shake for a BUFF pint hits your goals with pure dopamine.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-space font-bold uppercase text-[#121212] mb-1">
                    BODYWEIGHT: <strong className="text-base text-[#2E4CFF]">{Math.round(targetWeight * 0.453592)} KG ({targetWeight} LBS)</strong>
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="280"
                    step="5"
                    value={targetWeight}
                    onChange={(e) => setTargetWeight(Number(e.target.value))}
                    className="w-full accent-[#2E4CFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-space font-bold uppercase text-[#121212] mb-1">
                    TRAINING INTENSITY:
                  </label>
                  <select
                    value={proteinGoalMultiplier}
                    onChange={(e) => setProteinGoalMultiplier(Number(e.target.value))}
                    className="w-full p-2 bg-white brutal-border rounded-lg text-xs font-space font-bold cursor-pointer"
                  >
                    <option value={0.8}>Active Lifestyle (0.8g / lb)</option>
                    <option value={1.0}>Hypertrophy / Lifting (1.0g / lb)</option>
                    <option value={1.2}>Peak Competition Cut (1.2g / lb)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Result Box */}
            <div className="lg:col-span-5 bg-white brutal-border brutal-shadow-lg p-6 rounded-2xl text-center space-y-4">
              <span className="font-space font-bold text-xs uppercase tracking-wider text-[#121212]/70">
                DAILY ANABOLIC TARGET
              </span>
              <div className="font-syne font-black text-5xl sm:text-6xl text-[#121212]">
                {dailyProteinTarget}g
              </div>
              <div className="text-xs font-space font-semibold text-[#121212]/80 uppercase">
                OF BIOAVAILABLE COMPLETE PROTEIN
              </div>

              <div className="p-3 bg-[#D4FF00] brutal-border rounded-xl text-left space-y-1 font-space text-xs">
                <div className="flex justify-between">
                  <span>1 Pint of Midnight Brownie:</span>
                  <span className="font-bold">32g ({(32 / dailyProteinTarget * 100).toFixed(0)}% of goal)</span>
                </div>
                <div className="flex justify-between text-[#121212]/80">
                  <span>Sugar Crash Risk:</span>
                  <span className="font-bold text-emerald-800">0.0%</span>
                </div>
              </div>

              <button
                onClick={onExploreFlavors}
                className="w-full py-3 bg-[#121212] text-[#D4FF00] font-space font-black text-xs tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
              >
                <span>STOCK YOUR FREEZER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
