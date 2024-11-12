// src/app/page.js
import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import VipNumberGrid from '@/components/landing/VipNumberGrid';
import Footer from '@/components/landing/Footer';
import { prisma } from '@/lib/prisma';

async function getVipNumbers() {
  try {
    const numbers = await prisma.vipNumber.findMany({
      where: {
        status: "available"
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 9
    });

    return numbers;
  } catch (error) {
    console.error('Error fetching VIP numbers:', error);
    throw error;
  }
}

export default async function Home() {
  let numbers;
  try {
    numbers = await getVipNumbers();
  } catch (error) {
    console.error('Error fetching VIP numbers:', error);
    numbers = [];
  }


  // Function to create WhatsApp link with message
  const getWhatsAppLink = (number, price) => {
    if (!number || !price) {
      // Default message when no parameters are provided
      const defaultMessage = encodeURIComponent("Hello! I'm interested in buying a VIP number. Please provide more details.");
      return `https://wa.me/919651990083?text=${defaultMessage}`;
    }
    
    const message = encodeURIComponent(`Hello! I'm interested in buying VIP number ${number} priced at ₹${price.toLocaleString()}. Please provide more details.`);
    return `https://wa.me/917026922222?text=${message}`;
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

       
        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Numbers</h3>
                <p className="text-gray-600">All numbers are verified and ready for immediate activation</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
                <p className="text-gray-600">Competitive prices with easy payment options</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Round the clock customer support for your convenience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Numbers Section */}
        <section id="featured-numbers" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Featured VIP Numbers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Browse through our collection of exclusive VIP numbers. 
                Each number is unique and carefully selected.
              </p>
            </div>
            
            <Suspense fallback={<div>Loading...</div>}>
              <VipNumberGrid numbers={numbers} />
            </Suspense>
            
            <div className="mt-8 flex justify-center">
              <Link
                href="/vip-numbers"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors text-lg font-semibold border-2 border-blue-600"
              >
                Browse All Numbers
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Get Your VIP Number?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us now and secure your preferred number before someone else does!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold"
              >
                WhatsApp Now
              </a>
              <a
                href="tel:+917026922222"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold border-2 border-white"
              >
                Call Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}