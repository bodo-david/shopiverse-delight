
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export default function TermsConditions() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Please read these terms and conditions carefully before using our website.
          </p>
          
          <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>1. Introduction</h2>
            <p>
              These terms and conditions govern your use of ShopVerse website; by using our website, you accept these terms and conditions in full. If you disagree with these terms and conditions or any part of these terms and conditions, you must not use our website.
            </p>
            
            <h2>2. License to use website</h2>
            <p>
              Unless otherwise stated, ShopVerse and/or its licensors own the intellectual property rights in the website and material on the website. Subject to the license below, all these intellectual property rights are reserved.
            </p>
            <p>
              You may view, download for caching purposes only, and print pages from the website for your own personal use, subject to the restrictions set out below and elsewhere in these terms and conditions.
            </p>
            
            <h2>3. Acceptable use</h2>
            <p>
              You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website; or in any way which is unlawful, illegal, fraudulent or harmful.
            </p>
            <p>
              You must not use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of (or is linked to) any spyware, computer virus, Trojan horse, worm, keystroke logger, rootkit or other malicious computer software.
            </p>
            
            <h2>4. Products</h2>
            <p>
              The prices, images, and descriptions of products displayed on our website are subject to change without notice. We reserve the right to discontinue any product at any time.
            </p>
            <p>
              While we try to accurately display the colors of products, we cannot guarantee that your device's display of any color will be accurate.
            </p>
            
            <h2>5. Orders and Payment</h2>
            <p>
              When you place an order through our website, you are offering to purchase a product. We may accept or decline your offer at our discretion.
            </p>
            <p>
              Payment must be made in the methods specified on the website. All prices are inclusive of VAT unless otherwise stated.
            </p>
            
            <h2>6. Shipping and Delivery</h2>
            <p>
              We will ship products to the address that you specify when placing your order. Delivery times are estimates and are not guaranteed.
            </p>
            <p>
              Risk of loss and title for items purchased from our website pass to you upon delivery of the items to the carrier.
            </p>
            
            <h2>7. Returns and Refunds</h2>
            <p>
              You have the right to return products within 14 days of receipt without giving any reason. To be eligible for a return, the product must be unused and in the same condition that you received it.
            </p>
            <p>
              Refunds will be processed within 14 days from the day we receive your returned product.
            </p>
            
            <h2>8. Privacy Policy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy, which is incorporated by reference into these terms and conditions.
            </p>
            
            <h2>9. Limitations of Liability</h2>
            <p>
              ShopVerse will not be liable to you in relation to the contents of, or use of, or otherwise in connection with, this website for any indirect, special or consequential loss; or for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or business relationships, loss of reputation or goodwill, or loss or corruption of information or data.
            </p>
            
            <h2>10. Variation</h2>
            <p>
              We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of our website from the date of the publication of the revised terms and conditions on our website.
            </p>
            
            <h2>11. Governing Law</h2>
            <p>
              These terms and conditions shall be governed by and construed in accordance with the laws of Romania.
            </p>
            
            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these terms and conditions, please contact us through our contact page.
            </p>
            
            <p className="text-sm text-gray-500 mt-8">
              Last updated: September 15, 2023
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
