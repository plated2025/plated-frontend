import { useState, useRef } from 'react'
import { X, Upload, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, Move, Check, RefreshCw } from 'lucide-react'

function CoverPhotoEditor({ isOpen, onClose, currentCover, onSave }) {
  const [image, setImage] = useState(currentCover || null)
  const [scale, setScale] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [positionX, setPositionX] = useState(50)
  const [positionY, setPositionY] = useState(50)
  const [fit, setFit] = useState('cover') // cover, contain, fill
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [blur, setBlur] = useState(0)
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReset = () => {
    setScale(100)
    setRotation(0)
    setPositionX(50)
    setPositionY(50)
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
    setBlur(0)
  }

  const handleSave = () => {
    const coverData = {
      image,
      scale,
      rotation,
      positionX,
      positionY,
      fit,
      brightness,
      contrast,
      saturation,
      blur
    }
    onSave(coverData)
    onClose()
  }

  const getImageStyle = () => {
    return {
      transform: `scale(${scale / 100}) rotate(${rotation}deg)`,
      objectPosition: `${positionX}% ${positionY}%`,
      objectFit: fit,
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) blur(${blur}px)`
    }
  }

  const fitOptions = [
    { value: 'cover', label: 'Cover', desc: 'Fill entire area' },
    { value: 'contain', label: 'Contain', desc: 'Fit within area' },
    { value: 'fill', label: 'Fill', desc: 'Stretch to fit' }
  ]

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Cover Photo</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customize your profile banner</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Preview Section */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden relative h-64 border-2 border-dashed border-gray-300 dark:border-gray-600">
                {image ? (
                  <img
                    src={image}
                    alt="Cover preview"
                    className="w-full h-full transition-all duration-300"
                    style={getImageStyle()}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Upload size={48} className="text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">No image selected</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Upload size={20} />
                {image ? 'Change Image' : 'Upload Image'}
              </button>

              {/* Fit Options */}
              {image && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Fit Mode
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {fitOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFit(option.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          fit === option.value
                            ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <p className="font-semibold text-gray-900 dark:text-white mb-1">{option.label}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Controls Section */}
            {image && (
              <div className="space-y-6">
                {/* Transform Controls */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Move size={18} />
                    Transform
                  </h3>

                  {/* Scale */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Scale</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{scale}%</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setScale(Math.max(50, scale - 10))}
                        className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <ZoomOut size={16} />
                      </button>
                      <button
                        onClick={() => setScale(Math.min(200, scale + 10))}
                        className="p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <ZoomIn size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Rotation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Rotation</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => setRotation(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setRotation((rotation - 90 + 360) % 360)}
                        className="flex-1 p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-1 text-sm"
                      >
                        <RotateCw size={14} className="rotate-180" />
                        -90°
                      </button>
                      <button
                        onClick={() => setRotation((rotation + 90) % 360)}
                        className="flex-1 p-2 bg-white dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center gap-1 text-sm"
                      >
                        <RotateCw size={14} />
                        +90°
                      </button>
                    </div>
                  </div>

                  {/* Position X */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Position X</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{positionX}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionX}
                      onChange={(e) => setPositionX(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Position Y */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Position Y</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{positionY}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={positionY}
                      onChange={(e) => setPositionY(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Image Adjustments */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-4">
                  <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Maximize2 size={18} />
                    Adjustments
                  </h3>

                  {/* Brightness */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brightness</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Contrast */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Contrast</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Saturation */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Saturation</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Blur */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blur</label>
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{blur}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={blur}
                      onChange={(e) => setBlur(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw size={18} />
                  Reset All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!image}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Check size={20} />
            Save Cover Photo
          </button>
        </div>
      </div>
    </div>
  )
}

export default CoverPhotoEditor
