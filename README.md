# Plated - Food Enthusiast Social Media Platform

Plated is a comprehensive social media application designed for food enthusiasts, home cooks, and professional chefs. to share recipes, cooking tips, and culinary experiences.

## Features

### 🔐 Authentication
- Sign Up / Login with email
- Social authentication (Google, Apple)
- Creator vs User account types

### 🏠 Home & Feed
- Instagram-style stories
- Recipe posts with images/videos
- Like, comment, save, and add to planner
- Infinite scroll feed

### 🔍 Explore
- Search recipes and creators
- Filter by cuisine, difficulty, dietary preferences
- Trending creators carousel
- Masonry grid layout

### ✍️ Create Content
- Post recipes with ingredients and steps
- Share stories (15s videos)
- Live cooking sessions
- Draft auto-save

### 📅 Meal Planner
- Weekly and monthly calendar views
- Breakfast, lunch, dinner, snack slots
- Shopping list generator
- Export to PDF/WhatsApp/Email

### 👤 Profile
- Creator and user profiles
- Recipe collections
- Followers/Following stats
- Saved recipes and meal plans

### 💬 Messaging
- Direct messages between users
- Image/video sharing in chat
- Real-time notifications

### 🔔 Notifications
- Activity notifications
- Message alerts
- Live session reminders

### ⚙️ Settings
- Profile customization
- Privacy controls
- Theme preferences
- Notification settings

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common UI elements
│   ├── feed/           # Feed and post components
│   ├── explore/        # Explore page components
│   ├── create/         # Content creation components
│   ├── planner/        # Meal planner components
│   ├── profile/        # Profile components
│   ├── messaging/      # Chat components
│   └── settings/       # Settings components
├── pages/              # Page components
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Mock data
└── styles/             # Global styles
```

## Features Implementation Status

✅ Authentication screens
✅ Onboarding flow
✅ Home feed with stories
✅ Explore page
✅ Content creation
✅ Meal planner
✅ User profiles
✅ Messaging system
✅ Notifications
✅ Settings panel

## Future Enhancements

- Backend API integration
- Real-time websocket for live sessions
- Payment integration for Pro features
- Video processing and CDN
- Push notifications
- Progressive Web App (PWA)
- Mobile apps (React Native)

## License

MIT License - See LICENSE file for details
