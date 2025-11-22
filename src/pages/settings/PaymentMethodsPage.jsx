import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Plus, Check, Trash2 } from 'lucide-react'

function PaymentMethodsPage() {
  const navigate = useNavigate()
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true,
      holderName: 'John Doe'
    },
    {
      id: 2,
      type: 'mastercard',
      lastFour: '8888',
      expiryMonth: '06',
      expiryYear: '2026',
      isDefault: false,
      holderName: 'John Doe'
    }
  ])

  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({
    number: '',
    holderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  })

  const getCardIcon = (type) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    }
    return icons[type] || '💳'
  }

  const handleSetDefault = (id) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    )
  }

  const handleDeleteCard = (id) => {
    if (confirm('Delete this payment method?')) {
      setPaymentMethods(methods => methods.filter(m => m.id !== id))
    }
  }

  const handleAddCard = () => {
    if (!newCard.number || !newCard.holderName || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv) {
      alert('Please fill in all fields')
      return
    }

    const card = {
      id: Date.now(),
      type: 'visa', // Detect from card number
      lastFour: newCard.number.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: paymentMethods.length === 0,
      holderName: newCard.holderName
    }

    setPaymentMethods([...paymentMethods, card])
    setNewCard({ number: '', holderName: '', expiryMonth: '', expiryYear: '', cvv: '' })
    setShowAddCard(false)
    alert('Payment method added successfully!')
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
        </div>
      </header>

      {/* Payment Methods List */}
      <div className="p-4">
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border-2 border-gray-200 dark:border-gray-800 relative overflow-hidden"
            >
              {method.isDefault && (
                <div className="absolute top-2 right-2">
                  <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Default
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                    {getCardIcon(method.type)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {method.type} •••• {method.lastFour}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {method.holderName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCard(method.id)}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Card Button */}
        {!showAddCard ? (
          <button
            onClick={() => setShowAddCard(true)}
            className="w-full mt-4 p-4 bg-white dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl hover:border-primary-600 dark:hover:border-primary-400 transition-colors flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            <Plus size={20} />
            <span className="font-medium">Add Payment Method</span>
          </button>
        ) : (
          <div className="mt-4 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Card</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value.replace(/\s/g, '') })}
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={newCard.holderName}
                  onChange={(e) => setNewCard({ ...newCard, holderName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Month
                  </label>
                  <input
                    type="text"
                    value={newCard.expiryMonth}
                    onChange={(e) => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                    placeholder="MM"
                    maxLength="2"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={newCard.expiryYear}
                    onChange={(e) => setNewCard({ ...newCard, expiryYear: e.target.value })}
                    placeholder="YYYY"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    placeholder="123"
                    maxLength="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddCard}
                  className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Card
                </button>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-4 pb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-sm text-blue-900 dark:text-blue-200">
            🔒 Your payment information is encrypted and secure. We never store your full card details.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodsPage
