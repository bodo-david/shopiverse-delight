
import React from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { formatProductPrice, currency } = useCurrency();
  const { product, quantity } = item;
  
  const price = product.prices[currency as keyof typeof product.prices];
  const totalPrice = price * quantity;

  return (
    <div className="flex py-6 animate-fade-in">
      {/* Product Image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <Link to={`/product/${product.id}`} className="hover:text-gray-600">
              <h3>{product.name}</h3>
            </Link>
            <p className="ml-4">{formatProductPrice(totalPrice)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-md">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-2 text-gray-700">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              disabled={quantity >= product.stock}
              className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(product.id)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
