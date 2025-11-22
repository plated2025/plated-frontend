/**
 * Mobile-Optimized API Service
 * Handles API calls with mobile-specific features
 */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { getNetworkStatus } from '../utils/mobile';

// API Base URL - automatically detects environment
const getApiUrl = () => {
  // In production, use environment variable or hardcoded production URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // For mobile development, replace with your computer's IP
  // Get your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
  if (Capacitor.isNativePlatform()) {
    // IMPORTANT: Replace 192.168.1.100 with YOUR computer's local IP
    return 'http://192.168.1.100:5000/api';
  }
  
  // For web
  return 'http://localhost:5000/api';
};

const API_URL = getApiUrl();

/**
 * Get auth token from storage (mobile-compatible)
 */
const getToken = async () => {
  if (Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key: 'token' });
    return value;
  }
  return localStorage.getItem('token');
};

/**
 * Set auth token in storage (mobile-compatible)
 */
const setToken = async (token) => {
  if (Capacitor.isNativePlatform()) {
    await Preferences.set({ key: 'token', value: token });
  } else {
    localStorage.setItem('token', token);
  }
};

/**
 * Remove auth token from storage (mobile-compatible)
 */
const removeToken = async () => {
  if (Capacitor.isNativePlatform()) {
    await Preferences.remove({ key: 'token' });
  } else {
    localStorage.removeItem('token');
  }
};

/**
 * Check network connectivity before API calls
 */
const checkNetworkStatus = async () => {
  if (Capacitor.isNativePlatform()) {
    const status = await getNetworkStatus();
    if (!status.connected) {
      throw new Error('No internet connection. Please check your network.');
    }
  }
};

/**
 * Mobile-optimized API request helper
 */
const apiRequest = async (endpoint, options = {}) => {
  // Check network connectivity
  await checkNetworkStatus();
  
  const token = await getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    // Add timeout for mobile
    signal: AbortSignal.timeout(30000), // 30 second timeout
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please check your internet connection.');
    }
    throw error;
  }
};

/**
 * Upload file with progress tracking (mobile-optimized)
 */
const uploadFile = async (endpoint, file, onProgress) => {
  await checkNetworkStatus();
  
  const token = await getToken();
  const formData = new FormData();
  
  // Handle both File objects and mobile URIs
  if (typeof file === 'string') {
    // It's a URI from mobile camera
    const response = await fetch(file);
    const blob = await response.blob();
    formData.append('file', blob, 'photo.jpg');
  } else {
    // It's a File object
    formData.append('file', file);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress(percentComplete);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error('Invalid response from server'));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.message || 'Upload failed'));
        } catch {
          reject(new Error('Upload failed'));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Network error during upload'));
    });

    xhr.addEventListener('timeout', () => {
      reject(new Error('Upload timeout'));
    });

    xhr.open('POST', `${API_URL}${endpoint}`);
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.timeout = 60000; // 60 second timeout for uploads
    xhr.send(formData);
  });
};

// Authentication API
export const authAPI = {
  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (data.data.token) {
      await setToken(data.data.token);
    }
    
    return data;
  },

  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.data.token) {
      await setToken(data.data.token);
    }
    
    return data;
  },

  logout: async () => {
    await removeToken();
    return { success: true };
  },

  verifyEmail: async (token) => {
    return apiRequest(`/auth/verify-email/${token}`, {
      method: 'GET',
    });
  },

  requestPasswordReset: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, newPassword) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },

  checkPassword: async (password) => {
    return apiRequest('/auth/check-password', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },
};

// Security API (2FA, blocking, reporting)
export const securityAPI = {
  // 2FA
  setup2FA: async () => {
    return apiRequest('/security/2fa/setup', {
      method: 'POST',
    });
  },

  verify2FA: async (token) => {
    return apiRequest('/security/2fa/verify', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  disable2FA: async (token) => {
    return apiRequest('/security/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },

  // Blocking
  blockUser: async (userId) => {
    return apiRequest('/security/block', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },

  unblockUser: async (userId) => {
    return apiRequest('/security/unblock', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  },

  getBlockedUsers: async () => {
    return apiRequest('/security/blocked', {
      method: 'GET',
    });
  },

  // Reporting
  createReport: async (reportData) => {
    return apiRequest('/security/report', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  // Login History
  getLoginHistory: async () => {
    return apiRequest('/security/login-history', {
      method: 'GET',
    });
  },

  // Sessions
  getSessions: async () => {
    return apiRequest('/security/sessions', {
      method: 'GET',
    });
  },

  revokeSession: async (sessionId) => {
    return apiRequest(`/security/sessions/${sessionId}`, {
      method: 'DELETE',
    });
  },
};

// User API
export const userAPI = {
  getProfile: async (userId) => {
    return apiRequest(`/users/${userId}`, {
      method: 'GET',
    });
  },

  updateProfile: async (userId, profileData) => {
    return apiRequest(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  uploadProfilePhoto: async (file, onProgress) => {
    return uploadFile('/users/upload-photo', file, onProgress);
  },

  uploadCoverPhoto: async (file, onProgress) => {
    return uploadFile('/users/upload-cover', file, onProgress);
  },
};

// Recipe API
export const recipeAPI = {
  getRecipes: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/recipes?${queryString}`, {
      method: 'GET',
    });
  },

  getRecipe: async (recipeId) => {
    return apiRequest(`/recipes/${recipeId}`, {
      method: 'GET',
    });
  },

  createRecipe: async (recipeData) => {
    return apiRequest('/recipes', {
      method: 'POST',
      body: JSON.stringify(recipeData),
    });
  },

  updateRecipe: async (recipeId, recipeData) => {
    return apiRequest(`/recipes/${recipeId}`, {
      method: 'PUT',
      body: JSON.stringify(recipeData),
    });
  },

  deleteRecipe: async (recipeId) => {
    return apiRequest(`/recipes/${recipeId}`, {
      method: 'DELETE',
    });
  },

  uploadRecipeImage: async (file, onProgress) => {
    return uploadFile('/recipes/upload-image', file, onProgress);
  },

  likeRecipe: async (recipeId) => {
    return apiRequest(`/recipes/${recipeId}/like`, {
      method: 'POST',
    });
  },

  saveRecipe: async (recipeId) => {
    return apiRequest(`/recipes/${recipeId}/save`, {
      method: 'POST',
    });
  },
};

// Notification API
export const notificationAPI = {
  getNotifications: async () => {
    return apiRequest('/notifications', {
      method: 'GET',
    });
  },

  markAsRead: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  markAllAsRead: async () => {
    return apiRequest('/notifications/read-all', {
      method: 'PUT',
    });
  },

  deleteNotification: async (notificationId) => {
    return apiRequest(`/notifications/${notificationId}`, {
      method: 'DELETE',
    });
  },

  // Push notification token registration
  registerPushToken: async (token, platform) => {
    return apiRequest('/notifications/register-device', {
      method: 'POST',
      body: JSON.stringify({ token, platform }),
    });
  },

  unregisterPushToken: async (token) => {
    return apiRequest('/notifications/unregister-device', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  },
};

// Message API
export const messageAPI = {
  getConversations: async () => {
    return apiRequest('/messages/conversations', {
      method: 'GET',
    });
  },

  getMessages: async (conversationId) => {
    return apiRequest(`/messages/${conversationId}`, {
      method: 'GET',
    });
  },

  sendMessage: async (conversationId, message) => {
    return apiRequest(`/messages/${conversationId}`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },

  uploadMessageImage: async (file, onProgress) => {
    return uploadFile('/messages/upload-image', file, onProgress);
  },
};

// Export utilities
export {
  API_URL,
  getToken,
  setToken,
  removeToken,
  uploadFile,
  apiRequest,
};

export default {
  authAPI,
  securityAPI,
  userAPI,
  recipeAPI,
  notificationAPI,
  messageAPI,
};
