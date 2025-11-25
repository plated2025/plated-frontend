# 🤖 Plated App - AI Functionality Setup Guide

## Overview
This guide will help you set up AI-powered features in your Plated app, including:
- Recipe suggestions based on ingredients
- Meal plan generation
- Cooking tips and advice
- Dietary recommendations
- Smart search and discovery

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Get Your API Key

#### Option A: OpenAI (Recommended)
1. Go to [https://platform.openai.com/](https://platform.openai.com/)
2. Click **Sign Up** or **Log In**
3. Navigate to **API Keys** in the left sidebar
4. Click **+ Create new secret key**
5. Name it: "Plated App Production"
6. **IMPORTANT:** Copy the key immediately (starts with `sk-...`)
7. You won't be able to see it again!

#### Option B: Anthropic Claude (Alternative)
1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up for an account
3. Navigate to **API Keys**
4. Click **Create Key**
5. Copy the key securely

---

### Step 2: Configure Backend

1. **Open your backend `.env` file:**
   ```bash
   # Location: C:\Users\neo\Desktop\plated\the app\backend\.env
   ```

2. **Add your API key:**
   
   For OpenAI:
   ```bash
   # OpenAI Configuration
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   OPENAI_MODEL=gpt-4-turbo-preview
   OPENAI_MAX_TOKENS=1000
   ```
   
   For Anthropic:
   ```bash
   # Anthropic Configuration
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ANTHROPIC_MODEL=claude-3-opus-20240229
   ANTHROPIC_MAX_TOKENS=1000
   ```

3. **Save the file**

---

### Step 3: Update Production Environment

If your backend is deployed (Render, Railway, Heroku, etc.):

1. Go to your hosting platform dashboard
2. Navigate to **Environment Variables** or **Config Vars**
3. Add the same variables:
   - Key: `OPENAI_API_KEY`
   - Value: `sk-proj-your-key-here`
4. Click **Save** or **Add**
5. Restart your backend service

---

### Step 4: Test AI Features

1. **Start your backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Test the AI endpoint:**
   ```bash
   # Test with curl
   curl -X POST http://localhost:5000/api/ai/suggest \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"ingredients": ["chicken", "tomatoes", "basil"]}'
   ```

3. **Expected response:**
   ```json
   {
     "status": "success",
     "suggestions": [
       {
         "title": "Chicken Caprese",
         "description": "A delicious Italian-inspired dish...",
         "ingredients": [...],
         "steps": [...]
       }
     ]
   }
   ```

---

## 🔧 Detailed Configuration

### Backend AI Controller

Your backend already has AI functionality implemented in:
```
backend/
├── controllers/
│   └── aiController.js          # AI endpoint handlers
├── routes/
│   └── ai.js                     # AI routes
└── services/
    └── aiService.js              # AI service logic (optional)
```

### Verify Implementation

Check `backend/controllers/aiController.js` has:

```javascript
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateRecipeSuggestion = async (req, res) => {
  try {
    const { ingredients, dietary_preferences, cuisine } = req.body;
    
    const prompt = `Suggest a recipe using these ingredients: ${ingredients.join(', ')}. 
    Consider these dietary preferences: ${dietary_preferences || 'none'}.
    Cuisine preference: ${cuisine || 'any'}.`;
    
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { 
          role: 'system', 
          content: 'You are a professional chef assistant. Provide creative, delicious, and practical recipe suggestions.' 
        },
        { role: 'user', content: prompt }
      ],
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 1000,
      temperature: 0.7,
    });
    
    const suggestion = completion.choices[0].message.content;
    
    res.status(200).json({
      status: 'success',
      data: {
        suggestion,
        tokens_used: completion.usage.total_tokens
      }
    });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to generate recipe suggestion'
    });
  }
};
```

### Frontend Integration

The frontend already has AI components at:
```
foodie-social/
└── src/
    ├── components/
    │   └── AIAssistant.jsx      # AI chat interface
    ├── pages/
    │   └── AIRecipePage.jsx     # AI recipe generation
    └── services/
        └── api.js                # API calls
```

### API Endpoints Available

```javascript
// Recipe suggestions based on ingredients
POST /api/ai/suggest
Body: { ingredients: string[], dietary_preferences?: string, cuisine?: string }

// Meal plan generation
POST /api/ai/meal-plan
Body: { days: number, dietary_preferences: string, budget: string }

// Cooking tips
POST /api/ai/tips
Body: { recipe_id: string, difficulty?: string }

// Ingredient substitutions
POST /api/ai/substitute
Body: { ingredient: string, reason?: string }
```

---

## 💰 Pricing & Cost Management

### OpenAI Pricing (Nov 2024)

| Model | Input (per 1K tokens) | Output (per 1K tokens) |
|-------|----------------------|------------------------|
| GPT-4 Turbo | $0.01 | $0.03 |
| GPT-3.5 Turbo | $0.0005 | $0.0015 |

### Anthropic Pricing

| Model | Input (per 1K tokens) | Output (per 1K tokens) |
|-------|----------------------|------------------------|
| Claude 3 Opus | $0.015 | $0.075 |
| Claude 3 Sonnet | $0.003 | $0.015 |
| Claude 3 Haiku | $0.00025 | $0.00125 |

### Cost Estimation

**Example usage:**
- 1,000 recipe suggestions per month
- Average 500 tokens per request (250 input + 250 output)
- Using GPT-4 Turbo:
  - Input: 1,000 × 0.25 × $0.01 = $2.50
  - Output: 1,000 × 0.25 × $0.03 = $7.50
  - **Total: ~$10/month**

### Set Budget Limits

1. **OpenAI Dashboard:**
   - Go to [Settings → Limits](https://platform.openai.com/account/limits)
   - Set **Monthly Budget** (e.g., $20)
   - Enable **Email Alerts** at 75% and 90%
   - Set **Rate Limits** to prevent abuse

2. **In Your Code:**
   ```javascript
   // backend/middleware/aiRateLimit.js
   const rateLimit = require('express-rate-limit');
   
   const aiLimiter = rateLimit({
     windowMs: 60 * 60 * 1000, // 1 hour
     max: 10, // 10 requests per hour per user
     message: 'Too many AI requests. Please try again later.'
   });
   
   module.exports = aiLimiter;
   ```
   
   ```javascript
   // backend/routes/ai.js
   const aiLimiter = require('../middleware/aiRateLimit');
   router.post('/suggest', protect, aiLimiter, aiController.generateRecipeSuggestion);
   ```

---

## 🎨 AI Features Implementation

### Feature 1: Smart Recipe Suggestions

**User Flow:**
1. User enters available ingredients
2. AI suggests recipes using those ingredients
3. Results displayed as recipe cards

**Frontend:**
```javascript
// src/pages/AIRecipePage.jsx
const [ingredients, setIngredients] = useState([]);
const [suggestions, setSuggestions] = useState([]);

const getSuggestions = async () => {
  const response = await aiAPI.getRecipeSuggestions({
    ingredients,
    dietary_preferences: user.dietaryPreferences,
    cuisine: selectedCuisine
  });
  setSuggestions(response.data);
};
```

### Feature 2: Meal Plan Generator

**User Flow:**
1. User specifies duration (7 days, 14 days)
2. Sets dietary preferences and budget
3. AI generates complete meal plan

**Implementation:**
```javascript
// backend/controllers/aiController.js
exports.generateMealPlan = async (req, res) => {
  const { days, servings, dietary_preferences, budget } = req.body;
  
  const prompt = `Create a ${days}-day meal plan for ${servings} people.
  Budget: ${budget}
  Dietary preferences: ${dietary_preferences}
  
  Format each day with:
  - Breakfast
  - Lunch  
  - Dinner
  - Snack (optional)
  
  Include shopping list at the end.`;
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: 'You are a meal planning expert.' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 2000
  });
  
  // Parse and structure the response
  const mealPlan = parseMealPlanResponse(completion.choices[0].message.content);
  
  res.json({ status: 'success', data: mealPlan });
};
```

### Feature 3: Cooking Assistant Chat

**User Flow:**
1. User asks cooking questions
2. AI provides instant answers
3. Context-aware responses based on recipe

**Implementation:**
```javascript
// Maintain conversation history
const conversationHistory = [
  { role: 'system', content: 'You are a helpful cooking assistant.' }
];

exports.chatWithAssistant = async (req, res) => {
  const { message, recipe_context } = req.body;
  
  conversationHistory.push({ role: 'user', content: message });
  
  if (recipe_context) {
    conversationHistory.push({
      role: 'system',
      content: `Current recipe context: ${JSON.stringify(recipe_context)}`
    });
  }
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: conversationHistory,
    max_tokens: 500
  });
  
  const reply = completion.choices[0].message.content;
  conversationHistory.push({ role: 'assistant', content: reply });
  
  res.json({ status: 'success', data: { reply } });
};
```

---

## 🔒 Security Best Practices

### 1. Never Expose API Keys to Frontend
```javascript
// ❌ WRONG - Never do this
const apiKey = 'sk-proj-xxxxx';
fetch('https://api.openai.com/v1/chat/completions', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});

// ✅ CORRECT - Use backend proxy
fetch('/api/ai/suggest', {
  headers: { 'Authorization': `Bearer ${userJwtToken}` },
  body: JSON.stringify({ ingredients })
});
```

### 2. Implement Rate Limiting
```javascript
// Protect against abuse
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 AI requests per hour
  message: 'AI rate limit exceeded'
});
```

### 3. Input Validation
```javascript
// Validate user input before sending to AI
exports.generateRecipeSuggestion = async (req, res) => {
  const { ingredients } = req.body;
  
  // Validate
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: 'Invalid ingredients' });
  }
  
  if (ingredients.length > 20) {
    return res.status(400).json({ error: 'Too many ingredients' });
  }
  
  // Sanitize
  const sanitized = ingredients.map(i => i.trim().toLowerCase());
  
  // Continue with AI call...
};
```

### 4. Error Handling
```javascript
try {
  const completion = await openai.chat.completions.create({...});
} catch (error) {
  // Log error but don't expose details to client
  console.error('OpenAI Error:', error);
  
  if (error.code === 'insufficient_quota') {
    return res.status(503).json({ error: 'AI service temporarily unavailable' });
  }
  
  return res.status(500).json({ error: 'Failed to generate suggestion' });
}
```

---

## 🧪 Testing AI Features

### Manual Testing

1. **Test Recipe Suggestions:**
   ```bash
   curl -X POST http://localhost:5000/api/ai/suggest \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "ingredients": ["chicken", "rice", "broccoli"],
       "dietary_preferences": "high-protein",
       "cuisine": "Asian"
     }'
   ```

2. **Test Meal Plan Generation:**
   ```bash
   curl -X POST http://localhost:5000/api/ai/meal-plan \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -d '{
       "days": 7,
       "servings": 2,
       "dietary_preferences": "vegetarian",
       "budget": "moderate"
     }'
   ```

### Automated Testing

```javascript
// backend/tests/ai.test.js
describe('AI Controller', () => {
  it('should generate recipe suggestions', async () => {
    const response = await request(app)
      .post('/api/ai/suggest')
      .set('Authorization', `Bearer ${testToken}`)
      .send({
        ingredients: ['pasta', 'tomatoes', 'basil']
      });
    
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.suggestion).toBeDefined();
  });
  
  it('should handle rate limiting', async () => {
    // Make 21 requests (limit is 20)
    for (let i = 0; i < 21; i++) {
      await request(app)
        .post('/api/ai/suggest')
        .set('Authorization', `Bearer ${testToken}`)
        .send({ ingredients: ['chicken'] });
    }
    
    const response = await request(app)
      .post('/api/ai/suggest')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ ingredients: ['chicken'] });
    
    expect(response.status).toBe(429); // Too Many Requests
  });
});
```

---

## 📊 Monitoring & Analytics

### Track AI Usage

```javascript
// backend/models/AIUsage.js
const aiUsageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  endpoint: String,
  tokens_used: Number,
  cost: Number,
  response_time_ms: Number,
  success: Boolean,
  error: String,
  createdAt: { type: Date, default: Date.now }
});

// backend/controllers/aiController.js
const logAIUsage = async (userId, endpoint, tokensUsed, success, error = null) => {
  const cost = calculateCost(tokensUsed);
  
  await AIUsage.create({
    user: userId,
    endpoint,
    tokens_used: tokensUsed,
    cost,
    success,
    error
  });
};
```

### Dashboard Queries

```javascript
// Get total AI costs this month
const thisMonth = new Date();
thisMonth.setDate(1);

const totalCost = await AIUsage.aggregate([
  { $match: { createdAt: { $gte: thisMonth } } },
  { $group: { _id: null, total: { $sum: '$cost' } } }
]);

// Get top AI users
const topUsers = await AIUsage.aggregate([
  { $group: { _id: '$user', requests: { $sum: 1 }, totalCost: { $sum: '$cost' } } },
  { $sort: { requests: -1 } },
  { $limit: 10 }
]);
```

---

## 🚀 Deployment Checklist

- [ ] API key added to `.env`
- [ ] Environment variable set on hosting platform
- [ ] Rate limiting configured
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Cost monitoring setup
- [ ] Budget limits set on OpenAI dashboard
- [ ] Email alerts enabled
- [ ] AI usage logging implemented
- [ ] Testing completed
- [ ] Documentation updated

---

## 🆘 Troubleshooting

### Error: "Invalid API Key"
**Solution:**
- Verify key starts with `sk-proj-` (OpenAI) or `sk-ant-` (Anthropic)
- Check no extra spaces in `.env` file
- Ensure environment variables are loaded (`require('dotenv').config()`)
- Restart backend after changing `.env`

### Error: "Insufficient Quota"
**Solution:**
- Add payment method to OpenAI account
- Check billing dashboard for current usage
- Ensure you haven't exceeded your budget limit

### Error: "Rate Limit Exceeded"
**Solution:**
- You're sending too many requests
- Implement caching for common queries
- Increase rate limit tier on OpenAI dashboard (paid plans)
- Add request queuing in your backend

### Error: "Timeout"
**Solution:**
- Increase timeout in your code:
  ```javascript
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    timeout: 60000 // 60 seconds
  });
  ```
- Reduce `max_tokens` in requests
- Use faster models (GPT-3.5 instead of GPT-4)

---

## 📚 Resources

- **OpenAI Documentation:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **OpenAI Cookbook:** [github.com/openai/openai-cookbook](https://github.com/openai/openai-cookbook)
- **Anthropic Docs:** [docs.anthropic.com](https://docs.anthropic.com)
- **Best Practices:** [platform.openai.com/docs/guides/production-best-practices](https://platform.openai.com/docs/guides/production-best-practices)

---

## 🎉 You're All Set!

Your Plated app now has AI-powered features! Users can:
- Get personalized recipe suggestions
- Generate meal plans automatically
- Ask cooking questions
- Find ingredient substitutions
- Discover new cuisines

**Start using AI features in your app now!** 🚀
