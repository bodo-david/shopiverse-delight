
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-black flex items-start transition-opacity duration-300 hover:opacity-80">
              <span className="font-light">Shop</span>
              <span className="font-bold">Verse</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Premium shopping experience with a curated selection of high-quality products.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/products?category=category-1" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=category-2" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link to="/products?category=category-3" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-black transition-colors">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Information */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Customer Information</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-medium text-gray-900 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a 
                  href="https://anpc.ro/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  ANPC
                </a>
              </li>
              <li>
                <a 
                  href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=RO" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                >
                  EU Dispute Resolution
                </a>
              </li>
              <li>
                <Link to="/gdpr" className="text-sm text-gray-600 hover:text-black transition-colors">
                  GDPR / Personal Data
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} ShopVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
