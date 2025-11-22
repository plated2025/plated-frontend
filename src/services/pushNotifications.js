/**
 * Push Notifications Service
 * Handle push notifications setup and management
 */

import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

class PushNotificationService {
  constructor() {
    this.token = null;
    this.listeners = [];
  }

  /**
   * Initialize push notifications
   */
  async initialize() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications only work on native platforms');
      return false;
    }

    try {
      // Request permission
      const permResult = await PushNotifications.requestPermissions();
      
      if (permResult.receive === 'granted') {
        // Register with push notification service
        await PushNotifications.register();
        this.setupListeners();
        return true;
      } else {
        console.log('Push notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Push notification initialization error:', error);
      return false;
    }
  }

  /**
   * Setup push notification listeners
   */
  setupListeners() {
    // Registration success
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token:', token.value);
      this.token = token.value;
      
      // Send token to your backend
      this.sendTokenToBackend(token.value);
      
      // Notify listeners
      this.notifyListeners('registration', token);
    });

    // Registration error
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error:', error);
      this.notifyListeners('registrationError', error);
    });

    // Notification received while app is in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received:', notification);
      this.notifyListeners('received', notification);
      
      // Show in-app notification
      this.showInAppNotification(notification);
    });

    // Notification tapped/opened
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push notification action performed:', notification);
      this.notifyListeners('actionPerformed', notification);
      
      // Handle notification tap
      this.handleNotificationTap(notification);
    });
  }

  /**
   * Send token to backend
   */
  async sendTokenToBackend(token) {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/notifications/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          token,
          platform: Capacitor.getPlatform()
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to register push token');
      }
      
      console.log('Push token registered with backend');
    } catch (error) {
      console.error('Failed to send token to backend:', error);
    }
  }

  /**
   * Show in-app notification
   */
  showInAppNotification(notification) {
    // You can implement a custom in-app notification UI here
    const { title, body } = notification;
    
    // Example: Show a toast or banner
    console.log('In-app notification:', title, body);
    
    // You could dispatch a custom event to show a notification banner
    window.dispatchEvent(new CustomEvent('show-notification', {
      detail: { title, body, data: notification.data }
    }));
  }

  /**
   * Handle notification tap
   */
  handleNotificationTap(notification) {
    const { data } = notification.notification;
    
    // Navigate based on notification data
    if (data.type === 'recipe') {
      window.location.href = `/recipe/${data.recipeId}`;
    } else if (data.type === 'message') {
      window.location.href = `/chat/${data.chatId}`;
    } else if (data.type === 'follow') {
      window.location.href = `/profile/${data.userId}`;
    }
    // Add more navigation logic as needed
  }

  /**
   * Add listener for push notification events
   */
  addListener(eventType, callback) {
    this.listeners.push({ eventType, callback });
  }

  /**
   * Remove listener
   */
  removeListener(callback) {
    this.listeners = this.listeners.filter(l => l.callback !== callback);
  }

  /**
   * Notify all listeners
   */
  notifyListeners(eventType, data) {
    this.listeners
      .filter(l => l.eventType === eventType)
      .forEach(l => l.callback(data));
  }

  /**
   * Get pending notifications
   */
  async getPendingNotifications() {
    if (!Capacitor.isNativePlatform()) return [];
    
    try {
      const result = await PushNotifications.getDeliveredNotifications();
      return result.notifications;
    } catch (error) {
      console.error('Get pending notifications error:', error);
      return [];
    }
  }

  /**
   * Remove delivered notifications
   */
  async removeDeliveredNotifications(notifications) {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      await PushNotifications.removeDeliveredNotifications({ notifications });
    } catch (error) {
      console.error('Remove delivered notifications error:', error);
    }
  }

  /**
   * Remove all delivered notifications
   */
  async removeAllDeliveredNotifications() {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      await PushNotifications.removeAllDeliveredNotifications();
    } catch (error) {
      console.error('Remove all delivered notifications error:', error);
    }
  }

  /**
   * Create notification channel (Android only)
   */
  async createChannel(channel) {
    if (Capacitor.getPlatform() !== 'android') return;
    
    try {
      await PushNotifications.createChannel(channel);
    } catch (error) {
      console.error('Create channel error:', error);
    }
  }

  /**
   * List notification channels (Android only)
   */
  async listChannels() {
    if (Capacitor.getPlatform() !== 'android') return [];
    
    try {
      const result = await PushNotifications.listChannels();
      return result.channels;
    } catch (error) {
      console.error('List channels error:', error);
      return [];
    }
  }

  /**
   * Delete notification channel (Android only)
   */
  async deleteChannel(channelId) {
    if (Capacitor.getPlatform() !== 'android') return;
    
    try {
      await PushNotifications.deleteChannel({ id: channelId });
    } catch (error) {
      console.error('Delete channel error:', error);
    }
  }

  /**
   * Get current token
   */
  getToken() {
    return this.token;
  }

  /**
   * Check if notifications are enabled
   */
  async checkPermissions() {
    if (!Capacitor.isNativePlatform()) return false;
    
    try {
      const result = await PushNotifications.checkPermissions();
      return result.receive === 'granted';
    } catch (error) {
      console.error('Check permissions error:', error);
      return false;
    }
  }
}

// Export singleton instance
export default new PushNotificationService();
