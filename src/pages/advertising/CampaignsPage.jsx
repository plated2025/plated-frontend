import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, TrendingUp, DollarSign, Eye, Heart, Search, Filter, Calendar, MoreVertical, Play, Pause, Trash2 } from 'lucide-react'
import { CAMPAIGN_STATUS, calculateMetrics } from '../../utils/advertisingSystem'

function CampaignsPage() {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Load campaigns from localStorage (in production, this would be an API call)
    const savedCampaigns = JSON.parse(localStorage.getItem('adCampaigns') || '[]')
    
    // Add mock data if no campaigns exist
    if (savedCampaigns.length === 0) {
      const mockCampaigns = [
        {
          id: 'camp_1',
          name: 'Summer Recipe Collection',
          objective: 'engagement',
          adType: 'collection_promotion',
          status: 'active',
          budget: 50,
          spent: 32.45,
          impressions: 12500,
          clicks: 487,
          engagements: 892,
          conversions: 23,
          startDate: '2024-11-15',
          endDate: '2024-11-22',
          createdAt: '2024-11-14T10:00:00Z'
        },
        {
          id: 'camp_2',
          name: 'Profile Growth Campaign',
          objective: 'followers',
          adType: 'profile_promotion',
          status: 'active',
          budget: 100,
          spent: 78.90,
          impressions: 25000,
          clicks: 1250,
          engagements: 2100,
          conversions: 156,
          startDate: '2024-11-10',
          endDate: '2024-11-24',
          createdAt: '2024-11-09T14:30:00Z'
        }
      ]
      setCampaigns(mockCampaigns)
      localStorage.setItem('adCampaigns', JSON.stringify(mockCampaigns))
    } else {
      setCampaigns(savedCampaigns)
    }
  }, [])

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesFilter = filter === 'all' || campaign.status === filter
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalStats = campaigns.reduce((acc, campaign) => ({
    spent: acc.spent + (campaign.spent || 0),
    impressions: acc.impressions + (campaign.impressions || 0),
    clicks: acc.clicks + (campaign.clicks || 0),
    engagements: acc.engagements + (campaign.engagements || 0)
  }), { spent: 0, impressions: 0, clicks: 0, engagements: 0 })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Ad Campaigns</h1>
          <button
            onClick={() => navigate('/advertising/create')}
            className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <Plus size={18} />
            Create Campaign
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
              <DollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">${totalStats.spent.toFixed(2)}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Impressions</p>
              <Eye className="text-blue-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.impressions.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Clicks</p>
              <TrendingUp className="text-purple-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.clicks.toLocaleString()}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Engagements</p>
              <Heart className="text-pink-600" size={20} />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalStats.engagements.toLocaleString()}</p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'paused', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === status
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Campaigns List */}
        {filteredCampaigns.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-md">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No campaigns yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first ad campaign to start promoting your content</p>
            <button
              onClick={() => navigate('/advertising/create')}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg"
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CampaignCard({ campaign }) {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const metrics = calculateMetrics(campaign)
  const statusConfig = CAMPAIGN_STATUS[campaign.status?.toUpperCase()] || CAMPAIGN_STATUS.DRAFT

  const handlePause = () => {
    // In production, this would be an API call
    alert('Campaign paused')
  }

  const handleResume = () => {
    // In production, this would be an API call
    alert('Campaign resumed')
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      // In production, this would be an API call
      alert('Campaign deleted')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{campaign.name}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${statusConfig.color}-100 dark:bg-${statusConfig.color}-900/30 text-${statusConfig.color}-700 dark:text-${statusConfig.color}-300`}>
              {statusConfig.name}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
            </span>
            <span>Budget: ${campaign.budget}</span>
            <span>Spent: ${campaign.spent?.toFixed(2) || 0}</span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical size={20} />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-xl border border-gray-200 dark:border-gray-600 z-10">
              <button
                onClick={() => navigate(`/advertising/analytics/${campaign.id}`)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                View Analytics
              </button>
              {campaign.status === 'active' ? (
                <button
                  onClick={handlePause}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Pause size={16} />
                  Pause Campaign
                </button>
              ) : (
                <button
                  onClick={handleResume}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white flex items-center gap-2"
                >
                  <Play size={16} />
                  Resume Campaign
                </button>
              )}
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 text-red-600 flex items-center gap-2"
              >
                <Trash2 size={16} />
                Delete Campaign
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.impressions?.toLocaleString() || 0}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Impressions</p>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{campaign.clicks?.toLocaleString() || 0}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{metrics.ctr}%</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">CTR</p>
        </div>
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">${metrics.cpc}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Cost/Click</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">Budget Used</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
          </span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-600 to-purple-600 h-full transition-all"
            style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default CampaignsPage
