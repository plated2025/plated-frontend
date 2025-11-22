# 👥 User Type Selection System

A system that allows new users to choose between Creator and Regular User accounts during signup, determining whether the achievement system applies.

---

## 🎯 Overview

When users sign up (via email, Google, or Apple), they are prompted to select their account type:
- **Creator** - For content creators who want to share recipes and earn achievements
- **Regular User (Food Lover)** - For users who want to discover, save, and plan meals

This choice determines:
- ✅ Whether the achievement system is enabled
- ✅ What features are prominently displayed
- ✅ The onboarding flow they experience

---

## ✨ Key Features

### **1. User Type Selection Page** 🎨

**Location:** `/onboarding/user-type`

**Design:**
- Side-by-side comparison cards
- **Creator Card:**
  - Chef hat icon
  - Pink/purple gradient
  - Features: Share content, build audience, achievements, monetization
  - Badge: "Achievement System Included" ⭐
  
- **Regular User Card:**
  - User icon
  - Blue/cyan gradient
  - Features: Save recipes, meal planning, follow creators, recommendations

**Features:**
- Large, attractive cards with gradients
- Selected card has animated border
- Clear feature lists with icons
- "You can always switch later" notice
- Skip option (defaults to Regular)
- Mobile responsive

---

### **2. User Type in Context** 🔧

**AppContext State:**
```javascript
{
  userType: 'creator' | 'regular' | null,
  hasSelectedUserType: boolean,
  updateUserType: (type) => void
}
```

**Storage:**
- Stored in localStorage
- Persists across sessions
- Part of currentUser object

---

### **3. Conditional Onboarding Flow** 🔄

**Flow for Creators:**
```
Sign Up → User Type Selection → Interests → Creators → Tutorial → Achievements → Home
```

**Flow for Regular Users:**
```
Sign Up → User Type Selection → Interests → Creators → Tutorial → Home
         (skips achievements)
```

---

## 📊 Implementation Details

### **1. UserTypeSelectionPage Component**

**File:** `src/pages/onboarding/UserTypeSelectionPage.jsx`

**Features:**
```jsx
const userTypes = [
  {
    id: 'creator',
    title: 'Creator',
    features: ['Share recipes', 'Build audience', 'Achievements', 'Monetization'],
    gradient: 'from-primary-500 via-purple-500 to-pink-500'
  },
  {
    id: 'regular',
    title: 'Food Lover',
    features: ['Save recipes', 'Meal planning', 'Follow creators', 'Recommendations'],
    gradient: 'from-blue-500 via-cyan-500 to-teal-500'
  }
]
```

**User Experience:**
- Click card to select
- Selected card scales up and shows checkmark
- Gradient border animation
- Continue button activates when selected
- Skip button defaults to regular user

---

### **2. AppContext Updates**

**Added States:**
```javascript
const [userType, setUserType] = useState(null)
const [hasSelectedUserType, setHasSelectedUserType] = useState(false)
```

**Added Functions:**
```javascript
const updateUserType = (type) => {
  setUserType(type)
  setHasSelectedUserType(true)
  localStorage.setItem('userType', type)
  localStorage.setItem('hasSelectedUserType', 'true')
  
  // Update currentUser object
  if (currentUser) {
    const updatedUser = { ...currentUser, userType: type }
    setCurrentUser(updatedUser)
    localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  }
}
```

---

### **3. Routing Logic**

**ProtectedRoute Component:**
```javascript
function ProtectedRoute() {
  const { isAuthenticated, hasCompletedOnboarding, hasSelectedUserType } = useApp()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />
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
```

**Route Added:**
```jsx
<Route 
  path="/onboarding/user-type" 
  element={isAuthenticated && !hasCompletedOnboarding ? <UserTypeSelectionPage /> : <Navigate to="/" />} 
/>
```

---

### **4. Conditional Achievement System**

**TutorialPage Updates:**
```javascript
const handleNext = () => {
  if (currentStep < tutorialSteps.length - 1) {
    setCurrentStep(currentStep + 1)
  } else {
    // Only show achievements for creators
    if (userType === 'creator') {
      navigate('/onboarding/achievements')
    } else {
      // Regular users skip achievements
      completeOnboarding()
      navigate('/')
    }
  }
}
```

**Result:**
- **Creators:** See achievement tutorial, earn badges, unlock features
- **Regular Users:** Skip achievements, go straight to home

---

## 🎨 Visual Design

### **Creator Card:**
```
┌─────────────────────────────────┐
│ [👨‍🍳] Creator          ✓       │
│                                 │
│ Share recipes, build audience,  │
│ earn achievements               │
│                                 │
│ [📷] Share recipes & content    │
│ [📈] Build your audience        │
│ [✨] Unlock achievements         │
│ [💰] Monetization               │
│                                 │
│ ⭐ Achievement System Included  │
└─────────────────────────────────┘
```

### **Regular User Card:**
```
┌─────────────────────────────────┐
│ [👤] Food Lover                 │
│                                 │
│ Discover recipes, save          │
│ favorites, plan meals           │
│                                 │
│ [❤️] Save & organize recipes    │
│ [🍳] Meal planning tools        │
│ [👤] Follow creators            │
│ [✨] Personalized recommendations│
└─────────────────────────────────┘
```

---

## 🔄 User Flows

### **Scenario 1: New Creator Signup**

```
1. User signs up with email
2. Redirected to /onboarding/user-type
3. Selects "Creator" card
4. Clicks Continue
5. Sees Interests page
6. Sees Suggested Creators
7. Sees Tutorial
8. **Sees Achievement Tutorial** ← Enabled!
9. Completes onboarding
10. Achievement system active
```

### **Scenario 2: New Regular User Signup**

```
1. User signs up with Google
2. Redirected to /onboarding/user-type
3. Selects "Food Lover" card
4. Clicks Continue
5. Sees Interests page
6. Sees Suggested Creators
7. Sees Tutorial
8. **Skips Achievement Tutorial** ← Disabled!
9. Completes onboarding
10. No achievement system
```

### **Scenario 3: Skip Selection**

```
1. User signs up
2. Sees user type page
3. Clicks "Skip for now"
4. Defaults to Regular User
5. Continues onboarding
6. No achievements
```

---

## 💡 Benefits

### **For Users:**
- ✅ **Clear choice** - Understand what they're signing up for
- ✅ **Tailored experience** - Get relevant features only
- ✅ **No clutter** - Regular users don't see creator features
- ✅ **Flexibility** - Can switch later in settings

### **For Creators:**
- ✅ **Achievement motivation** - Gamification encourages engagement
- ✅ **Growth tools** - Analytics, badges, followers
- ✅ **Monetization** - Future revenue opportunities
- ✅ **Professional identity** - Clearly identified as creator

### **For Regular Users:**
- ✅ **Simpler interface** - No achievement clutter
- ✅ **Focus on discovery** - Meal planning, saving recipes
- ✅ **Faster onboarding** - One less tutorial
- ✅ **Consumer mindset** - Enjoy content without pressure

---

## 🔧 Future Enhancements

### **Planned Features:**

1. **Switch Account Type in Settings**
   ```
   Settings → Account → Account Type → [Switch to Creator/Regular]
   ```

2. **Creator Verification**
   - Verify creators after X recipes posted
   - Blue checkmark for verified creators
   - Enhanced features for verified

3. **Tiered Creator Accounts**
   - Free Creator
   - Pro Creator (subscription)
   - Business Creator

4. **Analytics Dashboard** (Creators only)
   - Views, likes, saves
   - Follower growth
   - Recipe performance

5. **Monetization Tools** (Creators only)
   - Sponsored recipes
   - Affiliate links
   - Premium content

6. **Achievement Levels** (Creators only)
   - Bronze, Silver, Gold, Platinum
   - Special badges
   - Exclusive features

---

## 📊 Data Structure

### **User Object:**
```javascript
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  userType: "creator" | "regular",
  hasCompletedOnboarding: true,
  achievements: [], // Only for creators
  followers: 0,
  following: 0,
  recipesPosted: 0
}
```

### **localStorage Keys:**
```
- userType: 'creator' | 'regular'
- hasSelectedUserType: 'true' | 'false'
- currentUser: { ...user, userType: 'creator' }
```

---

## 🎯 Success Metrics

**Track:**
- % Creator vs Regular signups
- Onboarding completion rate by type
- Feature usage by type
- Account type switches
- Creator engagement levels

**Target:**
- 70% Regular users
- 30% Creators
- 95% complete onboarding
- < 5% switch account type

---

## 🔐 Validation

### **Ensure User Type is Set:**
```javascript
// In ProtectedRoute
if (!hasSelectedUserType) {
  return <Navigate to="/onboarding/user-type" />
}
```

### **Prevent Access Without Selection:**
- Can't access app without selecting type
- Can skip (defaults to regular)
- Type persists across sessions

---

## ✅ Testing Checklist

- [x] User type selection page renders
- [x] Can select Creator
- [x] Can select Regular
- [x] Selection persists in localStorage
- [x] Creators see achievement tutorial
- [x] Regular users skip achievements
- [x] Can skip selection (defaults regular)
- [x] Type saved to currentUser
- [x] Routing logic works correctly
- [x] Mobile responsive design

---

## 📝 Notes

### **Design Decisions:**

**Why Two Types?**
- Clear distinction between content creators and consumers
- Prevents feature bloat for casual users
- Allows targeted feature development

**Why Achievements for Creators Only?**
- Motivates content creation
- Rewards engagement
- Creators need gamification
- Regular users prefer simplicity

**Why Allow Switching?**
- User needs may change
- Don't lock users in
- Encourages upgrades
- Better UX

---

## 🎉 Result

**A clear, beautiful onboarding experience that:**
- ✅ Sets proper expectations
- ✅ Tailors the experience
- ✅ Enables/disables achievements appropriately
- ✅ Provides flexibility
- ✅ Creates distinct user journeys

**Perfect for distinguishing creators from casual users!** 👥✨

