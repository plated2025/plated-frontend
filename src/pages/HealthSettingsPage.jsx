import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Ruler, Weight, Calendar, Target, Activity, Save } from 'lucide-react'

function HealthSettingsPage() {
  const navigate = useNavigate()
  const [profile, setProfile] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintenance'
  })

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved profile
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    }
  }, [])

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-700 dark:text-gray-300" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Health Profile</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Set your health info for personalized meal plans
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
          {/* Basic Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar size={16} className="inline mr-2 text-primary-600" />
                  Age (years)
                </label>
                <input
                  type="number"
                  value={profile.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  placeholder="25"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User size={16} className="inline mr-2 text-primary-600" />
                  Gender
                </label>
                <select
                  value={profile.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Weight size={16} className="inline mr-2 text-primary-600" />
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  placeholder="70.5"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Ruler size={16} className="inline mr-2 text-primary-600" />
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={profile.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  placeholder="175"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Activity Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Activity size={16} className="inline mr-2 text-primary-600" />
              Activity Level
            </label>
            <div className="space-y-2">
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
                { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Very Active', desc: 'Heavy exercise 6-7 days/week' },
                { value: 'veryActive', label: 'Extremely Active', desc: 'Very heavy exercise, physical job' }
              ].map((level) => (
                <label
                  key={level.value}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    profile.activityLevel === level.value
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="activityLevel"
                    value={level.value}
                    checked={profile.activityLevel === level.value}
                    onChange={(e) => handleChange('activityLevel', e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900 dark:text-white">{level.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{level.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Fitness Goal */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Target size={16} className="inline mr-2 text-primary-600" />
              Fitness Goal
            </label>
            <div className="space-y-2">
              {[
                { value: 'weight-loss', label: 'Weight Loss', desc: 'Lose 0.5kg per week', icon: '📉' },
                { value: 'aggressive-loss', label: 'Aggressive Weight Loss', desc: 'Lose 0.75kg per week', icon: '⚡' },
                { value: 'maintenance', label: 'Maintain Weight', desc: 'Keep current weight', icon: '⚖️' },
                { value: 'muscle-gain', label: 'Muscle Gain', desc: 'Gain with minimal fat', icon: '💪' },
                { value: 'bulk', label: 'Bulk', desc: 'Gain weight/muscle', icon: '🏋️' }
              ].map((goal) => (
                <label
                  key={goal.value}
                  className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    profile.goal === goal.value
                      ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="goal"
                    value={goal.value}
                    checked={profile.goal === goal.value}
                    onChange={(e) => handleChange('goal', e.target.value)}
                    className="w-4 h-4 text-primary-600 focus:ring-2 focus:ring-primary-600"
                  />
                  <span className="text-2xl mx-3">{goal.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{goal.label}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Profile
            </button>
            {saved && (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400 px-4">
                <Save size={20} />
                <span className="font-medium">Saved!</span>
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            This information is used to calculate your personalized nutrition targets
          </p>
        </div>
      </div>
    </div>
  )
}

export default HealthSettingsPage
