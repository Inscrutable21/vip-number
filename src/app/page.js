// src/app/page.js
import Script from 'next/script';
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
        id: true,
        number: true,
        price: true,
        status: true,
        createdAt: true,
      }
    });

    if (!Array.isArray(numbers)) {
      throw new Error('Invalid data format returned from database');
    }

    const validatedNumbers = numbers.map(number => ({
      id: number.id || '',
      number: number.number || '',
      price: number.price || 0,
      status: number.status || 'available',
      createdAt: number.createdAt || new Date(),
    }));

    return validatedNumbers;
  } catch (error) {
    console.error('Database Error:', {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    return [];
  } finally {
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
    numbers = [];
  }

  const getWhatsAppLink = (number, price) => {
    if (!number || !price) {
      const defaultMessage = encodeURIComponent("Hello! I'm interested in buying a VIP number. Please provide more details.");
      return `https://wa.me/919119991466?text=${defaultMessage}`;
    }
    
    const message = encodeURIComponent(`Hello! I'm interested in buying VIP number ${number} priced at ₹${price.toLocaleString()}. Please provide more details.`);
    return `https://wa.me/917026922222?text=${message}`;
  };

  return (
    <>
      {/* Meta Pixel Script */}
      <Script strategy="afterInteractive" id="facebook-pixel">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '913423483665300');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=913423483665300&ev=PageView&noscript=1"
          alt="facebook pixel"
        />
      </noscript>
      
      <Header />
      
      <main className="min-h-screen">
        <HeroSection />
        <DeliveryProcessSection /> 
        
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