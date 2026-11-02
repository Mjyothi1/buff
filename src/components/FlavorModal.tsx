import React, { useState } from 'react';
import { Flavor } from '../types';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Star, ShieldCheck, Flame, Zap, Award } from 'lucide-react';

interface FlavorModalProps {
  flavor: Flavor | null;
  onClose: () => void;
}

export const FlavorModal: React.FC<FlavorModalProps> = ({ flavor, onClose }) => {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'nutrition' | 'ingredients' | 'amino-acids' | 'reviews'>('nutrition');

  if (!flavor) return null;

  const handleAdd = () => {
    addItem(flavor, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Strip */}
        <div className="bg-[#121212] text-[#FAF8F5] px-6 py-3.5 flex items-center justify-between border-b-[2.5px] border-[#121212]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D4FF00]"></span>
            <span className="font-space font-extrabold text-xs tracking-wider uppercase text-[#D4FF00]">
              ANABOLIC SPECIFICATION SHEET // {flavor.id}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#121212] flex items-center justify-center font-black hover:bg-[#FF2E93] hover:text-white transition-colors brutal-border"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Hero Banner Section of the Flavor */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden brutal-border relative bg-[#F0EDEC]">
              <img
                src={flavor.image}
                alt={flavor.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 transform -rotate-2">
                <span className="px-2.5 py-1 bg-[#D4FF00] text-[#121212] font-space font-black text-xs uppercase rounded-full brutal-border">
                  {flavor.protein}G PROTEIN
                </span>
              </div>
            </div>

            <div className="md:col-span-7 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#FF2E93] text-white text-[10px] font-space font-bold uppercase rounded-full">
                  {flavor.category.replace('-', ' ')}
                </span>
                <span className="text-xs font-space font-bold text-[#121212]">
                  ★ {flavor.rating} ({flavor.reviewCount} reviews)
                </span>
              </div>

              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#121212] uppercase leading-tight">
                {flavor.name}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#121212]/80">
                {flavor.description}
              </p>

              {/* Price & Primary Add Bar */}
              <div className="flex items-center gap-3 pt-3">
                <div className="flex items-center bg-white brutal-border rounded-full p-1">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-7 h-7 rounded-full bg-[#F0EDEC] hover:bg-[#D4FF00] flex items-center justify-center font-bold"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-space font-bold text-sm">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-7 h-7 rounded-full bg-[#F0EDEC] hover:bg-[#D4FF00] flex items-center justify-center font-bold"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-2.5 px-4 bg-[#D4FF00] text-[#121212] font-space font-black text-xs tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
                >
                  <span>ADD TO PINT BOX (₹{(flavor.price * qty).toFixed(0)})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sub Navigation Tabs inside Modal */}
          <div className="flex border-b-[2px] border-[#121212] gap-2 pt-2">
            {[
              { id: 'nutrition', label: 'NUTRITION FACTS' },
              { id: 'ingredients', label: 'INGREDIENTS & DNA' },
              { id: 'amino-acids', label: 'AMINO ACIDS' },
              { id: 'reviews', label: 'ATHLETE REVIEWS' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 font-space font-bold text-xs uppercase transition-all border-t-2 border-x-2 rounded-t-lg -mb-[2px] ${
                  activeTab === tab.id
                    ? 'bg-[#121212] text-[#D4FF00] border-[#121212]'
                    : 'bg-white text-[#121212] border-transparent hover:bg-[#F0EDEC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Nutrition Facts Label (Brutalist Nutrition Box) */}
          {activeTab === 'nutrition' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Authentic Brutalist Nutrition Label */}
              <div className="md:col-span-7 bg-white brutal-border p-4 rounded-xl font-space">
                <div className="border-b-[8px] border-[#121212] pb-1">
                  <h3 className="font-extrabold text-2xl tracking-tighter">Nutrition Facts</h3>
                  <div className="text-xs font-medium">1 serving per container (1 pint / 473ml)</div>
                  <div className="text-xs font-bold">Serving size: 1 Pint ({flavor.category === 'plant-beast' ? '380g' : '410g'})</div>
                </div>

                <div className="border-b-[4px] border-[#121212] py-2 flex justify-between items-baseline">
                  <div>
                    <span className="text-xs font-bold block">Amount Per Serving</span>
                    <span className="font-syne font-black text-3xl">Calories</span>
                  </div>
                  <span className="font-syne font-black text-4xl">{flavor.calories}</span>
                </div>

                <div className="text-[11px] space-y-1 py-2 border-b-[1px] border-[#121212]">
                  <div className="flex justify-between border-b border-[#121212]/30 py-1">
                    <span className="font-bold">Total Fat <span className="font-normal">{flavor.fat}g</span></span>
                    <span className="font-bold">11%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-3">
                    <span>Saturated Fat 4.5g</span>
                    <span className="font-bold">22%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-3">
                    <span>Trans Fat 0g</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1">
                    <span className="font-bold">Cholesterol <span className="font-normal">35mg</span></span>
                    <span className="font-bold">12%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1">
                    <span className="font-bold">Sodium <span className="font-normal">180mg</span></span>
                    <span className="font-bold">8%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1">
                    <span className="font-bold">Total Carbohydrate <span className="font-normal">{flavor.netCarbs + flavor.fiber}g</span></span>
                    <span className="font-bold">6%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-3">
                    <span>Dietary Fiber {flavor.fiber}g</span>
                    <span className="font-bold">38%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-3">
                    <span>Total Sugars 3g</span>
                    <span></span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-6">
                    <span className="text-[#FF2E93] font-bold">Includes 0g Added Sugars</span>
                    <span className="font-bold text-[#FF2E93]">0%</span>
                  </div>
                  <div className="flex justify-between border-b border-[#121212]/30 py-1 pl-3">
                    <span className="font-bold text-[#2E4CFF]">Allulose (Rare Sugar) 16g</span>
                    <span className="text-xs text-[#2E4CFF]">Zero GI Impact</span>
                  </div>
                  <div className="flex justify-between border-b-[6px] border-[#121212] py-2 bg-[#D4FF00]/40 -mx-4 px-4">
                    <span className="font-syne font-extrabold text-lg text-[#121212]">
                      PROTEIN {flavor.protein}g
                    </span>
                    <span className="font-syne font-extrabold text-lg text-[#121212]">
                      64% DV
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-[#121212]/70 leading-tight">
                  *Percent Daily Values (% RDA) based on ICMR-NIN guidelines for an average adult (2,000 kcal diet). FSSAI Certified Lic No. 10023043000892.
                </div>
              </div>

              {/* Anabolic Highlights Column */}
              <div className="md:col-span-5 space-y-4">
                <div className="bg-[#D4FF00] p-4 brutal-border rounded-xl">
                  <h4 className="font-syne font-extrabold text-lg text-[#121212] uppercase mb-1">
                    NET CARB CALCULATION:
                  </h4>
                  <div className="font-space text-xs space-y-1 text-[#121212]">
                    <div className="flex justify-between">
                      <span>Total Carbs:</span>
                      <span className="font-bold">{flavor.netCarbs + flavor.fiber + 16}g</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>- Dietary Fiber:</span>
                      <span className="font-bold">-{flavor.fiber}g</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>- Allulose (Non-metabolized):</span>
                      <span className="font-bold">-16g</span>
                    </div>
                    <div className="border-t border-[#121212] pt-1 flex justify-between font-bold text-sm">
                      <span>= IMPACT NET CARBS:</span>
                      <span className="bg-[#121212] text-[#D4FF00] px-2 py-0.5 rounded">
                        {flavor.netCarbs}g ONLY
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 brutal-border rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-[#2E4CFF] font-space font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>DIGESTIVE TOLERANCE</span>
                  </div>
                  <p className="text-xs text-[#121212]/80 leading-relaxed">
                    Unlike standard "diet" ice cream that uses maltitol or erythritol causing severe GI bloating, BUFF uses rare allulose + chicory prebiotic root fiber which metabolizes without gastric distress.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 font-sans text-sm">
              <div className="p-4 bg-white brutal-border rounded-xl">
                <h4 className="font-space font-bold text-xs uppercase text-[#121212] mb-3">
                  FULL TRANSPARENT INGREDIENT LIST:
                </h4>
                <ul className="space-y-2">
                  {flavor.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <span className="text-[#D4FF00] bg-[#121212] px-1.5 py-0.5 rounded text-[10px] font-space font-bold">
                        0{i + 1}
                      </span>
                      <span className="text-[#121212] font-medium">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#EDECFF] brutal-border rounded-xl">
                <h4 className="font-space font-bold text-xs uppercase text-[#2E4CFF] mb-1">
                  NO DENATURED WHEY GUARANTEE
                </h4>
                <p className="text-xs text-[#121212]/80">
                  Our cold-churn filtration ensures zero heat damage to sensitive whey microfractions (immunoglobulins and lactoferrin), retaining full bio-availability and silky cream texture.
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Amino Acid Profile */}
          {activeTab === 'amino-acids' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#D4FF00] p-4 brutal-border rounded-xl text-center">
                  <span className="block font-space font-bold text-xs uppercase">TOTAL BCAAS</span>
                  <span className="font-syne font-black text-2xl text-[#121212]">{flavor.aminoAcids.bcaa}</span>
                  <span className="block text-[10px] text-[#121212]/70 mt-1">2:1:1 Optimal Ratio</span>
                </div>
                <div className="bg-[#FAF8F5] p-4 brutal-border rounded-xl text-center">
                  <span className="block font-space font-bold text-xs uppercase">L-LEUCINE</span>
                  <span className="font-syne font-black text-2xl text-[#121212]">{flavor.aminoAcids.leucine}</span>
                  <span className="block text-[10px] text-[#121212]/70 mt-1">mTOR Trigger Threshold</span>
                </div>
                <div className="bg-[#FF2E93] text-white p-4 brutal-border rounded-xl text-center">
                  <span className="block font-space font-bold text-xs uppercase text-white">GLUTAMINE</span>
                  <span className="font-syne font-black text-2xl text-white">{flavor.aminoAcids.glutamine}</span>
                  <span className="block text-[10px] text-white/80 mt-1">Gut & Recovery Matrix</span>
                </div>
              </div>

              <p className="text-xs font-sans text-[#121212]/80 bg-white p-3 brutal-border rounded-lg">
                BUFF delivers a complete amino acid profile with all 9 essential amino acids, making each pint equal to or superior to a premium 30g whey isolate shake.
              </p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-3 font-sans">
              <div className="p-3 bg-[#FAF8F5] brutal-border rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-syne font-extrabold text-xl">4.96 OUT OF 5.0</div>
                  <div className="text-xs text-[#121212]/70 font-space">BASED ON 1,842 VERIFIED ORDERS</div>
                </div>
                <div className="px-3 py-1 bg-[#D4FF00] text-[#121212] font-space font-bold text-xs rounded-full brutal-border">
                  100% ATHLETE APPROVED
                </div>
              </div>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                <div className="p-3 bg-white brutal-border rounded-lg">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-space font-bold text-[#121212]">Marcus R. (Competitive Powerlifter)</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#121212]/80">
                    "I was ready for the usual frozen dry sponge protein ice cream taste. This is completely indistinguishable from high-end artisan fudge gelato. Blew my macro targets away."
                  </p>
                </div>

                <div className="p-3 bg-white brutal-border rounded-lg">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-space font-bold text-[#121212]">Elena K. (CrossFit Coach)</span>
                    <span className="text-amber-500">★★★★★</span>
                  </div>
                  <p className="text-xs text-[#121212]/80">
                    "Zero gastric bloat. Real allulose makes such a difference compared to sugar alcohols. Order arrived packed solid with dry ice."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
