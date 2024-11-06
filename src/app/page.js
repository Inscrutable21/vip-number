'use client'
import { useState, useEffect } from "react"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-white p-8 md:p-16">
      <div className={"max-w-3xl mx-auto transition-opacity duration-1000 " + 
        (isVisible ? "opacity-100" : "opacity-0")}>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-12 hover:text-gray-600 transition-colors duration-300">
          VIP Numbers
        </h1>
        <div className="relative bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8 overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400 group-hover:w-full transition-all duration-500 opacity-20"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span className="animate-pulse">🚧</span> 
            Site Under Development
          </h2>
          <p className="text-gray-600 text-lg">
            We&apos;re working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
        <footer className="mt-16 text-gray-500 hover:text-gray-700 transition-colors duration-300">
          © {new Date().getFullYear()} VIP Numbers. All rights reserved.
        </footer>
      </div>
    </main>
  )
}
