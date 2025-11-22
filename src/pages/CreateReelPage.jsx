import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Scissors, Palette, Music, Play, Save, X, Type, Image as ImageIcon, Hash, Lock, Globe, Users, Trash2 } from 'lucide-react'

function CreateReelPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  
  const [videoFile, setVideoFile] = useState(null)
  const [videoUrl, setVideoUrl] = useState('')
  const [activeTab, setActiveTab] = useState(null) // null, details, filters, music
  const [dragActive, setDragActive] = useState(false)
  
  // Video details
  const [caption, setCaption] = useState('')
  const [coverPhoto, setCoverPhoto] = useState(null)
  const [privacy, setPrivacy] = useState('public')
  
  // Editing states
  const [selectedFilter, setSelectedFilter] = useState(null)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [selectedMusic, setSelectedMusic] = useState(null)
  const [textOverlays, setTextOverlays] = useState([])
  const [cropAspect, setCropAspect] = useState('9:16')
  
  // Mock data
  const musicTracks = [
    { id: 1, name: 'Upbeat Kitchen', artist: 'Cooking Beats', duration: '2:45', trending: true },
    { id: 2, name: 'Chill Vibes', artist: 'Lo-Fi Chef', duration: '3:12', trending: false },
    { id: 3, name: 'Epic Cooking', artist: 'Food Symphony', duration: '2:30', trending: true },
    { id: 4, name: 'Happy Chef', artist: 'Kitchen Groove', duration: '3:00', trending: false },
    { id: 5, name: 'Smooth Jazz', artist: 'Dinner Jazz', duration: '2:55', trending: false }
  ]

  const filters = [
    { id: 'none', name: 'Original', style: {} },
    { id: 'vibrant', name: 'Vibrant', style: { filter: 'saturate(1.5) contrast(1.1)' } },
    { id: 'warm', name: 'Warm', style: { filter: 'sepia(0.3) saturate(1.2)' } },
    { id: 'cool', name: 'Cool', style: { filter: 'hue-rotate(180deg) saturate(1.1)' } },
    { id: 'bw', name: 'B&W', style: { filter: 'grayscale(1) contrast(1.1)' } },
    { id: 'vintage', name: 'Vintage', style: { filter: 'sepia(0.5) contrast(0.9) brightness(0.9)' } }
  ]

  const hashtagSuggestions = ['#foodie', '#recipe', '#cooking', '#yummy', '#foodlover', '#chef', '#homemade', '#delicious']

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    processFile(file)
  }

  const processFile = (file) => {
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setActiveTab('details')
    } else {
      alert('Please select a valid video file')
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handlePublish = () => {
    if (!videoFile) {
      alert('Please upload a video first')
      return
    }
    if (!caption.trim()) {
      alert('Please add a caption')
      return
    }
    // In a real app, this would upload to server
    alert('Reel published successfully! 🎉')
    navigate('/reels')
  }

  const addHashtag = (tag) => {
    if (!caption.includes(tag)) {
      setCaption(caption + (caption ? ' ' : '') + tag)
    }
  }

  const resetFilters = () => {
    setBrightness(100)
    setContrast(100)
    setSaturation(100)
  }

  const getVideoStyle = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate('/create')}
            className="text-gray-700 hover:text-gray-900 flex items-center gap-2"
          >
            <ArrowLeft size={24} />
            <span className="font-semibold">Cancel</span>
          </button>
          <h1 className="text-gray-900 font-bold text-lg">Create Reel</h1>
          <button
            onClick={handlePublish}
            disabled={!videoFile}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Publish
          </button>
        </div>
      </header>

      <div className="relative flex flex-col h-[calc(100vh-60px)]">
        {/* Video Preview - Full Screen */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 p-4 relative">
          {videoUrl ? (
            <div className="relative w-full max-w-4xl" style={{ aspectRatio: cropAspect }}>
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover rounded-lg"
                style={getVideoStyle()}
                controls
                loop
              />
              
              {selectedMusic && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-3">
                  <Music size={20} className="text-white" />
                  <div className="flex-1 text-white">
                    <p className="text-sm font-semibold">{selectedMusic.name}</p>
                    <p className="text-xs text-gray-300">{selectedMusic.artist}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMusic(null)}
                    className="text-white hover:text-gray-300"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`text-center p-12 m-8 border-4 border-dashed rounded-2xl transition-all ${
                dragActive 
                  ? 'border-primary-500 bg-primary-500/10' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                <Upload size={48} className="text-white" />
              </div>
              <h2 className="text-gray-900 text-3xl font-bold mb-2">Upload Your Cooking Reel</h2>
              <p className="text-gray-600 mb-2">Drag and drop your video here</p>
              <p className="text-gray-500 text-sm mb-6">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Browse Files
              </button>
              <div className="mt-6 text-gray-500 text-sm">
                <p>✔️ Vertical video (9:16) recommended</p>
                <p>✔️ Max 60 seconds</p>
                <p>✔️ Supports MP4, MOV, AVI</p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Overlay Editing Panel */}
        {videoUrl && activeTab && (
          <div 
            className="absolute inset-0 z-20 flex items-end animate-fade-in"
            onClick={() => setActiveTab(null)}
          >
            <div 
              className="w-full max-w-2xl mx-auto bg-white/30 backdrop-blur-xl rounded-t-3xl shadow-2xl max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Panel Header */}
              <div className="sticky top-0 bg-white/30 backdrop-blur-xl border-b border-white/30 p-4 flex items-center justify-between rounded-t-3xl">
                <h3 className="text-lg font-bold text-gray-900">
                  {activeTab === 'details' && 'Video Details'}
                  {activeTab === 'filters' && 'Filters & Effects'}
                  {activeTab === 'music' && 'Add Music'}
                </h3>
                <button
                  onClick={() => setActiveTab(null)}
                  className="p-2 hover:bg-white/30 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="p-6">
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-gray-900 text-sm font-semibold">Caption</label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 text-sm focus:ring-2 focus:ring-primary-500 focus:border-white/50 placeholder:text-gray-600"
                      placeholder="Add a caption..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-900 text-sm font-semibold">Cover Photo</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCoverPhoto(e.target.files[0])}
                      className="w-full p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-900 text-sm font-semibold">Privacy</label>
                    <select
                      value={privacy}
                      onChange={(e) => setPrivacy(e.target.value)}
                      className="w-full p-3 rounded-lg bg-white/30 backdrop-blur-sm border border-white/30 text-gray-900 text-sm focus:ring-2 focus:ring-primary-500 focus:border-white/50"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Filters Tab */}
              {activeTab === 'filters' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-end mb-4">
                    <button
                      onClick={resetFilters}
                      className="text-primary-600 text-sm hover:text-primary-700 font-medium"
                    >
                      Reset All
                    </button>
                  </div>

                  {/* Brightness */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-900 text-sm font-semibold">Brightness</label>
                      <span className="text-gray-900 text-sm font-semibold">{brightness}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(e.target.value)}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Contrast */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-900 text-sm font-semibold">Contrast</label>
                      <span className="text-gray-900 text-sm font-semibold">{contrast}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(e.target.value)}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>

                  {/* Saturation */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-gray-900 text-sm font-semibold">Saturation</label>
                      <span className="text-gray-900 text-sm font-semibold">{saturation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(e.target.value)}
                      className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary-600"
                    />
                  </div>
                </div>
              )}

              {/* Music Tab */}
              {activeTab === 'music' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {musicTracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => setSelectedMusic(track)}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                          selectedMusic?.id === track.id
                            ? 'bg-primary-600 text-white shadow-lg scale-[1.02]'
                            : 'bg-white/30 backdrop-blur-sm text-gray-900 hover:bg-white/50 border border-white/30'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          selectedMusic?.id === track.id ? 'bg-white/20' : 'bg-white/30'
                        }`}>
                          {selectedMusic?.id === track.id ? (
                            <Play size={18} className="text-white" />
                          ) : (
                            <Music size={18} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-medium text-sm">{track.name}</p>
                          <p className="text-xs opacity-75">{track.artist}</p>
                        </div>
                        <span className="text-xs">{track.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Bottom Control Bar with Icon Buttons */}
        {videoUrl && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-4 bg-white/30 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl border border-white/30">
              <button
                onClick={() => setActiveTab('details')}
                className={`p-3 rounded-full transition-all ${
                  activeTab === 'details'
                    ? 'bg-primary-600 text-white shadow-lg scale-110'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:scale-105'
                }`}
              >
                <Type size={22} />
              </button>
              <button
                onClick={() => setActiveTab('filters')}
                className={`p-3 rounded-full transition-all ${
                  activeTab === 'filters'
                    ? 'bg-primary-600 text-white shadow-lg scale-110'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:scale-105'
                }`}
              >
                <Palette size={22} />
              </button>
              <button
                onClick={() => setActiveTab('music')}
                className={`p-3 rounded-full transition-all ${
                  activeTab === 'music'
                    ? 'bg-primary-600 text-white shadow-lg scale-110'
                    : 'bg-white/30 text-gray-700 hover:bg-white/50 hover:scale-105'
                }`}
              >
                <Music size={22} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateReelPage
