# ⭐ User Rating System

A smart, non-intrusive rating system that prompts users to rate the app at optimal times.

---

## 🎯 Overview

The rating system intelligently prompts users to rate the app after they've used it enough to form an opinion, without being annoying or intrusive.

---

## 💡 Key Features

### **1. Smart Timing** 🕒
- **First prompt:** After 3 content uploads
- **Re-prompt logic:** After 30 days OR 10 more uploads
- **Never annoys:** Won't ask again if user rated or dismissed

### **2. Multiple Access Points** 📍
- **Automatic prompts** after uploads
- **Manual access** from Settings → Support → Rate App
- **Shows current rating** if already rated

### **3. User-Friendly Flow** ✨
- **5-star rating** with hover effects
- **Conditional feedback:** Only asks for details if rating is low (1-3 stars)
- **Quick exit:** "Maybe Later" or "Don't ask again" options
- **Thank you screen:** Appreciative message after rating

---

## 📊 How It Works

### **State Machine:**

```
Never Shown → (3 uploads) → Prompt → User Action
                                          ↓
                            ┌─────────────┴─────────────┐
                            ↓                           ↓
                      Rate (Rated)              Postpone/Dismiss
                            ↓                           ↓
                       ✅ Done              (30 days or 10 uploads)
                                                       ↓
                                                  Prompt Again
```

---

## 🎨 User Experience

### **Prompt Flow:**

**Step 1: Rating Screen**
```
┌─────────────────────────┐
│   💜 Enjoying Foodie?   │
│                         │
│  How would you rate?    │
│   ⭐ ⭐ ⭐ ⭐ ⭐        │
│                         │
│    [Maybe Later]        │
│  [Don't ask again]      │
└─────────────────────────┘
```

**Step 2a: High Rating (4-5 stars)**
```
┌─────────────────────────┐
│     Thank You! 🎉       │
│                         │
│  We're glad you love    │
│   Foodie Social! ❤️     │
└─────────────────────────┘
```

**Step 2b: Low Rating (1-3 stars)**
```
┌─────────────────────────┐
│   Help Us Improve! 👍   │
│                         │
│ ⭐ ⭐ ⭐ ☆ ☆           │
│                         │
│ [Tell us what could     │
│  be better...]          │
│                         │
│  [Back]  [Submit]       │
└─────────────────────────┘
```

---

## 🔧 Implementation

### **Core Files:**

**`src/utils/ratingSystem.js`**
- Rating state management
- Smart prompt logic
- LocalStorage persistence

**`src/components/RatingModal.jsx`**
- Beautiful UI for rating
- Multi-step flow
- Animations & transitions

**`src/hooks/useRatingPrompt.js`**
- Hook for automatic prompts
- Upload tracking
- Timing logic

---

## 📝 Usage

### **1. Automatic Prompts (After Uploads):**

```javascript
import { useRatingPrompt } from '../hooks/useRatingPrompt'
import RatingModal from '../components/RatingModal'

function CreatePage() {
  const { showRatingPrompt, handleUploadComplete, closeRatingPrompt } = useRatingPrompt()

  const handlePublish = async () => {
    // ... upload logic ...
    
    // Track upload for rating prompt
    handleUploadComplete()
  }

  return (
    <>
      {/* Your page content */}
      
      <RatingModal
        isOpen={showRatingPrompt}
        onClose={closeRatingPrompt}
        onRated={(rating) => {
          console.log('User rated:', rating)
        }}
      />
    </>
  )
}
```

### **2. Manual Access (Settings):**

```javascript
import { useState } from 'react'
import RatingModal from '../components/RatingModal'
import { hasUserRated, getUserRating } from '../utils/ratingSystem'

function SettingsPage() {
  const [showRatingModal, setShowRatingModal] = useState(false)
  const userRating = getUserRating()
  const hasRated = hasUserRated()

  return (
    <>
      <button onClick={() => setShowRatingModal(true)}>
        Rate App {hasRated && `${userRating} ⭐`}
      </button>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />
    </>
  )
}
```

---

## 🎯 Timing Configuration

Edit `src/utils/ratingSystem.js`:

```javascript
const CONFIG = {
  uploadsBeforePrompt: 3,        // First prompt after N uploads
  daysBeforeReprompt: 30,         // Wait N days before asking again
  uploadsBeforeReprompt: 10,      // Or after N more uploads
}
```

---

## 📊 Rating States

### **State Types:**

| State | Description | Can Prompt? |
|-------|-------------|-------------|
| `NEVER_SHOWN` | User has never seen prompt | After 3 uploads |
| `POSTPONED` | User clicked "Maybe Later" | After 30 days or 10 uploads |
| `RATED` | User submitted a rating | ❌ Never |
| `DISMISSED` | User clicked "Don't ask again" | After 30 days or 10 uploads |

---

## 💾 Data Storage

**LocalStorage Keys:**
- `rating_state` - Stores user's rating status and history

**Stored Data:**
```javascript
{
  status: 'never_shown' | 'postponed' | 'rated' | 'dismissed',
  uploadCount: 5,
  lastShownDate: '2024-11-18T10:00:00Z',
  lastPromptDate: '2024-11-18T10:00:00Z',
  uploadsAtLastPrompt: 3,
  rating: 5,
  ratedDate: '2024-11-18T10:00:00Z',
  feedback: 'Great app!'
}
```

---

## 🎨 Modal Features

### **Visual Elements:**

**Rating Screen:**
- Gradient header (primary → purple → pink)
- Heart icon
- 5 interactive stars with hover effects
- Clear action buttons

**Feedback Screen:**
- Different gradient (blue → cyan)
- Star display of current rating
- Text area with character counter (500 max)
- Back and Submit buttons

**Thanks Screen:**
- Bouncing heart animation
- Appreciative message
- Auto-closes after 2 seconds

---

## 📈 Analytics

### **Tracked Metrics:**

```javascript
import { getRatingStats } from '../utils/ratingSystem'

const stats = getRatingStats()
// Returns:
// {
//   uploadCount: 15,
//   hasRated: true,
//   rating: 5,
//   lastPromptDate: '2024-11-18',
//   status: 'rated'
// }
```

---

## 🎯 Best Practices

### **Do's:**
- ✅ Prompt after meaningful engagement (3+ uploads)
- ✅ Make it easy to postpone or dismiss
- ✅ Ask for feedback on low ratings
- ✅ Thank users for their time
- ✅ Show current rating in settings

### **Don'ts:**
- ❌ Prompt immediately on first use
- ❌ Ask multiple times in short period
- ❌ Force users to rate
- ❌ Require feedback for high ratings
- ❌ Make it hard to exit

---

## 🚀 Future Enhancements

- [ ] A/B test different prompt timings
- [ ] Send ratings to backend API
- [ ] Show average app rating
- [ ] In-app store redirect (iOS/Android)
- [ ] Rating trends analytics
- [ ] Sentiment analysis on feedback
- [ ] Respond to user feedback
- [ ] Rating reminders for updates

---

## 🔐 Privacy

- Ratings stored locally (localStorage)
- No personal data required
- Optional feedback field
- User can clear data anytime
- No tracking without consent

---

## 🎨 Customization

### **Colors:**
Edit gradients in `RatingModal.jsx`:
```jsx
// Rating screen
className="bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500"

// Feedback screen
className="bg-gradient-to-br from-blue-500 to-cyan-500"
```

### **Timing:**
Edit `CONFIG` in `ratingSystem.js`

### **Messages:**
Edit text in `RatingModal.jsx` component

---

## 📊 Success Metrics

**Target Goals:**
- **Response Rate:** >20% of eligible users
- **Average Rating:** >4.0 stars
- **Postpone Rate:** <50%
- **Dismiss Rate:** <10%
- **Feedback Rate:** >50% of low ratings

---

## ✨ Summary

The rating system provides:
- **Smart timing** - Asks at the right moment
- **Non-intrusive** - Easy to skip or dismiss
- **Beautiful UI** - Professional and engaging
- **Actionable feedback** - Captures why users rate low
- **Flexible** - Manual access from settings
- **Respectful** - Honors user preferences

**Result:** Higher quality ratings and valuable feedback without annoying users! ⭐🎉

---

## 📍 Integration Points

1. **Create Recipe Page** - After publishing recipe
2. **Create Reel Page** - After publishing reel
3. **Upload Photo** - After uploading to profile
4. **Settings Page** - Manual "Rate App" option
5. **Profile Page** - Could add subtle prompt

Choose integration points based on user engagement patterns!
