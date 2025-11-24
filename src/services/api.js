// API Base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('token');

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
    }
    
    return data;
  },

  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token
    if (data.data.token) {
      localStorage.setItem('token', data.data.token);
    }
    
    return data;
  },

  getMe: async () => {
    return await apiRequest('/auth/me');
  },

  updateOnboarding: async (onboardingData) => {
    return await apiRequest('/auth/onboarding', {
      method: 'PUT',
      body: JSON.stringify(onboardingData),
    });
  },

  checkUsername: async (username) => {
    return await apiRequest(`/auth/check-username/${username}`, {
      method: 'GET',
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// Recipe API
export const recipeAPI = {
  getRecipes: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/recipes?${queryString}`);
  },

  getRecipe: async (id) => {
    return await apiRequest(`/recipes/${id}`);
  },

  createRecipe: async (recipeData) => {
    const token = getToken();
    
    // If recipeData is FormData, don't stringify
    const isFormData = recipeData instanceof FormData;
    
    const config = {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!isFormData && { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? recipeData : JSON.stringify(recipeData),
    };

    const response = await fetch(`${API_URL}/recipes`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create recipe');
    }

    return data;
  },

  updateRecipe: async (id, recipeData) => {
    return await apiRequest(`/recipes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  },

  deleteRecipe: async (id) => {
    return await apiRequest(`/recipes/${id}`, {
      method: 'DELETE',
    });
  },

  toggleLike: async (id) => {
    return await apiRequest(`/recipes/${id}/like`, {
      method: 'POST',
    });
  },

  toggleSave: async (id) => {
    return await apiRequest(`/recipes/${id}/save`, {
      method: 'POST',
    });
  },

  getUserRecipes: async (userId) => {
    return await apiRequest(`/recipes/user/${userId}`);
  },

  getSavedRecipes: async () => {
    return await apiRequest('/recipes/saved/me');
  },
};

// User API
export const userAPI = {
  getProfile: async (userId) => {
    return await apiRequest(`/users/profile/${userId}`);
  },

  updateProfile: async (profileData) => {
    return await apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  followUser: async (userId) => {
    return await apiRequest(`/users/follow/${userId}`, {
      method: 'POST',
    });
  },

  unfollowUser: async (userId) => {
    return await apiRequest(`/users/follow/${userId}`, {
      method: 'DELETE',
    });
  },

  getFollowers: async (userId) => {
    return await apiRequest(`/users/${userId}/followers`);
  },

  getFollowing: async (userId) => {
    return await apiRequest(`/users/${userId}/following`);
  },

  searchUsers: async (query) => {
    return await apiRequest(`/users/search?q=${encodeURIComponent(query)}`);
  },
};

// Comment API
export const commentAPI = {
  getRecipeComments: async (recipeId) => {
    return await apiRequest(`/comments/recipe/${recipeId}`);
  },

  addComment: async (commentData) => {
    return await apiRequest('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData),
    });
  },

  updateComment: async (id, text) => {
    return await apiRequest(`/comments/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  },

  deleteComment: async (id) => {
    return await apiRequest(`/comments/${id}`, {
      method: 'DELETE',
    });
  },

  toggleLike: async (id) => {
    return await apiRequest(`/comments/${id}/like`, {
      method: 'POST',
    });
  },
};

// Upload API
export const uploadAPI = {
  uploadRecipeImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    const token = getToken();
    const response = await fetch(`${API_URL}/upload/recipe`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadMultipleRecipeImages: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    
    const token = getToken();
    const response = await fetch(`${API_URL}/upload/recipe/multiple`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    
    const token = getToken();
    const response = await fetch(`${API_URL}/upload/avatar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  },

  uploadCoverImage: async (file) => {
    const formData = new FormData();
    formData.append('cover', file);
    
    const token = getToken();
    const response = await fetch(`${API_URL}/upload/cover`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Upload failed');
    }
    return data;
  }
};

// Notification API
export const notificationAPI = {
  getNotifications: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/notifications?${queryString}`);
  },

  markAsRead: async (id) => {
    return await apiRequest(`/notifications/${id}/read`, {
      method: 'PUT',
    });
  },

  markAllAsRead: async () => {
    return await apiRequest('/notifications/read-all', {
      method: 'PUT',
    });
  },

  deleteNotification: async (id) => {
    return await apiRequest(`/notifications/${id}`, {
      method: 'DELETE',
    });
  },

  deleteReadNotifications: async () => {
    return await apiRequest('/notifications/read/all', {
      method: 'DELETE',
    });
  },
};

// Meal Planner API
export const mealPlannerAPI = {
  getMealPlans: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/planner${queryString ? `?${queryString}` : ''}`);
  },

  getMealPlan: async (id) => {
    return await apiRequest(`/planner/${id}`);
  },

  createMealPlan: async (data) => {
    return await apiRequest('/planner', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateMealPlan: async (id, data) => {
    return await apiRequest(`/planner/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteMealPlan: async (id) => {
    return await apiRequest(`/planner/${id}`, {
      method: 'DELETE',
    });
  },

  addMeal: async (id, mealData) => {
    return await apiRequest(`/planner/${id}/meals`, {
      method: 'POST',
      body: JSON.stringify(mealData),
    });
  },

  removeMeal: async (planId, mealId) => {
    return await apiRequest(`/planner/${planId}/meals/${mealId}`, {
      method: 'DELETE',
    });
  },

  updateShoppingItem: async (planId, itemId, data) => {
    return await apiRequest(`/planner/${planId}/shopping/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getPublicMealPlans: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/planner/public${queryString ? `?${queryString}` : ''}`);
  },
};

// Messages API
export const messagesAPI = {
  getConversations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/messages/conversations${queryString ? `?${queryString}` : ''}`);
  },

  getOrCreateConversation: async (userId) => {
    return await apiRequest('/messages/conversations/direct', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },

  getMessages: async (conversationId, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/messages/conversations/${conversationId}${queryString ? `?${queryString}` : ''}`);
  },

  sendMessage: async (conversationId, data) => {
    return await apiRequest(`/messages/conversations/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  editMessage: async (messageId, text) => {
    return await apiRequest(`/messages/${messageId}`, {
      method: 'PUT',
      body: JSON.stringify({ text }),
    });
  },

  deleteMessage: async (messageId) => {
    return await apiRequest(`/messages/${messageId}`, {
      method: 'DELETE',
    });
  },

  archiveConversation: async (conversationId) => {
    return await apiRequest(`/messages/conversations/${conversationId}/archive`, {
      method: 'PUT',
    });
  },

  unarchiveConversation: async (conversationId) => {
    return await apiRequest(`/messages/conversations/${conversationId}/unarchive`, {
      method: 'PUT',
    });
  },
};

// Subscriptions API
export const subscriptionsAPI = {
  getPlans: async () => {
    return await apiRequest('/subscriptions/plans');
  },

  getCurrentSubscription: async () => {
    return await apiRequest('/subscriptions/current');
  },

  createCheckout: async (plan) => {
    return await apiRequest('/subscriptions/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan }),
    });
  },

  changeSubscription: async (plan) => {
    return await apiRequest('/subscriptions/change', {
      method: 'PUT',
      body: JSON.stringify({ plan }),
    });
  },

  cancelSubscription: async () => {
    return await apiRequest('/subscriptions/cancel', {
      method: 'POST',
    });
  },

  reactivateSubscription: async () => {
    return await apiRequest('/subscriptions/reactivate', {
      method: 'POST',
    });
  },

  getBillingHistory: async () => {
    return await apiRequest('/subscriptions/billing');
  },
};

// Recipe Rating & Advanced Features
export const recipeAdvancedAPI = {
  rateRecipe: async (id, rating) => {
    return await apiRequest(`/recipes/${id}/rate`, {
      method: 'POST',
      body: JSON.stringify({ rating }),
    });
  },

  getTrendingRecipes: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/recipes/trending${queryString ? `?${queryString}` : ''}`);
  },

  getFeaturedRecipes: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/recipes/featured${queryString ? `?${queryString}` : ''}`);
  },

  getTopRatedRecipes: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return await apiRequest(`/recipes/top-rated${queryString ? `?${queryString}` : ''}`);
  },
};

// Security API
export const securityAPI = {
  // Email Verification
  verifyEmail: async (token) => {
    return await apiRequest(`/security/verify-email/${token}`, {
      method: 'GET',
    });
  },

  resendVerification: async () => {
    return await apiRequest('/security/resend-verification', {
      method: 'POST',
    });
  },

  // Two-Factor Authentication
  setup2FA: async () => {
    return await apiRequest('/security/2fa/setup', {
      method: 'POST',
    });
  },

  verify2FA: async (token) => {
    return await apiRequest('/security/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  disable2FA: async (password) => {
    return await apiRequest('/security/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },

  // User Blocking
  blockUser: async (userId) => {
    return await apiRequest(`/security/block/${userId}`, {
      method: 'POST',
    });
  },

  unblockUser: async (userId) => {
    return await apiRequest(`/security/block/${userId}`, {
      method: 'DELETE',
    });
  },

  getBlockedUsers: async () => {
    return await apiRequest('/security/blocked', {
      method: 'GET',
    });
  },

  // Reporting
  createReport: async (reportData) => {
    return await apiRequest('/security/report', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  getMyReports: async () => {
    return await apiRequest('/security/reports', {
      method: 'GET',
    });
  },

  // Security Settings
  getSecuritySettings: async () => {
    return await apiRequest('/security/settings', {
      method: 'GET',
    });
  },
};

// AI API (Gemini)
export const aiAPI = {
  generateRecipes: async (ingredients) => {
    return await apiRequest('/ai/generate-recipes', {
      method: 'POST',
      body: JSON.stringify({ ingredients }),
    });
  },

  scanFood: async (imageBase64) => {
    return await apiRequest('/ai/scan-food', {
      method: 'POST',
      body: JSON.stringify({ image: imageBase64 }),
    });
  },

  analyzeProduct: async (imageBase64) => {
    return await apiRequest('/ai/analyze-product', {
      method: 'POST',
      body: JSON.stringify({ image: imageBase64 }),
    });
  },

  getCookingAdvice: async (query) => {
    return await apiRequest('/ai/cooking-advice', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
  },

  chat: async (message, conversationHistory = []) => {
    return await apiRequest('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, conversationHistory }),
    });
  },
};

// Story API
export const storyAPI = {
  createStory: async (storyData) => {
    const token = getToken();
    
    const config = {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: storyData, // FormData object
    };

    const response = await fetch(`${API_URL}/stories`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create story');
    }

    return data;
  },

  getStories: async () => {
    return await apiRequest('/stories');
  },

  getUserStories: async (userId) => {
    return await apiRequest(`/stories/user/${userId}`);
  },

  getStory: async (id) => {
    return await apiRequest(`/stories/${id}`);
  },

  deleteStory: async (id) => {
    return await apiRequest(`/stories/${id}`, {
      method: 'DELETE',
    });
  },

  likeStory: async (id) => {
    return await apiRequest(`/stories/${id}/like`, {
      method: 'POST',
    });
  },
};

// Collection API
export const collectionAPI = {
  getCollections: async () => {
    return await apiRequest('/collections');
  },

  getCollection: async (id) => {
    return await apiRequest(`/collections/${id}`);
  },

  createCollection: async (collectionData) => {
    return await apiRequest('/collections', {
      method: 'POST',
      body: JSON.stringify(collectionData),
    });
  },

  updateCollection: async (id, collectionData) => {
    return await apiRequest(`/collections/${id}`, {
      method: 'PUT',
      body: JSON.stringify(collectionData),
    });
  },

  deleteCollection: async (id) => {
    return await apiRequest(`/collections/${id}`, {
      method: 'DELETE',
    });
  },

  addRecipeToCollection: async (collectionId, recipeId) => {
    return await apiRequest(`/collections/${collectionId}/recipes`, {
      method: 'POST',
      body: JSON.stringify({ recipeId }),
    });
  },

  removeRecipeFromCollection: async (collectionId, recipeId) => {
    return await apiRequest(`/collections/${collectionId}/recipes/${recipeId}`, {
      method: 'DELETE',
    });
  },

  getPublicCollections: async () => {
    return await apiRequest('/collections/public');
  },

  checkRecipeInCollections: async (recipeId) => {
    return await apiRequest(`/collections/check/${recipeId}`);
  },
};

// Achievement API
export const achievementAPI = {
  getAchievements: async () => {
    return await apiRequest('/achievements');
  },

  checkAchievements: async () => {
    return await apiRequest('/achievements/check', {
      method: 'POST',
    });
  },

  awardXP: async (amount, reason) => {
    return await apiRequest('/achievements/xp', {
      method: 'POST',
      body: JSON.stringify({ amount, reason }),
    });
  },

  getXPRewards: async () => {
    return await apiRequest('/achievements/rewards');
  },
};

// Recommendation API  
export const recommendationAPI = {
  getPersonalized: async (limit = 10, category = null) => {
    const params = new URLSearchParams({ limit });
    if (category) params.append('category', category);
    return await apiRequest(`/recommendations?${params}`);
  },

  getTrending: async (limit = 10, timeWindow = 7) => {
    const params = new URLSearchParams({ limit, timeWindow });
    return await apiRequest(`/recommendations/trending?${params}`);
  },

  getMealSuggestions: async (mealType, limit = 5) => {
    const params = new URLSearchParams({ limit });
    return await apiRequest(`/recommendations/meal/${mealType}?${params}`);
  },

  getNowSuggestions: async (limit = 5) => {
    const params = new URLSearchParams({ limit });
    return await apiRequest(`/recommendations/now?${params}`);
  },

  getWeatherBased: async (weather, limit = 10) => {
    return await apiRequest('/recommendations/weather', {
      method: 'POST',
      body: JSON.stringify({ weather, limit }),
    });
  },

  getSimilar: async (recipeId, limit = 5) => {
    const params = new URLSearchParams({ limit });
    return await apiRequest(`/recommendations/similar/${recipeId}?${params}`);
  },
};

// Discovery API
export const discoveryAPI = {
  getSuggestedUsers: async (limit = 10) => {
    const params = new URLSearchParams({ limit });
    return await apiRequest(`/discovery/users/suggested?${params}`);
  },

  getTrendingUsers: async (limit = 10, timeWindow = 7) => {
    const params = new URLSearchParams({ limit, timeWindow });
    return await apiRequest(`/discovery/users/trending?${params}`);
  },

  getUsersByCuisine: async (cuisine, limit = 10) => {
    const params = new URLSearchParams({ limit });
    return await apiRequest(`/discovery/users/cuisine/${cuisine}?${params}`);
  },

  searchUsers: async (query, limit = 20) => {
    const params = new URLSearchParams({ q: query, limit });
    return await apiRequest(`/discovery/users/search?${params}`);
  },
};

export default {
  authAPI,
  recipeAPI,
  userAPI,
  commentAPI,
  uploadAPI,
  notificationAPI,
  mealPlannerAPI,
  messagesAPI,
  subscriptionsAPI,
  recipeAdvancedAPI,
  securityAPI,
  aiAPI,
  storyAPI,
  collectionAPI,
  achievementAPI,
  recommendationAPI,
  discoveryAPI,
};
