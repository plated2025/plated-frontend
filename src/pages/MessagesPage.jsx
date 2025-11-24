import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Edit, X, Check, XCircle } from 'lucide-react'
// TODO: Connect to backend chat API
import DesktopSidebar from '../components/layout/DesktopSidebar'

function MessagesPage() {
  const navigate = useNavigate()
  const [showNewMessageModal, setShowNewMessageModal] = useState(false)
  const [searchUser, setSearchUser] = useState('')
  const [activeTab, setActiveTab] = useState('primary') // 'primary' or 'requests'
  const [messageRequests, setMessageRequests] = useState([
    {
      id: 101,
      user: {
        id: 7,
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        specialty: 'Vegan Chef'
      },
      lastMessage: 'Hi! I love your recipes, would love to connect!',
      timestamp: '2h ago',
      isOnline: true
    },
    {
      id: 102,
      user: {
        id: 8,
        name: 'David Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        specialty: 'Asian Cuisine'
      },
      lastMessage: 'Hey! Can you share your dumpling recipe?',
      timestamp: '1d ago',
      isOnline: false
    },
    {
      id: 103,
      user: {
        id: 9,
        name: 'Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        specialty: 'Pastry Chef'
      },
      lastMessage: 'I saw your dessert post, absolutely stunning!',
      timestamp: '3d ago',
      isOnline: true
    }
  ])

  // TODO: Fetch from backend API
  const allUsers = []
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.specialty.toLowerCase().includes(searchUser.toLowerCase())
  )

  const handleStartChat = (userId) => {
    setShowNewMessageModal(false)
    navigate(`/chat/${userId}`)
  }

  const handleAcceptRequest = (requestId) => {
    const request = messageRequests.find(r => r.id === requestId)
    if (request) {
      // Remove from requests
      setMessageRequests(messageRequests.filter(r => r.id !== requestId))
      // In production, this would move to primary messages
      alert(`Accepted message request from ${request.user.name}`)
    }
  }

  const handleDeclineRequest = (requestId) => {
    const request = messageRequests.find(r => r.id === requestId)
    if (request && confirm(`Decline message request from ${request.user.name}?`)) {
      setMessageRequests(messageRequests.filter(r => r.id !== requestId))
    }
  }

  return (
    <div className="lg:flex min-h-screen bg-gray-50 lg:bg-transparent pb-safe">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Content */}
      <div className="w-full lg:flex-1 lg:ml-64 bg-gray-50 pb-20 lg:pb-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 pt-safe">
        <div className="px-4 py-2.5 sm:py-3 lg:max-w-4xl lg:mx-auto">
          <div className="flex items-center justify-between mb-2.5 sm:mb-3">
            <h1 className="text-lg sm:text-xl font-bold">Messages</h1>
            <button 
              onClick={() => setShowNewMessageModal(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative mb-3">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('primary')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                activeTab === 'primary'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Primary
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all relative ${
                activeTab === 'requests'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Requests
              {messageRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center">
                  {messageRequests.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Primary Messages */}
      {activeTab === 'primary' && (
        <div className="divide-y divide-gray-200 lg:max-w-4xl lg:mx-auto">
          {/* TODO: Replace empty array with messages from backend */}
          {[].map(message => (
            <button
              key={message.id}
              onClick={() => navigate(`/chat/${message.id}`)}
              className="w-full px-4 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors bg-white"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={message.user.avatar}
                  alt={message.user.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                {message.isOnline && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Message Info */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-semibold truncate ${message.unread > 0 ? 'text-gray-900' : 'text-gray-700'}`}>
                    {message.user.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{message.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${message.unread > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                  {message.lastMessage}
                </p>
              </div>

              {/* Unread Badge */}
              {message.unread > 0 && (
                <div className="flex-shrink-0 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">{message.unread}</span>
                </div>
              )}
            </button>
          ))}

          {/* Empty State */}
          {/* TODO: Replace empty array check with messages from backend */}
          {[].length === 0 && (
            <div className="text-center py-12 bg-white">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Messages Yet</h3>
              <p className="text-gray-600">Start a conversation with creators you follow</p>
            </div>
          )}
        </div>
      )}

      {/* Message Requests */}
      {activeTab === 'requests' && (
        <div className="lg:max-w-4xl lg:mx-auto">
          {messageRequests.length > 0 ? (
            <div>
              {/* Info Banner */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 mb-2">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  💡 These are messages from people you don't follow. Accept to move them to Primary.
                </p>
              </div>

              {/* Requests List */}
              <div className="divide-y divide-gray-200">
                {messageRequests.map(request => (
                  <div
                    key={request.id}
                    className="bg-white p-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={request.user.avatar}
                          alt={request.user.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        {request.isOnline && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>

                      {/* Message Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{request.user.name}</h3>
                          <span className="text-xs text-gray-500">{request.timestamp}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{request.user.specialty}</p>
                        <p className="text-sm text-gray-700 mb-3">{request.lastMessage}</p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            <Check size={16} />
                            Accept
                          </button>
                          <button
                            onClick={() => handleDeclineRequest(request.id)}
                            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                          >
                            <XCircle size={16} />
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Empty State for Requests */
            <div className="text-center py-12 bg-white">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Message Requests</h3>
              <p className="text-gray-600">When someone new messages you, it will appear here</p>
            </div>
          )}
        </div>
      )}

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:max-w-md sm:rounded-xl rounded-t-3xl max-h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold">New Message</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => handleStartChat(user.id)}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.specialty}</p>
                  </div>
                </button>
              ))}
              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default MessagesPage
