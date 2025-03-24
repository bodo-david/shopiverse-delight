
import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    isCartOpen, 
    closeCart,
    getSubtotal,
    getVAT,
    getTotal
  } = useCart();
  
  const { currency, formatProductPrice } = useCurrency();

  if (!isCartOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 animate-slide-in-right">
        <div className="flex h-full flex-col overflow-y-scroll">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 sm:px-6">
            <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
            <button
              type="button"
              onClick={closeCart}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <Separator />
          
          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {items.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.productId} className="py-4">
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-1 text-sm text-gray-500">Start shopping to add items to your cart</p>
                <Button 
                  onClick={closeCart} 
                  className="mt-6"
                  asChild
                >
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Footer with totals */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4 sm:p-6">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-2">
                <p>Subtotal</p>
                <p>{formatProductPrice(getSubtotal(currency))}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <p>VAT included</p>
                <p>{formatProductPrice(getVAT(currency))}</p>
              </div>
              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <p>Total</p>
                <p>{formatProductPrice(getTotal(currency))}</p>
              </div>
              <div className="space-y-3">
                <Button 
                  className="w-full py-6 text-base"
                  asChild
                >
                  <Link to="/checkout" onClick={closeCart}>
                    Proceed to Checkout
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={closeCart}
                  asChild
                >
                  <Link to="/cart">View Cart</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-gray-500"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
