import React, { useState } from 'react';
import { MERCH_DATA } from '../data/locations';
import { useCart } from '../context/CartContext';
import { Sparkles, Check, Zap, Plus, Gift, ShieldAlert } from 'lucide-react';

export const MerchSection: React.FC = () => {
  const { addMerchItem } = useCart();
  const [subscribed, setSubscribed] = useState(false);

  return (
    <section id="merch" className="w-full bg-[#FAF8F5] py-16 px-4 sm:px-6 lg:px-8 brutal-border-t">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Anabolic Pint Club Membership Banner */}
        <div className="bg-[#121212] text-[#FAF8F5] brutal-border brutal-shadow rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Neon Glow accents */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4FF00]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4FF00] text-[#121212] font-space font-extrabold text-xs uppercase rounded-full brutal-border">
                ⚡ EXCLUSIVE MEMBERSHIP
              </div>
              <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight">
                JOIN THE BUFF PINT CLUB
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#FAF8F5]/80 max-w-xl">
                Never run out of pure dopamine fuel. Get a recurring monthly vault drop of 6 pints (including 2 unreleased secret lab tests), complimentary dry-ice overnight priority shipping, and VIP club pricing.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-space">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4FF00] stroke-[3]" />
                  <span>2 Secret Lab Flavors every month</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4FF00] stroke-[3]" />
                  <span>Free sub-zero dry ice shipping always</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4FF00] stroke-[3]" />
                  <span>Free Anodized Heavyweight Scoop (₹999 value)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#D4FF00] stroke-[3]" />
                  <span>Pause, adjust or cancel anytime in 1 click</span>
                </div>
              </div>
            </div>

            {/* Club Pricing & Subscribe Action Box */}
            <div className="lg:col-span-5 bg-[#FAF8F5] text-[#121212] brutal-border brutal-shadow-lg p-6 sm:p-8 rounded-2xl text-center space-y-4">
              <span className="font-space font-extrabold text-xs text-[#FF2E93] uppercase tracking-wider block">
                MONTHLY RECURRING VAULT DROP
              </span>

              <div className="flex items-baseline justify-center gap-2">
                <span className="font-syne font-black text-5xl text-[#121212]">₹1,699</span>
                <span className="text-sm font-space font-bold text-[#121212]/70">/ MONTH</span>
              </div>
              <div className="text-xs font-space font-semibold text-[#121212]/80">
                (Saves ₹575 vs single retail pints)
              </div>

              {subscribed ? (
                <div className="p-4 bg-[#D4FF00] brutal-border rounded-xl">
                  <span className="font-syne font-extrabold text-base block text-[#121212]">
                    WELCOME TO THE CLUB! 🎉
                  </span>
                  <span className="text-xs font-sans text-[#121212]/80 mt-1 block">
                    Your first Anabolic Vault box ships tomorrow in dry ice.
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setSubscribed(true)}
                  className="w-full py-4 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>JOIN CLUB (₹1,699 / MO)</span>
                </button>
              )}

              <p className="text-[11px] font-space text-[#121212]/60">
                No contracts. Skip any month with zero fee.
              </p>
            </div>
          </div>
        </div>

        {/* Limited Edition Neo-Brutalist Hardware & Apparel */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 brutal-border-b gap-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF2E93] text-white font-space font-bold text-xs uppercase rounded-full brutal-border mb-2">
                ⚡ GEAR & ACCESSORIES
              </div>
              <h3 className="font-syne font-extrabold text-3xl sm:text-4xl uppercase text-[#121212]">
                BRUTALIST HARDWARE & APPAREL
              </h3>
            </div>
            <span className="text-xs font-space font-bold text-[#121212]/70 uppercase">
              ENGINEERED FOR SUB-ZERO INDULGENCE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MERCH_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white brutal-border brutal-card rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square bg-[#F0EDEC] relative overflow-hidden brutal-border-b">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {item.badge && (
                      <div className="absolute top-3 left-3 transform -rotate-2">
                        <span className="px-2.5 py-1 bg-[#D4FF00] text-[#121212] font-space font-black text-[10px] uppercase rounded-full brutal-border">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-black text-lg text-[#121212]">
                        ₹{item.price}
                      </span>
                    </div>
                    <h4 className="font-syne font-extrabold text-sm uppercase text-[#121212] leading-tight">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs text-[#121212]/70">
                      {item.tagline}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => addMerchItem(item)}
                    className="w-full py-2.5 bg-[#FAF8F5] text-[#121212] font-space font-bold text-xs uppercase tracking-wider rounded-full brutal-btn flex items-center justify-center gap-1.5 hover:bg-[#D4FF00]"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
