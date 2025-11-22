import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Check, Plus, Trash2, Share2, Download, ShoppingCart, 
  DollarSign, TrendingDown, Store, MapPin, Package, Bell, ExternalLink,
  Filter, BarChart3, Settings, ShoppingBag, Tag
} from 'lucide-react'

function ShoppingListPageAdvanced() {
  const navigate = useNavigate()
  
  const [viewMode, setViewMode] = useState('category') // 'category', 'store', 'aisle'
  const [showBudget, setShowBudget] = useState(true)
  const [showOnlineShop, setShowOnlineShop] = useState(false)
  const [selectedStore, setSelectedStore] = useState('all')
  const [showBudgetEdit, setShowBudgetEdit] = useState(false)
  const [tempBudget, setTempBudget] = useState('')
  
  // Mock shopping list items with enhanced data
  const [items, setItems] = useState([
    {
      category: 'Produce',
      aisle: 'A1',
      items: [
        { 
          id: 1, name: 'Tomatoes', amount: '4 large', checked: false,
          price: 3.99, unit: 'lb', 
          stores: [
            { name: 'Walmart', price: 3.49, inStock: true, link: 'https://walmart.com' },
            { name: 'Amazon Fresh', price: 3.99, inStock: true, link: 'https://amazon.com/fresh' },
            { name: 'Instacart', price: 4.29, inStock: true, link: 'https://instacart.com' }
          ]
        },
        { 
          id: 2, name: 'Onions', amount: '2 medium', checked: false,
          price: 1.99, unit: 'lb',
          stores: [
            { name: 'Walmart', price: 1.79, inStock: true },
            { name: 'Amazon Fresh', price: 1.99, inStock: true },
            { name: 'Instacart', price: 2.19, inStock: true }
          ]
        },
        { 
          id: 3, name: 'Garlic', amount: '1 bulb', checked: true,
          price: 0.89, unit: 'ea',
          stores: [
            { name: 'Walmart', price: 0.79, inStock: true },
            { name: 'Amazon Fresh', price: 0.89, inStock: false },
          ]
        },
        { 
          id: 4, name: 'Fresh Basil', amount: '1 bunch', checked: false,
          price: 2.49, unit: 'bunch',
          stores: [
            { name: 'Walmart', price: 2.29, inStock: true },
            { name: 'Amazon Fresh', price: 2.49, inStock: true },
          ]
        }
      ]
    },
    {
      category: 'Meat & Seafood',
      aisle: 'B3',
      items: [
        { 
          id: 6, name: 'Chicken Breast', amount: '2 lbs', checked: false,
          price: 9.98, unit: '2 lbs',
          stores: [
            { name: 'Walmart', price: 8.99, inStock: true },
            { name: 'Amazon Fresh', price: 9.98, inStock: true },
            { name: 'Instacart', price: 10.49, inStock: true }
          ]
        },
        { 
          id: 7, name: 'Ground Beef', amount: '1 lb', checked: true,
          price: 5.99, unit: 'lb',
          stores: [
            { name: 'Walmart', price: 5.49, inStock: true },
            { name: 'Amazon Fresh', price: 5.99, inStock: true },
          ]
        },
        { 
          id: 8, name: 'Shrimp', amount: '1 lb', checked: false,
          price: 12.99, unit: 'lb',
          stores: [
            { name: 'Walmart', price: 11.99, inStock: true },
            { name: 'Amazon Fresh', price: 12.99, inStock: true },
            { name: 'Instacart', price: 13.99, inStock: true }
          ]
        }
      ]
    },
    {
      category: 'Dairy & Eggs',
      aisle: 'C2',
      items: [
        { 
          id: 9, name: 'Milk', amount: '1 gallon', checked: false,
          price: 4.29, unit: 'gal',
          stores: [
            { name: 'Walmart', price: 3.99, inStock: true },
            { name: 'Amazon Fresh', price: 4.29, inStock: true },
            { name: 'Instacart', price: 4.49, inStock: true }
          ]
        },
        { 
          id: 10, name: 'Eggs', amount: '1 dozen', checked: false,
          price: 3.99, unit: 'dozen',
          stores: [
            { name: 'Walmart', price: 3.79, inStock: true },
            { name: 'Amazon Fresh', price: 3.99, inStock: true },
          ]
        }
      ]
    }
  ])

  const [budget, setBudget] = useState(75.00)
  const [expandedItem, setExpandedItem] = useState(null)

  // Load budget from localStorage
  useEffect(() => {
    const savedBudget = localStorage.getItem('shoppingBudget')
    if (savedBudget) {
      setBudget(parseFloat(savedBudget))
    }
  }, [])

  const handleBudgetEdit = () => {
    setTempBudget(budget.toString())
    setShowBudgetEdit(true)
  }

  const saveBudget = () => {
    const newBudget = parseFloat(tempBudget)
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget)
      localStorage.setItem('shoppingBudget', newBudget.toString())
      setShowBudgetEdit(false)
    }
  }

  const toggleItem = (categoryIndex, itemIndex) => {
    const newItems = [...items]
    newItems[categoryIndex].items[itemIndex].checked = !newItems[categoryIndex].items[itemIndex].checked
    setItems(newItems)
  }

  const deleteItem = (categoryIndex, itemIndex) => {
    const newItems = [...items]
    newItems[categoryIndex].items.splice(itemIndex, 1)
    setItems(newItems)
  }

  const getTotalCost = () => {
    return items.reduce((total, category) => 
      total + category.items
        .filter(item => !item.checked)
        .reduce((sum, item) => sum + (item.price || 0), 0), 0
    )
  }

  const getTotalItems = () => {
    return items.reduce((total, category) => total + category.items.length, 0)
  }

  const getCheckedItems = () => {
    return items.reduce((total, category) => 
      total + category.items.filter(item => item.checked).length, 0
    )
  }

  const getBestStore = () => {
    const storeTotals = {}
    
    items.forEach(category => {
      category.items.forEach(item => {
        if (!item.checked && item.stores) {
          item.stores.forEach(store => {
            if (!storeTotals[store.name]) storeTotals[store.name] = 0
            storeTotals[store.name] += store.price
          })
        }
      })
    })

    return Object.entries(storeTotals)
      .sort((a, b) => a[1] - b[1])
      .map(([name, total]) => ({ name, total }))
  }

  const onlineStores = [
    { 
      name: 'Walmart', 
      logo: '🛒', 
      color: 'bg-blue-600',
      tagline: 'Everyday Low Prices',
      link: 'https://walmart.com/grocery'
    },
    { 
      name: 'Amazon Fresh', 
      logo: '📦', 
      color: 'bg-orange-500',
      tagline: 'Fast & Fresh Delivery',
      link: 'https://amazon.com/fresh'
    },
    { 
      name: 'Instacart', 
      logo: '🥕', 
      color: 'bg-green-600',
      tagline: 'Local Stores Delivered',
      link: 'https://instacart.com'
    },
    { 
      name: 'Target', 
      logo: '🎯', 
      color: 'bg-red-600',
      tagline: 'Same Day Delivery',
      link: 'https://target.com'
    }
  ]

  const handleShopOnline = (storeName) => {
    // In production, this would integrate with store APIs
    const itemsText = items.map(category => 
      category.items
        .filter(item => !item.checked)
        .map(item => item.name)
        .join(', ')
    ).join(', ')
    
    alert(`Opening ${storeName}...\n\nIn production, your list would be:\n${itemsText}`)
  }

  const savingsAmount = () => {
    const currentTotal = getTotalCost()
    const bestStoreData = getBestStore()[0]
    return currentTotal > 0 && bestStoreData ? (currentTotal - bestStoreData.total).toFixed(2) : 0
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 lg:pb-0">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate('/planner')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-900 dark:text-gray-100" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Smart Shopping List</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getCheckedItems()} of {getTotalItems()} items • ${getTotalCost().toFixed(2)}
              </p>
            </div>
            <ShoppingCart size={24} className="text-primary-600" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowOnlineShop(true)}
              className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              Shop Online
            </button>
            <button
              onClick={() => setShowBudget(!showBudget)}
              className="btn-secondary p-2"
            >
              <DollarSign size={18} />
            </button>
            <button className="btn-secondary p-2">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 space-y-4">
        {/* Budget & Savings Banner */}
        {showBudget && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleBudgetEdit}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all text-left"
            >
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Budget</span>
                <Settings size={14} className="text-blue-600 ml-auto" />
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">${budget.toFixed(2)}</p>
              <p className="text-xs text-blue-700 dark:text-blue-300">
                ${(budget - getTotalCost()).toFixed(2)} remaining • Click to edit
              </p>
            </button>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-900 dark:text-green-100">Best Price</span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {getBestStore()[0]?.name || 'N/A'}
              </p>
              <p className="text-xs text-green-700 dark:text-green-300">
                Save ${savingsAmount()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Total Cost</span>
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                ${getTotalCost().toFixed(2)}
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300">
                {getCheckedItems()} items remaining
              </p>
            </div>
          </div>
        )}

        {/* Shopping List Content */}
        <div className="space-y-4">
          {items.map((category, categoryIndex) => (
            <div key={category.category} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100">{category.category}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Aisle {category.aisle} • {category.items.filter(item => !item.checked).length} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      ${category.items.filter(i => !i.checked).reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {category.items.map((item, itemIndex) => (
                  <div key={item.id} className={item.checked ? 'opacity-50' : ''}>
                    <div
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                      onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleItem(categoryIndex, itemIndex)
                        }}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                          item.checked
                            ? 'bg-primary-600 border-primary-600'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        {item.checked && <Check size={16} className="text-white" />}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium ${
                          item.checked
                            ? 'line-through text-gray-500 dark:text-gray-500'
                            : 'text-gray-900 dark:text-gray-100'
                        }`}>
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.amount}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                          ${item.price.toFixed(2)}
                        </p>
                        {item.stores && (
                          <p className="text-xs text-green-600 dark:text-green-400">
                            {item.stores[0].name} ${item.stores[0].price}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteItem(categoryIndex, itemIndex)
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Expanded Store Prices */}
                    {expandedItem === item.id && item.stores && (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Compare Prices:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.stores.map((store, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg border-2 ${
                                idx === 0 
                                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                                  : 'border-gray-200 dark:border-gray-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                    {store.name}
                                    {idx === 0 && <Tag size={14} className="text-green-600" />}
                                  </p>
                                  <p className={`text-xs ${store.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                    {store.inStock ? 'In Stock' : 'Out of Stock'}
                                  </p>
                                </div>
                                <p className="font-bold text-gray-900 dark:text-gray-100">
                                  ${store.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Online Shop Modal */}
      {showOnlineShop && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shop Online</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Compare prices & order from your favorite stores
                  </p>
                </div>
                <button
                  onClick={() => setShowOnlineShop(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <Plus size={24} className="rotate-45 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Best Deal Banner */}
              {getBestStore()[0] && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingDown size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        Best Deal: {getBestStore()[0].name}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        Total: ${getBestStore()[0].total.toFixed(2)} • Save ${savingsAmount()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Store Options */}
              {onlineStores.map((store, idx) => {
                const storeTotal = getBestStore().find(s => s.name === store.name)
                return (
                  <div
                    key={idx}
                    className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-primary-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${store.color} rounded-xl flex items-center justify-center text-3xl`}>
                        {store.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{store.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{store.tagline}</p>
                        {storeTotal && (
                          <p className="text-sm font-semibold text-primary-600 mt-1">
                            Estimated: ${storeTotal.total.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => handleShopOnline(store.name)}
                        className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        Shop
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Info */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>How it works:</strong> Clicking "Shop" will open the store's website. In the full version, your list will be automatically added to their cart.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Budget Edit Modal */}
      {showBudgetEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Set Your Budget</h3>
              <button
                onClick={() => setShowBudgetEdit(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              >
                <Plus size={24} className="rotate-45 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Weekly Shopping Budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    value={tempBudget}
                    onChange={(e) => setTempBudget(e.target.value)}
                    placeholder="75.00"
                    className="w-full pl-8 pr-4 py-3 text-lg border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-600 focus:border-primary-600"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Set a budget to help track your spending
                </p>
              </div>

              {/* Quick Budget Presets */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Select:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 75, 100, 150].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTempBudget(amount.toString())}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                        tempBudget === amount.toString()
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current vs New */}
              {tempBudget && !isNaN(parseFloat(tempBudget)) && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Budget:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${budget.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">New Budget:</span>
                    <span className="font-semibold text-primary-600">${parseFloat(tempBudget).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current Total:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${getTotalCost().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Remaining:</span>
                    <span className={`font-bold ${
                      parseFloat(tempBudget) - getTotalCost() >= 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      ${(parseFloat(tempBudget) - getTotalCost()).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowBudgetEdit(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveBudget}
                disabled={!tempBudget || isNaN(parseFloat(tempBudget)) || parseFloat(tempBudget) <= 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
              >
                Save Budget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingListPageAdvanced
