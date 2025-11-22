import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown, ChevronUp } from 'lucide-react'

function HelpCenterPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const faqCategories = [
    {
      id: 1,
      title: 'Getting Started',
      questions: [
        {
          id: 1,
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the "Sign Up" button on the login page. Fill in your details or use social sign-up with Google or Apple.'
        },
        {
          id: 2,
          question: 'What\'s the difference between Creator and User accounts?',
          answer: 'Creator accounts have access to additional features like posting recipes, going live, and detailed analytics. User accounts can browse, save, and plan meals.'
        }
      ]
    },
    {
      id: 2,
      title: 'Recipes & Content',
      questions: [
        {
          id: 3,
          question: 'How do I post a recipe?',
          answer: 'Tap the + button in the navigation bar, select "Recipe Post", and fill in the details including ingredients, steps, and a photo.'
        },
        {
          id: 4,
          question: 'Can I edit or delete my recipes?',
          answer: 'Yes! Go to your profile, tap on any recipe, and select the menu icon to edit or delete it.'
        },
        {
          id: 5,
          question: 'How do I save recipes?',
          answer: 'Tap the bookmark icon on any recipe to save it to your collection. Access saved recipes from your profile.'
        }
      ]
    },
    {
      id: 3,
      title: 'Meal Planner',
      questions: [
        {
          id: 6,
          question: 'How does the meal planner work?',
          answer: 'The meal planner lets you schedule recipes for specific days and meal times. Add recipes by tapping the + button on any day slot.'
        },
        {
          id: 7,
          question: 'Can I generate a shopping list?',
          answer: 'Yes! Once you\'ve added meals to your planner, tap the "Shopping List" button to automatically generate a list of all ingredients needed.'
        }
      ]
    },
    {
      id: 4,
      title: 'Account & Privacy',
      questions: [
        {
          id: 8,
          question: 'How do I make my account private?',
          answer: 'Go to Settings > Privacy & Security and toggle "Private Account". Only approved followers will see your content.'
        },
        {
          id: 9,
          question: 'How do I block someone?',
          answer: 'Visit their profile, tap the menu icon, and select "Block User". They won\'t be able to see your content or message you.'
        }
      ]
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Help Center</h1>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
        </div>
      </header>

      {/* FAQ Categories */}
      <div className="p-4 space-y-4">
        {faqCategories.map(category => (
          <div key={category.id} className="card overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">{category.title}</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {category.questions.map(q => (
                <div key={q.id}>
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{q.question}</span>
                    {expandedId === q.id ? (
                      <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedId === q.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-700 leading-relaxed">{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="p-4">
        <div className="card p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Can't find what you're looking for? Contact our support team.
          </p>
          <button
            onClick={() => navigate('/report')}
            className="btn-primary"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpCenterPage
