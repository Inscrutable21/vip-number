'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('anywhere');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchError('Please enter a search term');
      setTimeout(() => setSearchError(''), 3000); // Auto-hide error after 3s
      return;
    }

    setIsSearching(true);
    setSearchError('');
    
    try {
      const params = new URLSearchParams({
        query: searchQuery.trim(),
        type: searchType
      });
      router.push(`/numbers/search?${params.toString()}`);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('An error occurred while searching. Please try again.');
      setTimeout(() => setSearchError(''), 3000);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header Content */}
          <div className="flex justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img 
                  src="/logo.jpg" 
                  alt="VIP Numbers Logo" 
                  className="h-10 md:h-12 lg:h-16 w-auto object-contain transition-all duration-300"
                />
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="flex w-full max-w-2xl">
                <div className="flex flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search VIP numbers..."
                    className="w-full px-4 py-2 lg:py-3 bg-gray-50 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    aria-label="Search VIP numbers"
                  />
                  
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="px-3 lg:px-4 py-2 lg:py-3 bg-gray-50 border-y border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    aria-label="Search type"
                  >
                    <option value="anywhere">Anywhere</option>
                    <option value="start">Start With</option>
                    <option value="end">End With</option>
                  </select>
                  
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="flex items-center justify-center min-w-[4rem] px-4 lg:px-6 py-2 lg:py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-400"
                  >
                    {isSearching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors text-base lg:text-lg font-medium"
              >
                Home
              </Link>
              <Link 
                href="/vip-numbers" 
                className="text-gray-700 hover:text-blue-600 transition-colors text-base lg:text-lg font-medium"
              >
                All Numbers
              </Link>
              <a
                href="tel:7026922222"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-base lg:text-lg font-medium"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="flex flex-col gap-2">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search VIP numbers..."
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search VIP numbers"
                />
                <select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="px-3 py-2 bg-gray-50 border-y border-r border-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Search type"
                >
                  <option value="anywhere">Anywhere</option>
                  <option value="start">Start With</option>
                  <option value="end">End With</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:bg-blue-400"
              >
                {isSearching ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Error Message */}
        {searchError && (
          <div className="absolute left-0 right-0 flex justify-center">
            <div className="mx-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-md transition-all duration-300 text-sm">
              {searchError}
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0 overflow-hidden'}`}>
          <div className="border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/vip-numbers"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                All Numbers
              </Link>
              <a
                href="tel:7026922222"
                className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Now
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer for fixed header */}
      <div className="h-32 md:h-20 lg:h-24" />
    </>
  );
}