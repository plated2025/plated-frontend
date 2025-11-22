import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Database, Image, Film, FileText, Trash2, Download, HardDrive } from 'lucide-react'

function DataStoragePage() {
  const navigate = useNavigate()
  const [storageData, setStorageData] = useState({
    images: 245,
    videos: 12,
    documents: 8,
    cache: 156,
    total: 421
  })

  const calculatePercentage = (value) => {
    return ((value / storageData.total) * 100).toFixed(1)
  }

  const handleClearCache = () => {
    if (confirm('Clear app cache? This will remove temporary files and may improve performance.')) {
      setStorageData(prev => ({ ...prev, cache: 0, total: prev.total - prev.cache }))
      localStorage.removeItem('recipeCache')
      localStorage.removeItem('imageCache')
      alert('Cache cleared successfully!')
    }
  }

  const handleDeleteImages = () => {
    if (confirm('Delete downloaded images? This will remove all cached recipe images.')) {
      setStorageData(prev => ({ ...prev, images: 0, total: prev.total - prev.images }))
      alert('Images cleared successfully!')
    }
  }

  const handleExportData = () => {
    const data = {
      recipes: JSON.parse(localStorage.getItem('savedRecipes') || '[]'),
      mealPlans: JSON.parse(localStorage.getItem('mealPlans') || '[]'),
      preferences: {
        dietary: JSON.parse(localStorage.getItem('dietaryPreferences') || '{}'),
        health: JSON.parse(localStorage.getItem('healthProfile') || '{}')
      },
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plated-data-${Date.now()}.json`
    a.click()
    
    alert('Data exported successfully!')
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Data & Storage</h1>
        </div>
      </header>

      {/* Total Storage */}
      <div className="p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <HardDrive size={32} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{storageData.total} MB</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total storage used</p>
            </div>
          </div>

          {/* Storage Bar */}
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
            <div className="h-full flex">
              <div 
                style={{ width: `${calculatePercentage(storageData.images)}%` }}
                className="bg-blue-500"
              />
              <div 
                style={{ width: `${calculatePercentage(storageData.videos)}%` }}
                className="bg-purple-500"
              />
              <div 
                style={{ width: `${calculatePercentage(storageData.documents)}%` }}
                className="bg-green-500"
              />
              <div 
                style={{ width: `${calculatePercentage(storageData.cache)}%` }}
                className="bg-orange-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Storage Breakdown */}
      <div className="px-4 pb-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Storage Breakdown
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl divide-y divide-gray-200 dark:divide-gray-800 shadow-sm">
          {/* Images */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Image size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Images</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{storageData.images} MB</p>
              </div>
            </div>
            <button
              onClick={handleDeleteImages}
              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>

          {/* Videos */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Film size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Videos</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{storageData.videos} MB</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <FileText size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Documents</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{storageData.documents} MB</p>
              </div>
            </div>
          </div>

          {/* Cache */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Database size={20} className="text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Cache</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{storageData.cache} MB</p>
              </div>
            </div>
            <button
              onClick={handleClearCache}
              className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="px-4 pb-4">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Data Management
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm">
          <button
            onClick={handleExportData}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <Download size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download all your data</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DataStoragePage
