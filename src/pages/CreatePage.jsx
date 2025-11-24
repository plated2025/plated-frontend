import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Image, Video, Camera, Clock, Users, ChefHat, Plus, X, Film } from 'lucide-react'
import { useApp } from '../context/AppContext'
import UpgradeToCreatorModal from '../components/UpgradeToCreatorModal'

function CreatePage() {
  const navigate = useNavigate()
  const { userType } = useApp()
  const [showUpgradeModal, setShowUpgradeModal] = useState(userType !== 'creator')
  const [createType, setCreateType] = useState(null) // 'recipe', 'story', 'live'
  
  // Block access for non-creators
  if (userType !== 'creator') {
    return <UpgradeToCreatorModal isOpen={true} onClose={() => navigate(-1)} />
  }
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    cookTime: '',
    servings: '',
    difficulty: 'easy',
    ingredients: [''],
    steps: [''],
    image: null,
    imagePreview: null
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setRecipeData(prev => ({
        ...prev,
        image: file,
        imagePreview: previewUrl
      }))
    }
  }

  const handleRemoveImage = () => {
    if (recipeData.imagePreview) {
      URL.revokeObjectURL(recipeData.imagePreview)
    }
    setRecipeData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }))
  }

  const handleAddIngredient = () => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }))
  }

  const handleRemoveIngredient = (index) => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleIngredientChange = (index, value) => {
    setRecipeData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }))
  }

  const handleAddStep = () => {
    setRecipeData(prev => ({
      ...prev,
      steps: [...prev.steps, '']
    }))
  }

  const handleRemoveStep = (index) => {
    setRecipeData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
  }

  const handleStepChange = (index, value) => {
    setRecipeData(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => i === index ? value : step)
    }))
  }

  const handlePublish = () => {
    // Handle publish logic
    navigate('/')
  }

  const handleGoLive = () => {
    navigate('/live')
  }

  if (!createType) {
    return (
      <div className="min-h-screen bg-gray-50 pb-safe">
        <header className="bg-white border-b border-gray-200 px-4 py-2.5 sm:py-3 pt-safe">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg sm:text-xl font-bold">Create Content</h1>
          </div>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to create?</h2>
          <p className="text-gray-600 mb-8">Choose a content type to get started</p>

          <div className="space-y-4">
            {/* Create Reel */}
            <button
              onClick={() => navigate('/create/reel')}
              className="w-full card p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Film size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Create Reel</h3>
                  <p className="text-sm text-gray-600">Upload and edit cooking videos</p>
                </div>
              </div>
            </button>

            {/* Recipe Post */}
            <button
              onClick={() => setCreateType('recipe')}
              className="w-full card p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                  <ChefHat size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Recipe Post</h3>
                  <p className="text-sm text-gray-600">Share a complete recipe with ingredients and steps</p>
                </div>
              </div>
            </button>

            {/* Story Post */}
            <button
              onClick={() => setCreateType('story')}
              className="w-full card p-6 hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Camera size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Story Post</h3>
                  <p className="text-sm text-gray-600">Share a quick photo or 15s video story</p>
                </div>
              </div>
            </button>

            {/* Live Session */}
            <button
              onClick={handleGoLive}
              className="w-full card p-6 hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                  <Video size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Live Cooking Session</h3>
                  <p className="text-sm text-gray-600">Stream a live cooking session with your followers</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Recipe Creation Form
  if (createType === 'recipe') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setCreateType(null)}>
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold">New Recipe</h1>
            </div>
            <button onClick={handlePublish} className="btn-primary">
              Publish
            </button>
          </div>
        </header>

        <div className="p-4 max-w-2xl mx-auto pb-20">
          {/* Image Upload */}
          <div className="card p-6 mb-4">
            {recipeData.imagePreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img 
                  src={recipeData.imagePreview} 
                  alt="Recipe preview" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <label className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Image size={40} className="mb-2" />
                  <span className="text-sm font-medium">Upload recipe photo</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>

          {/* Basic Info */}
          <div className="card p-6 mb-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Title</label>
              <input
                type="text"
                value={recipeData.title}
                onChange={(e) => setRecipeData({...recipeData, title: e.target.value})}
                className="input-field"
                placeholder="e.g., Chocolate Chip Cookies"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={recipeData.description}
                onChange={(e) => setRecipeData({...recipeData, description: e.target.value})}
                className="input-field min-h-[80px]"
                placeholder="Brief description of your recipe..."
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook Time</label>
                <input
                  type="text"
                  value={recipeData.cookTime}
                  onChange={(e) => setRecipeData({...recipeData, cookTime: e.target.value})}
                  className="input-field"
                  placeholder="30 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                <input
                  type="number"
                  value={recipeData.servings}
                  onChange={(e) => setRecipeData({...recipeData, servings: e.target.value})}
                  className="input-field"
                  placeholder="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={recipeData.difficulty}
                  onChange={(e) => setRecipeData({...recipeData, difficulty: e.target.value})}
                  className="input-field"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="card p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Ingredients</h3>
              <button onClick={handleAddIngredient} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                <Plus size={16} />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="input-field flex-1"
                    placeholder="e.g., 2 cups flour"
                  />
                  {recipeData.ingredients.length > 1 && (
                    <button
                      onClick={() => handleRemoveIngredient(index)}
                      className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="card p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Cooking Steps</h3>
              <button onClick={handleAddStep} className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                <Plus size={16} />
                Add Step
              </button>
            </div>
            <div className="space-y-3">
              {recipeData.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    className="input-field flex-1 min-h-[60px]"
                    placeholder="Describe this step..."
                  />
                  {recipeData.steps.length > 1 && (
                    <button
                      onClick={() => handleRemoveStep(index)}
                      className="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg flex-shrink-0"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Story Creation
  if (createType === 'story') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setCreateType(null)}>
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold">New Story</h1>
            </div>
            <button onClick={handlePublish} className="btn-primary">
              Post
            </button>
          </div>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <div className="card p-6">
            <label className="block w-full h-96 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Camera size={48} className="mb-3" />
                <span className="text-lg font-medium mb-2">Add Photo or Video</span>
                <span className="text-sm text-gray-400">Max 15 seconds for videos</span>
              </div>
              <input type="file" className="hidden" accept="image/*,video/*" />
            </label>
            <div className="mt-4">
              <input
                type="text"
                className="input-field"
                placeholder="Add a caption..."
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Live Session
  if (createType === 'live') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setCreateType(null)}>
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-xl font-bold">Go Live</h1>
            </div>
          </div>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <div className="card p-6 mb-6">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
              <Camera size={48} className="text-white" />
            </div>
            <input
              type="text"
              className="input-field mb-4"
              placeholder="Session title..."
            />
            <textarea
              className="input-field min-h-[100px] mb-4"
              placeholder="What will you cook today?"
            />
            <button onClick={handlePublish} className="btn-primary w-full flex items-center justify-center gap-2">
              <Video size={20} />
              Start Live Session
            </button>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Live Session Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Test your camera and microphone</li>
              <li>• Ensure good lighting</li>
              <li>• Have ingredients ready</li>
              <li>• Interact with your viewers</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default CreatePage
