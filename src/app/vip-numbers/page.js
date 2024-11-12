"use client"
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import VipNumberGrid from '@/components/landing/VipNumberGrid';

const VIPNumbersPage = () => {
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchVIPNumbers();
  }, []);

  useEffect(() => {
    if (mounted) {
      filterNumbers();
    }
  }, [numbers, priceRange, mounted]);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 w-full">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading VIP Numbers...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 w-full">
        <Header />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md w-full text-center">
            <p className="text-red-600">Error: {error}</p>
            <button 
              onClick={fetchVIPNumbers}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full overflow-x-hidden">
      <Header />
      <main className="flex-1 w-full pt-20 sm:pt-12"> {/* Added padding-top to prevent overlap */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 relative z-10"> {/* Added relative and z-10 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Premium VIP Numbers
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose from our exclusive collection of VIP mobile numbers. 
              Find the perfect number that matches your personality.
            </p>
          </div>
          
          {/* Price Range Filter */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 max-w-2xl mx-auto w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Filter by Price Range
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
              <div className="relative pt-1">
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Numbers Grid */}
          {filteredNumbers.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
                <p className="text-gray-600 text-lg">
                  No VIP numbers found in this price range.
                </p>
                <button
                  onClick={() => setPriceRange([0, 2000000])}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-gray-600">
                  Showing {filteredNumbers.length} numbers
                </p>
                <select
                  className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const sortedNumbers = [...filteredNumbers];
                    if (e.target.value === 'price-asc') {
                      sortedNumbers.sort((a, b) => a.price - b.price);
                    } else if (e.target.value === 'price-desc') {
                      sortedNumbers.sort((a, b) => b.price - a.price);
                    }
                    setFilteredNumbers(sortedNumbers);
                  }}
                >
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
              
              <VipNumberGrid numbers={filteredNumbers} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VIPNumbersPage;