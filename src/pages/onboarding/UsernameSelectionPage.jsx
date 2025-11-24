import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Check, X, Loader } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { authAPI, userAPI } from '../../services/api'

function UsernameSelectionPage() {
  const navigate = useNavigate()
  const { user } = useApp()
  const [username, setUsername] = useState('')
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check username availability as user types
  useEffect(() => {
    const checkUsername = async () => {
      if (username.length >= 3) {
        setChecking(true)
        setError('')
        try {
          const data = await authAPI.checkUsername(username)
          setAvailable(data.available)
          if (!data.available) {
            setError('Username is already taken')
          }
        } catch (error) {
          console.error('Error checking username:', error)
          setError('Error checking username')
        } finally {
          setChecking(false)
        }
      } else {
        setAvailable(null)
        setError('')
      }
    }

    const timeoutId = setTimeout(checkUsername, 500)
    return () => clearTimeout(timeoutId)
  }, [username])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!available || username.length < 3) {
      setError('Please choose a valid, available username')
      return
    }

    setLoading(true)
    try {
      await userAPI.updateProfile({ username: username.toLowerCase() })
      // Username set successfully, proceed to next step
      navigate('/onboarding/user-type')
    } catch (error) {
      setError(error.message || 'Error setting username. Please try again.')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUsernameChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '')
    setUsername(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <User size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Username</h1>
          <p className="text-gray-600">
            This is how other users will find you on Plated
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">@</span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`input-field pl-8 pr-10 text-lg ${
                    error ? 'border-red-500' : 
                    available === true ? 'border-green-500' :
                    available === false ? 'border-red-500' : ''
                  }`}
                  placeholder="unique_username"
                  maxLength={20}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {checking && (
                    <Loader className="text-primary-600 animate-spin" size={20} />
                  )}
                  {!checking && available === true && (
                    <Check className="text-green-600" size={20} />
                  )}
                  {!checking && available === false && (
                    <X className="text-red-600" size={20} />
                  )}
                </div>
              </div>

              {/* Helper Text */}
              <div className="mt-2 space-y-1">
                {error && (
                  <p className="text-red-600 text-sm flex items-center gap-1">
                    <X size={14} />
                    {error}
                  </p>
                )}
                {!error && available === true && (
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    <Check size={14} />
                    Username is available!
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  • 3-20 characters
                  <br />
                  • Lowercase letters, numbers, and underscores only
                  <br />
                  • Cannot be changed later
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!available || username.length < 3 || loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                available && username.length >= 3 && !loading
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="animate-spin" size={20} />
                  Setting username...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900">
              <strong>Tip:</strong> Choose carefully! Your username is permanent and helps others find and recognize you.
            </p>
          </div>
        </div>

        {/* Suggestions (Optional) */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble? Try adding numbers or underscores: 
            <span className="block mt-1 text-gray-500 font-mono text-xs">
              {user?.fullName?.toLowerCase().replace(/\s+/g, '_')}_123
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UsernameSelectionPage
