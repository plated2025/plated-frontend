import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Heart, Users, Sparkles, TrendingUp, Calendar, ArrowRight } from 'lucide-react'

function WelcomePage() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: ChefHat,
      title: 'Welcome to Plated',
      description: 'Your ultimate food social network where recipes come alive',
      color: 'from-purple-400 to-pink-400'
    },
    {
      icon: Heart,
      title: 'Discover & Share',
      description: 'Explore thousands of recipes from talented chefs around the world',
      color: 'from-pink-400 to-rose-400'
    },
    {
      icon: Users,
      title: 'Connect with Foodies',
      description: 'Follow creators, join live cooking sessions, and build your culinary community',
      color: 'from-purple-400 to-indigo-400'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Experience',
      description: 'Get personalized recommendations and smart meal planning powered by AI',
      color: 'from-indigo-400 to-blue-400'
    },
    {
      icon: Calendar,
      title: 'Plan Your Meals',
      description: 'Organize your weekly menu with our intuitive meal planner and shopping lists',
      color: 'from-blue-400 to-cyan-400'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [slides.length])

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden safe-area-inset">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-md w-full pt-safe pb-safe">
        {/* Logo */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <img 
              src="/plated-logo.png" 
              alt="Plated" 
              className="h-20 sm:h-24 w-auto drop-shadow-2xl filter brightness-0 invert"
            />
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/30 shadow-lg">
              BETA
            </span>
          </div>
          <p className="text-purple-200 text-base sm:text-lg font-medium">
            Cook. Share. Inspire.
          </p>
        </div>

        {/* Slide Content with Animation */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 mb-6 sm:mb-8 border border-white/20 shadow-2xl min-h-[280px] sm:min-h-[320px] flex flex-col items-center justify-center transition-all duration-500">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 scale-100 translate-y-0'
                  : index < currentSlide
                  ? 'opacity-0 scale-95 -translate-y-4'
                  : 'opacity-0 scale-95 translate-y-4'
              }`}
            >
              <div className="text-center px-2 sm:px-4">
                {/* Icon with Gradient */}
                <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${slide.color} rounded-2xl mb-4 sm:mb-6 shadow-xl transform transition-transform duration-700 ${
                  index === currentSlide ? 'rotate-0' : 'rotate-12'
                }`}>
                  {index === 0 ? (
                    <img 
                      src="/logo icon.png" 
                      alt="Welcome" 
                      className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                    />
                  ) : (
                    <slide.icon size={28} className="text-white sm:w-9 sm:h-9" />
                  )}
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 drop-shadow-md leading-tight">
                  {slide.title}
                </h2>

                {/* Description */}
                <p className="text-purple-100 text-sm sm:text-lg leading-relaxed max-w-xs sm:max-w-full mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => handleNavigate('/signup')}
          className="w-full bg-white hover:bg-gray-100 text-purple-700 font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group text-base sm:text-lg"
        >
          Get Started
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Already have account */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            onClick={() => handleNavigate('/login')}
            className="text-white/90 hover:text-white font-medium transition-colors text-sm sm:text-base"
          >
            Already have an account? <span className="underline">Sign In</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center text-purple-200 text-xs sm:text-sm px-4 pb-safe">
        <p>© 2025 Plated. All rights reserved.</p>
      </div>
    </div>
  )
}

export default WelcomePage
