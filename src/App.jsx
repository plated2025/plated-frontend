import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { useEffect } from 'react'
import appInitService from './services/appInit'
import { initDeviceDetection } from './utils/deviceDetection'
import './styles/mobile.css'
import './styles/adaptive.css'
import './styles/glassmorphism.css'

// Welcome Page
import WelcomePage from './pages/WelcomePage'

// Auth Pages
import SignUpPage from './pages/auth/SignUpPage'
import LoginPage from './pages/auth/LoginPage'
import AuthCallback from './pages/auth/AuthCallback'

// Onboarding Pages
import UsernameSelectionPage from './pages/onboarding/UsernameSelectionPage'
import UserTypeSelectionPage from './pages/onboarding/UserTypeSelectionPage'
import InterestsPage from './pages/onboarding/InterestsPage'
import SuggestedCreatorsPage from './pages/onboarding/SuggestedCreatorsPage'
import TutorialPage from './pages/onboarding/TutorialPage'
import AchievementTutorialPage from './pages/onboarding/AchievementTutorialPage'

// Main Pages
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import CreatePage from './pages/CreatePage'
import PlannerPage from './pages/PlannerPage'
import ShoppingListPage from './pages/ShoppingListPageAdvanced'
import HealthSyncPage from './pages/HealthSyncPage'
import ProfilePage from './pages/ProfilePage'
import NotificationsPage from './pages/NotificationsPage'
import MessagesPage from './pages/MessagesPage'
import ChatPage from './pages/ChatPage'
import SettingsPage from './pages/SettingsPage'
import AchievementsPage from './pages/AchievementsPage'
import SubscriptionPage from './pages/SubscriptionPage'
import CreatorStudioPage from './pages/CreatorStudioPage'

// Advertising Pages
import CreateCampaignPage from './pages/advertising/CreateCampaignPage'
import CampaignsPage from './pages/advertising/CampaignsPage'
import AnalyticsPage from './pages/advertising/AnalyticsPage'

// Detail Pages
import RecipeDetailPage from './pages/RecipeDetailPage'
import StoryViewerPage from './pages/StoryViewerPage'
import EditProfilePage from './pages/EditProfilePage'

// Support Pages
import HelpCenterPage from './pages/support/HelpCenterPage'
import ReportProblemPage from './pages/support/ReportProblemPage'
import TermsPage from './pages/support/TermsPage'

// Settings Pages
import PrivacySettingsPage from './pages/settings/PrivacySettingsPage'
import NotificationSettingsPage from './pages/settings/NotificationSettingsPage'
import HealthSettingsPage from './pages/HealthSettingsPage'
import MealPlanSettingsPage from './pages/settings/MealPlanSettingsPage'
import DietaryPreferencesPage from './pages/settings/DietaryPreferencesPage'
import LanguageSettingsPage from './pages/settings/LanguageSettingsPage'
import DataStoragePage from './pages/settings/DataStoragePage'
import PaymentMethodsPage from './pages/settings/PaymentMethodsPage'
import SubscriptionStatusPage from './pages/settings/SubscriptionStatusPage'
import AccountPrivacyPage from './pages/settings/AccountPrivacyPage'

// Live Stream
import LiveStreamPage from './pages/LiveStreamPage'

// Reels
import ReelsPage from './pages/ReelsPage'
import ReelsPageTest from './pages/ReelsPageTest'
import CreateReelPage from './pages/CreateReelPage'

// Activity & Saved
import ActivityPage from './pages/ActivityPage'
import SavedPage from './pages/SavedPage'
import AccountSwitchPage from './pages/AccountSwitchPage'

// New Pages
import MealPlannerPage from './pages/MealPlannerPage'
import TestingDashboard from './pages/TestingDashboard'
import SecuritySettingsPage from './pages/SecuritySettingsPage'
import VerifyEmailPage from './pages/VerifyEmailPage'

// Layout
import MainLayout from './components/layout/MainLayout'

function App() {
  const { isAuthenticated, hasCompletedOnboarding, theme } = useApp()

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  // Initialize mobile features & device detection
  useEffect(() => {
    const initialize = async () => {
      // Initialize mobile app features
      await appInitService.initialize()
      
      // Initialize device detection (iPad, Watch, etc.)
      await initDeviceDetection()
    }
    
    initialize()
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/welcome" element={!isAuthenticated ? <WelcomePage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        
        {/* Onboarding Routes */}
        <Route 
          path="/onboarding/username" 
          element={isAuthenticated && !hasCompletedOnboarding ? <UsernameSelectionPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/onboarding/user-type" 
          element={isAuthenticated && !hasCompletedOnboarding ? <UserTypeSelectionPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/onboarding/interests" 
          element={isAuthenticated && !hasCompletedOnboarding ? <InterestsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/onboarding/creators" 
          element={isAuthenticated && !hasCompletedOnboarding ? <SuggestedCreatorsPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/onboarding/tutorial" 
          element={isAuthenticated && !hasCompletedOnboarding ? <TutorialPage /> : <Navigate to="/" />} 
        />
        <Route 
          path="/onboarding/achievements" 
          element={isAuthenticated && !hasCompletedOnboarding ? <AchievementTutorialPage /> : <Navigate to="/" />} 
        />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/welcome" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
          
          {/* Full Screen Routes */}
          <Route path="/recipe/:recipeId" element={<RecipeDetailPage />} />
          <Route path="/story/:userId" element={<StoryViewerPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route path="/health-sync" element={<HealthSyncPage />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/security" element={<SecuritySettingsPage />} />
          <Route path="/settings/privacy" element={<PrivacySettingsPage />} />
          <Route path="/settings/account-privacy" element={<AccountPrivacyPage />} />
          <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
          <Route path="/settings/health" element={<HealthSettingsPage />} />
          <Route path="/settings/meal-plan" element={<MealPlanSettingsPage />} />
          <Route path="/settings/dietary" element={<DietaryPreferencesPage />} />
          <Route path="/settings/language" element={<LanguageSettingsPage />} />
          <Route path="/settings/data-storage" element={<DataStoragePage />} />
          <Route path="/settings/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="/settings/subscription" element={<SubscriptionStatusPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="/creator-studio" element={<CreatorStudioPage />} />
          <Route path="/advertising/campaigns" element={<CampaignsPage />} />
          <Route path="/advertising/create" element={<CreateCampaignPage />} />
          <Route path="/advertising/analytics/:campaignId" element={<AnalyticsPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/report" element={<ReportProblemPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/live" element={<LiveStreamPage />} />
          <Route path="/reels" element={<ReelsPage />} />
          <Route path="/create/reel" element={<CreateReelPage />} />
          <Route path="/activity" element={<ActivityPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/switch-accounts" element={<AccountSwitchPage />} />
          <Route path="/meal-planner" element={<MealPlannerPage />} />
          <Route path="/testing" element={<TestingDashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

// Protected Route Component
function ProtectedRoute() {
  const { isAuthenticated, hasCompletedOnboarding, hasSelectedUserType } = useApp()
  
  if (!isAuthenticated) {
    return <Navigate to="/welcome" />
  }
  
  if (!hasCompletedOnboarding) {
    // First check if user has selected their type
    if (!hasSelectedUserType) {
      return <Navigate to="/onboarding/user-type" />
    }
    return <Navigate to="/onboarding/interests" />
  }
  
  return <Outlet />
}

export default App
