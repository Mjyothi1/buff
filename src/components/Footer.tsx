import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBoxBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBoxBuilder }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#121212] text-[#FAF8F5] brutal-border-t pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Newsletter Strip */}
        <div className="bg-[#D4FF00] text-[#121212] brutal-border brutal-shadow rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-space font-extrabold text-xs uppercase tracking-wider block text-[#121212]/80">
              ⚡ SECRET VAULT ACCESS
            </span>
            <h3 className="font-syne font-extrabold text-2xl sm:text-3xl uppercase tracking-tight">
              GET 15% OFF YOUR FIRST DROP
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#121212]/80 max-w-md">
              Sign up for our experimental lab alert. Be first in line when limited 200-pint micro-batches drop.
            </p>
          </div>

          <div className="w-full md:w-auto">
            {joined ? (
              <div className="flex items-center gap-2 bg-[#121212] text-[#D4FF00] px-4 py-3 rounded-full font-space font-bold text-xs">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>YOU'RE ON THE VIP DROP LIST! CHECK INBOX.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter athlete email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-3 bg-white text-[#121212] font-sans text-xs rounded-full brutal-border focus:outline-none min-w-[220px]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#121212] text-[#FAF8F5] font-space font-black text-xs uppercase tracking-wider rounded-full brutal-btn hover:bg-[#FF2E93] transition-colors whitespace-nowrap"
                >
                  UNLOCK 15%
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links & Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-lg bg-[#D4FF00] text-[#121212] flex items-center justify-center font-black text-lg brutal-border">
                ⚡
              </span>
              <span className="font-syne font-black text-2xl tracking-tighter text-white uppercase">
                BUFF<span className="text-[#FF2E93]">.</span>
              </span>
            </div>
            <p className="font-sans text-xs text-[#FAF8F5]/70 max-w-sm leading-relaxed">
              Crafted in Bengaluru & Mumbai. India’s premier high-protein artisan creamery combining 100% micro-milled grass-fed whey isolate with authentic confectioner decadence.
            </p>
            <div className="flex gap-2 pt-2">
              <span className="px-3 py-1 bg-white/10 text-[10px] font-space font-bold rounded-full border border-white/20">
                28G-34G PROTEIN
              </span>
              <span className="px-3 py-1 bg-white/10 text-[10px] font-space font-bold rounded-full border border-white/20">
                0G ADDED SUGAR
              </span>
              <span className="px-3 py-1 bg-white/10 text-[10px] font-space font-bold rounded-full border border-white/20">
                FSSAI CERTIFIED
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div className="md:col-span-2 space-y-3 font-space text-xs">
            <span className="block font-bold text-[#D4FF00] uppercase tracking-wider">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-[#FAF8F5]/80">
              <li>
                <button onClick={() => onNavigate('flavors')} className="hover:text-[#D4FF00] transition-colors">
                  The Flavor Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('scoop-lab')} className="hover:text-[#D4FF00] transition-colors">
                  Scoop Lab Customizer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-[#D4FF00] transition-colors">
                  The Anabolic Churn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="hover:text-[#D4FF00] transition-colors">
                  Scoop Bar Locations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('merch')} className="hover:text-[#D4FF00] transition-colors">
                  Pint Club Subscription
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div className="md:col-span-2 space-y-3 font-space text-xs">
            <span className="block font-bold text-[#FF2E93] uppercase tracking-wider">
              SERVICES
            </span>
            <ul className="space-y-2 text-[#FAF8F5]/80">
              <li>
                <button onClick={onOpenBoxBuilder} className="hover:text-[#FF2E93] transition-colors">
                  Build 6-Pack Box
                </button>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Dry Ice Delivery FAQ</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Cult.fit & Gym Wholesale</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">FSSAI Testing Lab</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Careers / Churn Masters</span>
              </li>
            </ul>
          </div>

          {/* Massive Graphic Callout */}
          <div className="md:col-span-3 space-y-3">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
              <span className="font-space font-bold text-xs text-[#2E4CFF] uppercase block">
                SUB-ZERO COLD PROMISE
              </span>
              <p className="font-sans text-[11px] text-[#FAF8F5]/70 leading-relaxed">
                Every pint ships in an insulated thermal cooler loaded with food-grade solid dry ice blocks. Guaranteed to arrive rock-solid across India.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Giant Marquee Headline */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-space text-[#FAF8F5]/50 gap-4">
          <div>
            © {new Date().getFullYear()} BUFF CREAMERY INDIA PVT. LTD. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer">TERMS OF SERVICE</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">FSSAI LIC NO. 10023043000892</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
