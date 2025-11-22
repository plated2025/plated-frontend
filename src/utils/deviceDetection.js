/**
 * Device Detection & Adaptive UI Utilities
 * Detects device type and provides adaptive layouts
 */

import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';

/**
 * Device types
 */
export const DeviceType = {
  PHONE: 'phone',
  TABLET: 'tablet',
  DESKTOP: 'desktop',
  WATCH: 'watch',
};

/**
 * Get device information
 */
export const getDeviceInfo = async () => {
  if (!Capacitor.isNativePlatform()) {
    return {
      type: getWebDeviceType(),
      platform: 'web',
      model: 'Browser',
      operatingSystem: navigator.platform,
      isTablet: isTabletWeb(),
      isPhone: isPhoneWeb(),
      isWatch: false,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  }

  try {
    const info = await Device.getInfo();
    const isTablet = await detectTablet();
    const isWatch = detectWatch(info);

    return {
      type: isWatch ? DeviceType.WATCH : isTablet ? DeviceType.TABLET : DeviceType.PHONE,
      platform: info.platform,
      model: info.model,
      operatingSystem: info.operatingSystem,
      osVersion: info.osVersion,
      manufacturer: info.manufacturer,
      isTablet,
      isPhone: !isTablet && !isWatch,
      isWatch,
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
    };
  } catch (error) {
    console.error('Error getting device info:', error);
    return null;
  }
};

/**
 * Detect if device is a tablet
 */
const detectTablet = async () => {
  if (!Capacitor.isNativePlatform()) {
    return isTabletWeb();
  }

  const info = await Device.getInfo();
  
  // iPad detection
  if (info.platform === 'ios') {
    // iPad models
    if (info.model.includes('iPad')) return true;
    
    // Check screen size (iPads are typically > 1024px)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const diagonal = Math.sqrt(width * width + height * height);
    
    return diagonal > 1200; // iPad Pro and larger
  }
  
  // Android tablet detection
  if (info.platform === 'android') {
    // Check if userAgent contains tablet keywords
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('tablet') || ua.includes('ipad')) return true;
    
    // Screen size check (tablets typically > 600dp)
    const width = window.innerWidth;
    const height = window.innerHeight;
    const minDimension = Math.min(width, height);
    
    return minDimension >= 600;
  }
  
  return false;
};

/**
 * Detect if device is a watch
 */
const detectWatch = (info) => {
  if (!info) return false;
  
  // Apple Watch detection
  if (info.model && info.model.toLowerCase().includes('watch')) return true;
  
  // Wear OS detection
  if (info.operatingSystem && info.operatingSystem.toLowerCase().includes('wear')) return true;
  
  // Small screen detection (watches typically < 400px)
  const maxDimension = Math.max(window.innerWidth, window.innerHeight);
  if (maxDimension < 400) return true;
  
  return false;
};

/**
 * Web device type detection
 */
const getWebDeviceType = () => {
  if (isTabletWeb()) return DeviceType.TABLET;
  if (isMobileWeb()) return DeviceType.PHONE;
  return DeviceType.DESKTOP;
};

/**
 * Check if web device is tablet
 */
const isTabletWeb = () => {
  const ua = navigator.userAgent.toLowerCase();
  
  // iPad detection
  if (ua.includes('ipad')) return true;
  
  // Android tablet detection
  if (ua.includes('android') && !ua.includes('mobile')) return true;
  
  // Screen size check
  const width = window.innerWidth;
  const height = window.innerHeight;
  const minDimension = Math.min(width, height);
  
  return minDimension >= 768 && minDimension < 1024;
};

/**
 * Check if web device is mobile phone
 */
const isPhoneWeb = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /iphone|ipod|android.*mobile|windows phone/.test(ua);
};

/**
 * Check if web device is mobile (phone or tablet)
 */
const isMobileWeb = () => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent);
};

/**
 * Get screen size category
 */
export const getScreenSize = () => {
  const width = window.innerWidth;
  
  if (width < 400) return 'watch'; // Smartwatch
  if (width < 768) return 'mobile'; // Phone
  if (width < 1024) return 'tablet'; // Tablet
  if (width < 1440) return 'laptop'; // Laptop
  return 'desktop'; // Desktop
};

/**
 * Check if iPad
 */
export const isIPad = async () => {
  if (!Capacitor.isNativePlatform()) {
    return navigator.userAgent.includes('iPad');
  }
  
  const info = await Device.getInfo();
  return info.model && info.model.includes('iPad');
};

/**
 * Check if Apple Watch
 */
export const isAppleWatch = async () => {
  if (!Capacitor.isNativePlatform()) return false;
  
  const info = await Device.getInfo();
  return info.model && info.model.toLowerCase().includes('watch');
};

/**
 * Check if Android Wear / Wear OS
 */
export const isWearOS = async () => {
  if (!Capacitor.isNativePlatform()) return false;
  
  const info = await Device.getInfo();
  return info.operatingSystem && info.operatingSystem.toLowerCase().includes('wear');
};

/**
 * Check if any tablet
 */
export const isTablet = async () => {
  return await detectTablet();
};

/**
 * Check if any watch
 */
export const isWatch = async () => {
  const info = await getDeviceInfo();
  return info && info.isWatch;
};

/**
 * Get orientation
 */
export const getOrientation = () => {
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
};

/**
 * Is landscape mode
 */
export const isLandscape = () => {
  return getOrientation() === 'landscape';
};

/**
 * Is portrait mode
 */
export const isPortrait = () => {
  return getOrientation() === 'portrait';
};

/**
 * Get device pixel ratio
 */
export const getPixelRatio = () => {
  return window.devicePixelRatio || 1;
};

/**
 * Get safe layout class for device
 */
export const getLayoutClass = async () => {
  const info = await getDeviceInfo();
  
  if (!info) return 'layout-phone';
  
  if (info.isWatch) return 'layout-watch';
  if (info.isTablet) return 'layout-tablet';
  if (info.isPhone) return 'layout-phone';
  
  return 'layout-desktop';
};

/**
 * Get columns for grid layout based on device
 */
export const getGridColumns = async () => {
  const info = await getDeviceInfo();
  
  if (!info) return 2;
  
  if (info.isWatch) return 1;
  if (info.isPhone) return 2;
  if (info.isTablet) {
    return isLandscape() ? 4 : 3;
  }
  
  return 4;
};

/**
 * Should show sidebar
 */
export const shouldShowSidebar = async () => {
  const info = await getDeviceInfo();
  return info && (info.isTablet || info.type === DeviceType.DESKTOP);
};

/**
 * Should use split view
 */
export const shouldUseSplitView = async () => {
  const info = await getDeviceInfo();
  return info && info.isTablet && isLandscape();
};

/**
 * Watch face size (for Apple Watch / Wear OS)
 */
export const getWatchSize = async () => {
  const info = await getDeviceInfo();
  
  if (!info || !info.isWatch) return null;
  
  const width = info.screenWidth;
  
  // Apple Watch sizes
  if (info.platform === 'ios') {
    if (width <= 136) return '38mm'; // Series 0-3
    if (width <= 162) return '42mm'; // Series 0-3
    if (width <= 184) return '40mm'; // Series 4+
    if (width <= 224) return '44mm'; // Series 4-6
    return '49mm'; // Ultra
  }
  
  // Wear OS sizes
  if (info.platform === 'android') {
    if (width < 280) return 'small';
    if (width < 320) return 'medium';
    return 'large';
  }
  
  return 'unknown';
};

/**
 * Initialize device detection
 */
let cachedDeviceInfo = null;

export const initDeviceDetection = async () => {
  cachedDeviceInfo = await getDeviceInfo();
  
  // Add device classes to body
  if (cachedDeviceInfo) {
    document.body.classList.add(`device-${cachedDeviceInfo.type}`);
    document.body.classList.add(`platform-${cachedDeviceInfo.platform}`);
    
    if (cachedDeviceInfo.isTablet) {
      document.body.classList.add('is-tablet');
    }
    if (cachedDeviceInfo.isWatch) {
      document.body.classList.add('is-watch');
    }
  }
  
  // Listen for orientation changes
  window.addEventListener('resize', handleOrientationChange);
  
  return cachedDeviceInfo;
};

/**
 * Handle orientation change
 */
const handleOrientationChange = () => {
  const orientation = getOrientation();
  document.body.classList.remove('orientation-portrait', 'orientation-landscape');
  document.body.classList.add(`orientation-${orientation}`);
  
  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('device-orientation-change', {
    detail: { orientation }
  }));
};

/**
 * Get cached device info
 */
export const getCachedDeviceInfo = () => {
  return cachedDeviceInfo;
};

export default {
  DeviceType,
  getDeviceInfo,
  isIPad,
  isAppleWatch,
  isWearOS,
  isTablet,
  isWatch,
  getScreenSize,
  getOrientation,
  isLandscape,
  isPortrait,
  getPixelRatio,
  getLayoutClass,
  getGridColumns,
  shouldShowSidebar,
  shouldUseSplitView,
  getWatchSize,
  initDeviceDetection,
  getCachedDeviceInfo,
};
