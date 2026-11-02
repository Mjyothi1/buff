import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { MarqueeTicker } from './components/MarqueeTicker';
import { Hero } from './components/Hero';
import { FlavorVault } from './components/FlavorVault';
import { FlavorModal } from './components/FlavorModal';
import { ScoopLab } from './components/ScoopLab';
import { BoxBuilderModal } from './components/BoxBuilderModal';
import { TheScience } from './components/TheScience';
import { ScoopBars } from './components/ScoopBars';
import { MerchSection } from './components/MerchSection';
import { ReviewsWall } from './components/ReviewsWall';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';
import { FLAVORS_DATA } from './data/flavors';
import { Flavor } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('flavors');
  const [selectedFlavorModal, setSelectedFlavorModal] = useState<Flavor | null>(null);
  const [boxBuilderOpen, setBoxBuilderOpen] = useState<boolean>(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);

  const handleSelectFlavorById = (id: string) => {
    const found = FLAVORS_DATA.find((f) => f.id === id);
    if (found) {
      setSelectedFlavorModal(found);
    }
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#121212] selection:bg-[#D4FF00] selection:text-[#121212]">
        {/* Global Neo-Brutalist Navigation */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenBoxBuilder={() => setBoxBuilderOpen(true)}
        />

        {/* High-Velocity Marquee Strip */}
        <MarqueeTicker
          text={[
            'BUFF • HIGH-PROTEIN ARTISAN INDULGENCE',
            '28G–34G PROTEIN PER PINT',
            'ZERO ADDED SUGAR',
            'COLD-CHURNED ARTISAN GELATO',
            'NO CHALKY AFTERTASTE',
            'PREBIOTIC GUT INTEGRITY',
            'OVERNIGHT DRY ICE DELIVERY',
            'PURE DOPAMINE INDULGENCE',
            'KETO-COMPLIANT MACROS'
          ]}
          bg="bg-[#D4FF00]"
          textColor="text-[#121212]"
        />

        {/* Screen Routing & View Content */}
        <main className="flex-1">
          {activeTab === 'flavors' && (
            <>
              {/* BUFF Hero Section */}
              <Hero
                onExploreFlavors={() => {
                  const el = document.getElementById('flavors');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onOpenScoopLab={() => handleNavigate('scoop-lab')}
                onSelectFlavor={handleSelectFlavorById}
              />

              {/* Flavor Vault Catalog & Macro Explorer */}
              <FlavorVault
                onSelectFlavor={handleSelectFlavorById}
                onOpenBoxBuilder={() => setBoxBuilderOpen(true)}
              />

              {/* Reverse Marquee Separator */}
              <MarqueeTicker
                text={[
                  'SUPER ANABOLIC CHURN',
                  'ALLULOSE NATURAL SWEETENER',
                  'ZERO SUGAR CRASH',
                  '100% GRASS-FED WHEY ISOLATE',
                  'mTOR ACTIVATION GUARANTEE'
                ]}
                bg="bg-[#FF2E93]"
                textColor="text-white"
                speed="reverse"
              />

              {/* Reviews Wall */}
              <ReviewsWall />
            </>
          )}

          {activeTab === 'scoop-lab' && (
            <div>
              <ScoopLab />
              <ReviewsWall />
            </div>
          )}

          {activeTab === 'science' && (
            <div>
              <TheScience onExploreFlavors={() => handleNavigate('flavors')} />
              <ReviewsWall />
            </div>
          )}

          {activeTab === 'locations' && (
            <div>
              <ScoopBars />
            </div>
          )}

          {activeTab === 'merch' && (
            <div>
              <MerchSection />
            </div>
          )}
        </main>

        {/* Global Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBoxBuilder={() => setBoxBuilderOpen(true)}
        />

        {/* Modals & Drawers */}
        <FlavorModal
          flavor={selectedFlavorModal}
          onClose={() => setSelectedFlavorModal(null)}
        />

        <BoxBuilderModal
          isOpen={boxBuilderOpen}
          onClose={() => setBoxBuilderOpen(false)}
        />

        <CartDrawer
          onOpenCheckout={() => setCheckoutModalOpen(true)}
        />

        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
        />
      </div>
    </CartProvider>
  );
}
