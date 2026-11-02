import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Flavor, CustomPint, MerchItem } from '../types';
import confetti from 'canvas-confetti';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (flavor: Flavor, quantity?: number) => void;
  addCustomPint: (customPint: CustomPint) => void;
  addMerchItem: (merch: MerchItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
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

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Initial sample items so the user immediately experiences the interactive cart
    return [
      {
        id: 'midnight-brownie',
        flavorId: 'midnight-brownie',
        name: 'MIDNIGHT BROWNIE OVERLOAD',
        subtitle: '32g Protein • Dark Dutch Cacao & Fudge Lava',
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
        price: 379,
        protein: 32,
        quantity: 2
      },
      {
        id: 'glitch-berry-swirl',
        flavorId: 'glitch-berry-swirl',
        name: 'GLITCH BERRY CHEESECAKE',
        subtitle: '28g Protein • Wild Marionberry Swirl',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
        price: 369,
        protein: 28,
        quantity: 1
      }
    ];
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('BUFF15');

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

  const addCustomPint = (customPint: CustomPint) => {
    setItems((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        customPint,
        name: customPint.name,
        subtitle: `${customPint.protein}g Protein • Base: ${customPint.baseName}`,
        image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80',
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
    (acc, item) => (item.isMerch ? acc : acc + item.quantity),
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
        addCustomPint,
        addMerchItem,
        removeItem,
        updateQuantity,
        clearCart,
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
