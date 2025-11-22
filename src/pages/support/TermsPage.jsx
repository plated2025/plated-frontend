import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function TermsPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Terms & Privacy</h1>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium whitespace-nowrap">
            Terms of Service
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium whitespace-nowrap">
            Privacy Policy
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium whitespace-nowrap">
            Community Guidelines
          </button>
        </div>

        {/* Content */}
        <div className="card p-6 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Terms of Service</h2>
          <p className="text-gray-600 text-sm mb-4">Last updated: November 15, 2024</p>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
            <p className="text-gray-600 text-sm mb-4">
              By accessing and using Plated, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">2. User Accounts</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept 
              responsibility for all activities that occur under your account.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>You must be at least 13 years old to use this service</li>
              <li>You must provide accurate and complete information</li>
              <li>You may not impersonate others or create fake accounts</li>
              <li>One person may not maintain more than one account</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Content Guidelines</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Users are responsible for the content they post. Content must not:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Contain hate speech, harassment, or bullying</li>
              <li>Include graphic violence or adult content</li>
              <li>Promote dangerous or illegal activities</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Intellectual Property</h3>
            <p className="text-gray-600 text-sm mb-4">
              You retain all rights to the content you post on Plated. By posting content, you grant us a 
              non-exclusive, worldwide, royalty-free license to use, display, and distribute your content on our platform.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Prohibited Activities</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Attempting to gain unauthorized access to our systems</li>
              <li>Using automated tools to scrape or collect data</li>
              <li>Engaging in spam or unsolicited advertising</li>
              <li>Selling or transferring your account</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Termination</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to suspend or terminate your account at any time for violations of these terms, 
              without prior notice or liability.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">7. Disclaimer of Warranties</h3>
            <p className="text-gray-600 text-sm mb-4">
              Plated is provided "as is" without warranties of any kind. We do not guarantee that the service 
              will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">8. Limitation of Liability</h3>
            <p className="text-gray-600 text-sm mb-4">
              In no event shall Plated be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of the service.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">9. Changes to Terms</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              We reserve the right to modify these terms at any time. Continued use of the service after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">10. Contact Us</h3>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these Terms, please contact us at:<br />
              Email: legal@plated.com<br />
              Address: 123 Culinary Street, Food City, FC 12345
            </p>
          </section>
        </div>

        {/* Privacy Policy Preview */}
        <div className="card p-6 mt-6 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">Privacy Policy Summary</h3>
          <p className="text-sm text-gray-700 mb-3">
            We collect and use your information to provide and improve our services. We do not sell your personal data 
            to third parties. For full details, please review our complete Privacy Policy.
          </p>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Read Full Privacy Policy →
          </button>
        </div>
      </div>
    </div>
  )
}

export default TermsPage
