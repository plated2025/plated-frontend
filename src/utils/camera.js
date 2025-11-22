/**
 * Camera Utility
 * Helper functions for camera and photo operations
 */

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isNativePlatform } from './mobile';

/**
 * Take photo with camera
 */
export const takePhoto = async (quality = 90) => {
  try {
    const image = await Camera.getPhoto({
      quality,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    return {
      uri: image.webPath,
      format: image.format
    };
  } catch (error) {
    console.error('Take photo error:', error);
    throw error;
  }
};

/**
 * Pick photo from gallery
 */
export const pickPhoto = async (quality = 90) => {
  try {
    const image = await Camera.getPhoto({
      quality,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    return {
      uri: image.webPath,
      format: image.format
    };
  } catch (error) {
    console.error('Pick photo error:', error);
    throw error;
  }
};

/**
 * Choose photo source (camera or gallery)
 */
export const choosePhotoSource = async (quality = 90) => {
  try {
    const image = await Camera.getPhoto({
      quality,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });

    return {
      uri: image.webPath,
      format: image.format
    };
  } catch (error) {
    console.error('Choose photo error:', error);
    throw error;
  }
};

/**
 * Take photo and get base64
 */
export const takePhotoBase64 = async (quality = 90) => {
  try {
    const image = await Camera.getPhoto({
      quality,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    return {
      base64: image.base64String,
      format: image.format
    };
  } catch (error) {
    console.error('Take photo base64 error:', error);
    throw error;
  }
};

/**
 * Pick photo and get base64
 */
export const pickPhotoBase64 = async (quality = 90) => {
  try {
    const image = await Camera.getPhoto({
      quality,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    return {
      base64: image.base64String,
      format: image.format
    };
  } catch (error) {
    console.error('Pick photo base64 error:', error);
    throw error;
  }
};

/**
 * Request camera permissions
 */
export const requestCameraPermissions = async () => {
  if (!isNativePlatform()) return true;
  
  try {
    const permissions = await Camera.requestPermissions({
      permissions: ['camera', 'photos']
    });
    
    return permissions.camera === 'granted' && permissions.photos === 'granted';
  } catch (error) {
    console.error('Request permissions error:', error);
    return false;
  }
};

/**
 * Check camera permissions
 */
export const checkCameraPermissions = async () => {
  if (!isNativePlatform()) return true;
  
  try {
    const permissions = await Camera.checkPermissions();
    return permissions.camera === 'granted' && permissions.photos === 'granted';
  } catch (error) {
    console.error('Check permissions error:', error);
    return false;
  }
};

/**
 * Convert URI to Blob
 */
export const uriToBlob = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

/**
 * Convert URI to File
 */
export const uriToFile = async (uri, filename = 'photo.jpg') => {
  const blob = await uriToBlob(uri);
  return new File([blob], filename, { type: blob.type });
};

/**
 * Compress image (web only fallback)
 */
export const compressImage = (file, maxWidth = 1920, maxHeight = 1920, quality = 0.9) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            }));
          },
          'image/jpeg',
          quality
        );
      };
      img.onerror = reject;
      img.src = event.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default {
  takePhoto,
  pickPhoto,
  choosePhotoSource,
  takePhotoBase64,
  pickPhotoBase64,
  requestCameraPermissions,
  checkCameraPermissions,
  uriToBlob,
  uriToFile,
  compressImage
};
