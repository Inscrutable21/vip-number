'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import VipNumberGrid from '@/components/landing/VipNumberGrid';

const VIPNumbersPage = () => {
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVIPNumbers();
  }, []);

  useEffect(() => {
    filterNumbers();
  }, [numbers, priceRange]);

  const fetchVIPNumbers = async () => {
    try {
      const response = await fetch('/api/vip-numbers');
      if (!response.ok) throw new Error('Failed to fetch VIP numbers');
      const data = await response.json();
      setNumbers(data);
      setFilteredNumbers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filterNumbers = () => {
    const filtered = numbers.filter(
      number => number.price >= priceRange[0] && number.price <= priceRange[1]
    );
    setFilteredNumbers(filtered);
  };

  const handleBuyNow = (number, price) => {
    const message = `Hi, I'm interested in purchasing VIP number ${number} for ${price} INR`;
    const whatsappUrl = `https://wa.me/YOUR_WHATSAPP_NUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">VIP Mobile Numbers</h1>
        
        {/* Price Range Filter */}
<div className="mb-8 max-w-lg mx-auto">
  <h2 className="text-xl font-semibold mb-4">Filter by Price Range</h2>
  <div className="space-y-4">
    <div className="flex justify-between">
      <span>{formatPrice(priceRange[0])}</span>
      <span>{formatPrice(priceRange[1])}</span>
    </div>
    <div className="relative pt-1">
      <input
        type="range"
        min="0"
        max="200000"
        step="1000"
        value={priceRange[0]}
        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <input
        type="range"
        min="0"
        max="2000000"
        step="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
        className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none"
      />
    </div>
  </div>
</div>

        {filteredNumbers.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            No VIP numbers found in this price range.
          </div>
        ) : (
          <VipNumberGrid numbers={filteredNumbers} onBuyNow={handleBuyNow} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default VIPNumbersPage;