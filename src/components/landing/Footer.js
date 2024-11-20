// src/components/landing/Footer.js
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">VIP Numbers</h3>
            <p className="text-gray-400 mb-4">
              Premium VIP mobile numbers for those who desire exclusivity and distinction.
            </p>
            <div className="flex space-x-4">
              <a href="" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/vipnumbershop.in_?igsh=eGwybHAzZjdyNDhm" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/vip-numbers" className="text-gray-400 hover:text-white transition-colors">
                  All Numbers
                </Link>
              </li>
              <li>
                <Link href="/vip-numbers" className="text-gray-400 hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">We have</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Fancy Numbers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Mirror Numbers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Sequence Numbers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Special Numbers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="tel:+919119991466" className="text-gray-400 hover:text-white transition-colors">
                  +91 70269 22222
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="mailto:contact@vipnumbers.com" className="text-gray-400 hover:text-white transition-colors">
                  Vipnumbershop.india@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Mundera Bazar Chauri-Chaura<br />
                  Gorakhpur (273201) Uttar Pradesh
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} VIP Numbers. All rights reserved.
          </p>
          <p className="text-center text-gray-400 flex items-center justify-center gap-2">
            Developed by{' '}
            <a 
              href="https://www.instagram.com/localbuzzagency" 
              className="hover:text-white transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              LocalBuzz Agency
              <Instagram className="w-4 h-4" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}