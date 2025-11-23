import { useState, useRef } from 'react'
import { X, Camera, Upload, Sparkles, Loader2, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Portal from '../common/Portal'

function FoodScannerModal({ onClose }) {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        scanImage()
      }
      reader.readAsDataURL(file)
    }
  }

  const scanImage = () => {
    setIsScanning(true)
    
    // Simulate AI scanning
    setTimeout(() => {
      setResults({
        detected: ['Tomatoes', 'Onions', 'Garlic', 'Chicken', 'Olive Oil'],
        recipes: [
          { name: 'Classic Chicken Pasta', match: '95%', time: '30min' },
          { name: 'Garlic Chicken Stir-fry', match: '88%', time: '25min' },
          { name: 'Mediterranean Bowl', match: '82%', time: '20min' }
        ]
      })
      setIsScanning(false)
    }, 2500)
  }

  return (
    <Portal>
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass-modal rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Camera size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Food Scanner</h2>
                <p className="text-sm opacity-90">Scan your fridge or ingredients</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {!image ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center">
                <Camera size={48} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Scan Your Ingredients
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Take a photo of your fridge or ingredients, and I'll identify them and suggest recipes!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  Upload Photo
                </button>
                <button
                  onClick={() => alert('Camera access would open here in production')}
                  className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Camera size={20} />
                  Take Photo
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
                <p>💡 Tips for best results:</p>
                <p>• Good lighting</p>
                <p>• Clear view of ingredients</p>
                <p>• Avoid blurry photos</p>
              </div>
            </div>
          ) : (
            <div>
              {/* Uploaded Image */}
              <div className="mb-6">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt="Scanned food"
                    className="w-full h-64 object-cover"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-900 rounded-full p-4">
                        <Loader2 className="animate-spin text-blue-600" size={32} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scanning Progress */}
              {isScanning && (
                <div className="text-center py-8">
                  <Sparkles className="animate-pulse text-blue-600 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Scanning...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    AI is identifying your ingredients
                  </p>
                </div>
              )}

              {/* Results */}
              {results && !isScanning && (
                <div className="space-y-6">
                  {/* Detected Ingredients */}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={20} />
                      Detected Ingredients ({results.detected.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {results.detected.map((ingredient, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 text-green-900 dark:text-green-100 rounded-full font-medium text-sm"
                        >
                          ✓ {ingredient}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recipe Matches */}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                      Recipe Matches
                    </h3>
                    <div className="space-y-2">
                      {results.recipes.map((recipe, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            navigate('/explore')
                            onClose()
                          }}
                          className="w-full p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:shadow-md transition-all text-left group"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              {recipe.name}
                            </h4>
                            <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                              {recipe.match} Match
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            ⏱️ {recipe.time} • Uses {results.detected.length} of your ingredients
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setImage(null)
                        setResults(null)
                      }}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                    >
                      Scan Again
                    </button>
                    <button
                      onClick={() => {
                        navigate('/explore')
                        onClose()
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all"
                    >
                      Explore All →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
    </Portal>
  )
}

export default FoodScannerModal
