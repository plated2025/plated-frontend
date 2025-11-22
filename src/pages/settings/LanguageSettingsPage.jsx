import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'

function LanguageSettingsPage() {
  const navigate = useNavigate()
  const [selectedLanguage, setSelectedLanguage] = useState('en')

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' }
  ]

  const handleLanguageSelect = (code) => {
    setSelectedLanguage(code)
    localStorage.setItem('appLanguage', code)
    // Show success message
    setTimeout(() => {
      alert('Language changed successfully! The app will update on next reload.')
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="flex items-center gap-3 px-4 py-3">
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-900 dark:text-white"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Language</h1>
        </div>
      </header>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 p-4">
        <p className="text-sm text-blue-900 dark:text-blue-200">
          Select your preferred language. The app will restart to apply changes.
        </p>
      </div>

      {/* Language List */}
      <div className="py-2">
        <div className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                selectedLanguage === language.code ? 'bg-primary-50 dark:bg-primary-900/20' : ''
              }`}
            >
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {language.nativeName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {language.name}
                </p>
              </div>
              {selectedLanguage === language.code && (
                <Check size={20} className="text-primary-600 dark:text-primary-400" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LanguageSettingsPage
