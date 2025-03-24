
import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCurrency } from '@/hooks/useCurrency';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { formatProductPrice, currency } = useCurrency();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const price = product.prices[currency as keyof typeof product.prices];
  const vatAmount = price * (product.vatRate / 100);
  const totalPrice = price + vatAmount;

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addItem(product.id, quantity);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Image */}
      <div className="aspect-h-4 aspect-w-3 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center animate-fade-in"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500 mb-2">{product.brand}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-base text-gray-600">{product.description}</p>
        </div>

        <Separator className="my-6" />

        {/* Price */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {formatProductPrice(totalPrice)}
          </h2>
          <p className="text-sm text-gray-500">
            Price includes VAT ({product.vatRate}%): {formatProductPrice(vatAmount)}
          </p>
          {product.stock > 0 ? (
            <div className="flex items-center mt-2 text-sm text-green-600">
              <Check className="h-4 w-4 mr-1" />
              <span>In stock ({product.stock} available)</span>
            </div>
          ) : (
            <p className="mt-2 text-sm text-red-600">Out of stock</p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center mb-6">
          <span className="text-sm font-medium text-gray-700 mr-4">Quantity</span>
          <div className="flex items-center border border-gray-300 rounded-full">
            <button
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              className="p-2 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 text-gray-900 font-medium">{quantity}</span>
            <button
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
              className="p-2 flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full py-6 text-base flex items-center justify-center gap-2 mb-8"
        >
          <ShoppingBag className="h-5 w-5" />
          Add to Cart
        </Button>

        {/* Product Details Tabs */}
        <Tabs defaultValue="attributes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="attributes" className="mt-6">
            <ul className="space-y-3">
              {product.attributes.map((attr, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{attr.name}</span>
                  <span className="text-gray-600">{attr.value}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="characteristics" className="mt-6">
            <ul className="space-y-3">
              {product.characteristics.map((char, index) => (
                <li key={index} className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{char.name}</span>
                  <span className="text-gray-600">{char.value}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Options</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Postal Service</span>
                    <span>1-3 business days</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Rapid Courier Service</span>
                    <span>Next business day</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Payment Methods</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Cash on Delivery (payment at the time of delivery)</li>
                  <li>Bank Transfer (payment by bank order)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
