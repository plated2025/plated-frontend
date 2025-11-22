import { useState, useEffect } from 'react'
import { Calendar, Plus, ShoppingCart, ChefHat, Trash2, Check, X } from 'lucide-react'

function MealPlannerPage() {
  const [mealPlans, setMealPlans] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMealPlans()
  }, [])

  const fetchMealPlans = async () => {
    try {
      // TODO: Call API
      // const response = await api.get('/planner')
      // setMealPlans(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching meal plans:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meal Planner</h1>
                <p className="text-sm text-gray-600">Plan your weekly meals</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={20} />
              New Plan
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mealPlans.length === 0 ? (
          <EmptyState onCreateClick={() => setShowCreateModal(true)} />
        ) : (
          <div className="grid gap-6">
            {mealPlans.map((plan) => (
              <MealPlanCard key={plan._id} plan={plan} />
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateMealPlanModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false)
            fetchMealPlans()
          }}
        />
      )}
    </div>
  )
}

function EmptyState({ onCreateClick }) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Calendar size={48} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No meal plans yet</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start planning your meals for the week. Add recipes, generate shopping lists, and track your nutrition goals.
      </p>
      <button onClick={onCreateClick} className="btn-primary inline-flex items-center gap-2">
        <Plus size={20} />
        Create Your First Plan
      </button>
    </div>
  )
}

function MealPlanCard({ plan }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="card overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.title}</h3>
            <p className="text-gray-600 text-sm">{plan.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span>{new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{plan.meals?.length || 0} meals</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ShoppingCart size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Trash2 size={20} className="text-red-600" />
            </button>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{plan.totalCalories || 0}</div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{plan.totalProtein || 0}g</div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{plan.totalCarbs || 0}g</div>
            <div className="text-xs text-gray-600">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{plan.totalFat || 0}g</div>
            <div className="text-xs text-gray-600">Fat</div>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          {expanded ? 'Show Less' : 'Show Meals & Shopping List'}
        </button>

        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-2">
              {(plan.meals || []).map((meal, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <ChefHat size={18} className="text-primary-600" />
                    <div>
                      <div className="font-medium text-gray-900">{meal.recipeName || 'Meal'}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(meal.date).toLocaleDateString()} • {meal.mealType}
                      </div>
                    </div>
                  </div>
                  {meal.isCompleted && (
                    <Check size={20} className="text-green-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CreateMealPlanModal({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // TODO: Call API
      // await api.post('/planner', formData)
      onSuccess()
    } catch (error) {
      console.error('Error creating meal plan:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Meal Plan</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              placeholder="e.g., Weekly Meal Plan"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field"
              rows={3}
              placeholder="Optional description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MealPlannerPage
