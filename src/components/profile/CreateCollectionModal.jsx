import { useState, useRef } from 'react'
import { X, ChefHat, Heart, Star, Flame, Zap, Target, Coffee, Sparkles, Award, BookOpen, Upload, Image as ImageIcon } from 'lucide-react'

function CreateCollectionModal({ isOpen, onClose, onSave }) {
  const [collectionName, setCollectionName] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('ChefHat')
  const [selectedColor, setSelectedColor] = useState('red')
  const [coverImage, setCoverImage] = useState(null)
  const [useImage, setUseImage] = useState(false)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const iconOptions = [
    { id: 'ChefHat', icon: ChefHat, label: 'Chef Hat' },
    { id: 'Heart', icon: Heart, label: 'Heart' },
    { id: 'Star', icon: Star, label: 'Star' },
    { id: 'Flame', icon: Flame, label: 'Flame' },
    { id: 'Zap', icon: Zap, label: 'Zap' },
    { id: 'Target', icon: Target, label: 'Target' },
    { id: 'Coffee', icon: Coffee, label: 'Coffee' },
    { id: 'Sparkles', icon: Sparkles, label: 'Sparkles' },
    { id: 'Award', icon: Award, label: 'Award' },
    { id: 'BookOpen', icon: BookOpen, label: 'Book' }
  ]

  const colorOptions = [
    { id: 'red', gradient: 'from-red-500 to-orange-500', bg: 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30', border: 'border-red-400 dark:border-red-600', text: 'text-red-600 dark:text-red-400' },
    { id: 'green', gradient: 'from-green-500 to-emerald-500', bg: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30', border: 'border-green-400 dark:border-green-600', text: 'text-green-600 dark:text-green-400' },
    { id: 'blue', gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30', border: 'border-blue-400 dark:border-blue-600', text: 'text-blue-600 dark:text-blue-400' },
    { id: 'purple', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30', border: 'border-purple-400 dark:border-purple-600', text: 'text-purple-600 dark:text-purple-400' },
    { id: 'yellow', gradient: 'from-yellow-500 to-orange-500', bg: 'from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30', border: 'border-yellow-400 dark:border-yellow-600', text: 'text-yellow-600 dark:text-yellow-400' },
    { id: 'pink', gradient: 'from-pink-500 to-rose-500', bg: 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30', border: 'border-pink-400 dark:border-pink-600', text: 'text-pink-600 dark:text-pink-400' }
  ]

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target.result)
        setUseImage(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setCoverImage(null)
    setUseImage(false)
  }

  const handleSave = () => {
    if (!collectionName.trim()) {
      alert('Please enter a collection name')
      return
    }

    const IconComponent = iconOptions.find(opt => opt.id === selectedIcon)?.icon
    const colorData = colorOptions.find(opt => opt.id === selectedColor)

    const newCollection = {
      id: Date.now(),
      name: collectionName,
      icon: IconComponent,
      gradient: colorData.gradient,
      bg: colorData.bg,
      border: colorData.border,
      text: colorData.text,
      coverImage: useImage ? coverImage : null,
      recipeCount: 0
    }

    onSave(newCollection)
    setCollectionName('')
    setSelectedIcon('ChefHat')
    setSelectedColor('red')
    setCoverImage(null)
    setUseImage(false)
    onClose()
  }

  const previewColor = colorOptions.find(opt => opt.id === selectedColor)
  const PreviewIcon = iconOptions.find(opt => opt.id === selectedIcon)?.icon

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create Collection</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Organize your favorite recipes</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {useImage && coverImage ? (
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary-600 shadow-lg">
                  <img src={coverImage} alt="Collection cover" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${previewColor.bg} flex items-center justify-center border-2 ${previewColor.border} shadow-lg`}>
                  <PreviewIcon className={previewColor.text} size={40} />
                </div>
              )}
            </div>
          </div>

          {/* Cover Type Toggle */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Collection Cover
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setUseImage(false)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  !useImage
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300'
                }`}
              >
                <Sparkles size={18} />
                <span className="font-semibold">Icon</span>
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                  useImage
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300'
                }`}
              >
                <ImageIcon size={18} />
                <span className="font-semibold">Image</span>
              </button>
            </div>
            {useImage && coverImage && (
              <button
                onClick={handleRemoveImage}
                className="w-full mt-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                Remove Image
              </button>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Collection Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Collection Name
            </label>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="e.g. My Favorites, Quick Meals, etc."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 outline-none"
              maxLength={20}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {collectionName.length}/20 characters
            </p>
          </div>

          {/* Icon Selection - Only show when not using image */}
          {!useImage && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Choose Icon
              </label>
              <div className="grid grid-cols-5 gap-3">
                {iconOptions.map((option) => {
                  const IconComp = option.icon
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelectedIcon(option.id)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedIcon === option.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 scale-110'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                      }`}
                    >
                      <IconComp size={20} className="mx-auto text-gray-700 dark:text-gray-300" />
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Color Selection - Only show when not using image */}
          {!useImage && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Choose Color
              </label>
              <div className="grid grid-cols-6 gap-3">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`h-10 rounded-lg bg-gradient-to-br ${color.gradient} transition-all ${
                      selectedColor === color.id
                        ? 'ring-4 ring-offset-2 ring-gray-400 dark:ring-gray-600 scale-110'
                        : 'hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg"
          >
            Create Collection
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }
      `}</style>
    </div>
  )
}

export default CreateCollectionModal
