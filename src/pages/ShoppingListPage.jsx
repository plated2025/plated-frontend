import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Plus, Trash2, Share2, Download, ShoppingCart, RefreshCw, Calendar } from 'lucide-react'

function ShoppingListPage() {
  const navigate = useNavigate()
  
  // Mock meal plan recipes for this week
  const weeklyMealPlan = [
    { 
      recipe: 'Avocado Toast & Eggs',
      ingredients: [
        { name: 'Avocados', amount: '2 ripe', category: 'Produce' },
        { name: 'Eggs', amount: '4', category: 'Dairy & Eggs' },
        { name: 'Bread', amount: '4 slices', category: 'Pantry' }
      ]
    },
    { 
      recipe: 'Grilled Chicken Salad',
      ingredients: [
        { name: 'Chicken Breast', amount: '2 lbs', category: 'Meat & Seafood' },
        { name: 'Mixed Greens', amount: '1 bag', category: 'Produce' },
        { name: 'Cherry Tomatoes', amount: '1 pint', category: 'Produce' }
      ]
    },
    { 
      recipe: 'Salmon with Vegetables',
      ingredients: [
        { name: 'Salmon Fillets', amount: '4 pieces', category: 'Meat & Seafood' },
        { name: 'Broccoli', amount: '2 heads', category: 'Produce' },
        { name: 'Lemon', amount: '2', category: 'Produce' }
      ]
    }
  ]
  
  // Mock shopping list items categorized by type
  const [items, setItems] = useState([
    {
      category: 'Produce',
      items: [
        { id: 1, name: 'Tomatoes', amount: '4 large', checked: false },
        { id: 2, name: 'Onions', amount: '2 medium', checked: false },
        { id: 3, name: 'Garlic', amount: '1 bulb', checked: true },
        { id: 4, name: 'Fresh Basil', amount: '1 bunch', checked: false },
        { id: 5, name: 'Bell Peppers', amount: '3 mixed', checked: false }
      ]
    },
    {
      category: 'Meat & Seafood',
      items: [
        { id: 6, name: 'Chicken Breast', amount: '2 lbs', checked: false },
        { id: 7, name: 'Ground Beef', amount: '1 lb', checked: true },
        { id: 8, name: 'Shrimp', amount: '1 lb', checked: false }
      ]
    },
    {
      category: 'Dairy & Eggs',
      items: [
        { id: 9, name: 'Milk', amount: '1 gallon', checked: false },
        { id: 10, name: 'Eggs', amount: '1 dozen', checked: false },
        { id: 11, name: 'Mozzarella Cheese', amount: '8 oz', checked: true },
        { id: 12, name: 'Butter', amount: '1 stick', checked: false }
      ]
    },
    {
      category: 'Pantry',
      items: [
        { id: 13, name: 'Olive Oil', amount: '1 bottle', checked: true },
        { id: 14, name: 'Pasta', amount: '1 lb', checked: false },
        { id: 15, name: 'Rice', amount: '2 lbs', checked: false },
        { id: 16, name: 'Canned Tomatoes', amount: '2 cans', checked: false }
      ]
    },
    {
      category: 'Spices & Herbs',
      items: [
        { id: 17, name: 'Salt', amount: '1 container', checked: true },
        { id: 18, name: 'Black Pepper', amount: '1 container', checked: true },
        { id: 19, name: 'Paprika', amount: '1 jar', checked: false },
        { id: 20, name: 'Cumin', amount: '1 jar', checked: false }
      ]
    }
  ])

  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({ name: '', amount: '', category: 'Produce' })

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

  const addNewItem = () => {
    if (newItem.name.trim()) {
      const categoryIndex = items.findIndex(cat => cat.category === newItem.category)
      if (categoryIndex !== -1) {
        const newItems = [...items]
        newItems[categoryIndex].items.push({
          id: Date.now(),
          name: newItem.name,
          amount: newItem.amount,
          checked: false
        })
        setItems(newItems)
        setNewItem({ name: '', amount: '', category: 'Produce' })
        setShowAddItem(false)
      }
    }
  }

  const handleShare = () => {
    // Generate text list
    const listText = items.map(category => {
      const itemsText = category.items
        .filter(item => !item.checked)
        .map(item => `- ${item.name} (${item.amount})`)
        .join('\n')
      return `${category.category}:\n${itemsText}`
    }).join('\n\n')

    if (navigator.share) {
      navigator.share({
        title: 'Shopping List',
        text: listText
      })
    } else {
      navigator.clipboard.writeText(listText)
      alert('Shopping list copied to clipboard!')
    }
  }

  const handleExport = () => {
    const listText = items.map(category => {
      const itemsText = category.items
        .map(item => `${item.checked ? '✓' : '☐'} ${item.name} - ${item.amount}`)
        .join('\n')
      return `${category.category}:\n${itemsText}`
    }).join('\n\n')

    const blob = new Blob([listText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'shopping-list.txt'
    a.click()
  }

  const clearCompleted = () => {
    const newItems = items.map(category => ({
      ...category,
      items: category.items.filter(item => !item.checked)
    }))
    setItems(newItems)
  }

  const importFromMealPlan = () => {
    // Extract all ingredients from meal plan
    const allIngredients = weeklyMealPlan.flatMap(meal => meal.ingredients)
    
    // Group by category
    const grouped = allIngredients.reduce((acc, ingredient) => {
      if (!acc[ingredient.category]) {
        acc[ingredient.category] = []
      }
      // Check if ingredient already exists
      const existing = acc[ingredient.category].find(i => i.name.toLowerCase() === ingredient.name.toLowerCase())
      if (!existing) {
        acc[ingredient.category].push({
          id: Date.now() + Math.random(),
          name: ingredient.name,
          amount: ingredient.amount,
          checked: false
        })
      }
      return acc
    }, {})

    // Merge with existing items
    const newItems = [...items]
    Object.keys(grouped).forEach(categoryName => {
      const categoryIndex = newItems.findIndex(cat => cat.category === categoryName)
      if (categoryIndex !== -1) {
        // Add new items to existing category, avoiding duplicates
        grouped[categoryName].forEach(newItem => {
          const exists = newItems[categoryIndex].items.some(
            item => item.name.toLowerCase() === newItem.name.toLowerCase()
          )
          if (!exists) {
            newItems[categoryIndex].items.push(newItem)
          }
        })
      } else {
        // Create new category
        newItems.push({
          category: categoryName,
          items: grouped[categoryName]
        })
      }
    })

    setItems(newItems)
    alert(`Added ${allIngredients.length} ingredients from your meal plan!`)
  }

  const getTotalItems = () => {
    return items.reduce((total, category) => total + category.items.length, 0)
  }

  const getCheckedItems = () => {
    return items.reduce((total, category) => 
      total + category.items.filter(item => item.checked).length, 0
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20 lg:pb-0">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="px-4 py-3 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => navigate('/planner')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-900 dark:text-gray-100" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Shopping List</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {getCheckedItems()} of {getTotalItems()} items checked
              </p>
            </div>
            <ShoppingCart size={24} className="text-primary-600" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-stretch mb-2">
            <button
              onClick={() => setShowAddItem(true)}
              className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center gap-2"
            >
              <Plus size={16} />
              Add Item
            </button>
            <button
              onClick={handleShare}
              className="btn-secondary px-3 py-2 flex items-center justify-center"
              title="Share list"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={handleExport}
              className="btn-secondary px-3 py-2 flex items-center justify-center"
              title="Download list"
            >
              <Download size={18} />
            </button>
          </div>

          {/* Import from Meal Plan */}
          <button
            onClick={importFromMealPlan}
            className="w-full bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Calendar size={16} />
            Import from This Week's Meal Plan
            <RefreshCw size={14} />
          </button>
        </div>
      </header>

      {/* Shopping List Content */}
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {items.map((category, categoryIndex) => (
          <div key={category.category} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{category.category}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.items.filter(item => !item.checked).length} remaining
              </p>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {category.items.map((item, itemIndex) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    item.checked ? 'opacity-50' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleItem(categoryIndex, itemIndex)}
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                      item.checked
                        ? 'bg-primary-600 border-primary-600'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {item.checked && <Check size={16} className="text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${
                      item.checked
                        ? 'line-through text-gray-500 dark:text-gray-500'
                        : 'text-gray-900 dark:text-gray-100'
                    }`}>
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.amount}</p>
                  </div>

                  <button
                    onClick={() => deleteItem(categoryIndex, itemIndex)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Clear Completed Button */}
        {getCheckedItems() > 0 && (
          <button
            onClick={clearCompleted}
            className="w-full py-3 text-red-600 dark:text-red-400 font-medium hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
          >
            Clear Completed Items ({getCheckedItems()})
          </button>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Add New Item</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Milk"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <input
                  type="text"
                  value={newItem.amount}
                  onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                  placeholder="e.g., 1 gallon"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {items.map(cat => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addNewItem}
                className="flex-1 btn-primary"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShoppingListPage
