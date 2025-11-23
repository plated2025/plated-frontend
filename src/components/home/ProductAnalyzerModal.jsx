import { useState, useRef } from 'react'
import { X, Camera, Upload, Scan, Sparkles, Loader2, AlertTriangle, CheckCircle, XCircle, Info, TrendingUp, TrendingDown, Shield } from 'lucide-react'
import Portal from '../common/Portal'

function ProductAnalyzerModal({ onClose }) {
  const fileInputRef = useRef(null)
  const [image, setImage] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
        scanProduct()
      }
      reader.readAsDataURL(file)
    }
  }

  const scanProduct = () => {
    setIsScanning(true)
    
    // Simulate AI scanning and analysis
    setTimeout(() => {
      setAnalysis({
        productName: 'Organic Protein Bar - Chocolate Chip',
        brand: 'HealthyBites',
        barcode: '7 89012 34567 8',
        healthScore: 72, // Out of 100
        servingSize: '50g',
        calories: 210,
        nutritionGrade: 'B', // A-E scale
        
        macros: {
          protein: { amount: 12, unit: 'g', daily: 24 },
          carbs: { amount: 25, unit: 'g', daily: 8 },
          fat: { amount: 8, unit: 'g', daily: 12 },
          fiber: { amount: 5, unit: 'g', daily: 20 },
          sugar: { amount: 10, unit: 'g', daily: 11 }
        },
        
        ingredients: [
          { name: 'Organic Oats', status: 'good' },
          { name: 'Whey Protein Isolate', status: 'good' },
          { name: 'Dark Chocolate Chips', status: 'moderate' },
          { name: 'Honey', status: 'moderate' },
          { name: 'Palm Oil', status: 'warning' },
          { name: 'Natural Flavors', status: 'moderate' }
        ],
        
        positives: [
          'High in protein (12g)',
          'Good source of fiber',
          'Organic ingredients',
          'No artificial sweeteners',
          'Gluten-free'
        ],
        
        concerns: [
          'Contains palm oil',
          'Moderate sugar content (10g)',
          'Processed whey protein',
          'May contain traces of nuts'
        ],
        
        allergens: ['Milk', 'May contain Nuts', 'Soy'],
        
        dietaryFit: [
          { diet: 'High Protein', compatible: true },
          { diet: 'Vegetarian', compatible: true },
          { diet: 'Vegan', compatible: false },
          { diet: 'Keto', compatible: false },
          { diet: 'Gluten-Free', compatible: true }
        ],
        
        alternatives: [
          { name: 'Pure Organic Bar', healthScore: 85, price: '$2.99' },
          { name: 'RxBar Chocolate', healthScore: 78, price: '$2.49' },
          { name: 'Quest Protein Bar', healthScore: 70, price: '$2.79' }
        ]
      })
      setIsScanning(false)
    }, 3000)
  }

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getHealthScoreGradient = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-500'
  }

  const getNutritionGradeColor = (grade) => {
    const colors = {
      'A': 'bg-green-500',
      'B': 'bg-lime-500',
      'C': 'bg-yellow-500',
      'D': 'bg-orange-500',
      'E': 'bg-red-500'
    }
    return colors[grade] || 'bg-gray-500'
  }

  const getIngredientIcon = (status) => {
    if (status === 'good') return <CheckCircle className="text-green-600" size={16} />
    if (status === 'warning') return <AlertTriangle className="text-red-600" size={16} />
    return <Info className="text-yellow-600" size={16} />
  }

  return (
    <Portal>
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="glass-modal rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Scan size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Product Analyzer</h2>
                <p className="text-sm opacity-90">Scan any product for instant health analysis</p>
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

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {!image ? (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center">
                <Scan size={48} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Scan a Food Product
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md mx-auto">
                Take a photo of any packaged food product
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                AI will analyze nutrition, ingredients, and health impact
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Upload size={20} />
                  Upload Photo
                </button>
                <button
                  onClick={() => alert('Camera access would open here')}
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

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-left">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Scan className="text-green-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Barcode Scan</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Instant product identification</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Shield className="text-blue-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Health Score</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered analysis</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2">
                    <Sparkles className="text-purple-600" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Alternatives</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Better options suggested</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Uploaded Image */}
              <div className="mb-6">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={image}
                    alt="Scanned product"
                    className="w-full h-64 object-cover"
                  />
                  {isScanning && (
                    <div className="absolute inset-0 bg-green-600/20 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-900 rounded-full p-4">
                        <Loader2 className="animate-spin text-green-600" size={32} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Scanning Progress */}
              {isScanning && (
                <div className="text-center py-8">
                  <Sparkles className="animate-pulse text-green-600 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Analyzing Product...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    AI is reading barcode, nutrition facts, and ingredients
                  </p>
                  <div className="max-w-md mx-auto space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Scanning barcode...</span>
                      <CheckCircle className="text-green-600" size={16} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Reading nutrition label...</span>
                      <Loader2 className="animate-spin text-green-600" size={16} />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Analyzing ingredients...</span>
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analysis Results */}
              {analysis && !isScanning && (
                <div className="space-y-6">
                  {/* Product Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {analysis.productName}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{analysis.brand}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          Barcode: {analysis.barcode}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`${getNutritionGradeColor(analysis.nutritionGrade)} w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg`}>
                          {analysis.nutritionGrade}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Nutri-Score</span>
                      </div>
                    </div>

                    {/* Health Score */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">Health Score</span>
                        <span className={`text-2xl font-bold ${getHealthScoreColor(analysis.healthScore)}`}>
                          {analysis.healthScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${getHealthScoreGradient(analysis.healthScore)} transition-all duration-1000`}
                          style={{ width: `${analysis.healthScore}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {analysis.healthScore >= 80 ? '✓ Excellent choice!' : 
                         analysis.healthScore >= 60 ? '⚠ Moderate - consume occasionally' : 
                         '❌ Not recommended for regular consumption'}
                      </p>
                    </div>
                  </div>

                  {/* Nutrition Facts */}
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <TrendingUp size={20} className="text-green-600" />
                      Nutrition Facts (per {analysis.servingSize})
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{analysis.calories}</p>
                      </div>
                      {Object.entries(analysis.macros).map(([key, value]) => (
                        <div key={key} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            {value.amount}{value.unit}
                          </p>
                          <p className="text-xs text-gray-500">
                            {value.daily}% daily value
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients Analysis */}
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Ingredients Analysis</h4>
                    <div className="space-y-2">
                      {analysis.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          {getIngredientIcon(ingredient.status)}
                          <span className="text-gray-900 dark:text-white">{ingredient.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Positives & Concerns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <h4 className="font-bold text-green-900 dark:text-green-100 mb-3 flex items-center gap-2">
                        <CheckCircle size={18} />
                        Positives
                      </h4>
                      <ul className="space-y-2">
                        {analysis.positives.map((item, idx) => (
                          <li key={idx} className="text-sm text-green-800 dark:text-green-200 flex items-start gap-2">
                            <span className="text-green-600 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                      <h4 className="font-bold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                        <AlertTriangle size={18} />
                        Concerns
                      </h4>
                      <ul className="space-y-2">
                        {analysis.concerns.map((item, idx) => (
                          <li key={idx} className="text-sm text-red-800 dark:text-red-200 flex items-start gap-2">
                            <span className="text-red-600 mt-0.5">⚠</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Allergens */}
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
                      <AlertTriangle size={18} />
                      Allergen Warning
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.allergens.map((allergen, idx) => (
                        <span key={idx} className="px-3 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 rounded-full text-sm font-medium">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Compatibility */}
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">Dietary Compatibility</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {analysis.dietaryFit.map((diet, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg flex items-center gap-2 ${
                            diet.compatible
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                              : 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700'
                          }`}
                        >
                          {diet.compatible ? (
                            <CheckCircle className="text-green-600" size={16} />
                          ) : (
                            <XCircle className="text-gray-400" size={16} />
                          )}
                          <span className={`text-sm font-medium ${
                            diet.compatible ? 'text-green-900 dark:text-green-100' : 'text-gray-600 dark:text-gray-400'
                          }`}>
                            {diet.diet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Healthier Alternatives */}
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Sparkles size={20} className="text-purple-600" />
                      Healthier Alternatives
                    </h4>
                    <div className="space-y-2">
                      {analysis.alternatives.map((alt, idx) => (
                        <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{alt.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Health Score: {alt.healthScore}/100</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">{alt.price}</p>
                            {alt.healthScore > analysis.healthScore && (
                              <span className="text-xs text-green-600 flex items-center gap-1">
                                <TrendingUp size={12} />
                                Better choice
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setImage(null)
                        setAnalysis(null)
                      }}
                      className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
                    >
                      Scan Another
                    </button>
                    <button
                      onClick={() => alert('Product saved to your health tracker!')}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all"
                    >
                      Save to Tracker
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

export default ProductAnalyzerModal
