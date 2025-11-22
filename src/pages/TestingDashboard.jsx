import { useState } from 'react'
import { Check, X, Loader, AlertCircle } from 'lucide-react'
import {
  authAPI,
  recipeAPI,
  mealPlannerAPI,
  messagesAPI,
  subscriptionsAPI,
  recipeAdvancedAPI
} from '../services/api'

function TestingDashboard() {
  const [results, setResults] = useState({})
  const [testing, setTesting] = useState(false)

  const tests = [
    {
      category: 'Authentication',
      tests: [
        { name: 'Get Current User', fn: () => authAPI.me() },
      ]
    },
    {
      category: 'Recipes',
      tests: [
        { name: 'Get All Recipes', fn: () => recipeAPI.getRecipes() },
        { name: 'Get Trending Recipes', fn: () => recipeAdvancedAPI.getTrendingRecipes() },
        { name: 'Get Featured Recipes', fn: () => recipeAdvancedAPI.getFeaturedRecipes() },
        { name: 'Get Top Rated Recipes', fn: () => recipeAdvancedAPI.getTopRatedRecipes() },
      ]
    },
    {
      category: 'Meal Planner',
      tests: [
        { name: 'Get Meal Plans', fn: () => mealPlannerAPI.getMealPlans() },
        { name: 'Get Public Meal Plans', fn: () => mealPlannerAPI.getPublicMealPlans() },
      ]
    },
    {
      category: 'Messages',
      tests: [
        { name: 'Get Conversations', fn: () => messagesAPI.getConversations() },
      ]
    },
    {
      category: 'Subscriptions',
      tests: [
        { name: 'Get Subscription Plans', fn: () => subscriptionsAPI.getPlans() },
        { name: 'Get Current Subscription', fn: () => subscriptionsAPI.getCurrentSubscription() },
      ]
    },
  ]

  const runTest = async (test) => {
    try {
      const result = await test.fn()
      return { status: 'success', data: result }
    } catch (error) {
      return { status: 'error', error: error.message }
    }
  }

  const runAllTests = async () => {
    setTesting(true)
    const newResults = {}

    for (const category of tests) {
      for (const test of category.tests) {
        const testKey = `${category.category}-${test.name}`
        newResults[testKey] = { status: 'running' }
        setResults({ ...newResults })

        const result = await runTest(test)
        newResults[testKey] = result
        setResults({ ...newResults })
      }
    }

    setTesting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">API Testing Dashboard</h1>
              <p className="text-gray-600">Test all API endpoints and features</p>
            </div>
            <button
              onClick={runAllTests}
              disabled={testing}
              className="btn-primary flex items-center gap-2"
            >
              {testing && <Loader className="animate-spin" size={20} />}
              {testing ? 'Running Tests...' : 'Run All Tests'}
            </button>
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            {tests.map((category) => (
              <div key={category.category} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
                  <h2 className="font-bold text-gray-900">{category.category}</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.tests.map((test) => {
                    const testKey = `${category.category}-${test.name}`
                    const result = results[testKey]
                    
                    return (
                      <div key={test.name} className="px-6 py-4 flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{test.name}</div>
                          {result?.error && (
                            <div className="text-sm text-red-600 mt-1">{result.error}</div>
                          )}
                          {result?.data && (
                            <div className="text-sm text-gray-600 mt-1">
                              Response: {JSON.stringify(result.data).substring(0, 100)}...
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          {!result && (
                            <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                          )}
                          {result?.status === 'running' && (
                            <Loader className="text-blue-600 animate-spin" size={24} />
                          )}
                          {result?.status === 'success' && (
                            <Check className="text-green-600" size={24} />
                          )}
                          {result?.status === 'error' && (
                            <X className="text-red-600" size={24} />
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          {Object.keys(results).length > 0 && (
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {Object.values(results).filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-green-700">Passed</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-red-600">
                  {Object.values(results).filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-gray-600">
                  {Object.keys(results).length}
                </div>
                <div className="text-sm text-gray-700">Total</div>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-medium mb-1">Testing Notes:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Make sure you're logged in to test protected endpoints</li>
                  <li>Backend must be running on http://localhost:5000</li>
                  <li>Some tests may fail if no data exists yet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestingDashboard
