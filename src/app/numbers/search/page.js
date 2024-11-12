'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
import VipNumberGrid from '@/components/landing/VipNumberGrid';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = searchParams.get('query');
  const type = searchParams.get('type');

  // Function to handle WhatsApp redirection
  const handleBuyNow = (number, price) => {
    const message = `Hello! I'm interested in buying VIP number ${number} priced at ₹${price.toLocaleString()}. Please provide more details.`;
    const phoneNumber = '919651990083';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/vip-numbers/search?query=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch results');
        }

        setResults(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query, type]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600 mt-1">
              Found {results.length} matching numbers
            </p>
          </div>

          {results.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
              No VIP numbers found matching your search criteria.
            </div>
          ) : (
            <VipNumberGrid numbers={results} onBuyNow={handleBuyNow} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}