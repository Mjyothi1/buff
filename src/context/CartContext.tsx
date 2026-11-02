import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Flavor, CustomPint, MerchItem } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (flavor: Flavor, quantity?: number) => void;
  addBundle: (bundle: { size: number; title: string; price: number; pints: Flavor[] }) => void;
  addCustomPint: (customPint: CustomPint) => void;
  addMerchItem: (merch: MerchItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPints: number;
  totalProtein: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  finalTotal: number;
  freeShippingQualified: boolean;
  pintsNeededForFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'buff_cart_items_v2';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart initially starts empty (0 items)
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Sync cart items with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D4FF00', '#FF2E93', '#2E4CFF', '#121212']
      });
    } catch {
      // safe fallback
    }
  };

  const addItem = (flavor: Flavor, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.flavorId === flavor.id);
      if (existing) {
        return prev.map((i) =>
          i.flavorId === flavor.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: flavor.id,
          flavorId: flavor.id,
          name: flavor.name,
          subtitle: `${flavor.protein}g Protein • ${flavor.subtitle}`,
          image: flavor.image,
          price: flavor.price,
          protein: flavor.protein,
          quantity
        }
      ];
    });
    triggerConfetti();
    setIsOpen(true);
  };

  const addBundle = (bundle: { size: number; title: string; price: number; pints: Flavor[] }) => {
    const totalBundleProtein = bundle.pints.reduce((acc, p) => acc + p.protein, 0);
    const leadImage = bundle.pints[0]?.image || '/assets/flavors/midnight-fudge-brownie.png';
    const flavorNames = Array.from(new Set(bundle.pints.map((p) => p.name.split(' ')[0]))).join(', ');

    setItems((prev) => [
      ...prev,
      {
        id: `bundle-${Date.now()}`,
        name: bundle.title,
        subtitle: `${bundle.size} Pints (${totalBundleProtein}g Protein): ${flavorNames}`,
        image: leadImage,
        price: bundle.price,
        protein: totalBundleProtein,
        quantity: 1,
        bundleSize: bundle.size
      }
    ]);
    triggerConfetti();
    setIsOpen(true);
  };

  const addCustomPint = (customPint: CustomPint) => {
    const baseImg =
      customPint.baseId === 'base-dutch-fudge'
        ? '/assets/flavors/midnight-fudge-brownie.png'
        : customPint.baseId === 'base-golden-peanut'
        ? '/assets/flavors/salted-peanut-crunch.png'
        : customPint.baseId === 'base-uji-matcha'
        ? '/assets/flavors/bronte-pistachio-matcha.png'
        : '/assets/flavors/vanilla-bean-caviar.png';

    setItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        customPint,
        name: customPint.name,
        subtitle: `${customPint.protein}g Protein • Base: ${customPint.baseName}`,
        image: baseImg,
        price: customPint.price,
        protein: customPint.protein,
        quantity: customPint.quantity || 1
      }
    ]);
    triggerConfetti();
    setIsOpen(true);
  };

  const addMerchItem = (merch: MerchItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === merch.id);
      if (existing) {
        return prev.map((i) =>
          i.id === merch.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: merch.id,
          isMerch: true,
          name: merch.name,
          subtitle: merch.tagline,
          image: merch.image,
          price: merch.price,
          protein: 0,
          quantity: 1
        }
      ];
    });
    triggerConfetti();
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPints = items.reduce(
    (acc, item) => (item.isMerch ? acc : acc + (item.bundleSize ? item.bundleSize * item.quantity : item.quantity)),
    0
  );

  const totalItems = items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const totalProtein = items.reduce(
    (acc, item) => acc + item.protein * item.quantity,
    0
  );

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  let discount = 0;
  if (appliedPromo === 'BUFF15' || appliedPromo === 'NEON15') {
    discount = Math.round(subtotal * 0.15);
  } else if (appliedPromo === 'GAINZ100' || appliedPromo === 'GAINZ10') {
    discount = Math.min(150, subtotal);
  }

  const finalTotal = Math.max(0, subtotal - discount);
  const freeShippingQualified = totalPints >= 4 || subtotal >= 999;
  const pintsNeededForFreeShipping = Math.max(0, 4 - totalPints);

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BUFF15' || clean === 'NEON15') {
      setAppliedPromo('BUFF15');
      return { success: true, message: 'Code BUFF15 applied! (15% OFF)' };
    }
    if (clean === 'GAINZ100' || clean === 'GAINZ10') {
      setAppliedPromo('GAINZ100');
      return { success: true, message: 'Code GAINZ100 applied! (₹150 OFF)' };
    }
    return { success: false, message: 'Invalid promo code. Try BUFF15 or GAINZ100' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        addBundle,
        addCustomPint,
        addMerchItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPints,
        totalProtein,
        subtotal,
        discount,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        finalTotal,
        freeShippingQualified,
        pintsNeededForFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
