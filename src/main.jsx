import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/AppContext.jsx'
import ErrorBoundary from './components/common/ErrorBoundary.jsx'

// Global error handler for image 404s - suppress console errors
window.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG' && e.target.src) {
    // Silently handle image load errors
    e.preventDefault()
    e.stopPropagation()
    // Hide broken image icon
    e.target.style.display = 'none'
  }
}, true)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)
