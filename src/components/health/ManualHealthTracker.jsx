import { useState } from 'react'
import { Activity, Footprints, Flame, Heart, Droplet, Dumbbell, Save, TrendingUp } from 'lucide-react'

function ManualHealthTracker({ onSave, initialData = {} }) {
  const [healthData, setHealthData] = useState({
    steps: initialData.steps || '',
    caloriesBurned: initialData.caloriesBurned || '',
    activeMinutes: initialData.activeMinutes || '',
    heartRate: initialData.heartRate || '',
    waterIntake: initialData.waterIntake || '',
    weight: initialData.weight || '',
    hadWorkout: initialData.hadWorkout || false,
    workoutType: initialData.workoutType || 'mixed',
    workoutDuration: initialData.workoutDuration || ''
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field, value) => {
    setHealthData(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    // Convert strings to numbers
    const dataToSave = {
      ...healthData,
      steps: parseInt(healthData.steps) || 0,
      caloriesBurned: parseInt(healthData.caloriesBurned) || 0,
      activeMinutes: parseInt(healthData.activeMinutes) || 0,
      heartRate: parseInt(healthData.heartRate) || 0,
      waterIntake: parseFloat(healthData.waterIntake) || 0,
      weight: parseFloat(healthData.weight) || 0,
      workoutDuration: parseInt(healthData.workoutDuration) || 0,
      timestamp: new Date().toISOString()
    }

    // Save to localStorage
    localStorage.setItem('todayHealthData', JSON.stringify(dataToSave))
    
    if (onSave) {
      onSave(dataToSave)
    }
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="text-primary-600" />
          Today's Activity
        </h3>
        {saved && (
          <span className="text-sm text-green-600 flex items-center gap-1">
            <Save size={16} />
            Saved!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Steps */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Footprints size={16} className="inline mr-2 text-blue-600" />
            Steps
          </label>
          <input
            type="number"
            value={healthData.steps}
            onChange={(e) => handleChange('steps', e.target.value)}
            placeholder="10,000"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>

        {/* Calories Burned */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Flame size={16} className="inline mr-2 text-orange-600" />
            Calories Burned
          </label>
          <input
            type="number"
            value={healthData.caloriesBurned}
            onChange={(e) => handleChange('caloriesBurned', e.target.value)}
            placeholder="2,500"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>

        {/* Active Minutes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <TrendingUp size={16} className="inline mr-2 text-green-600" />
            Active Minutes
          </label>
          <input
            type="number"
            value={healthData.activeMinutes}
            onChange={(e) => handleChange('activeMinutes', e.target.value)}
            placeholder="60"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>

        {/* Heart Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Heart size={16} className="inline mr-2 text-red-600" />
            Resting Heart Rate
          </label>
          <input
            type="number"
            value={healthData.heartRate}
            onChange={(e) => handleChange('heartRate', e.target.value)}
            placeholder="70"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>

        {/* Water Intake */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Droplet size={16} className="inline mr-2 text-cyan-600" />
            Water (Liters)
          </label>
          <input
            type="number"
            step="0.1"
            value={healthData.waterIntake}
            onChange={(e) => handleChange('waterIntake', e.target.value)}
            placeholder="2.5"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={healthData.weight}
            onChange={(e) => handleChange('weight', e.target.value)}
            placeholder="70.5"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
          />
        </div>
      </div>

      {/* Workout Section */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            checked={healthData.hadWorkout}
            onChange={(e) => handleChange('hadWorkout', e.target.checked)}
            className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-600"
          />
          <span className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <Dumbbell size={18} className="text-purple-600" />
            I had a workout today
          </span>
        </label>

        {healthData.hadWorkout && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Workout Type
              </label>
              <select
                value={healthData.workoutType}
                onChange={(e) => handleChange('workoutType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
              >
                <option value="strength">Strength Training</option>
                <option value="cardio">Cardio</option>
                <option value="mixed">Mixed</option>
                <option value="yoga">Yoga/Flexibility</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={healthData.workoutDuration}
                onChange={(e) => handleChange('workoutDuration', e.target.value)}
                placeholder="45"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save Today's Data
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
        Data is saved locally and used to personalize your meal plan
      </p>
    </div>
  )
}

export default ManualHealthTracker
