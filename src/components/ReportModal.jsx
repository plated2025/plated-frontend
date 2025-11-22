import { useState } from 'react'
import { X, Flag, AlertTriangle } from 'lucide-react'
import { securityAPI } from '../services/api'

function ReportModal({ isOpen, onClose, targetType, targetId, targetName }) {
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const reportReasons = [
    { value: 'spam', label: 'Spam or misleading' },
    { value: 'harassment', label: 'Harassment or bullying' },
    { value: 'hate_speech', label: 'Hate speech' },
    { value: 'violence', label: 'Violence or dangerous content' },
    { value: 'nudity', label: 'Nudity or sexual content' },
    { value: 'false_information', label: 'False information' },
    { value: 'copyright', label: 'Copyright violation' },
    { value: 'impersonation', label: 'Impersonation' },
    { value: 'other', label: 'Other' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!reason) {
      alert('Please select a reason')
      return
    }

    setLoading(true)
    try {
      await securityAPI.createReport({
        reportType: targetType,
        targetId: targetId,
        reason: reason,
        description: description
      })
      
      setSubmitted(true)
      setTimeout(() => {
        onClose()
        // Reset form after closing
        setTimeout(() => {
          setSubmitted(false)
          setReason('')
          setDescription('')
        }, 300)
      }, 2000)
    } catch (error) {
      alert('Error submitting report: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      setTimeout(() => {
        setSubmitted(false)
        setReason('')
        setDescription('')
      }, 300)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {submitted ? (
          // Success State
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Flag className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Report Submitted
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for helping keep our community safe. We'll review this report as soon as possible.
            </p>
          </div>
        ) : (
          // Form State
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Flag className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Report {targetType === 'user' ? 'User' : targetType === 'recipe' ? 'Recipe' : 'Comment'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {targetName}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                disabled={loading}
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex gap-3">
                <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <p className="font-medium mb-1">Please report responsibly</p>
                  <p className="text-yellow-700 dark:text-yellow-300">
                    False reports may result in action against your account.
                  </p>
                </div>
              </div>

              {/* Reason Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reason for Report *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="input-field"
                  required
                >
                  <option value="">Select a reason...</option>
                  {reportReasons.map(r => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Details (Optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field min-h-[100px]"
                  placeholder="Provide any additional context that might help us understand the issue..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary flex-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1 bg-red-600 hover:bg-red-700"
                  disabled={loading || !reason}
                >
                  {loading ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ReportModal
