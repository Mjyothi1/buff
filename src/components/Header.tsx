import React, { useState } from 'react';
import { ShoppingBag, Zap, Menu, X, Sparkles, MapPin, FlaskConical, IceCream } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBoxBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBoxBuilder
}) => {
  const { totalPints, totalItems, totalProtein, setIsOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'flavors', label: 'THE FLAVORS', icon: IceCream },
    { id: 'scoop-lab', label: 'SCOOP LAB', icon: FlaskConical, badge: 'CUSTOM' },
    { id: 'science', label: 'THE SCIENCE', icon: Sparkles },
    { id: 'locations', label: 'SCOOP BARS', icon: MapPin },
    { id: 'merch', label: 'MERCH & CLUB', icon: Zap }
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]">
      {/* Top Banner announcement */}
      <div className="bg-[#121212] text-[#FAF8F5] py-1.5 px-4 text-xs font-space font-semibold tracking-wider flex items-center justify-between border-b-[2px] border-[#121212]">
        <div className="flex items-center gap-2 mx-auto">
          <span className="bg-[#D4FF00] text-[#121212] text-[10px] font-extrabold px-2 py-0.5 rounded-full brutal-border">
            FLASH DROP
          </span>
          <span>FREE DRY ICE OVERNIGHT DELIVERY ON 4+ PINTS</span>
          <span className="hidden sm:inline text-[#FF2E93] font-bold">|</span>
          <span className="hidden sm:inline text-[#D4FF00]">USE CODE: <strong>BUFF15</strong> FOR 15% OFF</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between brutal-border-b bg-[#FAF8F5]">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('flavors')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-[#D4FF00] brutal-border brutal-shadow-sm flex items-center justify-center font-black text-xl text-[#121212] transform group-hover:rotate-6 transition-transform">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tighter text-[#121212] leading-none uppercase">
                BUFF<span className="text-[#FF2E93]">.</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-space font-bold tracking-widest text-[#121212] opacity-80 uppercase">
              <span>ANABOLIC ARTISAN CREAMERY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E4CFF]"></span>
              <span className="text-[#2E4CFF]">EST. 2026</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-4 py-2 font-space font-bold text-sm tracking-wide uppercase transition-all rounded-md ${
                  isActive
                    ? 'bg-[#121212] text-[#D4FF00] brutal-shadow-sm'
                    : 'text-[#121212] hover:bg-[#F0EDEC]'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-[#FF2E93] text-white text-[9px] font-black rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Quick Box Builder CTA */}
          <button
            onClick={onOpenBoxBuilder}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#D4FF00] text-[#121212] font-space font-bold text-xs tracking-wider rounded-full brutal-btn uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF2E93] animate-pulse"></span>
            <span>BUILD A 6-PACK</span>
            <span className="bg-[#121212] text-[#FAF8F5] text-[10px] px-1.5 py-0.5 rounded-full">
              SAVE ₹350
            </span>
          </button>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-[#FAF8F5] text-[#121212] rounded-full brutal-btn"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#121212]" />
            <span className="font-space font-extrabold text-sm">
              {totalPints > 0 ? totalPints : totalItems}
            </span>
            {totalProtein > 0 && (
              <span className="hidden sm:inline-block px-2 py-0.5 bg-[#2E4CFF] text-[#FAF8F5] text-[11px] font-space font-bold rounded-full">
                {totalProtein}g PRO
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 brutal-border rounded-md bg-[#FAF8F5] text-[#121212]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] brutal-border-b px-6 py-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-4 py-3 font-space font-bold text-base flex items-center justify-between brutal-border rounded-lg ${
                activeTab === link.id
                  ? 'bg-[#121212] text-[#D4FF00] brutal-shadow-sm'
                  : 'bg-white text-[#121212]'
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon className="w-5 h-5" />
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="px-2 py-0.5 bg-[#FF2E93] text-white text-xs font-black rounded-full">
                  {link.badge}
                </span>
              )}
            </button>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBoxBuilder();
            }}
            className="w-full py-3.5 bg-[#D4FF00] text-[#121212] font-space font-bold text-sm tracking-wider uppercase rounded-full brutal-btn text-center"
          >
            🔥 BUILD CUSTOM BUNDLE (SAVE UP TO ₹900)
          </button>
        </div>
      )}
    </header>
  );
};
