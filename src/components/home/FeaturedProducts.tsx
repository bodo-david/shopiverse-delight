
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/data/products';
import ProductGrid from '../product/ProductGrid';

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink: string;
}

export default function FeaturedProducts({ title, subtitle, products, viewAllLink }: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
            {subtitle && <p className="mt-2 text-lg text-gray-500">{subtitle}</p>}
          </div>
          
          <Link 
            to={viewAllLink}
            className="mt-4 md:mt-0 text-base font-medium text-black hover:text-gray-700 flex items-center group"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <ProductGrid products={products.slice(0, 6)} />
      </div>
    </section>
  );
}
