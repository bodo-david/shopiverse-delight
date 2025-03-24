
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import { Separator } from '@/components/ui/separator';

export default function About() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">About ShopVerse</h1>
          <p className="text-lg text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            We're dedicated to providing exceptional shopping experiences with carefully curated products that combine quality, innovation, and design.
          </p>
          
          <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="mb-6">
              Founded in 2023, ShopVerse began with a simple idea: to create an online marketplace where shoppers could find products that are both beautiful and functional. Our team of experienced buyers travels the world to find unique items that meet our high standards for quality and design.
            </p>
            
            <p className="mb-12">
              What started as a small boutique has grown into a comprehensive online store offering a wide range of products across multiple categories. Despite our growth, we maintain the same commitment to excellence that inspired us from day one.
            </p>
            
            <Separator className="my-12" />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Quality First</h3>
                <p className="text-gray-600">
                  We believe in offering products that are built to last. Each item in our catalog undergoes rigorous quality checks before being made available to our customers.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Thoughtful Design</h3>
                <p className="text-gray-600">
                  Good design solves problems. We carefully select products that combine aesthetic appeal with practical functionality.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">Customer Focus</h3>
                <p className="text-gray-600">
                  Everything we do is with our customers in mind. From our intuitive website to our responsive customer service, we aim to make your shopping experience exceptional.
                </p>
              </div>
            </div>
            
            <Separator className="my-12" />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="mb-6">
              ShopVerse is powered by a diverse team of professionals who share a passion for exceptional products. Our staff includes experienced buyers, customer service specialists, logistics experts, and technology professionals.
            </p>
            
            <p className="mb-12">
              Together, we work to ensure that your experience with ShopVerse is seamless, from browsing our catalog to receiving your order. We're united by a common goal: to help you discover products that enhance your life.
            </p>
            
            <Separator className="my-12" />
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="mb-6">
              At ShopVerse, we believe that business should be a force for good. That's why we're committed to practicing responsible commerce:
            </p>
            
            <ul className="list-disc pl-6 mb-12 space-y-2">
              <li>We carefully vet our suppliers to ensure they meet ethical standards for labor practices.</li>
              <li>We work to minimize the environmental impact of our operations.</li>
              <li>We invest in our local community through partnerships and charitable giving.</li>
              <li>We prioritize transparency in all our business practices.</li>
            </ul>
            
            <p className="mb-12">
              Thank you for choosing ShopVerse. We look forward to serving you and continuing to bring you products that inspire and delight.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
