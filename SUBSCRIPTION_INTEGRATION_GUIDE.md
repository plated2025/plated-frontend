# 🔧 PRO Subscription Integration Guide

Step-by-step guide to integrate PRO features throughout your app.

---

## 🚀 Quick Start

### 1. Install Hook in Component

```javascript
import { useSubscription } from '../hooks/useSubscription'

function MyComponent() {
  const { tier, isPro, isProPlus, checkAccess, checkLimit } = useSubscription()
  
  // Use subscription data...
}
```

### 2. Check Access to Features

```javascript
import { PRO_FEATURES } from '../utils/subscriptionSystem'

// Check if user can access a feature
const canUseAI = checkAccess('unlimited_ai')

if (!canUseAI) {
  // Show paywall or upgrade prompt
}
```

### 3. Check Usage Limits

```javascript
// Check if user can create another recipe today
const canCreate = checkLimit('recipesPerDay', todayRecipeCount)

if (!canCreate) {
  alert('Daily limit reached! Upgrade to PRO for unlimited recipes.')
}
```

---

## 📝 Integration Examples

### Example 1: AI Recipe Generator

```javascript
import { useState } from 'react'
import { useSubscription } from '../hooks/useSubscription'
import { PRO_FEATURES } from '../utils/subscriptionSystem'
import ProPaywall from '../components/subscription/ProPaywall'

function AIRecipeGenerator() {
  const [showPaywall, setShowPaywall] = useState(false)
  const { checkLimit } = useSubscription()
  const [generationsToday, setGenerationsToday] = useState(3)

  const handleGenerate = () => {
    // Check if user can generate (Free = 5/day, PRO = unlimited)
    if (!checkLimit('aiGenerations', generationsToday)) {
      setShowPaywall(true)
      return
    }

    // Generate recipe...
    setGenerationsToday(prev => prev + 1)
  }

  return (
    <>
      <button onClick={handleGenerate}>
        Generate AI Recipe
      </button>

      <p className="text-sm text-gray-500">
        {checkLimit('aiGenerations', generationsToday)
          ? `${generationsToday}/5 used today`
          : 'Daily limit reached'}
      </p>

      {showPaywall && (
        <ProPaywall
          feature={PRO_FEATURES.UNLIMITED_AI}
          onClose={() => setShowPaywall(false)}
        />
      )}
    </>
  )
}
```

---

### Example 2: Simple Button with Auto-Paywall

```javascript
import ProFeatureButton from '../components/subscription/ProFeatureButton'
import { PRO_FEATURES } from '../utils/subscriptionSystem'

function MyFeature() {
  const handleUseFeature = () => {
    // Feature code - only runs if user has access
    console.log('Using premium feature!')
  }

  return (
    <ProFeatureButton
      feature={PRO_FEATURES.PREMIUM_TEMPLATES}
      onClick={handleUseFeature}
      variant="primary"
    >
      Use Premium Template
    </ProFeatureButton>
  )
}
```

---

### Example 3: Profile Banner Upload (PRO Feature)

```javascript
import { useSubscription } from '../hooks/useSubscription'
import ProBadge from '../components/subscription/ProBadge'
import ProFeatureButton from '../components/subscription/ProFeatureButton'
import { PRO_FEATURES } from '../utils/subscriptionSystem'

function ProfileSettings() {
  const { tier, checkAccess } = useSubscription()

  const handleUploadBanner = () => {
    // Upload banner...
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h3>Custom Banner</h3>
        <ProBadge tier={tier} size="sm" />
      </div>

      {checkAccess('custom_banner') ? (
        <button onClick={handleUploadBanner}>
          Upload Custom Banner
        </button>
      ) : (
        <ProFeatureButton
          feature={PRO_FEATURES.CUSTOM_BANNER}
          onClick={handleUploadBanner}
        >
          Unlock Custom Banner
        </ProFeatureButton>
      )}
    </div>
  )
}
```

---

### Example 4: Recipe Creation Limit

```javascript
import { useState, useEffect } from 'react'
import { useSubscription } from '../hooks/useSubscription'
import ProPaywall from '../components/subscription/ProPaywall'
import { PRO_FEATURES } from '../utils/subscriptionSystem'

function CreateRecipePage() {
  const [recipesToday, setRecipesToday] = useState(0)
  const [showPaywall, setShowPaywall] = useState(false)
  const { checkLimit, isPro } = useSubscription()

  useEffect(() => {
    // Load today's recipe count from API/localStorage
    const count = parseInt(localStorage.getItem('recipesToday') || '0')
    setRecipesToday(count)
  }, [])

  const handleCreateRecipe = () => {
    if (!checkLimit('recipesPerDay', recipesToday)) {
      setShowPaywall(true)
      return
    }

    // Create recipe...
    const newCount = recipesToday + 1
    setRecipesToday(newCount)
    localStorage.setItem('recipesToday', newCount.toString())
  }

  return (
    <div>
      <button onClick={handleCreateRecipe}>
        Create Recipe
      </button>

      {!isPro && (
        <p className="text-sm text-gray-500">
          {recipesToday}/10 recipes today
          {recipesToday >= 8 && (
            <span className="text-orange-600 font-semibold ml-2">
              Almost at limit! Upgrade for unlimited
            </span>
          )}
        </p>
      )}

      {showPaywall && (
        <ProPaywall
          feature={PRO_FEATURES.UNLIMITED_RECIPES}
          onClose={() => setShowPaywall(false)}
        />
      )}
    </div>
  )
}
```

---

### Example 5: Analytics Dashboard (PRO Only)

```javascript
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'
import ProBadge from '../components/subscription/ProBadge'

function AnalyticsPage() {
  const navigate = useNavigate()
  const { checkAccess } = useSubscription()

  useEffect(() => {
    if (!checkAccess('analytics_dashboard')) {
      // Redirect to subscription page
      navigate('/subscription')
    }
  }, [checkAccess, navigate])

  if (!checkAccess('analytics_dashboard')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2>Upgrade to PRO</h2>
          <p>Analytics requires a PRO subscription</p>
          <button onClick={() => navigate('/subscription')}>
            Upgrade Now
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <h1>Analytics Dashboard</h1>
        <ProBadge tier="pro" size="md" />
      </div>
      {/* Analytics content */}
    </div>
  )
}
```

---

### Example 6: Settings Integration

```javascript
import { useSubscription } from '../hooks/useSubscription'
import ProBadge from '../components/subscription/ProBadge'

function SettingsPage() {
  const { tier, isPro, isProPlus, tierData } = useSubscription()

  return (
    <div>
      {/* Subscription Status Card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-bold">Subscription</h3>
            <ProBadge tier={tier} size="md" />
          </div>
          {!isPro && (
            <button
              onClick={() => navigate('/subscription')}
              className="btn-primary"
            >
              Upgrade to PRO
            </button>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-gray-600">Current Plan: {tierData.name}</p>
          
          {isPro && (
            <>
              <p className="text-gray-600">
                Price: ${tierData.price}/month
              </p>
              <button className="text-red-600 text-sm">
                Cancel Subscription
              </button>
            </>
          )}
        </div>
      </div>

      {/* Feature Access List */}
      <div className="card p-6 mt-4">
        <h3 className="font-bold mb-4">Your Features</h3>
        <ul className="space-y-2">
          {tierData.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check size={16} className="text-green-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

---

## 🎨 UI Patterns

### 1. Locked Feature Card

```javascript
function FeatureCard({ feature, locked }) {
  return (
    <div className={`card p-6 relative ${locked ? 'opacity-60' : ''}`}>
      {locked && (
        <div className="absolute top-4 right-4">
          <ProBadge tier="pro" size="sm" />
        </div>
      )}
      
      <h3>{feature.name}</h3>
      <p>{feature.description}</p>
      
      {locked ? (
        <ProFeatureButton
          feature={feature}
          onClick={() => {}}
        >
          Unlock with PRO
        </ProFeatureButton>
      ) : (
        <button>Use Feature</button>
      )}
    </div>
  )
}
```

---

### 2. Soft Gate (Show Preview)

```javascript
function PremiumFilters() {
  const { checkAccess } = useSubscription()
  const hasAccess = checkAccess('premium_filters')

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {/* Show first 3 filters to everyone */}
        {filters.slice(0, 3).map(filter => (
          <FilterCard key={filter.id} filter={filter} />
        ))}
        
        {/* Show locked filters to free users */}
        {!hasAccess && filters.slice(3).map(filter => (
          <div key={filter.id} className="relative">
            <FilterCard filter={filter} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Lock className="text-white" size={32} />
            </div>
          </div>
        ))}
        
        {/* Show all to PRO users */}
        {hasAccess && filters.slice(3).map(filter => (
          <FilterCard key={filter.id} filter={filter} />
        ))}
      </div>
    </div>
  )
}
```

---

### 3. Upgrade Banner

```javascript
function UpgradeBanner() {
  const { isPro } = useSubscription()
  const navigate = useNavigate()

  if (isPro) return null

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 p-4 rounded-xl text-white flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Crown size={24} />
        <div>
          <p className="font-bold">Upgrade to PRO</p>
          <p className="text-sm opacity-90">Unlock unlimited features</p>
        </div>
      </div>
      <button
        onClick={() => navigate('/subscription')}
        className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
      >
        Upgrade Now
      </button>
    </div>
  )
}
```

---

## 🔐 Security Best Practices

### Server-Side Validation
```javascript
// ALWAYS validate on server
app.post('/api/create-recipe', authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId)
  
  // Check subscription server-side
  if (user.subscriptionTier === 'free') {
    const todayCount = await Recipe.countDocuments({
      userId: user._id,
      createdAt: { $gte: startOfDay(new Date()) }
    })
    
    if (todayCount >= 10) {
      return res.status(403).json({
        error: 'Daily limit reached',
        upgrade: true
      })
    }
  }
  
  // Create recipe...
})
```

### Never Trust Client
- Always verify subscription status on server
- Don't just check localStorage/client state
- Validate limits server-side
- Use webhook to update status
- Implement proper authentication

---

## 📊 Tracking & Analytics

### Track Conversions

```javascript
// When paywall is shown
analytics.track('Paywall Shown', {
  feature: feature.id,
  userTier: tier
})

// When user clicks upgrade
analytics.track('Upgrade Clicked', {
  source: 'paywall',
  feature: feature.id,
  userTier: tier
})

// When subscription succeeds
analytics.track('Subscription Started', {
  tier: newTier,
  price: price,
  interval: billingInterval
})
```

---

## ✅ Checklist

Before launching PRO features:

- [ ] Test all paywalls
- [ ] Verify feature access logic
- [ ] Test limit enforcement
- [ ] Set up payment provider
- [ ] Configure webhooks
- [ ] Test trial period
- [ ] Test cancellation flow
- [ ] Add analytics tracking
- [ ] Create support docs
- [ ] Test promo codes
- [ ] Verify server-side validation
- [ ] Test on mobile
- [ ] Legal review (terms, privacy)
- [ ] Set up refund process

---

## 🎯 Quick Reference

```javascript
// Check if PRO
if (isPro) { /* ... */ }

// Check if PRO+
if (isProPlus) { /* ... */ }

// Check feature access
if (checkAccess('feature_id')) { /* ... */ }

// Check limit
if (checkLimit('action', count)) { /* ... */ }

// Show PRO badge
<ProBadge tier={tier} size="md" />

// Auto-paywall button
<ProFeatureButton feature={feature} onClick={handler}>
  Button Text
</ProFeatureButton>

// Manual paywall
<ProPaywall feature={feature} onClose={handleClose} />
```

---

## 🚀 Ready to Launch!

Your PRO subscription system is production-ready. Just connect to your payment provider and start monetizing! 💰👑
