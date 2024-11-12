export const metadata = {
  title: 'VIP Numbers - Premium Mobile Numbers',
  description: 'Browse our exclusive collection of VIP mobile numbers. Find your perfect match from our premium selection.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}