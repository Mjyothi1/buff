import React, { useState } from 'react';
import { FLAVORS_DATA, BUNDLE_OPTIONS } from '../data/flavors';
import { useCart } from '../context/CartContext';
import { Flavor } from '../types';
import { X, Check, Sparkles, Plus, Trash2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BoxBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoxBuilderModal: React.FC<BoxBuilderModalProps> = ({ isOpen, onClose }) => {
  const { addItem, setIsOpen } = useCart();
  const [selectedSize, setSelectedSize] = useState<number>(6);
  const [selectedPints, setSelectedPints] = useState<Flavor[]>(() => [
    FLAVORS_DATA[0],
    FLAVORS_DATA[0],
    FLAVORS_DATA[1],
    FLAVORS_DATA[2],
    FLAVORS_DATA[3],
    FLAVORS_DATA[4]
  ]);

  if (!isOpen) return null;

  const currentBundle = BUNDLE_OPTIONS.find((b) => b.size === selectedSize) || BUNDLE_OPTIONS[1];

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    if (selectedPints.length > newSize) {
      setSelectedPints(selectedPints.slice(0, newSize));
    } else {
      const needed = newSize - selectedPints.length;
      const fillers: Flavor[] = [];
      for (let i = 0; i < needed; i++) {
        fillers.push(FLAVORS_DATA[i % FLAVORS_DATA.length]);
      }
      setSelectedPints([...selectedPints, ...fillers]);
    }
  };

  const addFlavorToSlot = (flavor: Flavor) => {
    if (selectedPints.length < selectedSize) {
      setSelectedPints([...selectedPints, flavor]);
    }
  };

  const removePintAtIndex = (index: number) => {
    setSelectedPints(selectedPints.filter((_, i) => i !== index));
  };

  const fillBestSellers = () => {
    const besties: Flavor[] = [];
    for (let i = 0; i < selectedSize; i++) {
      besties.push(FLAVORS_DATA[i % 4]);
    }
    setSelectedPints(besties);
  };

  const handleAddBundleToCart = () => {
    // Add all pints in the bundle to cart
    selectedPints.forEach((p) => addItem(p, 1));
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch {}
    onClose();
    setIsOpen(true);
  };

  const totalBundleProtein = selectedPints.reduce((acc, p) => acc + p.protein, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#121212] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b-[2.5px] border-[#121212]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D4FF00]"></span>
            <span className="font-space font-extrabold text-sm tracking-wider uppercase text-[#D4FF00]">
              ANABOLIC BOX ARCHITECT // BUNDLE BUILDER
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#121212] flex items-center justify-center font-black hover:bg-[#FF2E93] hover:text-white transition-colors brutal-border"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Step 1: Select Bundle Tier */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-space font-bold text-xs uppercase text-[#121212]">
                STEP 1: SELECT BUNDLE SIZE
              </span>
              <span className="text-xs font-space font-bold text-[#FF2E93]">
                INCLUDES FREE SUB-ZERO DRY ICE SHIPPING
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {BUNDLE_OPTIONS.map((bundle) => {
                const isSelected = selectedSize === bundle.size;
                return (
                  <button
                    key={bundle.size}
                    onClick={() => handleSizeChange(bundle.size)}
                    className={`p-4 rounded-xl brutal-border text-left transition-all relative ${
                      isSelected
                        ? 'bg-[#121212] text-white brutal-shadow-sm scale-[1.02]'
                        : 'bg-white text-[#121212] hover:bg-[#F0EDEC]'
                    }`}
                  >
                    {bundle.badge && (
                      <span
                        className={`text-[9px] font-space font-extrabold px-2 py-0.5 rounded-full inline-block mb-2 brutal-border ${
                          isSelected ? 'bg-[#D4FF00] text-[#121212]' : 'bg-[#FF2E93] text-white'
                        }`}
                      >
                        {bundle.badge}
                      </span>
                    )}
                    <h4 className="font-syne font-extrabold text-lg uppercase leading-tight">
                      {bundle.title}
                    </h4>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-syne font-black text-2xl text-[#D4FF00]">
                        ₹{bundle.price}
                      </span>
                      <span className={`text-xs font-space ${isSelected ? 'text-white/70' : 'text-[#121212]/70'}`}>
                        (₹{bundle.perPint.toFixed(0)}/pint)
                      </span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-current/20 text-[11px] font-space space-y-1">
                      {bundle.perks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#D4FF00]" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Slot Tray (Visual Container of Pints in the Box) */}
          <div className="bg-white brutal-border p-5 rounded-2xl">
            <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
              <div>
                <span className="font-space font-bold text-xs uppercase text-[#121212] block">
                  YOUR CUSTOM {selectedSize}-PACK SLOTS ({selectedPints.length}/{selectedSize})
                </span>
                <span className="text-xs font-space text-[#121212]/70">
                  Total Box Protein: <strong className="text-[#2E4CFF]">{totalBundleProtein}g</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={fillBestSellers}
                  className="px-3 py-1 bg-[#D4FF00] text-[#121212] text-xs font-space font-bold rounded-full brutal-border hover:bg-[#c5ec00]"
                >
                  ⚡ AUTO-FILL TOP SELLERS
                </button>
                {selectedPints.length > 0 && (
                  <button
                    onClick={() => setSelectedPints([])}
                    className="px-3 py-1 bg-white text-[#121212] text-xs font-space font-bold rounded-full border border-[#121212] hover:bg-[#F0EDEC]"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {Array.from({ length: selectedSize }).map((_, idx) => {
                const pint = selectedPints[idx];
                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-xl brutal-border p-2 flex flex-col justify-between relative overflow-hidden transition-all ${
                      pint ? 'bg-[#F0EDEC]' : 'border-dashed bg-[#FAF8F5] flex items-center justify-center'
                    }`}
                  >
                    {pint ? (
                      <>
                        <img
                          src={pint.image}
                          alt={pint.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="relative z-10 flex justify-between items-start">
                          <span className="w-5 h-5 rounded-full bg-[#121212] text-[#D4FF00] font-space font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <button
                            onClick={() => removePintAtIndex(idx)}
                            className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110"
                            title="Remove pint"
                          >
                            <X className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                        <div className="relative z-10 bg-[#121212]/90 text-white p-1 rounded text-[10px] font-space font-bold truncate">
                          {pint.name.split(' ')[0]} ({pint.protein}g)
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-2 text-[#121212]/40">
                        <span className="block font-space font-bold text-xs">SLOT {idx + 1}</span>
                        <span className="text-[10px]">EMPTY</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Flavor Picker Roster */}
          <div>
            <span className="font-space font-bold text-xs uppercase text-[#121212] block mb-3">
              CHOOSE PINTS TO FILL YOUR BOX:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {FLAVORS_DATA.map((flavor) => {
                const countInBox = selectedPints.filter((p) => p.id === flavor.id).length;
                const isBoxFull = selectedPints.length >= selectedSize;
                return (
                  <div
                    key={flavor.id}
                    className="p-3 bg-white brutal-border rounded-xl flex flex-col justify-between hover:bg-[#F6F3F2] transition-colors"
                  >
                    <div className="flex gap-2.5 items-center mb-2">
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        className="w-12 h-12 rounded-lg object-cover brutal-border"
                      />
                      <div className="overflow-hidden">
                        <h5 className="font-syne font-extrabold text-xs uppercase truncate">
                          {flavor.name}
                        </h5>
                        <span className="text-[10px] font-space font-bold text-[#FF2E93]">
                          {flavor.protein}g Protein • {flavor.calories} cal
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#121212]/20">
                      <span className="font-space font-bold text-[11px] text-[#121212]/70">
                        {countInBox > 0 ? `In Box: ${countInBox}` : '0 in box'}
                      </span>
                      <button
                        disabled={isBoxFull}
                        onClick={() => addFlavorToSlot(flavor)}
                        className={`px-3 py-1 font-space font-bold text-xs uppercase rounded-full brutal-border flex items-center gap-1 ${
                          isBoxFull
                            ? 'opacity-40 cursor-not-allowed bg-gray-200'
                            : 'bg-[#D4FF00] text-[#121212] hover:bg-[#c5ec00]'
                        }`}
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                        <span>ADD</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-[#121212] text-white p-4 px-6 flex flex-wrap items-center justify-between gap-4 border-t-[2.5px] border-[#121212]">
          <div>
            <div className="font-space font-bold text-xs text-[#D4FF00] uppercase">
              {selectedPints.length === selectedSize ? 'BOX COMPLETE & FROZEN-PACKED!' : `SELECT ${selectedSize - selectedPints.length} MORE PINTS TO COMPLETE`}
            </div>
            <div className="font-syne font-black text-2xl text-white">
              ₹{currentBundle.price} TOTAL
            </div>
          </div>

          <button
            disabled={selectedPints.length < selectedSize}
            onClick={handleAddBundleToCart}
            className={`py-3 px-8 font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center gap-2 ${
              selectedPints.length === selectedSize
                ? 'bg-[#D4FF00] text-[#121212]'
                : 'opacity-50 cursor-not-allowed bg-gray-400 text-black'
            }`}
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>CONFIRM BOX & ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
