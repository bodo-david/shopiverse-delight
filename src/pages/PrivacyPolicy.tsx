
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <CartDrawer />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 animate-fade-in">Privacy Policy</h1>
          <p className="text-lg text-gray-600 mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            ShopVerse is committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your information when you visit our website.
          </p>
          
          <div className="prose prose-lg max-w-none animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, place an order, contact customer service, or otherwise communicate with us. This information may include your name, email address, postal address, phone number, payment information, and purchase history.
            </p>
            <p>
              We may also automatically collect information about your use of our website, including your IP address, browser type, operating system, referring URLs, device information, pages visited, and actions taken on our website.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about orders, products, services, and promotions</li>
              <li>Provide and improve our website and services</li>
              <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>3. Sharing of Information</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Delivery carriers to ship products to you</li>
              <li>Payment processors to complete your transactions</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>
              We do not sell or rent your personal information to third parties for their marketing purposes.
            </p>
            
            <h2>4. Cookies</h2>
            <p>
              We use cookies and similar technologies to collect information about your browsing activities on our website. You can manage your cookie preferences through your browser settings.
            </p>
            
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
            <p>
              However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
            </p>
            
            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
            </ul>
            <p>
              To exercise these rights, please contact us through our contact page.
            </p>
            
            <h2>8. Children's Privacy</h2>
            <p>
              Our website is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
            </p>
            
            <h2>9. International Transfers</h2>
            <p>
              Your information may be transferred to, and processed in, countries other than the country in which you reside. These countries may have data protection laws that are different from the laws of your country.
            </p>
            
            <h2>10. Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
            </p>
            
            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy, please contact us through our contact page.
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
