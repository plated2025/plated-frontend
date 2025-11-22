import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from './BottomNav'
import AIFloatingButton from '../AIAssistant/AIFloatingButton'

function MainLayout() {
  const location = useLocation()
  
  // Pages that have their own desktop layout with sidebars
  const fullWidthPages = ['/', '/profile', '/notifications', '/planner', '/explore', '/messages']
  const isFullWidthPage = fullWidthPages.includes(location.pathname) || location.pathname.startsWith('/profile/')
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-16 lg:pb-0">
      <main className={isFullWidthPage ? 'w-full' : 'max-w-2xl mx-auto'}>
        <Outlet />
      </main>
      <BottomNav />
      <AIFloatingButton />
    </div>
  )
}

export default MainLayout
