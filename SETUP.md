# Foodie Social - Setup Instructions

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

You can download Node.js from: https://nodejs.org/

## Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd C:\Users\neo\CascadeProjects\foodie-social
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - The app will be available at: http://localhost:3000
   - Open this URL in your browser to view the application

## Default Login

Since this is a demo with mock data, you can:
- Click "Sign Up" and create an account with any email/password
- Or click "Login" and use any credentials (it will log you in)

## Features Overview

### 🔐 Authentication
- Sign up with email or social accounts (Google, Apple)
- Choose between Creator or User account type
- Login with credentials

### 🎯 Onboarding
- Follow suggested creators based on cuisine preferences
- Interactive tutorial walkthrough

### 🏠 Home Feed
- Instagram-style stories bar
- Scrollable recipe feed
- Like, comment, save, and add to planner
- Real-time interactions

### 🔍 Explore
- Search recipes by name or cuisine
- Filter by dietary preferences
- Masonry grid layout
- Trending creators

### ✍️ Create Content
- Post detailed recipes with ingredients and steps
- Share 15-second stories
- Go live for cooking sessions

### 📅 Meal Planner
- Weekly and monthly calendar views
- Add meals to specific time slots
- Generate automatic shopping lists
- Export meal plans

### 👤 Profile
- View creator/user profiles
- Follow/unfollow functionality
- Direct messaging
- Recipe collections

### 💬 Messaging
- Direct messages with other users
- Real-time chat interface
- Share images and videos

### 🔔 Notifications
- Activity notifications (likes, comments, follows)
- Message alerts
- Live session reminders

### ⚙️ Settings
- Edit profile information
- Privacy controls
- Notification preferences
- Theme toggle (light/dark)
- Account management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common UI elements
│   ├── feed/           # Feed and post components
│   └── layout/         # Layout components
├── pages/              # Page components
│   ├── auth/           # Auth pages
│   ├── onboarding/     # Onboarding pages
│   └── support/        # Support pages
├── context/            # React Context (AppContext)
├── data/               # Mock data
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies Used

- **React 18** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **date-fns** - Date handling
- **Vite** - Build tool

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- This is a **demo application** with mock data
- All features are fully functional on the frontend
- No backend API is required
- Data is stored in localStorage
- Images are loaded from Unsplash and Pravatar

## Next Steps for Production

To make this production-ready, you would need to:

1. **Backend API Integration**
   - User authentication & authorization
   - Recipe CRUD operations
   - Real-time messaging (WebSocket)
   - File upload for images/videos

2. **Database**
   - User profiles
   - Recipes
   - Messages
   - Notifications

3. **Additional Features**
   - Real-time live streaming
   - Video processing
   - Push notifications
   - Email notifications
   - Payment integration for Pro features

4. **Performance**
   - Image optimization & CDN
   - Lazy loading
   - Caching strategies
   - Code splitting

5. **Security**
   - Input sanitization
   - XSS protection
   - CSRF protection
   - Rate limiting

## Troubleshooting

### Port already in use
If port 3000 is already in use, Vite will automatically use the next available port.

### npm install fails
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### Styles not loading
Make sure Tailwind CSS is properly configured. Clear your browser cache and restart the dev server.

## Support

For issues or questions, refer to the Help Center in the app or check the README.md file.

---

**Happy Coding! 🍳👨‍🍳**
