import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, Target, DollarSign, Calendar, Sparkles, Check, ChevronRight } from 'lucide-react'
import { AD_TYPES, OBJECTIVES, PLACEMENTS, BUDGET_OPTIONS, calculateEstimatedReach, validateCampaign, generateCampaignId } from '../../utils/advertisingSystem'

function CreateCampaignPage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [campaign, setCampaign] = useState({
    name: '',
    objective: '',
    adType: '',
    content: null,
    targeting: {
      location: 'worldwide',
      ageRange: [18, 65],
      gender: 'all',
      interests: []
    },
    placements: ['feed'],
    budgetType: 'daily',
    budget: 20,
    duration: 7,
    startDate: new Date().toISOString().split('T')[0]
  })

  const steps = [
    { id: 1, name: 'Campaign Goal', icon: Target },
    { id: 2, name: 'Ad Type', icon: Sparkles },
    { id: 3, name: 'Audience', icon: TrendingUp },
    { id: 4, name: 'Budget & Schedule', icon: DollarSign },
    { id: 5, name: 'Review & Publish', icon: Check }
  ]

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      handlePublish()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = () => {
    const validation = validateCampaign(campaign)
    if (!validation.isValid) {
      alert('Please complete all required fields:\n' + validation.errors.join('\n'))
      return
    }

    const campaignId = generateCampaignId()
    const newCampaign = {
      ...campaign,
      id: campaignId,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Save to localStorage (in production, this would be an API call)
    const campaigns = JSON.parse(localStorage.getItem('adCampaigns') || '[]')
    campaigns.push(newCampaign)
    localStorage.setItem('adCampaigns', JSON.stringify(campaigns))

    alert('Campaign created successfully! It will be reviewed within 24 hours.')
    navigate('/advertising/campaigns')
  }

  const estimatedReach = calculateEstimatedReach(campaign.budget, campaign.duration, campaign.targeting)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Create Campaign</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/advertising/campaigns')}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Save Draft
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-primary-600 text-white shadow-lg'
                          : isCompleted
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                    </div>
                    <p className={`text-sm mt-2 ${isActive ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 ${isCompleted ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
          {currentStep === 1 && (
            <StepObjective campaign={campaign} setCampaign={setCampaign} />
          )}
          {currentStep === 2 && (
            <StepAdType campaign={campaign} setCampaign={setCampaign} />
          )}
          {currentStep === 3 && (
            <StepTargeting campaign={campaign} setCampaign={setCampaign} />
          )}
          {currentStep === 4 && (
            <StepBudget campaign={campaign} setCampaign={setCampaign} />
          )}
          {currentStep === 5 && (
            <StepReview campaign={campaign} estimatedReach={estimatedReach} />
          )}
        </div>

        {/* Estimated Reach Sidebar */}
        {currentStep >= 3 && (
          <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Estimated Results
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{estimatedReach.minReach.toLocaleString()}-{estimatedReach.maxReach.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">People Reached</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">${estimatedReach.cpm}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cost per 1K</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{estimatedReach.estimatedImpressions.toLocaleString()}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Impressions</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
          >
            {currentStep === 5 ? 'Publish Campaign' : 'Continue'}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Step 1: Campaign Objective
function StepObjective({ campaign, setCampaign }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What's your campaign goal?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Choose what you want to achieve with your ad</p>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(OBJECTIVES).map((objective) => (
          <button
            key={objective.id}
            onClick={() => setCampaign({ ...campaign, objective: objective.id })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              campaign.objective === objective.id
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-3xl mb-3">{objective.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{objective.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{objective.description}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Metric: {objective.metric}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// Step 2: Ad Type
function StepAdType({ campaign, setCampaign }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">What do you want to promote?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Select the type of content to advertise</p>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.values(AD_TYPES).map((adType) => (
          <button
            key={adType.id}
            onClick={() => setCampaign({ ...campaign, adType: adType.id })}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              campaign.adType === adType.id
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
            }`}
          >
            <div className="text-3xl mb-3">{adType.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{adType.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{adType.description}</p>
            <p className="text-xs font-semibold text-primary-600">From ${adType.minBudget}/day</p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Campaign Name</label>
        <input
          type="text"
          value={campaign.name}
          onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
          placeholder="Enter campaign name..."
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  )
}

// Step 3: Targeting
function StepTargeting({ campaign, setCampaign }) {
  const interests = ['Baking', 'Healthy Eating', 'Italian Cuisine', 'Asian Cuisine', 'Vegan', 'Keto', 'Quick Meals', 'Desserts']

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Who should see your ad?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Define your target audience</p>

      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Location</label>
          <select
            value={campaign.targeting.location}
            onChange={(e) => setCampaign({
              ...campaign,
              targeting: { ...campaign.targeting, location: e.target.value }
            })}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="worldwide">Worldwide</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
          </select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Age Range: {campaign.targeting.ageRange[0]} - {campaign.targeting.ageRange[1]} years
          </label>
          <input
            type="range"
            min="13"
            max="65"
            value={campaign.targeting.ageRange[0]}
            onChange={(e) => setCampaign({
              ...campaign,
              targeting: { ...campaign.targeting, ageRange: [parseInt(e.target.value), campaign.targeting.ageRange[1]] }
            })}
            className="w-full"
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const newInterests = campaign.targeting.interests.includes(interest)
                    ? campaign.targeting.interests.filter(i => i !== interest)
                    : [...campaign.targeting.interests, interest]
                  setCampaign({
                    ...campaign,
                    targeting: { ...campaign.targeting, interests: newInterests }
                  })
                }}
                className={`px-4 py-2 rounded-full transition-all ${
                  campaign.targeting.interests.includes(interest)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 4: Budget
function StepBudget({ campaign, setCampaign }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Set your budget</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Choose how much you want to spend</p>

      <div className="space-y-6">
        {/* Budget Type */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setCampaign({ ...campaign, budgetType: 'daily' })}
            className={`p-6 rounded-xl border-2 ${
              campaign.budgetType === 'daily'
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Daily Budget</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Spend limit per day</p>
          </button>
          <button
            onClick={() => setCampaign({ ...campaign, budgetType: 'lifetime' })}
            className={`p-6 rounded-xl border-2 ${
              campaign.budgetType === 'lifetime'
                ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Lifetime Budget</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total campaign budget</p>
          </button>
        </div>

        {/* Budget Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            {campaign.budgetType === 'daily' ? 'Daily' : 'Total'} Budget: ${campaign.budget}
          </label>
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={campaign.budget}
            onChange={(e) => setCampaign({ ...campaign, budget: parseInt(e.target.value) })}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>$5</span>
            <span>$500</span>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Campaign Duration: {campaign.duration} days
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={campaign.duration}
            onChange={(e) => setCampaign({ ...campaign, duration: parseInt(e.target.value) })}
            className="w-full mb-2"
          />
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">Start Date</label>
          <input
            type="date"
            value={campaign.startDate}
            onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Total Cost */}
        <div className="p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Campaign Cost</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                ${campaign.budgetType === 'daily' ? campaign.budget * campaign.duration : campaign.budget}
              </p>
            </div>
            <DollarSign size={48} className="text-primary-600 opacity-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Step 5: Review
function StepReview({ campaign, estimatedReach }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review your campaign</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Double-check everything before publishing</p>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Campaign Name</p>
          <p className="font-semibold text-gray-900 dark:text-white">{campaign.name || 'Untitled Campaign'}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Objective</p>
          <p className="font-semibold text-gray-900 dark:text-white">{OBJECTIVES[campaign.objective?.toUpperCase()]?.name}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Ad Type</p>
          <p className="font-semibold text-gray-900 dark:text-white">{AD_TYPES[campaign.adType?.toUpperCase()]?.name}</p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Budget</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            ${campaign.budget}/{campaign.budgetType === 'daily' ? 'day' : 'total'} for {campaign.duration} days
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Reach</p>
          <p className="font-semibold text-gray-900 dark:text-white">
            {estimatedReach.minReach.toLocaleString()} - {estimatedReach.maxReach.toLocaleString()} people
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateCampaignPage
