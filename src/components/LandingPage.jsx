import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Cog, ArrowRight } from 'lucide-react'

export default function LandingPage() {

  const [mounted, setMounted] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isSubscribed) {
      const timer = setTimeout(() => {
        setIsSubscribed(false)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [isSubscribed])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-800 animate-spin"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 150 + 50}px`,
              animationDuration: `${Math.random() * 60 + 30}s`,
            }}
          >
            <Cog />
          </div>
        ))}
      </div>

      <div className="z-10 text-center px-4 sm:px-6 lg:px-8 animate-fade-in-up mt-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Spend-Sense
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-md mx-auto">
          Your intelligent expense tracker for smarter financial decisions.
        </p>
        <Link to="/login">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Button>
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {['Track Expenses', 'Analyze Spending', 'Set Budgets'].map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-lg p-6 text-center hover:bg-opacity-70 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{feature}</h2>
            <p className="text-gray-400">
              {`Effortlessly ${feature.toLowerCase()} with our intuitive interface.`}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 z-10 w-full max-w-md px-4 sm:px-6 lg:px-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        {!isSubscribed ? (
          <form
            onSubmit={handleSubscribe}
            className="flex items-center space-x-2"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-gray-800 text-white border-gray-700"
            />
            <Button type="submit" size="icon" className="bg-purple-500 hover:bg-purple-600">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="text-2xl font-bold text-center text-purple-400 animate-fade-in">
            Thank You for Subscribing!
          </div>
        )}
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500 z-10">
        © 2024 Spend-Sense. All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-spin {
          animation: spin linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}