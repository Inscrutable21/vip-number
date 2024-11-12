// src/app/page.js
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Suspense } from 'react';
import Link from 'next/link';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import VipNumberGrid from '@/components/landing/VipNumberGrid';
import Footer from '@/components/landing/Footer';
import { prisma } from '@/lib/prisma';
import DeliveryProcessSection from '@/components/landing/DeliveryProcessSection';

async function getVipNumbers() {
  try {
    // Verify database connection
    await prisma.$connect();
    
    // Fetch numbers with validation
    const numbers = await prisma.vipNumber.findMany({
      where: {
        status: "available"
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 9,
      select: {
        // Explicitly select the fields you need
        id: true,
        number: true,
        price: true,
        status: true,
        createdAt: true,
        // Add any other fields you need
      }
    });

    // Validate the returned data
    if (!Array.isArray(numbers)) {
      throw new Error('Invalid data format returned from database');
    }

    // Map the data to ensure all required fields are present
    const validatedNumbers = numbers.map(number => ({
      id: number.id || '',
      number: number.number || '',
      price: number.price || 0,
      status: number.status || 'available',
      createdAt: number.createdAt || new Date(),
      // Add any other fields with default values
    }));

    return validatedNumbers;
  } catch (error) {
    console.error('Database Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return []; // Return empty array instead of throwing
  } finally {
    // Always disconnect after operation
    await prisma.$disconnect();
  }
}

export default async function Home() {
  let numbers = [];
  
  try {
    const fetchedNumbers = await getVipNumbers();
    numbers = Array.isArray(fetchedNumbers) ? fetchedNumbers : [];
  } catch (error) {
    console.error('Error in Home component:', {
      message: error.message,
      stack: error.stack
    });
    // Set numbers to empty array if there's an error
    numbers = [];
  }

  // Function to create WhatsApp link with message
  const getWhatsAppLink = (number, price) => {
    if (!number || !price) {
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
        <DeliveryProcessSection /> 
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