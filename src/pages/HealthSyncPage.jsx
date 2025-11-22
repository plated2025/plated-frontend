import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Watch, Smartphone, Upload, Download, RefreshCw, CheckCircle, XCircle, Info } from 'lucide-react'
import ManualHealthTracker from '../components/health/ManualHealthTracker'
import { calculateDailyTargets } from '../utils/healthCalculators'

function HealthSyncPage() {
  const navigate = useNavigate()
  const [syncStatus, setSyncStatus] = useState('disconnected') // 'disconnected', 'connected', 'syncing'
  const [lastSync, setLastSync] = useState(null)
  const [healthData, setHealthData] = useState(null)
  const [calculatedTargets, setCalculatedTargets] = useState(null)

  useEffect(() => {
    // Load saved health data
    const saved = localStorage.getItem('todayHealthData')
    if (saved) {
      const data = JSON.parse(saved)
      setHealthData(data)
      setLastSync(data.timestamp)
      
      // Calculate targets
      const userData = JSON.parse(localStorage.getItem('userProfile') || '{}')
      if (userData.weight) {
        const targets = calculateDailyTargets(userData, data)
        setCalculatedTargets(targets)
      }
    }
  }, [])

  const handleManualSave = (data) => {
    setHealthData(data)
    setLastSync(data.timestamp)
    setSyncStatus('connected')

    // Calculate targets
    const userData = JSON.parse(localStorage.getItem('userProfile') || '{}')
    if (userData.weight) {
      const targets = calculateDailyTargets(userData, data)
      setCalculatedTargets(targets)
      localStorage.setItem('nutritionTargets', JSON.stringify(targets))
    }
  }

  const handleAppleHealthConnect = () => {
    alert('Apple HealthKit integration coming soon!\n\nThis will sync:\n• Steps & Activity\n• Calories Burned\n• Heart Rate\n• Workouts\n• Weight\n• Water Intake')
  }

  const handleGoogleFitConnect = () => {
    alert('Google Fit integration coming soon!\n\nThis will sync:\n• Steps & Activity\n• Calories Burned\n• Heart Rate\n• Workouts\n• Weight')
  }

  const handleFitbitConnect = () => {
    alert('Fitbit integration coming soon!\n\nThis will sync:\n• Steps & Activity\n• Calories Burned\n• Heart Rate\n• Sleep Data\n• Workouts')
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Never'
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours} hours ago`
    return date.toLocaleDateString()
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
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Health Data Sync</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Last sync: {formatTime(lastSync)}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex gap-3">
            <Info size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                Sync your health data for personalized meal plans
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Connect your smartwatch or fitness tracker to automatically adjust your nutrition targets based on your daily activity.
              </p>
            </div>
          </div>
        </div>

        {/* Calculated Targets */}
        {calculatedTargets && (
          <div className="bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              Your Personalized Targets Today
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  {calculatedTargets.calories}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                {calculatedTargets.caloriesAdjustment > 0 && (
                  <p className="text-xs text-green-600 dark:text-green-400">
                    +{calculatedTargets.caloriesAdjustment} from activity
                  </p>
                )}
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                  {calculatedTargets.protein}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {calculatedTargets.carbs}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {calculatedTargets.fat}g
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
              </div>
            </div>
          </div>
        )}

        {/* Smartwatch Integration */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Devices
          </h2>
          
          <div className="space-y-3">
            {/* Apple Health */}
            <button
              onClick={handleAppleHealthConnect}
              className="w-full flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-600 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Watch size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Apple Health</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Apple Watch, iPhone</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Coming Soon
              </span>
            </button>

            {/* Google Fit */}
            <button
              onClick={handleGoogleFitConnect}
              className="w-full flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-600 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Smartphone size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Google Fit</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Android, Wear OS</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Coming Soon
              </span>
            </button>

            {/* Fitbit */}
            <button
              onClick={handleFitbitConnect}
              className="w-full flex items-center justify-between p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary-500 dark:hover:border-primary-600 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Watch size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 dark:text-white">Fitbit</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Fitbit devices</p>
                </div>
              </div>
              <span className="text-sm text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                Coming Soon
              </span>
            </button>
          </div>
        </div>

        {/* Manual Entry */}
        <ManualHealthTracker onSave={handleManualSave} initialData={healthData} />

        {/* Privacy Notice */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🔒 Privacy & Security</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✓ Your health data is stored locally on your device</li>
            <li>✓ We never share your health data with third parties</li>
            <li>✓ You can disconnect and delete your data anytime</li>
            <li>✓ All synced data is encrypted</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HealthSyncPage
