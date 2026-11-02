import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Truck, Sparkles, CreditCard, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const {
    items,
    clearCart,
    totalPints,
    totalProtein,
    subtotal,
    discount,
    finalTotal,
    freeShippingQualified
  } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    firstName: 'Rohan',
    lastName: 'Sharma',
    email: 'rohan.sharma@gainzmail.in',
    address: 'Flat 402, Prestige Palms, 100ft Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560038',
    notes: 'Please call security upon arrival; keep in dry-ice insulated pack.'
  });

  if (!isOpen) return null;

  const shippingCost = freeShippingQualified ? 0 : 149;
  const orderGrandTotal = finalTotal + shippingCost;
  const orderNumber = `BUFF-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4FF00', '#FF2E93', '#2E4CFF', '#121212']
      });
    } catch {}
    setStep('success');
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FAF8F5] brutal-border brutal-shadow rounded-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#121212] text-white p-4 px-6 flex items-center justify-between border-b-[2.5px] border-[#121212]">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D4FF00]"></span>
            <span className="font-space font-extrabold text-sm uppercase tracking-wider text-[#D4FF00]">
              {step === 'form' ? 'COLD-CHAIN SECURE CHECKOUT (INDIA)' : 'ORDER CONFIRMED & DISPATCHED'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] text-[#121212] flex items-center justify-center font-black hover:bg-[#FF2E93] hover:text-white transition-colors brutal-border"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          {step === 'form' ? (
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Order Quick Summary Banner */}
              <div className="p-4 bg-[#D4FF00] brutal-border rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-space font-bold text-xs uppercase block text-[#121212]">
                    DISPATCHING {totalPints} PINTS
                  </span>
                  <span className="font-syne font-black text-xl text-[#121212]">
                    ⚡ {totalProtein}G TOTAL PROTEIN
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-space text-xs block text-[#121212]/80">GRAND TOTAL:</span>
                  <span className="font-syne font-black text-2xl text-[#121212]">
                    ₹{orderGrandTotal.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Shipping Address Inputs */}
              <div className="bg-white brutal-border p-4 rounded-xl space-y-3">
                <span className="font-space font-bold text-xs uppercase text-[#121212] block">
                  1. RECIPIENT & OVERNIGHT DELIVERY DESTINATION
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                      FIRST NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                    EMAIL ADDRESS (FOR DRY-ICE SHIPMENT TRACKING)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                      STATE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                      ZIP CODE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-space font-bold uppercase text-[#121212]/70 mb-1">
                    PORCH / DELIVERY NOTES:
                  </label>
                  <input
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] text-xs font-sans brutal-border rounded-lg"
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="bg-white brutal-border p-4 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-space font-bold text-xs uppercase text-[#121212]">
                    2. PAYMENT METHOD
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-space text-emerald-700">
                    <Lock className="w-3 h-3" /> 256-BIT ENCRYPTED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#D4FF00] brutal-border rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="font-space font-bold text-xs">⚡ UPI (GPAY / PHONEPE)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#121212]"></span>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] brutal-border rounded-xl flex items-center justify-between cursor-pointer">
                    <span className="font-space font-bold text-xs">CARDS / NETBANKING</span>
                    <CreditCard className="w-4 h-4 text-[#121212]" />
                  </div>
                </div>

                <div className="p-3 bg-[#FAF8F5] brutal-border rounded-lg text-[11px] font-space flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sub-Zero Guarantee: If any pint arrives melted anywhere in India, instant free re-delivery or 100% refund.</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#D4FF00] text-[#121212] font-space font-black text-sm tracking-wider uppercase rounded-full brutal-btn flex items-center justify-center gap-2"
              >
                <span>CONFIRM ORDER (₹{orderGrandTotal.toFixed(0)})</span>
              </button>
            </form>
          ) : (
            /* Success Order Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#D4FF00] brutal-border brutal-shadow mx-auto flex items-center justify-center font-bold text-3xl">
                ⚡
              </div>

              <div>
                <span className="px-3 py-1 bg-[#FF2E93] text-white font-space font-bold text-xs uppercase rounded-full brutal-border inline-block mb-2">
                  ORDER PLACED SUCCESSFULLY
                </span>
                <h3 className="font-syne font-black text-3xl sm:text-4xl text-[#121212] uppercase">
                  FREEZER DISPATCH PROTOCOL INITIATED!
                </h3>
                <p className="font-sans text-sm text-[#121212]/80 mt-1 max-w-md mx-auto">
                  Confirmation sent to <strong>{formData.email}</strong>. Your custom-packed dry-ice box is being packed at <strong>-32°C</strong>.
                </p>
              </div>

              {/* Order Tracking Card */}
              <div className="bg-white brutal-border brutal-shadow p-5 rounded-2xl max-w-md mx-auto text-left space-y-3 font-space text-xs">
                <div className="flex justify-between border-b border-[#121212]/20 pb-2">
                  <span className="text-[#121212]/70 uppercase">ORDER NUMBER:</span>
                  <strong className="text-sm font-syne text-[#2E4CFF]">{orderNumber}</strong>
                </div>
                <div className="flex justify-between border-b border-[#121212]/20 pb-2">
                  <span className="text-[#121212]/70 uppercase">COOLER STATUS:</span>
                  <span className="font-bold text-emerald-700">PACKED IN DRY ICE (-32°C)</span>
                </div>
                <div className="flex justify-between border-b border-[#121212]/20 pb-2">
                  <span className="text-[#121212]/70 uppercase">CARRIER:</span>
                  <span className="font-bold">BLUEDART & SHADOWFAX COLD-CHAIN EXPRESS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#121212]/70 uppercase">ESTIMATED DELIVERY:</span>
                  <span className="font-bold text-[#FF2E93]">TOMORROW BY 11:00 AM</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#121212] text-[#D4FF00] font-space font-black text-xs uppercase tracking-wider rounded-full brutal-btn"
              >
                BACK TO BUFF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
