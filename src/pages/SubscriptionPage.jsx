import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Crown, Star, Sparkles, Zap, X } from 'lucide-react'
import { SUBSCRIPTION_TIERS, calculateAnnualSavings, validatePromoCode, applyPromoCode } from '../utils/subscriptionSystem'

function SubscriptionPage() {
  const navigate = useNavigate()
  const [billingInterval, setBillingInterval] = useState('monthly')
  const [selectedTier, setSelectedTier] = useState(null)
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)
  const [showPromoInput, setShowPromoInput] = useState(false)

  const handleApplyPromo = () => {
    const promo = validatePromoCode(promoCode)
    if (promo) {
      setAppliedPromo(promo)
      alert(`✓ Promo code applied! ${promo.description}`)
    } else {
      alert('❌ Invalid promo code')
    }
  }

  const handleSubscribe = (tier) => {
    setSelectedTier(tier)
    // In production, this would open payment modal/redirect to Stripe
    alert(`Subscribing to ${tier.name}...`)
  }

  const tiers = [SUBSCRIPTION_TIERS.FREE, SUBSCRIPTION_TIERS.PRO, SUBSCRIPTION_TIERS.PRO_PLUS]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Go PRO</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4">
            <Crown size={48} className="text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get unlimited access to premium features, exclusive badges, and become a true Master Chef
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${
                billingInterval === 'annual'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tiers.map((tier, index) => {
            const savings = billingInterval === 'annual' ? calculateAnnualSavings(tier.price) : null
            const finalPrice = billingInterval === 'annual' && tier.price > 0
              ? savings.annualPrice / 12
              : tier.price

            const discountedPrice = appliedPromo
              ? applyPromoCode(finalPrice, appliedPromo)
              : finalPrice

            return (
              <div
                key={tier.id}
                className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                  tier.popular
                    ? 'ring-4 ring-primary-500 shadow-2xl scale-105'
                    : 'shadow-lg hover:shadow-xl'
                } ${
                  index === 0
                    ? 'bg-white dark:bg-gray-800'
                    : index === 1
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-600 to-purple-600 text-white px-4 py-1 rounded-bl-2xl font-semibold text-sm flex items-center gap-1">
                    <Sparkles size={14} />
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  {/* Tier Badge */}
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${tier.badgeColor} text-white font-bold text-lg mb-4`}>
                    <span>{tier.badge}</span>
                    {tier.name}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    {tier.price === 0 ? (
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">Free</div>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-5xl font-bold text-gray-900 dark:text-white">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">/mo</span>
                        </div>
                        {appliedPromo && (
                          <div className="text-sm text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <Check size={14} />
                            {appliedPromo.description}
                          </div>
                        )}
                        {billingInterval === 'annual' && (
                          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Billed ${savings.annualPrice}/year
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check size={20} className={`flex-shrink-0 ${
                          index === 0
                            ? 'text-gray-600'
                            : index === 1
                            ? 'text-orange-600'
                            : 'text-purple-600'
                        }`} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSubscribe(tier)}
                    className={`w-full py-3 rounded-xl font-bold text-lg transition-all ${
                      tier.price === 0
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                        : tier.popular
                        ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg'
                    }`}
                  >
                    {tier.price === 0 ? 'Current Plan' : 'Upgrade Now'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Promo Code Section */}
        <div className="max-w-md mx-auto mb-12">
          {!showPromoInput ? (
            <button
              onClick={() => setShowPromoInput(true)}
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline flex items-center gap-2 mx-auto"
            >
              <Zap size={16} />
              Have a promo code?
            </button>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-gray-900 dark:text-white">Enter Promo Code</p>
                <button
                  onClick={() => setShowPromoInput(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  placeholder="EARLYBIRD"
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    ✓ {appliedPromo.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Compare Features
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 text-gray-900 dark:text-white font-semibold">Feature</th>
                  <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">Free</th>
                  <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">PRO</th>
                  <th className="text-center py-4 px-4 text-gray-900 dark:text-white font-semibold">PRO+</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Recipes per day</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">Unlimited</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">AI Generations</td>
                  <td className="text-center py-3 px-4">5/day</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">Unlimited</td>
                  <td className="text-center py-3 px-4 font-semibold text-green-600">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Custom Banner</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Analytics</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Verified Badge</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700 dark:text-gray-300">Monetization</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4 text-gray-400">-</td>
                  <td className="text-center py-3 px-4"><Check className="mx-auto text-green-600" size={20} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 dark:text-gray-400">Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-600 dark:text-gray-400">We accept all major credit cards, PayPal, Apple Pay, and Google Pay.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 dark:text-gray-400">Yes! All PRO plans come with a 7-day free trial. No credit card required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPage
