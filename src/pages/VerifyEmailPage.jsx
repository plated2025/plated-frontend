import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Mail, CheckCircle, XCircle, Loader } from 'lucide-react'
import { securityAPI } from '../services/api'

function VerifyEmailPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    verifyEmail()
  }, [token])

  const verifyEmail = async () => {
    try {
      const response = await securityAPI.verifyEmail(token)
      setStatus('success')
      setMessage(response.message || 'Email verified successfully!')
      
      // Redirect to home after 3 seconds
      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Invalid or expired verification link')
    }
  }

  const handleResend = async () => {
    try {
      await securityAPI.resendVerification()
      alert('Verification email sent! Check your inbox.')
    } catch (error) {
      alert('Error sending email. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="card p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 mx-auto">
            {status === 'verifying' && (
              <div className="bg-blue-100">
                <Loader className="text-blue-600 animate-spin" size={40} />
              </div>
            )}
            {status === 'success' && (
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="text-green-600" size={40} />
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-100 rounded-full p-4">
                <XCircle className="text-red-600" size={40} />
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {status === 'verifying' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message || 'Please wait while we verify your email address...'}
          </p>

          {/* Success Message */}
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-800">
                Your email has been verified successfully! Redirecting you to the home page...
              </p>
            </div>
          )}

          {/* Error Actions */}
          {status === 'error' && (
            <div className="space-y-3">
              <button
                onClick={handleResend}
                className="btn-primary w-full"
              >
                <Mail size={18} className="mr-2" />
                Resend Verification Email
              </button>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary w-full"
              >
                Go to Home
              </button>
            </div>
          )}

          {/* Success Action */}
          {status === 'success' && (
            <button
              onClick={() => navigate('/')}
              className="btn-primary w-full"
            >
              Continue to Home
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Having trouble?{' '}
            <button
              onClick={() => navigate('/settings')}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Go to Settings
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
