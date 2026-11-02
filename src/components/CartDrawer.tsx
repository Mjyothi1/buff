import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, Sparkles, Tag, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface CartDrawerProps {
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalPints,
    totalProtein,
    subtotal,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    finalTotal,
    freeShippingQualified,
    pintsNeededForFreeShipping
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromoCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError(null);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-[#121212]/75 backdrop-blur-xs transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] brutal-border-l flex flex-col justify-between shadow-2xl relative">
          {/* Drawer Header */}
          <div className="bg-[#121212] text-white p-4 sm:p-5 flex items-center justify-between border-b-[2.5px] border-[#121212]">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#D4FF00] animate-pulse"></span>
              <h3 className="font-syne font-extrabold text-lg uppercase tracking-tight text-[#D4FF00]">
                YOUR ANABOLIC PINT BOX
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#121212] flex items-center justify-center font-black hover:bg-[#FF2E93] hover:text-white transition-colors brutal-border"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>
          </div>

          {/* Protein & Free Shipping Progress Strip */}
          <div className="bg-[#D4FF00] p-3 brutal-border-b text-[#121212]">
            <div className="flex items-center justify-between text-xs font-space font-bold uppercase mb-1">
              <span>⚡ BOX PROTEIN TALLY:</span>
              <span className="font-syne font-extrabold text-sm">{totalProtein}g PROTEIN</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF8F5] brutal-border rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2E4CFF] transition-all duration-300"
                style={{ width: `${Math.min(100, (totalPints / 4) * 100)}%` }}
              ></div>
            </div>
            <div className="text-[11px] font-space font-bold mt-1 text-center">
              {freeShippingQualified ? (
                <span className="text-[#121212] flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 stroke-[3]" /> FREE SUB-ZERO DRY ICE SHIPPING UNLOCKED!
                </span>
              ) : (
                <span>Add {pintsNeededForFreeShipping} more pint(s) for FREE OVERNIGHT SHIPPING</span>
              )}
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <span className="text-5xl block">🍨</span>
                <h4 className="font-syne font-extrabold text-xl uppercase">YOUR PINT BOX IS EMPTY</h4>
                <p className="text-xs font-sans text-[#121212]/70 max-w-xs mx-auto">
                  Stock your freezer with ultra-anabolic flavors or customize your dream formulation in the Scoop Lab!
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-[#D4FF00] text-[#121212] font-space font-bold text-xs uppercase rounded-full brutal-btn"
                >
                  START EXPLORING PINTS
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white brutal-border p-3.5 rounded-xl flex gap-3 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover brutal-border shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h4 className="font-syne font-extrabold text-xs uppercase truncate text-[#121212]">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#121212]/40 hover:text-red-600 transition-colors ml-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-[11px] font-sans text-[#121212]/70 truncate">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-syne font-extrabold text-sm text-[#121212]">
                        ₹{(item.price * item.quantity).toFixed(0)}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-[#FAF8F5] brutal-border rounded-full p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full hover:bg-[#D4FF00] flex items-center justify-center font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-space font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full hover:bg-[#D4FF00] flex items-center justify-center font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="bg-white brutal-border-t p-4 sm:p-5 space-y-3">
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="p-2.5 bg-[#FAF8F5] brutal-border rounded-xl flex items-center justify-between text-xs font-space">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>CODE APPLIED: <strong>{appliedPromo}</strong></span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-red-600 font-bold hover:underline"
                  >
                    REMOVE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (e.g. NEON15)"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(null);
                    }}
                    className="flex-1 px-3 py-1.5 bg-[#FAF8F5] text-xs font-space font-bold brutal-border rounded-xl uppercase focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#121212] text-[#D4FF00] font-space font-bold text-xs uppercase rounded-xl brutal-border"
                  >
                    APPLY
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600 font-space font-semibold">
                  {couponError}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-space pt-1 text-[#121212]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedPromo}):</span>
                    <span>-₹{discount.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <span>Sub-Zero Dry-Ice Insulated Packaging:</span>
                    <span className="px-1.5 py-0.2 bg-[#D4FF00] text-[9px] font-bold rounded">FREE</span>
                  </span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Express Cold-Chain Delivery:</span>
                  <span>{freeShippingQualified ? 'FREE' : '₹149'}</span>
                </div>
                <div className="border-t border-[#121212] pt-2 flex justify-between font-syne font-black text-lg">
                  <span>TOTAL ESTIMATE:</span>
                  <span className="text-[#2E4CFF]">
                    ₹{(finalTotal + (freeShippingQualified ? 0 : 149)).toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenCheckout();
                }}
                className="w-full py-4 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
              >
                <span>PROCEED TO COLD-CHAIN CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] font-space text-[#121212]/70 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% SUB-ZERO FROZEN-ON-ARRIVAL PROMISE</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
