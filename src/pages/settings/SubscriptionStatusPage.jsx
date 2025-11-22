import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Crown, Check, Sparkles, Zap, Star, ChefHat } from 'lucide-react'

function SubscriptionStatusPage() {
  const navigate = useNavigate()
  const [currentPlan, setCurrentPlan] = useState('free')

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      icon: ChefHat,
      color: 'gray',
      features: [
        'Browse unlimited recipes',
        'Save up to 20 recipes',
        'Basic meal planner',
        'Standard search filters',
        'Community access'
      ]
    },
    {
      id: 'plus',
      name: 'Plated Plus',
      price: 9.99,
      period: 'month',
      icon: Star,
      color: 'blue',
      popular: true,
      features: [
        'Everything in Free',
        'Save unlimited recipes',
        'Advanced meal planner',
        'AI recipe suggestions',
        'Nutrition tracking',
        'Shopping list generator',
        'No ads',
        'Priority support'
      ]
    },
    {
      id: 'pro',
      name: 'Plated Pro',
      price: 19.99,
      period: 'month',
      icon: Crown,
      color: 'purple',
      features: [
        'Everything in Plus',
        'Personalized meal plans',
        'Video cooking classes',
        'Live chef Q&A sessions',
        'Advanced analytics',
        'Recipe collaboration',
        'White-label content',
        'Premium filters & effects',
        'Early access to features'
      ]
    }
  ]

  const handleSelectPlan = (planId) => {
    if (planId === 'free') {
      if (confirm('Downgrade to Free plan? You will lose premium features.')) {
        setCurrentPlan('free')
        alert('Downgraded to Free plan')
      }
    } else {
      alert(`Upgrade to ${planId === 'plus' ? 'Plated Plus' : 'Plated Pro'} - Payment integration coming soon!`)
      setCurrentPlan(planId)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-900 dark:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Subscription</h1>
        </div>
      </header>

      {/* Current Plan Banner */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles size={24} />
            <h2 className="text-xl font-bold">Current Plan</h2>
          </div>
          <p className="text-2xl font-bold mb-1">
            {plans.find(p => p.id === currentPlan)?.name}
          </p>
          <p className="opacity-90">
            {currentPlan === 'free' ? 'Free Forever' : `$${plans.find(p => p.id === currentPlan)?.price}/month`}
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="px-4 pb-4 space-y-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Available Plans
        </h2>

        {plans.map((plan) => {
          const Icon = plan.icon
          const isCurrentPlan = currentPlan === plan.id
          
          return (
            <div
              key={plan.id}
              className={`bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border-2 relative ${
                isCurrentPlan 
                  ? 'border-primary-600 dark:border-primary-400' 
                  : 'border-gray-200 dark:border-gray-800'
              } ${plan.popular ? 'ring-2 ring-primary-400 ring-offset-2' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && (
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Check size={12} />
                    Current
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 rounded-xl flex items-center justify-center`}>
                  <Icon size={24} className={`text-${plan.color}-600 dark:text-${plan.color}-400`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {plan.price === 0 ? (
                      'Free forever'
                    ) : (
                      <>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          ${plan.price}
                        </span>
                        <span className="text-sm">/{plan.period}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check size={16} className="text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {!isCurrentPlan && (
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.id === 'free'
                      ? 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg'
                  }`}
                >
                  {plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'}
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* FAQ Section */}
      <div className="px-4 pb-8">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Frequently Asked Questions
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800 shadow-sm">
          <details className="p-4 group">
            <summary className="font-medium text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              Can I cancel anytime?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
            </p>
          </details>

          <details className="p-4 group">
            <summary className="font-medium text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              What payment methods do you accept?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              We accept all major credit cards, debit cards, PayPal, and Apple Pay.
            </p>
          </details>

          <details className="p-4 group">
            <summary className="font-medium text-gray-900 dark:text-white cursor-pointer list-none flex items-center justify-between">
              Is there a free trial?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Yes! All paid plans come with a 7-day free trial. No credit card required to start.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionStatusPage
