/**
 * Mobile Utility Functions
 * Helper functions for mobile-specific features
 */

import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Toast } from '@capacitor/toast';

/**
 * Check if running on native mobile platform
 */
export const isNativePlatform = () => {
  return Capacitor.isNativePlatform();
};

/**
 * Get current platform (ios, android, web)
 */
export const getPlatform = () => {
  return Capacitor.getPlatform();
};

/**
 * Check if iOS
 */
export const isIOS = () => {
  return Capacitor.getPlatform() === 'ios';
};

/**
 * Check if Android
 */
export const isAndroid = () => {
  return Capacitor.getPlatform() === 'android';
};

/**
 * Trigger haptic feedback
 */
export const triggerHaptic = async (style = ImpactStyle.Medium) => {
  if (!isNativePlatform()) return;
  
  try {
    await Haptics.impact({ style });
  } catch (error) {
    console.error('Haptic feedback error:', error);
  }
};

/**
 * Haptic feedback on success
 */
export const hapticSuccess = async () => {
  if (!isNativePlatform()) return;
  
  try {
    await Haptics.notification({ type: 'SUCCESS' });
  } catch (error) {
    console.error('Haptic feedback error:', error);
  }
};

/**
 * Haptic feedback on error
 */
export const hapticError = async () => {
  if (!isNativePlatform()) return;
  
  try {
    await Haptics.notification({ type: 'ERROR' });
  } catch (error) {
    console.error('Haptic feedback error:', error);
  }
};

/**
 * Haptic feedback on warning
 */
export const hapticWarning = async () => {
  if (!isNativePlatform()) return;
  
  try {
    await Haptics.notification({ type: 'WARNING' });
  } catch (error) {
    console.error('Haptic feedback error:', error);
  }
};

/**
 * Set status bar style
 */
export const setStatusBarStyle = async (dark = true) => {
  if (!isNativePlatform()) return;
  
  try {
    await StatusBar.setStyle({
      style: dark ? Style.Dark : Style.Light
    });
  } catch (error) {
    console.error('Status bar style error:', error);
  }
};

/**
 * Set status bar background color
 */
export const setStatusBarColor = async (color) => {
  if (!isAndroid()) return;
  
  try {
    await StatusBar.setBackgroundColor({ color });
  } catch (error) {
    console.error('Status bar color error:', error);
  }
};

/**
 * Hide status bar
 */
export const hideStatusBar = async () => {
  if (!isNativePlatform()) return;
  
  try {
    await StatusBar.hide();
  } catch (error) {
    console.error('Hide status bar error:', error);
  }
};

/**
 * Show status bar
 */
export const showStatusBar = async () => {
  if (!isNativePlatform()) return;
  
  try {
    await StatusBar.show();
  } catch (error) {
    console.error('Show status bar error:', error);
  }
};

/**
 * Show native toast message
 */
export const showToast = async (text, duration = 'short') => {
  if (!isNativePlatform()) {
    // Fallback for web
    alert(text);
    return;
  }
  
  try {
    await Toast.show({
      text,
      duration: duration === 'short' ? 'short' : 'long',
      position: 'bottom'
    });
  } catch (error) {
    console.error('Toast error:', error);
  }
};

/**
 * Get safe area insets
 */
export const getSafeAreaInsets = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    top: parseInt(style.getPropertyValue('--safe-area-top')) || 0,
    bottom: parseInt(style.getPropertyValue('--safe-area-bottom')) || 0,
    left: parseInt(style.getPropertyValue('--safe-area-left')) || 0,
    right: parseInt(style.getPropertyValue('--safe-area-right')) || 0
  };
};

/**
 * Prevent device sleep/screen timeout
 */
export const keepAwake = async () => {
  // Would need @capacitor-community/keep-awake plugin
  console.log('Keep awake - install @capacitor-community/keep-awake for this feature');
};

/**
 * Allow device sleep
 */
export const allowSleep = async () => {
  // Would need @capacitor-community/keep-awake plugin
  console.log('Allow sleep - install @capacitor-community/keep-awake for this feature');
};

/**
 * Check if device has notch
 */
export const hasNotch = () => {
  const insets = getSafeAreaInsets();
  return insets.top > 20 || insets.bottom > 0;
};

/**
 * Vibrate device
 */
export const vibrate = async (duration = 100) => {
  if (!isNativePlatform()) {
    // Fallback for web
    if ('vibrate' in navigator) {
      navigator.vibrate(duration);
    }
    return;
  }
  
  try {
    await Haptics.vibrate({ duration });
  } catch (error) {
    console.error('Vibrate error:', error);
  }
};

/**
 * Get device info
 */
export const getDeviceInfo = async () => {
  if (!isNativePlatform()) {
    return {
      platform: 'web',
      userAgent: navigator.userAgent
    };
  }
  
  const { Device } = await import('@capacitor/device');
  
  try {
    const info = await Device.getInfo();
    return info;
  } catch (error) {
    console.error('Device info error:', error);
    return null;
  }
};

/**
 * Share content
 */
export const share = async (title, text, url) => {
  const { Share } = await import('@capacitor/share');
  
  try {
    await Share.share({
      title,
      text,
      url,
      dialogTitle: 'Share via'
    });
  } catch (error) {
    console.error('Share error:', error);
  }
};

/**
 * Check network status
 */
export const getNetworkStatus = async () => {
  if (!isNativePlatform()) {
    return {
      connected: navigator.onLine,
      connectionType: 'unknown'
    };
  }
  
  const { Network } = await import('@capacitor/network');
  
  try {
    const status = await Network.getStatus();
    return status;
  } catch (error) {
    console.error('Network status error:', error);
    return null;
  }
};

/**
 * Open app settings
 */
export const openSettings = async () => {
  if (!isNativePlatform()) return;
  
  const { App } = await import('@capacitor/app');
  
  try {
    await App.openUrl({ url: 'app-settings:' });
  } catch (error) {
    console.error('Open settings error:', error);
  }
};

export default {
  isNativePlatform,
  getPlatform,
  isIOS,
  isAndroid,
  triggerHaptic,
  hapticSuccess,
  hapticError,
  hapticWarning,
  setStatusBarStyle,
  setStatusBarColor,
  hideStatusBar,
  showStatusBar,
  showToast,
  getSafeAreaInsets,
  hasNotch,
  vibrate,
  getDeviceInfo,
  share,
  getNetworkStatus,
  openSettings
};
