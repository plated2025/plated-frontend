import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Camera, Check, X, Loader2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { userAPI } from '../services/api'

function EditProfilePage() {
  const navigate = useNavigate()
  const { currentUser, updateUser } = useApp()
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    username: currentUser?.username || '',
    bio: currentUser?.bio || '',
    website: currentUser?.website || '',
    location: currentUser?.location || '',
    specialty: currentUser?.specialty || ''
  })
  const [usernameAvailable, setUsernameAvailable] = useState(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [usernameError, setUsernameError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Reset username validation when user types
    if (name === 'username') {
      setUsernameAvailable(null)
      setUsernameError('')
    }
  }

  // Check username availability
  useEffect(() => {
    const checkUsername = async () => {
      const username = formData.username.trim().toLowerCase()
      
      // Skip if username hasn't changed
      if (username === currentUser?.username?.toLowerCase()) {
        setUsernameAvailable(true)
        setUsernameError('')
        return
      }
      
      if (username.length < 3) {
        setUsernameError('Username must be at least 3 characters')
        setUsernameAvailable(false)
        return
      }
      
      if (!/^[a-z0-9_]+$/.test(username)) {
        setUsernameError('Username can only contain letters, numbers, and underscores')
        setUsernameAvailable(false)
        return
      }
      
      setCheckingUsername(true)
      setUsernameError('')
      
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${API_URL}/auth/check-username/${username}`)
        const data = await response.json()
        
        setUsernameAvailable(data.available)
        if (!data.available) {
          setUsernameError('Username is already taken')
        }
      } catch (error) {
        console.error('Error checking username:', error)
        setUsernameError('Error checking username')
      } finally {
        setCheckingUsername(false)
      }
    }
    
    const timeoutId = setTimeout(() => {
      if (formData.username && formData.username.length >= 3) {
        checkUsername()
      }
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }, [formData.username, currentUser?.username])

  const handleSave = async () => {
    // Don't save if username is invalid
    if (usernameAvailable === false) {
      setSaveError('Please fix the username error before saving')
      return
    }

    setIsSaving(true)
    setSaveError('')

    try {
      const response = await userAPI.updateProfile({
        fullName: formData.name,
        username: formData.username,
        bio: formData.bio,
        website: formData.website,
        location: formData.location,
        specialty: formData.specialty
      })

      // Update local user state
      updateUser(response.data)
      
      // Navigate back to profile
      navigate('/profile')
    } catch (error) {
      console.error('Error saving profile:', error)
      setSaveError(error.response?.data?.message || 'Failed to update profile. Please try again.')
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">Edit Profile</h1>
          </div>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </header>

      <div className="p-6 max-w-2xl mx-auto">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={currentUser?.avatar || 'https://i.pravatar.cc/150'}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <Camera size={16} />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {saveError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {saveError}
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field pr-10"
                placeholder="your_username"
              />
              {/* Status Icon */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checkingUsername && <Loader2 size={20} className="text-gray-400 animate-spin" />}
                {!checkingUsername && usernameAvailable === true && (
                  <Check size={20} className="text-green-500" />
                )}
                {!checkingUsername && usernameAvailable === false && (
                  <X size={20} className="text-red-500" />
                )}
              </div>
            </div>
            {usernameError && (
              <p className="text-xs text-red-500 mt-1">{usernameError}</p>
            )}
            {usernameAvailable === true && formData.username !== currentUser?.username && (
              <p className="text-xs text-green-500 mt-1">Username is available!</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="input-field min-h-[100px]"
              placeholder="Tell people a little about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., 🇮🇹 Italian Cuisine"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="input-field"
              placeholder="https://yourwebsite.com"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfilePage
