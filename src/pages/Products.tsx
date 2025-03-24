
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductGrid from '@/components/product/ProductGrid';
import { products, categories, getBestSellers, getNewProducts } from '@/data/products';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  
  // Filter states
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [brandFilters, setBrandFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 5000 });
  const [showNew, setShowNew] = useState(false);
  const [showBestSellers, setShowBestSellers] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Get unique brands from products
  const uniqueBrands = Array.from(new Set(products.map(product => product.brand)));
  
  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = queryParams.get('category');
    const filterParam = queryParams.get('filter');
    const brandParam = queryParams.get('brand');
    
    if (categoryParam) {
      const category = categories.find(cat => cat.id === categoryParam);
      if (category) {
        setCategoryFilters([category.name]);
      }
    }
    
    if (filterParam === 'new') {
      setShowNew(true);
    } else if (filterParam === 'bestsellers') {
      setShowBestSellers(true);
    }
    
    if (brandParam) {
      setBrandFilters([brandParam]);
    }
  }, []);
  
  // Apply filters to products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (categoryFilters.length > 0 && !categoryFilters.includes(product.category)) {
      return false;
    }
    
    // Brand filter
    if (brandFilters.length > 0 && !brandFilters.includes(product.brand)) {
      return false;
    }
    
    // Price filter
    const price = product.prices.RON;
    if (price < priceRange.min || price > priceRange.max) {
      return false;
    }
    
    // New products filter
    if (showNew && !product.isNew) {
      return false;
    }
    
    // Bestseller filter
    if (showBestSellers && !product.isBestSeller) {
      return false;
    }
    
    return true;
  });
  
  // Update URL with filters
  const updateQueryParams = () => {
    const params = new URLSearchParams();
    
    if (categoryFilters.length === 1) {
      const category = categories.find(cat => cat.name === categoryFilters[0]);
      if (category) {
        params.set('category', category.id);
      }
    }
    
    if (showNew) {
      params.set('filter', 'new');
    } else if (showBestSellers) {
      params.set('filter', 'bestsellers');
    }
    
    if (brandFilters.length === 1) {
      params.set('brand', brandFilters[0]);
    }
    
    navigate({ search: params.toString() });
  };
  
  useEffect(() => {
    updateQueryParams();
  }, [categoryFilters, brandFilters, showNew, showBestSellers]);
  
  // Reset all filters
  const resetFilters = () => {
    setCategoryFilters([]);
    setBrandFilters([]);
    setPriceRange({ min: 0, max: 5000 });
    setShowNew(false);
    setShowBestSellers(false);
  };
  
  // Toggle category filter
  const toggleCategoryFilter = (category: string) => {
    setCategoryFilters(prev => 
      prev.includes(category) 
        ? prev.filter(cat => cat !== category) 
        : [...prev, category]
    );
  };
  
  // Toggle brand filter
  const toggleBrandFilter = (brand: string) => {
    setBrandFilters(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  // Get active filter count
  const getActiveFilterCount = () => {
    return (
      (categoryFilters.length > 0 ? 1 : 0) +
      (brandFilters.length > 0 ? 1 : 0) +
      (showNew ? 1 : 0) +
      (showBestSellers ? 1 : 0)
    );
  };

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Mobile filter dialog */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">Products</h1>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-1.5"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="ml-1 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-semibold text-gray-800">
                    {getActiveFilterCount()}
                  </span>
                )}
              </Button>
            </div>
            
            {/* Mobile filter sidebar */}
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setIsFilterOpen(false)} />
                <div className="fixed inset-y-0 right-0 max-w-full flex">
                  <div className="relative w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                        <button
                          type="button"
                          className="text-gray-400 hover:text-gray-500"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          <X className="h-6 w-6" />
                        </button>
                      </div>
                      
                      <div className="px-4 sm:px-6 pb-6">
                        {/* Filter content (mobile) */}
                        <div className="space-y-6">
                          {/* Categories */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                            <div className="space-y-2">
                              {categories.map((category) => (
                                <div key={category.id} className="flex items-center">
                                  <Checkbox
                                    id={`category-${category.id}-mobile`}
                                    checked={categoryFilters.includes(category.name)}
                                    onCheckedChange={() => toggleCategoryFilter(category.name)}
                                  />
                                  <label
                                    htmlFor={`category-${category.id}-mobile`}
                                    className="ml-2 text-sm text-gray-600"
                                  >
                                    {category.name}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Brands */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
                            <div className="space-y-2">
                              {uniqueBrands.map((brand) => (
                                <div key={brand} className="flex items-center">
                                  <Checkbox
                                    id={`brand-${brand}-mobile`}
                                    checked={brandFilters.includes(brand)}
                                    onCheckedChange={() => toggleBrandFilter(brand)}
                                  />
                                  <label
                                    htmlFor={`brand-${brand}-mobile`}
                                    className="ml-2 text-sm text-gray-600"
                                  >
                                    {brand}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Product Status */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Product Status</h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Checkbox
                                  id="new-mobile"
                                  checked={showNew}
                                  onCheckedChange={(checked) => setShowNew(!!checked)}
                                />
                                <label
                                  htmlFor="new-mobile"
                                  className="ml-2 text-sm text-gray-600"
                                >
                                  New Arrivals
                                </label>
                              </div>
                              <div className="flex items-center">
                                <Checkbox
                                  id="bestseller-mobile"
                                  checked={showBestSellers}
                                  onCheckedChange={(checked) => setShowBestSellers(!!checked)}
                                />
                                <label
                                  htmlFor="bestseller-mobile"
                                  className="ml-2 text-sm text-gray-600"
                                >
                                  Bestsellers
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-between">
                          <Button
                            variant="ghost"
                            onClick={resetFilters}
                            disabled={getActiveFilterCount() === 0}
                            className="text-sm"
                          >
                            Reset filters
                          </Button>
                          <Button onClick={() => setIsFilterOpen(false)}>
                            Apply Filters
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop sidebar filter */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filters</h2>
              
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={categoryFilters.includes(category.name)}
                          onCheckedChange={() => toggleCategoryFilter(category.name)}
                        />
                        <label
                          htmlFor={`category-${category.id}`}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Brands */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Brands</h3>
                  <div className="space-y-2">
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={brandFilters.includes(brand)}
                          onCheckedChange={() => toggleBrandFilter(brand)}
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                {/* Product Status */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Product Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="new"
                        checked={showNew}
                        onCheckedChange={(checked) => setShowNew(!!checked)}
                      />
                      <label
                        htmlFor="new"
                        className="ml-2 text-sm text-gray-600"
                      >
                        New Arrivals
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="bestseller"
                        checked={showBestSellers}
                        onCheckedChange={(checked) => setShowBestSellers(!!checked)}
                      />
                      <label
                        htmlFor="bestseller"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Bestsellers
                      </label>
                    </div>
                  </div>
                </div>
                
                {getActiveFilterCount() > 0 && (
                  <div className="pt-2">
                    <Button variant="ghost" onClick={resetFilters} size="sm" className="text-sm">
                      Reset all filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 hidden lg:block">Products</h1>
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Active filters */}
            {getActiveFilterCount() > 0 && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {categoryFilters.length > 0 && (
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm">
                      <span className="mr-1 text-gray-700">Categories:</span>
                      <span className="font-medium">{categoryFilters.join(', ')}</span>
                      <button
                        onClick={() => setCategoryFilters([])}
                        className="ml-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  
                  {brandFilters.length > 0 && (
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm">
                      <span className="mr-1 text-gray-700">Brands:</span>
                      <span className="font-medium">{brandFilters.join(', ')}</span>
                      <button
                        onClick={() => setBrandFilters([])}
                        className="ml-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  
                  {showNew && (
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm">
                      <span className="font-medium">New Arrivals</span>
                      <button
                        onClick={() => setShowNew(false)}
                        className="ml-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                  
                  {showBestSellers && (
                    <div className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-sm">
                      <span className="font-medium">Bestsellers</span>
                      <button
                        onClick={() => setShowBestSellers(false)}
                        className="ml-1.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
