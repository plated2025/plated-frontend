import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChefHat, Search, PlusSquare, Calendar, Heart } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function TutorialPage() {
  const navigate = useNavigate()
  const { completeOnboarding, userType } = useApp()
  const [currentStep, setCurrentStep] = useState(0)

  const tutorialSteps = [
    {
      icon: Search,
      title: 'Discover Recipes',
      description: 'Explore thousands of recipes from creators worldwide. Filter by cuisine, difficulty, and dietary preferences.',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Save & Plan Meals',
      description: 'Save your favorite recipes and add them to your weekly meal planner. Generate shopping lists automatically.',
      color: 'text-red-600'
    },
    {
      icon: PlusSquare,
      title: 'Share Your Creations',
      description: 'Post your own recipes, share cooking stories, and even host live cooking sessions.',
      color: 'text-green-600'
    },
    {
      icon: Calendar,
      title: 'Stay Organized',
      description: 'Use the meal planner to organize your weekly meals and never forget an ingredient with smart shopping lists.',
      color: 'text-purple-600'
    }
  ]

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Only show achievements for creators
      if (userType === 'creator') {
        navigate('/onboarding/achievements')
      } else {
        // Regular users skip achievements and complete onboarding
        completeOnboarding()
        navigate('/')
      }
    }
  }

  const handleSkip = () => {
    // Only show achievements for creators
    if (userType === 'creator') {
      navigate('/onboarding/achievements')
    } else {
      // Regular users complete onboarding
      completeOnboarding()
      navigate('/')
    }
  }

  const step = tutorialSteps[currentStep]
  const Icon = step.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Skip Button */}
        <div className="text-right mb-4">
          <button onClick={handleSkip} className="text-gray-600 hover:text-gray-800 text-sm font-medium">
            Skip Tutorial
          </button>
        </div>

        {/* Tutorial Card */}
        <div className="card p-8 text-center">
          {/* Icon */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg mb-6 ${step.color}`}>
            <Icon size={40} />
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{step.description}</p>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? 'w-8 bg-primary-600' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button onClick={handleNext} className="btn-primary w-full">
            {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>

        {/* Step Counter */}
        <p className="text-center mt-4 text-sm text-gray-600">
          Step {currentStep + 1} of {tutorialSteps.length}
        </p>
      </div>
    </div>
  )
}

export default TutorialPage
