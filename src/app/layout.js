'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

// Metadata needs to be in a separate file since we're using 'use client'
// Create a separate metadata.js file for this

function RootLayout({ children }) {
  // Add state to handle client-side rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>VIP Numbers Shop</title>
        <meta name="description" content="Premium VIP number service - Site under development" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {isClient ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      </body>
    </html>
  );
}

export default RootLayout;