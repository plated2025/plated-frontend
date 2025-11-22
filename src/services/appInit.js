/**
 * App Initialization
 * Initialize all mobile features on app start
 */

import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import pushNotificationService from './pushNotifications';

class AppInitService {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize the app
   */
  async initialize() {
    if (this.initialized) return;

    console.log('Initializing Plated mobile app...');

    // Check if running on native platform
    if (!Capacitor.isNativePlatform()) {
      console.log('Running on web platform');
      this.initialized = true;
      return;
    }

    try {
      // Setup status bar
      await this.setupStatusBar();

      // Setup app listeners
      await this.setupAppListeners();

      // Initialize push notifications
      await this.initializePushNotifications();

      // Hide splash screen
      await this.hideSplashScreen();

      this.initialized = true;
      console.log('App initialization complete!');
    } catch (error) {
      console.error('App initialization error:', error);
    }
  }

  /**
   * Setup status bar
   */
  async setupStatusBar() {
    try {
      // Set status bar style
      await StatusBar.setStyle({ style: Style.Dark });

      // Set status bar background color (Android)
      if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setBackgroundColor({ color: '#667eea' });
      }

      console.log('Status bar configured');
    } catch (error) {
      console.error('Status bar setup error:', error);
    }
  }

  /**
   * Setup app state listeners
   */
  async setupAppListeners() {
    try {
      // App state change listener
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active:', isActive);
        
        if (isActive) {
          // App came to foreground
          this.onAppActive();
        } else {
          // App went to background
          this.onAppInactive();
        }
      });

      // App URL open listener (deep linking)
      App.addListener('appUrlOpen', (data) => {
        console.log('App opened with URL:', data.url);
        this.handleDeepLink(data.url);
      });

      // App restored listener
      App.addListener('appRestoredResult', (data) => {
        console.log('App restored:', data);
      });

      // Back button listener (Android)
      if (Capacitor.getPlatform() === 'android') {
        App.addListener('backButton', ({ canGoBack }) => {
          if (!canGoBack) {
            App.exitApp();
          } else {
            window.history.back();
          }
        });
      }

      console.log('App listeners configured');
    } catch (error) {
      console.error('App listeners setup error:', error);
    }
  }

  /**
   * Initialize push notifications
   */
  async initializePushNotifications() {
    try {
      const initialized = await pushNotificationService.initialize();
      
      if (initialized) {
        console.log('Push notifications initialized');
      } else {
        console.log('Push notifications not available or permission denied');
      }
    } catch (error) {
      console.error('Push notifications initialization error:', error);
    }
  }

  /**
   * Hide splash screen
   */
  async hideSplashScreen() {
    try {
      // Wait a bit before hiding splash screen
      setTimeout(async () => {
        await SplashScreen.hide();
        console.log('Splash screen hidden');
      }, 1000);
    } catch (error) {
      console.error('Hide splash screen error:', error);
    }
  }

  /**
   * Called when app becomes active
   */
  onAppActive() {
    // Refresh data, check for updates, etc.
    console.log('App is now active');
    
    // Dispatch custom event
    window.dispatchEvent(new Event('app-active'));
  }

  /**
   * Called when app becomes inactive
   */
  onAppInactive() {
    // Save state, pause timers, etc.
    console.log('App is now inactive');
    
    // Dispatch custom event
    window.dispatchEvent(new Event('app-inactive'));
  }

  /**
   * Handle deep links
   */
  handleDeepLink(url) {
    // Parse URL and navigate
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      
      // Navigate to the appropriate route
      if (path) {
        window.location.href = path;
      }
    } catch (error) {
      console.error('Deep link handling error:', error);
    }
  }

  /**
   * Get app info
   */
  async getAppInfo() {
    if (!Capacitor.isNativePlatform()) {
      return {
        name: 'Plated',
        version: '1.0.0',
        build: '1'
      };
    }

    try {
      const info = await App.getInfo();
      return info;
    } catch (error) {
      console.error('Get app info error:', error);
      return null;
    }
  }

  /**
   * Exit app (Android only)
   */
  async exitApp() {
    if (Capacitor.getPlatform() !== 'android') return;

    try {
      await App.exitApp();
    } catch (error) {
      console.error('Exit app error:', error);
    }
  }
}

// Export singleton instance
export default new AppInitService();
