
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, getProductById } from '@/data/products';
import { toast } from 'sonner';

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

type CartContextType = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getSubtotal: (currency: string) => number;
  getVAT: (currency: string) => number;
  getTotal: (currency: string) => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        
        // Validate and hydrate the cart with product data
        const hydratedCart = parsedCart
          .filter((item: any) => typeof item.productId === 'string' && typeof item.quantity === 'number')
          .map((item: any) => {
            const product = getProductById(item.productId);
            return product ? { ...item, product } : null;
          })
          .filter(Boolean);
          
        setItems(hydratedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (productId: string, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return;

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        // Check if we have enough stock
        if (newQuantity > product.stock) {
          toast.error(`Sorry, we only have ${product.stock} items in stock`);
          return prevItems;
        }
        
        toast.success(`Updated ${product.name} quantity`);
        
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      // Check if we have enough stock for a new item
      if (quantity > product.stock) {
        toast.error(`Sorry, we only have ${product.stock} items in stock`);
        return prevItems;
      }
      
      toast.success(`Added ${product.name} to cart`);
      
      return [...prevItems, { productId, quantity, product }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find(item => item.productId === productId);
      if (item) {
        toast.success(`Removed ${item.product.name} from cart`);
      }
      return prevItems.filter((item) => item.productId !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => {
      const product = getProductById(productId);
      
      if (!product) return prevItems;
      
      // Check if we have enough stock
      if (quantity > product.stock) {
        toast.error(`Sorry, we only have ${product.stock} items in stock`);
        return prevItems;
      }
      
      return prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.success('Cart cleared');
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = (currency: string) => {
    return items.reduce((total, item) => {
      const price = item.product.prices[currency as keyof typeof item.product.prices] || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getVAT = (currency: string) => {
    return items.reduce((total, item) => {
      const price = item.product.prices[currency as keyof typeof item.product.prices] || 0;
      const vat = price * (item.product.vatRate / 100);
      return total + vat * item.quantity;
    }, 0);
  };

  const getTotal = (currency: string) => {
    return getSubtotal(currency) + getVAT(currency);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        getTotalItems,
        getSubtotal,
        getVAT,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
