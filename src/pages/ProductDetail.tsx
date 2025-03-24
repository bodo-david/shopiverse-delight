
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import ProductDetailComponent from '@/components/product/ProductDetail';
import ProductGrid from '@/components/product/ProductGrid';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProductById, getRelatedProducts } from '@/data/products';

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const product = productId ? getProductById(productId) : undefined;
  const relatedProducts = productId ? getRelatedProducts(productId) : [];
  
  // If product not found, redirect to products page
  useEffect(() => {
    if (!product && productId) {
      navigate('/products', { replace: true });
    }
  }, [product, productId, navigate]);
  
  if (!product) {
    return null; // Will redirect via the useEffect
  }

  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-8 animate-fade-in">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gray-900">Products</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category.toLowerCase()}`} className="hover:text-gray-900">
            {product.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        {/* Back Button (Mobile only) */}
        <div className="mb-6 sm:hidden">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="text-sm flex items-center">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
        </div>
        
        {/* Product Detail */}
        <ProductDetailComponent product={product} />
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <Separator className="mb-12" />
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
}
