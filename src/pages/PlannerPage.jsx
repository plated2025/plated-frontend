import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, ChevronLeft, ChevronRight, Plus, ShoppingCart, Download, Sparkles, Activity, Upload, Copy } from 'lucide-react'
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import DesktopSidebar from '../components/layout/DesktopSidebar'
import SmartSuggestions from '../components/planner/SmartSuggestions'
import AdvancedMealPlanModal from '../components/planner/AdvancedMealPlanModal'
import NutritionDashboard from '../components/planner/NutritionDashboard'

function PlannerPage() {
  const navigate = useNavigate()
  const [calendarView, setCalendarView] = useState('weekly') // 'weekly' or 'monthly'
  const [currentDate, setCurrentDate] = useState(new Date())
  const [meals, setMeals] = useState({})
  const [showAddMeal, setShowAddMeal] = useState(null)
  const [showAdvancedModal, setShowAdvancedModal] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

  const getWeekDays = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 })
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }

  const getMonthDays = () => {
    const start = startOfMonth(currentDate)
    const end = endOfMonth(currentDate)
    return eachDayOfInterval({ start, end })
  }

  const handlePreviousWeek = () => {
    setCurrentDate(prev => addDays(prev, -7))
  }

  const handleNextWeek = () => {
    setCurrentDate(prev => addDays(prev, 7))
  }

  const handleAddMeal = (date, mealType) => {
    setShowAddMeal({ date, mealType })
  }

  const generateShoppingList = () => {
    navigate('/shopping-list')
  }

  const handleSelectRecipe = (recipe) => {
    // Navigate to recipe detail page
    navigate(`/recipe/${recipe.id}`)
  }

  const handleGeneratePlan = (config) => {
    // Generate AI meal plan based on configuration
    console.log('Generating meal plan with config:', config)
    alert(`Generating ${config.duration}-day meal plan for ${config.servings} people with ${config.budget} budget!`)
    // In real app, this would call an API to generate the plan
  }

  const handleExportPlan = (format) => {
    if (format === 'pdf') {
      alert('Exporting meal plan as PDF...')
    } else if (format === 'calendar') {
      alert('Adding to Google Calendar...')
    } else if (format === 'copy') {
      alert('Meal plan copied to clipboard!')
    }
    setShowExportMenu(false)
  }

  const handleImportPlan = () => {
    alert('Import meal plan from file...')
  }

  const handleDuplicateWeek = () => {
    alert('Duplicating this week\'s plan to next week...')
  }

  return (
    <div className="lg:flex min-h-screen bg-gray-50 lg:bg-transparent">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="w-full lg:flex-1 lg:ml-64 bg-gray-50 pb-20 lg:pb-0">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 lg:px-8 lg:max-w-7xl lg:mx-auto">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-bold text-gray-900">Meal Planner</h1>

            <div className="flex items-center gap-2">
              {/* Advanced Actions Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="More Actions"
                >
                  <Download size={18} className="text-gray-700" />
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <button
                      onClick={() => handleExportPlan('pdf')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <Download size={16} />
                      Export as PDF
                    </button>
                    <button
                      onClick={() => handleExportPlan('calendar')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <Calendar size={16} />
                      Add to Calendar
                    </button>
                    <button
                      onClick={() => handleExportPlan('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <Copy size={16} />
                      Copy to Clipboard
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleImportPlan}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <Upload size={16} />
                      Import Plan
                    </button>
                    <button
                      onClick={handleDuplicateWeek}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
                    >
                      <Copy size={16} />
                      Duplicate Week
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAdvancedModal(true)}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Sparkles size={18} />
                <span className="hidden sm:inline">AI Plan</span>
              </button>
              
              <button
                onClick={generateShoppingList}
                className="btn-secondary flex items-center gap-2 whitespace-nowrap"
              >
                <ShoppingCart size={18} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>
      </header>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          
      {/* Calendar Section with Weekly/Monthly Toggle */}
      <section className="px-4 py-6 lg:px-8 bg-white">
        <div className="lg:max-w-7xl lg:mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">📅 Meal Calendar</h2>
            
            <div className="flex items-center gap-3">
              {/* Weekly/Monthly Toggle */}
              <div className="inline-flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCalendarView('weekly')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    calendarView === 'weekly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setCalendarView('monthly')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    calendarView === 'monthly' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Month
                </button>
              </div>

              {/* Navigation */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePreviousWeek}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-sm font-medium text-gray-600">
                  {format(currentDate, 'MMM d, yyyy')}
                </span>
                <button
                  onClick={handleNextWeek}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

      {/* Weekly View */}
      {calendarView === 'weekly' && (
      <div className="overflow-x-auto">
          <div className="flex gap-3 min-w-max lg:min-w-0 lg:justify-center">
            {getWeekDays().map((day) => {
              const dateKey = format(day, 'yyyy-MM-dd')
              const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
              
              return (
                <div key={dateKey} className="card w-64 flex-shrink-0 p-4">
                  <div className={`text-center mb-4 pb-3 border-b ${isToday ? 'border-primary-600' : 'border-gray-200'}`}>
                    <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary-600' : 'text-gray-600'}`}>
                      {format(day, 'EEE')}
                    </div>
                    <div className={`text-2xl font-bold ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {mealTypes.map((mealType) => (
                      <div key={mealType} className="min-h-[60px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">{mealType}</span>
                          <button
                            onClick={() => handleAddMeal(dateKey, mealType)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        {meals[`${dateKey}-${mealType}`] ? (
                          <div className="bg-primary-50 border border-primary-200 rounded-lg p-2">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {meals[`${dateKey}-${mealType}`]}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-2 text-center">
                            <span className="text-xs text-gray-400">No meal</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Monthly View */}
      {calendarView === 'monthly' && (
        <div className="mt-4">
          <div className="card p-4 lg:p-8 w-full">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-2 lg:gap-3 mb-2 lg:mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm lg:text-base font-medium text-gray-600 py-2 lg:py-3">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 lg:gap-3">
              {getMonthDays().map((day) => {
                const dateKey = format(day, 'yyyy-MM-dd')
                const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                const hasMeals = Object.keys(meals).some(key => key.startsWith(dateKey))

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDay(dateKey)}
                    className={`aspect-square p-2 lg:p-3 rounded-lg border-2 text-center hover:border-primary-500 hover:shadow-md transition-all ${
                      isToday ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                    }`}
                  >
                    <div className={`text-sm lg:text-base font-semibold mb-1 ${isToday ? 'text-primary-600' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </div>
                    {hasMeals && (
                      <div className="flex justify-center gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-primary-600"></div>
                        <div className="w-1 h-1 rounded-full bg-primary-600"></div>
                        <div className="w-1 h-1 rounded-full bg-primary-600"></div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

        </div>
      </section>

      {/* Nutrition Dashboard Section */}
      <section className="px-4 py-6 lg:px-8 bg-gray-50">
        <div className="lg:max-w-7xl lg:mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Your Nutrition</h2>
          <NutritionDashboard />
        </div>
      </section>

      {/* Discover / AI Suggestions Section */}
      <section className="px-4 py-6 lg:px-8 bg-white">
        <div className="lg:max-w-7xl lg:mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🌟 Discover Recipes</h2>
          <SmartSuggestions onSelectRecipe={handleSelectRecipe} />
        </div>
      </section>

      </div>
      {/* End Scrollable Content */}

      {/* Add Meal Modal */}
      {showAddMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[80vh] overflow-y-auto mb-20 sm:mb-0">
            <div className="p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add {showAddMeal.mealType}</h3>
                <button
                  onClick={() => setShowAddMeal(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setShowAddMeal(null)
                    navigate('/saved')
                  }}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="font-medium text-gray-900">From Saved Recipes</p>
                  <p className="text-sm text-gray-600">Choose from your saved collection</p>
                </button>
                <button 
                  onClick={() => {
                    setShowAddMeal(null)
                    navigate('/explore')
                  }}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="font-medium text-gray-900">Search Recipes</p>
                  <p className="text-sm text-gray-600">Find recipes on Foodie Social</p>
                </button>
                <button 
                  onClick={() => {
                    const mealName = prompt(`Enter name for ${showAddMeal.mealType}:`)
                    if (mealName) {
                      alert(`"${mealName}" added to your meal plan!`)
                      setShowAddMeal(null)
                    }
                  }}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <p className="font-medium text-gray-900">Custom Meal</p>
                  <p className="text-sm text-gray-600">Add a custom meal name</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day Detail Modal (from monthly calendar) */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[80vh] overflow-y-auto mb-20 sm:mb-0">
            <div className="p-6 pb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {format(new Date(selectedDay), 'EEEE, MMM d, yyyy')}
                </h3>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              {/* Meals for the day */}
              <div className="space-y-4">
                {mealTypes.map((mealType) => {
                  const mealKey = `${selectedDay}-${mealType}`
                  const hasMeal = meals[mealKey]
                  
                  return (
                    <div key={mealType} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{mealType}</h4>
                        <button
                          onClick={() => {
                            setSelectedDay(null)
                            handleAddMeal(selectedDay, mealType)
                          }}
                          className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm"
                        >
                          <Plus size={16} />
                          Add
                        </button>
                      </div>
                      
                      {hasMeal ? (
                        <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700 rounded-lg p-3">
                          <p className="font-medium text-gray-900 dark:text-white">{hasMeal}</p>
                          <button
                            onClick={() => {
                              const newMeals = { ...meals }
                              delete newMeals[mealKey]
                              setMeals(newMeals)
                            }}
                            className="text-xs text-red-600 hover:text-red-700 mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-3 text-center">
                          <span className="text-sm text-gray-400 dark:text-gray-500">No meal planned</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedDay(null)
                      navigate('/explore')
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-900 dark:text-white transition-colors"
                  >
                    Browse Recipes
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDay(null)
                      setShowAdvancedModal(true)
                    }}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles size={16} />
                    AI Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Meal Plan Modal */}
      <AdvancedMealPlanModal
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
        onGenerate={handleGeneratePlan}
      />
      </div>
    </div>
  )
}

export default PlannerPage
