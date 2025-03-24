
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useCurrency } from '@/hooks/useCurrency';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { formatProductPrice, currency } = useCurrency();
  const { addItem } = useCart();

  const price = product.prices[currency as keyof typeof product.prices];
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:shadow-md transition-shadow duration-300 h-full">
      {/* Badge for new or bestseller */}
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded-full">
          New
        </div>
      )}
      {!product.isNew && product.isBestSeller && (
        <div className="absolute top-2 left-2 z-10 bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded-full">
          Bestseller
        </div>
      )}

      {/* Product Link */}
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="aspect-h-4 aspect-w-3 bg-gray-200 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col flex-grow p-4">
          <div className="flex-grow">
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <h3 className="text-base font-medium text-gray-900 mb-2">{product.name}</h3>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-base font-medium text-gray-900">
              {formatProductPrice(price)}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="h-9 w-9 p-0 rounded-full"
              onClick={handleAddToCart}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
