import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Image } from 'lucide-react'

function ReportProblemPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    email: ''
  })

  const categories = [
    'Bug Report',
    'Feature Request',
    'Account Issue',
    'Payment Problem',
    'Content Violation',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your report! We\'ll get back to you soon.')
    navigate(-1)
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
            <h1 className="text-xl font-bold">Report a Problem</h1>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!formData.category || !formData.subject || !formData.description}
            className="text-primary-600 hover:text-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit
          </button>
        </div>
      </header>

      <div className="p-4 max-w-2xl mx-auto">
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input-field"
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="input-field"
                placeholder="Brief summary of the issue"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field min-h-[150px]"
                placeholder="Please provide as much detail as possible..."
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email for follow-up
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="your@email.com"
              />
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Screenshot (Optional)
              </label>
              <label className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                <div className="flex flex-col items-center text-gray-500">
                  <Image size={32} className="mb-2" />
                  <span className="text-sm">Click to upload screenshot</span>
                </div>
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Before you submit</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Check the Help Center for quick answers</li>
            <li>• Include screenshots if possible</li>
            <li>• Provide step-by-step details</li>
            <li>• We typically respond within 24-48 hours</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReportProblemPage
