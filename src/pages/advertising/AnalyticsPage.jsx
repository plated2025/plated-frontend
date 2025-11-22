import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, DollarSign, Eye, MousePointer, Heart, Users, Calendar, Download } from 'lucide-react'
import { calculateMetrics } from '../../utils/advertisingSystem'

function AnalyticsPage() {
  const { campaignId } = useParams()
  const navigate = useNavigate()
  const [timeRange, setTimeRange] = useState('7d')

  // Mock campaign data (in production, fetch from API)
  const campaign = {
    id: campaignId,
    name: 'Summer Recipe Collection',
    status: 'active',
    budget: 50,
    spent: 32.45,
    impressions: 12500,
    clicks: 487,
    engagements: 892,
    conversions: 23,
    reach: 9800,
    saves: 156,
    shares: 89
  }

  const metrics = calculateMetrics(campaign)

  // Mock daily data for chart
  const dailyData = [
    { date: '11/12', impressions: 1200, clicks: 45, spent: 3.2 },
    { date: '11/13', impressions: 1500, clicks: 58, spent: 4.1 },
    { date: '11/14', impressions: 1800, clicks: 72, spent: 5.3 },
    { date: '11/15', impressions: 2100, clicks: 89, spent: 6.8 },
    { date: '11/16', impressions: 1900, clicks: 67, spent: 4.9 },
    { date: '11/17', impressions: 2200, clicks: 94, spent: 6.5 },
    { date: '11/18', impressions: 1800, clicks: 62, spent: 4.7 }
  ]

  const handleExport = () => {
    alert('Exporting analytics report...')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/advertising/campaigns')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{campaign.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Campaign Analytics</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Time Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            {['7d', '14d', '30d', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {range === 'all' ? 'All Time' : `Last ${range}`}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={Eye}
            label="Impressions"
            value={campaign.impressions.toLocaleString()}
            change="+12.5%"
            positive={true}
            color="blue"
          />
          <MetricCard
            icon={MousePointer}
            label="Clicks"
            value={campaign.clicks.toLocaleString()}
            change="+8.3%"
            positive={true}
            color="purple"
          />
          <MetricCard
            icon={Users}
            label="Reach"
            value={campaign.reach.toLocaleString()}
            change="+15.7%"
            positive={true}
            color="green"
          />
          <MetricCard
            icon={DollarSign}
            label="Spent"
            value={`$${campaign.spent.toFixed(2)}`}
            change="65% of budget"
            positive={true}
            color="orange"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <MetricRow label="Click-Through Rate (CTR)" value={`${metrics.ctr}%`} />
              <MetricRow label="Cost Per Click (CPC)" value={`$${metrics.cpc}`} />
              <MetricRow label="Cost Per Mille (CPM)" value={`$${metrics.cpm}`} />
              <MetricRow label="Cost Per Engagement" value={`$${metrics.cpe}`} />
              <MetricRow label="Conversion Rate" value={`${metrics.cvr}%`} />
              <MetricRow label="Cost Per Acquisition" value={`$${metrics.cpa}`} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Engagement</h3>
            <div className="space-y-3">
              <MetricRow label="Total Engagements" value={campaign.engagements.toLocaleString()} />
              <MetricRow label="Likes" value={(campaign.engagements * 0.6).toFixed(0)} />
              <MetricRow label="Comments" value={(campaign.engagements * 0.15).toFixed(0)} />
              <MetricRow label="Shares" value={campaign.shares.toString()} />
              <MetricRow label="Saves" value={campaign.saves.toString()} />
              <MetricRow label="Engagement Rate" value={`${((campaign.engagements / campaign.impressions) * 100).toFixed(2)}%`} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Budget</h3>
            <div className="space-y-3">
              <MetricRow label="Total Budget" value={`$${campaign.budget}`} />
              <MetricRow label="Amount Spent" value={`$${campaign.spent.toFixed(2)}`} />
              <MetricRow label="Remaining" value={`$${(campaign.budget - campaign.spent).toFixed(2)}`} />
              <div className="pt-3">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary-600 to-purple-600 h-full"
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {((campaign.spent / campaign.budget) * 100).toFixed(1)}% used
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Performance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-8">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Daily Performance</h3>
          <div className="space-y-2">
            {dailyData.map((day, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-16">{day.date}</span>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-8 overflow-hidden relative">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full flex items-center px-3"
                      style={{ width: `${(day.impressions / 2500) * 100}%` }}
                    >
                      <span className="text-xs text-white font-semibold">{day.impressions}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-16">{day.clicks} clicks</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white w-16">${day.spent}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top Locations</h3>
            <div className="space-y-3">
              <LocationBar country="United States" percentage={45} flag="🇺🇸" />
              <LocationBar country="United Kingdom" percentage={23} flag="🇬🇧" />
              <LocationBar country="Canada" percentage={15} flag="🇨🇦" />
              <LocationBar country="Australia" percentage={12} flag="🇦🇺" />
              <LocationBar country="Others" percentage={5} flag="🌍" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Age Distribution</h3>
            <div className="space-y-3">
              <AgeBar ageRange="18-24" percentage={18} />
              <AgeBar ageRange="25-34" percentage={42} />
              <AgeBar ageRange="35-44" percentage={25} />
              <AgeBar ageRange="45-54" percentage={10} />
              <AgeBar ageRange="55+" percentage={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, change, positive, color }) {
  const colors = {
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    orange: 'text-orange-600'
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <Icon className={colors[color]} size={20} />
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      <p className={`text-sm font-semibold ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change}
      </p>
    </div>
  )
}

function MetricRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  )
}

function LocationBar({ country, percentage, flag }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{flag}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white">{country}</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-600 to-purple-600 h-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function AgeBar({ ageRange, percentage }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-900 dark:text-white w-16">{ageRange}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 flex-1 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">{percentage}%</span>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
