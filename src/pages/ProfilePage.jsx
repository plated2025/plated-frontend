import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Settings, Share2, MessageCircle, MoreVertical, MapPin, Globe, Grid, List, Bookmark, ChefHat, Calendar, Plus, Clock, Users as UsersIcon, Flame, Trophy, Star, Heart, Eye, TrendingUp, Award, Zap, Target, Camera, Video, Sparkles, QrCode, UserX, Flag, Loader } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { securityAPI, recipeAPI, userAPI, collectionAPI } from '../services/api'
import FollowersModal from '../components/FollowersModal'
import MealPlanModal from '../components/profile/MealPlanModal'
import QRCodeModal from '../components/profile/QRCodeModal'
import CollectionModal from '../components/profile/CollectionModal'
import StatsDetailModal from '../components/profile/StatsDetailModal'
import CoverPhotoEditor from '../components/profile/CoverPhotoEditor'
import CreateCollectionModal from '../components/profile/CreateCollectionModal'
import UserRatingDisplay from '../components/UserRatingDisplay'
import RateUserModal from '../components/RateUserModal'
import ReportModal from '../components/ReportModal'
import DefaultAvatar from '../components/DefaultAvatar'

function ProfilePage() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useApp()
  
  const isOwnProfile = !userId || (currentUser && userId === currentUser.id.toString())
  
  const [profile, setProfile] = useState(null)
  const [userRecipes, setUserRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('recipes')
  const [isFollowing, setIsFollowing] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [showFollowersModal, setShowFollowersModal] = useState(false)
  const [followersModalType, setFollowersModalType] = useState('followers')
  const [selectedMealPlan, setSelectedMealPlan] = useState(null)
  const [showQRCode, setShowQRCode] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [selectedStat, setSelectedStat] = useState(null)
  const [showCoverEditor, setShowCoverEditor] = useState(false)
  const [coverPhoto, setCoverPhoto] = useState('https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200')
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [userCollections, setUserCollections] = useState([])
  const [showRateUserModal, setShowRateUserModal] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const moreMenuRef = useRef(null)

  // Load profile and recipes from backend
  useEffect(() => {
    loadProfileData()
  }, [userId])

  const loadProfileData = async () => {
    setIsLoading(true)
    try {
      // Set profile (use currentUser if own profile)
      if (isOwnProfile) {
        setProfile(currentUser)
      } else if (userId) {
        // TODO: Fetch user profile from API when userAPI.getProfile() is implemented
        // const response = await userAPI.getProfile(userId)
        // setProfile(response.data)
        setProfile(currentUser) // Fallback for now
      }

      // Fetch user's recipes
      const recipesResponse = await recipeAPI.getRecipes({ 
        userId: userId || currentUser?.id,
        limit: 50 
      })
      setUserRecipes(recipesResponse.data || [])
      
      // Fetch collections from API (only for own profile)
      if (isOwnProfile) {
        try {
          const collectionsResponse = await collectionAPI.getCollections()
          setUserCollections(collectionsResponse.data || [])
        } catch (error) {
          console.error('Error fetching collections:', error)
          setUserCollections([])
        }
      }
      
    } catch (error) {
      console.error('Error loading profile data:', error)
      setProfile(currentUser) // Fallback
      setUserRecipes([])
    } finally {
      setIsLoading(false)
    }
  }

  // Meal plans (will be loaded from API in future)
  const [mealPlans, setMealPlans] = useState([])
  
  // Sample meal plan data as fallback (will be removed when API is ready)
  const sampleMealPlans = [
    {
      id: 1,
      name: 'This Week',
      description: '7 days planned',
      totalMeals: 21,
      totalRecipes: 15,
      avgServings: 4,
      days: 7,
      gradient: 'from-green-500 to-emerald-600',
      schedule: Array(7).fill(null).map((_, dayIdx) => ({
        meals: [
          {
            type: 'Breakfast',
            name: 'Avocado Toast & Eggs',
            time: '8:00 AM',
            image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=200',
            cookTime: '10 min',
            servings: 2,
            calories: 420,
            recipeId: 1,
            macros: { protein: 18, carbs: 35, fat: 22 }
          },
          {
            type: 'Lunch',
            name: 'Grilled Chicken Salad',
            time: '12:30 PM',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
            cookTime: '20 min',
            servings: 4,
            calories: 480,
            recipeId: 2,
            macros: { protein: 42, carbs: 28, fat: 18 }
          },
          {
            type: 'Dinner',
            name: 'Salmon with Roasted Vegetables',
            time: '7:00 PM',
            image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200',
            cookTime: '35 min',
            servings: 4,
            calories: 620,
            recipeId: 3,
            macros: { protein: 48, carbs: 32, fat: 28 }
          }
        ],
        totalCalories: 1520,
        totalProtein: 108,
        totalCarbs: 95,
        totalFat: 68
      }))
    },
    {
      id: 2,
      name: 'Next Week',
      description: 'Planning ahead',
      totalMeals: 12,
      totalRecipes: 8,
      avgServings: 3,
      days: 4,
      gradient: 'from-blue-500 to-cyan-600',
      schedule: Array(4).fill(null).map(() => ({
        meals: [
          {
            type: 'Breakfast',
            name: 'Greek Yogurt Bowl',
            time: '8:00 AM',
            image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200',
            cookTime: '5 min',
            servings: 1,
            calories: 320,
            recipeId: 4,
            macros: { protein: 22, carbs: 45, fat: 8 }
          },
          {
            type: 'Lunch',
            name: 'Turkey Wrap',
            time: '1:00 PM',
            image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200',
            cookTime: '10 min',
            servings: 2,
            calories: 450,
            recipeId: 5,
            macros: { protein: 32, carbs: 42, fat: 16 }
          },
          {
            type: 'Dinner',
            name: 'Stir-Fry Vegetables',
            time: '6:30 PM',
            image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200',
            cookTime: '25 min',
            servings: 4,
            calories: 520,
            recipeId: 6,
            macros: { protein: 28, carbs: 58, fat: 18 }
          }
        ],
        totalCalories: 1290,
        totalProtein: 82,
        totalCarbs: 145,
        totalFat: 42
      }))
    },
    {
      id: 3,
      name: 'Keto Week',
      description: 'Low carb plan',
      totalMeals: 21,
      totalRecipes: 18,
      avgServings: 2,
      days: 7,
      gradient: 'from-orange-500 to-red-600',
      schedule: Array(7).fill(null).map(() => ({
        meals: [
          {
            type: 'Breakfast',
            name: 'Keto Omelette',
            time: '8:00 AM',
            image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=200',
            cookTime: '15 min',
            servings: 2,
            calories: 380,
            recipeId: 7,
            macros: { protein: 28, carbs: 5, fat: 28 }
          },
          {
            type: 'Lunch',
            name: 'Cauliflower Rice Bowl',
            time: '12:00 PM',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
            cookTime: '20 min',
            servings: 2,
            calories: 420,
            recipeId: 8,
            macros: { protein: 35, carbs: 12, fat: 26 }
          },
          {
            type: 'Dinner',
            name: 'Butter Chicken (Keto)',
            time: '7:00 PM',
            image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=200',
            cookTime: '30 min',
            servings: 2,
            calories: 580,
            recipeId: 9,
            macros: { protein: 45, carbs: 8, fat: 42 }
          }
        ],
        totalCalories: 1380,
        totalProtein: 108,
        totalCarbs: 25,
        totalFat: 96
      }))
    },
    {
      id: 4,
      name: 'Meal Prep',
      description: 'Batch cooking',
      totalMeals: 14,
      totalRecipes: 5,
      avgServings: 6,
      days: 7,
      gradient: 'from-purple-500 to-pink-600',
      schedule: Array(7).fill(null).map(() => ({
        meals: [
          {
            type: 'Lunch',
            name: 'Meal Prep Chicken Bowl',
            time: '12:00 PM',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
            cookTime: '45 min (batch)',
            servings: 6,
            calories: 520,
            recipeId: 10,
            macros: { protein: 48, carbs: 38, fat: 18 }
          },
          {
            type: 'Dinner',
            name: 'Meal Prep Pasta',
            time: '6:30 PM',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200',
            cookTime: '30 min (batch)',
            servings: 6,
            calories: 580,
            recipeId: 11,
            macros: { protein: 32, carbs: 68, fat: 16 }
          }
        ],
        totalCalories: 1100,
        totalProtein: 80,
        totalCarbs: 106,
        totalFat: 34
      }))
    }
  ]

  // Collections data
  const defaultCollections = [
    { id: 1, name: 'Pasta', icon: ChefHat, gradient: 'from-red-500 to-orange-500', bg: 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30', border: 'border-red-400 dark:border-red-600', text: 'text-red-600 dark:text-red-400' },
    { id: 2, name: 'Healthy', icon: Target, gradient: 'from-green-500 to-emerald-500', bg: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30', border: 'border-green-400 dark:border-green-600', text: 'text-green-600 dark:text-green-400' },
    { id: 3, name: 'Quick', icon: Zap, gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30', border: 'border-blue-400 dark:border-blue-600', text: 'text-blue-600 dark:text-blue-400' },
    { id: 4, name: 'Favorites', icon: Heart, gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30', border: 'border-purple-400 dark:border-purple-600', text: 'text-purple-600 dark:text-purple-400' },
    { id: 5, name: 'Reels', icon: Video, gradient: 'from-yellow-500 to-orange-500', bg: 'from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30', border: 'border-yellow-400 dark:border-yellow-600', text: 'text-yellow-600 dark:text-yellow-400' }
  ]
  const collections = [...defaultCollections, ...userCollections]

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing)
  }

  const handleMessage = () => {
    navigate(`/chat/${profile.id}`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: profile.name,
        text: profile.bio,
        url: window.location.href
      })
    } else {
      alert('Profile link copied to clipboard!')
    }
  }

  const handleChangeCover = () => {
    setShowCoverEditor(true)
  }

  const handleSaveCover = async (coverData) => {
    setCoverPhoto(coverData.image)
    
    // Save cover photo to backend
    try {
      await userAPI.updateProfile({
        coverImage: coverData.image
      })
      
      // Update current user in context
      if (currentUser) {
        setProfile({ ...profile, coverImage: coverData.image })
      }
    } catch (error) {
      console.error('Error saving cover photo:', error)
      alert('Failed to save cover photo. Please try again.')
    }
  }

  const handleAddStory = () => {
    navigate('/create')
  }

  const handleCreateCollection = () => {
    setShowCreateCollection(true)
  }

  const handleSaveCollection = (newCollection) => {
    setUserCollections([...userCollections, newCollection])
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setShowMoreMenu(false)
      }
    }
    
    if (showMoreMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMoreMenu])

  const handleBlockUser = async () => {
    if (!confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${profile.name}?`)) {
      return
    }

    try {
      if (isBlocked) {
        await securityAPI.unblockUser(profile.id)
        setIsBlocked(false)
        alert('User unblocked successfully')
      } else {
        await securityAPI.blockUser(profile.id)
        setIsBlocked(true)
        alert('User blocked successfully')
      }
      setShowMoreMenu(false)
    } catch (error) {
      alert('Error: ' + error.message)
    }
  }

  const handleReportUser = () => {
    setShowMoreMenu(false)
    setShowReportModal(true)
  }

  // Show loading state
  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 lg:pb-0 pb-safe">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-10 pt-safe">
        <div className="flex items-center justify-between px-4 py-2.5 sm:py-3">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-none">{profile?.username || profile?.name}</h1>
          <div className="flex items-center gap-2">
            {isOwnProfile ? (
              <>
                <button
                  onClick={() => setShowQRCode(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  title="Show QR Code"
                >
                  <QrCode size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Settings size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </>
            ) : (
              <>
                <button onClick={handleShare} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Share2 size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
                <div className="relative" ref={moreMenuRef}>
                  <button 
                    onClick={() => setShowMoreMenu(!showMoreMenu)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <MoreVertical size={20} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showMoreMenu && (
                    <div className="absolute right-0 mt-2 w-48 glass-dropdown overflow-hidden z-50">
                      <button
                        onClick={handleBlockUser}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3"
                      >
                        <UserX size={18} className={isBlocked ? 'text-green-600' : 'text-red-600'} />
                        <span className={`text-sm font-medium ${isBlocked ? 'text-green-600' : 'text-red-600'}`}>
                          {isBlocked ? 'Unblock User' : 'Block User'}
                        </span>
                      </button>
                      <button
                        onClick={handleReportUser}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 border-t border-gray-200 dark:border-gray-700"
                      >
                        <Flag size={18} className="text-orange-600" />
                        <span className="text-sm font-medium text-orange-600">
                          Report User
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative h-48 bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 overflow-hidden">
        {coverPhoto ? (
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${coverPhoto})` }}></div>
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        {isOwnProfile && (
          <button 
            onClick={handleChangeCover}
            className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
          >
            <Camera size={16} />
            Change Cover
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="glass-card px-6 pb-6 -mt-16">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
          {/* Avatar with Story Ring & Status */}
          <div className="relative">
            <div className="story-ring">
              {profile.avatar && !profile.avatar.includes('default') ? (
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-900 shadow-xl"
                />
              ) : (
                <DefaultAvatar 
                  size="xl" 
                  showCamera={isOwnProfile}
                  onClick={isOwnProfile ? () => navigate('/edit-profile') : undefined}
                />
              )}
            </div>
            {isOwnProfile && profile.avatar && !profile.avatar.includes('default') && (
              <button 
                onClick={handleAddStory}
                className="absolute bottom-0 right-0 w-9 h-9 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                title="Add Story"
              >
                <Plus size={16} />
              </button>
            )}
            {/* Level Badge */}
            {(profile.level || 0) > 0 && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white dark:border-gray-900">
                <Trophy size={16} />
              </div>
            )}
          </div>

          {/* Stats - Animated Cards */}
          <div className="flex-1 w-full px-1">
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <ChefHat size={16} className="text-blue-600 dark:text-blue-400" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.recipes || 0}</p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Recipes</p>
              </div>
              <div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => {
                  setFollowersModalType('followers')
                  setShowFollowersModal(true)
                }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Heart size={16} className="text-pink-600 dark:text-pink-400" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.followers >= 1000000 
                      ? `${(profile.followers / 1000000).toFixed(1)}M`
                      : profile.followers >= 1000
                      ? `${Math.floor(profile.followers / 1000)}K`
                      : profile.followers || 0}
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Followers</p>
              </div>
              <div 
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl p-3 hover:scale-105 transition-transform cursor-pointer"
                onClick={() => {
                  setFollowersModalType('following')
                  setShowFollowersModal(true)
                }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <UsersIcon size={16} className="text-green-600 dark:text-green-400" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.following >= 1000
                      ? `${Math.floor(profile.following / 1000)}K`
                      : profile.following || 0}
                  </p>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Following</p>
              </div>
            </div>

            {/* Quick Stats Row - Unique Feature! */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              <div 
                onClick={() => setSelectedStat('streak')}
                className="bg-orange-50 dark:bg-orange-900/20 rounded-lg px-2 py-1.5 text-center cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <Flame size={12} className="text-orange-600 dark:text-orange-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{profile.streak || 0}</span>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">Streak</p>
              </div>
              <div 
                onClick={() => setSelectedStat('rating')}
                className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-2 py-1.5 text-center cursor-pointer hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <Star size={12} className="text-yellow-600 dark:text-yellow-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{profile.rating ? profile.rating.toFixed(1) : '0.0'}</span>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">Rating</p>
              </div>
              <div 
                onClick={() => setSelectedStat('views')}
                className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-2 py-1.5 text-center cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <Eye size={12} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {profile.views >= 1000000 
                      ? `${(profile.views / 1000000).toFixed(1)}M`
                      : profile.views >= 1000
                      ? `${Math.floor(profile.views / 1000)}K`
                      : profile.views || 0}
                  </span>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">Views</p>
              </div>
              <div 
                onClick={() => setSelectedStat('level')}
                className="bg-purple-50 dark:bg-purple-900/20 rounded-lg px-2 py-1.5 text-center cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <Trophy size={12} className="text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Lv.{profile.level || 0}</span>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400">Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Name & Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{profile.name}</h2>
            {profile.verified && (
              <div className="bg-blue-500 rounded-full p-1">
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            )}
            <span className="px-2 py-0.5 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-yellow-800 dark:text-yellow-200 text-xs font-bold rounded-full">PRO</span>
          </div>
          {profile.username && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">@{profile.username}</p>
          )}
          {profile.specialty && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">{profile.specialty}</p>
          )}
          {profile.location && (
            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center gap-1">
              <MapPin size={14} />
              {profile.location}
            </p>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-gray-900 dark:text-gray-100 mb-3 leading-relaxed">{profile.bio}</p>
        )}

        {/* Achievements Badges - UNIQUE FEATURE! */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
              <Award size={12} />
              ACHIEVEMENTS
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.achievements.map((achievement, index) => (
                <div key={index} className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  {achievement.icon === 'trophy' && <Trophy size={12} />}
                  {achievement.icon === 'star' && <Star size={12} />}
                  {achievement.icon === 'heart' && <Heart size={12} />}
                  {achievement.icon === 'flame' && <Flame size={12} />}
                  {achievement.title}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Website */}
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 mb-4 font-medium"
          >
            <Globe size={14} />
            {profile.website.replace('https://', '')}
          </a>
        )}

        {/* Action Buttons */}
        {isOwnProfile ? (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => navigate('/edit-profile')}
              className="col-span-2 glass-btn font-semibold"
            >
              Edit Profile
            </button>
            <button
              onClick={handleShare}
              className="glass-btn flex items-center justify-center px-3 py-3"
              title="Share Profile"
            >
              <Share2 size={18} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleFollowToggle}
              className={`flex-1 font-semibold px-6 py-3 rounded-xl transition-all shadow-md ${
                isFollowing
                  ? 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
            <button
              onClick={handleMessage}
              className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center"
              title="Send Message"
            >
              <MessageCircle size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Collections/Highlights - UNIQUE FEATURE! */}
      <div className="glass-card px-4 py-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles size={16} className="text-purple-600" />
            Collections
          </h3>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
          {collections.map((collection) => {
            const CollectionIcon = collection.icon
            
            return (
              <div 
                key={collection.id}
                onClick={() => setSelectedCollection(collection)}
                className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
              >
                {collection.coverImage ? (
                  <div className="w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-primary-600 shadow-md">
                    <img src={collection.coverImage} alt={collection.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${collection.bg} flex items-center justify-center border-2 ${collection.border} shadow-md`}>
                    <CollectionIcon className={`${collection.text}`} size={26} />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{collection.name}</span>
              </div>
            )
          })}
          {isOwnProfile && (
            <div 
              onClick={handleCreateCollection}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <div className="w-[72px] h-[72px] rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 shadow-md">
                <Plus className="text-gray-400" size={26} />
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Add</span>
            </div>
          )}
        </div>
      </div>

      {/* User Ratings - Only show on other users' profiles */}
      {!isOwnProfile && (
        <div className="px-4 py-6">
          <UserRatingDisplay
            userId={profile.id}
            onRateClick={() => setShowRateUserModal(true)}
          />
        </div>
      )}

      {/* Tabs */}
      <div className="glass-card mb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'recipes'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <ChefHat size={18} />
            Recipes
          </button>
          <button
            onClick={() => setActiveTab('mealplans')}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'mealplans'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            <Calendar size={18} />
            Meal Plans
          </button>
          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'saved'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <Bookmark size={18} />
              Saved
            </button>
          )}
        </div>
      </div>

      {/* View Mode Toggle */}
      {activeTab === 'recipes' && (
        <div className="glass-card px-4 py-2 flex justify-end gap-2 mb-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
          >
            <List size={20} />
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {activeTab === 'recipes' && (
          userRecipes.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-1">
                {userRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="aspect-square cursor-pointer relative group"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-sm font-semibold">{recipe.title}</p>
                        <div className="flex gap-3 mt-2 text-xs justify-center">
                          <span>❤️ {recipe.likes >= 1000 ? `${Math.floor(recipe.likes / 1000)}K` : recipe.likes}</span>
                          <span>💬 {recipe.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {userRecipes.map(recipe => (
                  <div
                    key={recipe.id}
                    onClick={() => navigate(`/recipe/${recipe.id}`)}
                    className="card p-4 flex gap-4 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{recipe.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
                      <div className="flex gap-3 mt-2 text-xs text-gray-500">
                        <span>⏱️ {recipe.cookTime}</span>
                        <span>🍽️ {recipe.servings} servings</span>
                        <span>❤️ {recipe.likes >= 1000 ? `${Math.floor(recipe.likes / 1000)}K` : recipe.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Grid size={48} className="mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500 font-medium mb-1">No recipes yet</p>
              {isOwnProfile && (
                <button
                  onClick={() => navigate('/create')}
                  className="text-primary-600 text-sm mt-2"
                >
                  Create your first recipe
                </button>
              )}
            </div>
          )
        )}

        {activeTab === 'mealplans' && (
          <div>
            {isOwnProfile && (
              <button
                onClick={() => navigate('/planner')}
                className="w-full mb-4 p-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Create Meal Plan
              </button>
            )}
            
            {/* Meal Plans */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(mealPlans.length > 0 ? mealPlans : sampleMealPlans).map((plan) => {
                const iconColors = {
                  1: { bg: 'from-green-100 to-emerald-100', text: 'text-green-600' },
                  2: { bg: 'from-blue-100 to-cyan-100', text: 'text-blue-600' },
                  3: { bg: 'from-orange-100 to-red-100', text: 'text-orange-600' },
                  4: { bg: 'from-purple-100 to-pink-100', text: 'text-purple-600' }
                }
                const colors = iconColors[plan.id] || iconColors[1]
                
                return (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedMealPlan(plan)}
                    className="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-xl flex items-center justify-center`}>
                        <Calendar className={colors.text} size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={14} />
                        <span>{plan.totalMeals} meals</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ChefHat size={14} />
                        <span>{plan.totalRecipes} recipes</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <UsersIcon size={14} />
                        <span>{plan.avgServings} servings avg</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <Bookmark size={48} className="mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No saved recipes</p>
          </div>
        )}
      </div>

      {/* Followers/Following Modal */}
      <FollowersModal
        isOpen={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        type={followersModalType}
        userId={profile.id}
      />

      {/* Meal Plan Modal */}
      {selectedMealPlan && (
        <MealPlanModal
          mealPlan={selectedMealPlan}
          onClose={() => setSelectedMealPlan(null)}
        />
      )}

      {/* QR Code Modal */}
      {showQRCode && (
        <QRCodeModal
          profile={profile}
          onClose={() => setShowQRCode(false)}
        />
      )}

      {/* Collection Modal */}
      {selectedCollection && (
        <CollectionModal
          collection={selectedCollection}
          onClose={() => setSelectedCollection(null)}
        />
      )}

      {/* Stats Detail Modal */}
      {selectedStat && (
        <StatsDetailModal
          statType={selectedStat}
          onClose={() => setSelectedStat(null)}
        />
      )}

      {/* Cover Photo Editor */}
      <CoverPhotoEditor
        isOpen={showCoverEditor}
        onClose={() => setShowCoverEditor(false)}
        currentCover={coverPhoto}
        onSave={handleSaveCover}
      />

      {/* Create Collection Modal */}
      <CreateCollectionModal
        isOpen={showCreateCollection}
        onClose={() => setShowCreateCollection(false)}
        onSave={handleSaveCollection}
      />

      {/* Rate User Modal */}
      <RateUserModal
        isOpen={showRateUserModal}
        onClose={() => setShowRateUserModal(false)}
        targetUser={profile}
        currentUser={currentUser || mockUsers[0]}
        onRated={(rating) => {
          console.log(`Rated ${profile.name}: ${rating} stars`)
        }}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        targetType="user"
        targetId={profile.id}
        targetName={profile.name}
      />
    </div>
  )
}

export default ProfilePage
