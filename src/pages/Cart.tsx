
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import ProductGrid from '@/components/product/ProductGrid';
import { getBestSellers } from '@/data/products';

export default function Cart() {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart,
    getSubtotal,
    getVAT,
    getTotal
  } = useCart();
  
  const { currency, formatProductPrice } = useCurrency();
  const bestSellers = getBestSellers().slice(0, 3);

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet.
              Start shopping to discover our amazing products.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
            
            {/* Recommended products */}
            {bestSellers.length > 0 && (
              <div className="mt-20">
                <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
                <ProductGrid products={bestSellers} />
              </div>
            )}
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-8">
            {/* Cart items */}
            <div className="lg:col-span-8 animate-fade-in">
              <div className="border border-gray-200 rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.productId} className="p-6">
                      <CartItem
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                      />
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-gray-200 px-6 py-4 flex justify-between items-center">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-sm text-gray-500"
                  >
                    Clear cart
                  </Button>
                  <Link to="/products" className="text-sm text-black font-medium hover:text-gray-700 flex items-center">
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Order summary */}
            <div className="mt-8 lg:mt-0 lg:col-span-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="border border-gray-200 rounded-lg shadow-sm bg-white p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium text-gray-900">{formatProductPrice(getSubtotal(currency))}</p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="text-gray-600">VAT</p>
                    <p className="font-medium text-gray-900">{formatProductPrice(getVAT(currency))}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-base">
                    <p className="font-medium text-gray-900">Total</p>
                    <p className="font-bold text-gray-900">{formatProductPrice(getTotal(currency))}</p>
                  </div>
                </div>
                
                <Button className="w-full mt-6" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                
                <div className="mt-6 space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Shipping Options</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Postal Service (1-3 business days)</li>
                    <li>Rapid Courier Service (Next business day)</li>
                  </ul>
                </div>
                
                <div className="mt-4 space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Payment Methods</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Cash on Delivery</li>
                    <li>Bank Transfer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}
