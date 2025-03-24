
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { categories, getNewProducts, getBestSellers } from '@/data/products';
import { Button } from '@/components/ui/button';

export default function Index() {
  const newProducts = getNewProducts();
  const bestSellers = getBestSellers();

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">
              Premium Shopping Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Discover curated products with exceptional quality and design.
              Shop our collection of electronics, home goods, and fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 lg:mr-0 lg:mt-0 opacity-30">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="square-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#square-pattern)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 lg:ml-0 lg:mb-0 opacity-30">
          <svg width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="circle-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#circle-pattern)" />
          </svg>
        </div>
      </section>
      
      {/* Categories Showcase */}
      <CategoryShowcase categories={categories} />
      
      {/* New Products */}
      <FeaturedProducts
        title="New Arrivals"
        subtitle="Discover our latest products"
        products={newProducts}
        viewAllLink="/products?filter=new"
      />
      
      {/* Bestsellers */}
      <FeaturedProducts
        title="Bestsellers"
        subtitle="Our most popular products"
        products={bestSellers}
        viewAllLink="/products?filter=bestsellers"
      />
      
      {/* CTA Banner */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-black overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-16">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Sign up for our newsletter
                </h2>
                <p className="mt-4 max-w-3xl text-sm text-gray-300">
                  Get the latest updates on new products, special offers, and seasonal sales delivered to your inbox.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <form className="sm:flex">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-md border-white bg-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent sm:max-w-xs"
                    placeholder="Enter your email"
                  />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button type="submit" className="w-full">
                      Subscribe
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}
