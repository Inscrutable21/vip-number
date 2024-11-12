
export const metadata = {
  title: 'VIP Numbers',
  description: 'VIP Numbers Portal',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}