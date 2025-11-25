# 🚀 Plated App - Production Deployment Guide

## Table of Contents
1. [HTTPS/SSL Setup (Fix "Not Secure" Warning)](#httpsssl-setup)
2. [AI Functionality Setup](#ai-functionality-setup)
3. [Environment Variables Configuration](#environment-variables)
4. [Database Configuration](#database-configuration)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring & Logging](#monitoring--logging)

---

## 🔒 HTTPS/SSL Setup (Fix "Not Secure" Warning)

### Issue
Your deployed site shows "Not Secure" in the browser because it's using a Vercel default domain without a custom SSL certificate.

### Solution Options

#### Option 1: Custom Domain (Recommended)
1. **Purchase a domain** (from Namecheap, GoDaddy, Google Domains, etc.)
   - Recommended: `plated.app`, `myplated.com`, etc.

2. **Add domain to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your `plated-frontend` project
   - Navigate to **Settings** → **Domains**
   - Click **Add Domain**
   - Enter your custom domain (e.g., `plated.app`)

3. **Configure DNS Records:**
   Vercel will provide DNS records. Add these to your domain registrar:
   
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for SSL Provisioning:**
   - Vercel automatically provisions a free SSL certificate
   - Takes 5-10 minutes
   - Your site will show "Secure" with HTTPS

#### Option 2: Vercel Default Domain (Free, No SSL)
If you're okay with the Vercel domain and no SSL:
- Your site works fine without HTTPS for development
- Note: Browser will show "Not Secure" warning
- No payment required

#### Option 3: Cloudflare (Free SSL)
1. Sign up for [Cloudflare](https://www.cloudflare.com/)
2. Add your domain to Cloudflare
3. Point your domain nameservers to Cloudflare
4. Enable SSL/TLS (Full or Flexible mode)
5. Configure Vercel to use Cloudflare DNS

### Verification
After setup, verify HTTPS:
```bash
curl -I https://yourdomain.com
# Should return: HTTP/2 200
```

---

## 🤖 AI Functionality Setup

### Issue
AI features are not working because no API key is configured.

### Prerequisites
Choose one AI provider:
- **OpenAI** (GPT-4, GPT-3.5) - Recommended
- **Anthropic** (Claude) - Alternative

### Step 1: Get API Key

#### For OpenAI:
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up / Log in
3. Navigate to **API Keys** section
4. Click **Create new secret key**
5. Copy the key (starts with `sk-...`)
6. **Important:** Save it securely - you can't view it again

#### For Anthropic Claude:
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up / Log in
3. Navigate to **API Keys**
4. Generate new key
5. Copy the key

### Step 2: Configure Backend

1. **Add to Backend `.env` file:**
   ```bash
   # Backend: C:\Users\neo\Desktop\plated\the app\backend\.env
   
   # For OpenAI
   OPENAI_API_KEY=sk-your-actual-key-here
   OPENAI_MODEL=gpt-4-turbo-preview
   
   # For Anthropic (alternative)
   ANTHROPIC_API_KEY=your-anthropic-key-here
   ANTHROPIC_MODEL=claude-3-opus-20240229
   ```

2. **Update Backend Environment Variables on Hosting Platform:**
   
   If backend is on Render, Railway, or Heroku:
   - Go to your backend project dashboard
   - Navigate to **Environment Variables** or **Settings**
   - Add the same variables as above
   - Redeploy if needed

### Step 3: Test AI Features

1. **Test Recipe Suggestions:**
   ```bash
   # In the app, navigate to AI Assistant
   # Ask: "Suggest a healthy dinner recipe"
   ```

2. **Verify API Response:**
   - Check browser console (F12)
   - Should see successful AI responses
   - No 401/403 errors

### Step 4: Configure AI Service (Backend Code)

The AI functionality is already implemented in:
- `backend/controllers/aiController.js`
- `backend/routes/ai.js`
- `backend/services/aiService.js` (if exists)

**Verify the controller uses your API key:**

```javascript
// backend/controllers/aiController.js should have:
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Or for Anthropic:
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

### Cost Management

#### OpenAI Pricing (as of 2024):
- GPT-4 Turbo: $0.01 per 1K input tokens, $0.03 per 1K output tokens
- GPT-3.5 Turbo: $0.0005 per 1K input tokens, $0.0015 per 1K output tokens

#### Set Usage Limits:
1. Go to OpenAI Dashboard → **Usage Limits**
2. Set monthly budget (e.g., $20/month)
3. Enable email alerts at 75% usage

#### Optimize Costs:
- Use GPT-3.5 for simple queries
- Implement caching for repeated questions
- Add rate limiting (already implemented in backend)

---

## 🔧 Environment Variables Configuration

### Frontend Environment Variables

**File:** `foodie-social/.env.production`

```bash
# API Configuration
VITE_API_URL=https://your-backend-url.com/api

# Optional: Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://your-sentry-dsn

# Feature Flags
VITE_ENABLE_AI=true
VITE_ENABLE_PAYMENTS=false
```

### Backend Environment Variables

**File:** `backend/.env.production`

```bash
# Server
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/plated?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=another-super-secret-key

# CORS
FRONTEND_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# AI Services
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-4-turbo-preview

# Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@plated.com

# Cloud Storage (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_ROUNDS=10

# Monitoring
SENTRY_DSN=https://your-sentry-dsn
```

---

## 💾 Database Configuration

### MongoDB Atlas Setup (Current)

1. **Connection String:**
   - Already configured in your backend
   - Verify in MongoDB Atlas dashboard
   - Ensure IP whitelist includes: `0.0.0.0/0` (all IPs) for production

2. **Database Indexes (Performance):**
   ```javascript
   // Run these in MongoDB Shell or Atlas UI
   
   // Users collection
   db.users.createIndex({ email: 1 }, { unique: true });
   db.users.createIndex({ username: 1 }, { unique: true });
   
   // Recipes collection
   db.recipes.createIndex({ creator: 1 });
   db.recipes.createIndex({ createdAt: -1 });
   db.recipes.createIndex({ likes: -1 });
   db.recipes.createIndex({ "ingredients.name": "text", "title": "text" });
   
   // Notifications
   db.notifications.createIndex({ recipient: 1, createdAt: -1 });
   db.notifications.createIndex({ read: 1 });
   
   // Meal Plans
   db.mealplans.createIndex({ user: 1, createdAt: -1 });
   ```

3. **Backup Strategy:**
   - MongoDB Atlas provides automatic backups
   - Verify in Atlas: **Backup** tab
   - Configure backup frequency (daily recommended)

---

## ⚡ Performance Optimization

### Frontend Optimization

1. **Enable Compression:**
   Already configured in Vercel, but verify:
   - Gzip compression enabled
   - Brotli compression enabled

2. **Image Optimization:**
   ```javascript
   // Use Vercel Image Optimization or Cloudinary
   <img 
     src={`https://res.cloudinary.com/your-cloud/image/upload/w_800,f_auto,q_auto/${imageId}`}
     alt="Recipe"
   />
   ```

3. **Code Splitting:**
   Already implemented with React lazy loading:
   ```javascript
   const HomePage = lazy(() => import('./pages/HomePage'));
   ```

4. **Caching Strategy:**
   - Static assets cached for 1 year
   - API responses cached based on headers
   - Service worker for offline support (optional)

### Backend Optimization

1. **Database Connection Pooling:**
   ```javascript
   // Already configured in your backend
   mongoose.connect(MONGODB_URI, {
     maxPoolSize: 10,
     minPoolSize: 2,
     serverSelectionTimeoutMS: 5000
   });
   ```

2. **Response Compression:**
   ```javascript
   // Add to backend/server.js if not present
   const compression = require('compression');
   app.use(compression());
   ```

3. **Caching with Redis (Optional):**
   ```javascript
   // For high-traffic endpoints
   const redis = require('redis');
   const client = redis.createClient({ url: process.env.REDIS_URL });
   
   // Cache trending recipes
   app.get('/api/recipes/trending', async (req, res) => {
     const cached = await client.get('trending:recipes');
     if (cached) return res.json(JSON.parse(cached));
     
     const recipes = await Recipe.find().sort('-likes').limit(10);
     await client.setEx('trending:recipes', 300, JSON.stringify(recipes)); // 5 min cache
     res.json(recipes);
   });
   ```

---

## 📊 Monitoring & Logging

### Error Tracking with Sentry (Recommended)

1. **Sign up for Sentry:**
   - Go to [sentry.io](https://sentry.io)
   - Create new project (React + Node.js)

2. **Frontend Integration:**
   ```bash
   cd foodie-social
   npm install @sentry/react
   ```
   
   ```javascript
   // src/main.jsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: import.meta.env.VITE_SENTRY_DSN,
     environment: import.meta.env.MODE,
     tracesSampleRate: 1.0,
   });
   ```

3. **Backend Integration:**
   ```bash
   cd backend
   npm install @sentry/node
   ```
   
   ```javascript
   // server.js
   const Sentry = require("@sentry/node");
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
     tracesSampleRate: 1.0,
   });
   ```

### Analytics

1. **Google Analytics:**
   ```javascript
   // Add to frontend
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   ```

2. **Custom Events:**
   ```javascript
   // Track user actions
   gtag('event', 'recipe_created', {
     'event_category': 'engagement',
     'event_label': 'New Recipe',
   });
   ```

### Logging

1. **Backend Logging:**
   ```javascript
   // Use winston or pino
   const winston = require('winston');
   
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

---

## 🔐 Security Checklist

- [x] JWT authentication implemented
- [x] Password hashing (bcrypt) implemented
- [x] CORS configured
- [x] Rate limiting implemented
- [x] Input validation implemented
- [ ] HTTPS enabled (pending domain setup)
- [ ] Environment variables secured (not committed to git)
- [ ] Database connection string secured
- [ ] API keys secured in environment variables
- [ ] Content Security Policy headers (optional)
- [ ] Helmet.js for security headers (optional)

### Add Security Headers (Optional)

```javascript
// backend/server.js
const helmet = require('helmet');
app.use(helmet());

// Custom security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});
```

---

## 📝 Deployment Checklist

### Before Going Live:

- [x] All mock data removed
- [x] Backend API connected
- [x] Authentication working
- [x] Image uploads functional
- [x] Database properly configured
- [x] Error handling implemented
- [ ] HTTPS/SSL configured
- [ ] AI API key configured (optional)
- [ ] Environment variables set
- [ ] Database backups enabled
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics configured (GA)
- [ ] Performance testing completed
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done
- [ ] SEO optimization (meta tags)
- [ ] Terms of Service / Privacy Policy pages

### Post-Launch:

- [ ] Monitor error rates (Sentry)
- [ ] Track user metrics (GA)
- [ ] Monitor API performance
- [ ] Set up alerts for downtime
- [ ] Regular database backups
- [ ] Security updates (npm audit)
- [ ] User feedback collection
- [ ] A/B testing setup (optional)

---

## 🆘 Troubleshooting

### Issue: "Not Secure" Warning
**Solution:** Follow HTTPS/SSL Setup section above

### Issue: AI Not Working
**Solution:** 
1. Check API key is set in backend `.env`
2. Verify key is valid on OpenAI dashboard
3. Check backend logs for errors
4. Ensure billing is enabled on OpenAI account

### Issue: Images Not Uploading
**Solution:**
1. Check file size limit (currently 5MB)
2. Verify backend storage configuration
3. Consider using Cloudinary for production

### Issue: Slow Load Times
**Solution:**
1. Enable CDN (Vercel automatic)
2. Optimize images
3. Implement lazy loading
4. Add database indexes
5. Enable caching

### Issue: Database Connection Errors
**Solution:**
1. Verify MongoDB Atlas IP whitelist
2. Check connection string in `.env`
3. Ensure database user has correct permissions
4. Monitor connection pool size

---

## 📞 Support & Resources

- **MongoDB Atlas:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **OpenAI API:** [platform.openai.com/docs](https://platform.openai.com/docs)
- **React Docs:** [react.dev](https://react.dev)
- **Express.js:** [expressjs.com](https://expressjs.com)

---

## 🎉 Congratulations!

Your Plated app is production-ready! Follow this guide to complete the final setup steps and you'll have a fully functional, secure, and scalable food social media platform.

**Questions?** Review this guide or check the official documentation linked above.
