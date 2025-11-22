/**
 * Mobile Image Picker Component
 * Handles image selection with native camera/gallery support
 */

import { useState } from 'react';
import { Camera, Image, X, Upload } from 'lucide-react';
import { isNativePlatform } from '../utils/mobile';
import { takePhoto, pickPhoto, requestCameraPermissions } from '../utils/camera';

function MobileImagePicker({ onImageSelected, multiple = false, currentImage = null }) {
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState(currentImage);

  /**
   * Handle camera photo
   */
  const handleTakePhoto = async () => {
    setLoading(true);
    setShowOptions(false);

    try {
      // Request permissions first
      const hasPermission = await requestCameraPermissions();
      if (!hasPermission) {
        alert('Camera permission is required to take photos');
        return;
      }

      // Take photo
      const photo = await takePhoto(90);
      
      // Set preview
      setImagePreview(photo.uri);
      
      // Return photo to parent
      if (onImageSelected) {
        onImageSelected(photo);
      }
    } catch (error) {
      if (error.message !== 'User cancelled photos app') {
        alert('Error taking photo: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle gallery selection
   */
  const handlePickPhoto = async () => {
    setLoading(true);
    setShowOptions(false);

    try {
      const photo = await pickPhoto(90);
      
      // Set preview
      setImagePreview(photo.uri);
      
      // Return photo to parent
      if (onImageSelected) {
        onImageSelected(photo);
      }
    } catch (error) {
      if (error.message !== 'User cancelled photos app') {
        alert('Error picking photo: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle web file input
   */
  const handleWebFileInput = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);

    // Return file to parent
    if (onImageSelected) {
      onImageSelected({ file, uri: URL.createObjectURL(file) });
    }
  };

  /**
   * Remove image
   */
  const handleRemoveImage = () => {
    setImagePreview(null);
    if (onImageSelected) {
      onImageSelected(null);
    }
  };

  /**
   * Show picker options
   */
  const handleShowOptions = () => {
    if (isNativePlatform()) {
      setShowOptions(true);
    } else {
      // On web, just trigger file input
      document.getElementById('web-file-input').click();
    }
  };

  return (
    <div className="relative">
      {/* Image Preview */}
      {imagePreview ? (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-full object-cover"
          />
          
          {/* Remove Button */}
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors"
            type="button"
          >
            <X size={18} />
          </button>

          {/* Upload Progress */}
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
              <div 
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      ) : (
        /* Upload Button */
        <button
          onClick={handleShowOptions}
          disabled={loading}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 bg-gray-50 dark:bg-gray-800/50 flex flex-col items-center justify-center gap-3 transition-all hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50"
          type="button"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
            </>
          ) : (
            <>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                <Upload size={24} className="text-purple-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {isNativePlatform() ? 'Take photo or choose from gallery' : 'Click to upload image'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  JPG, PNG up to 10MB
                </p>
              </div>
            </>
          )}
        </button>
      )}

      {/* Native Options Modal */}
      {showOptions && isNativePlatform() && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
            <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-6"></div>
            
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Choose Photo Source
            </h3>

            <div className="space-y-3">
              {/* Camera Option */}
              <button
                onClick={handleTakePhoto}
                className="w-full flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors"
                type="button"
              >
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Camera size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Take Photo</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use camera</p>
                </div>
              </button>

              {/* Gallery Option */}
              <button
                onClick={handlePickPhoto}
                className="w-full flex items-center gap-4 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-xl transition-colors"
                type="button"
              >
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Image size={24} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">Choose from Gallery</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pick existing photo</p>
                </div>
              </button>

              {/* Cancel Option */}
              <button
                onClick={() => setShowOptions(false)}
                className="w-full p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium text-gray-900 dark:text-white transition-colors"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Web File Input (Hidden) */}
      {!isNativePlatform() && (
        <input
          id="web-file-input"
          type="file"
          accept="image/*"
          onChange={handleWebFileInput}
          className="hidden"
          multiple={multiple}
        />
      )}
    </div>
  );
}

export default MobileImagePicker;
