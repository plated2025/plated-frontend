import { useState, useRef } from 'react';
import { Camera, X, Upload, Loader } from 'lucide-react';

function ImageUpload({ 
  onImageUploaded, 
  currentImage, 
  type = 'recipe', // 'recipe', 'avatar', 'cover'
  multiple = false,
  className = ''
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const files = multiple ? Array.from(e.target.files) : [e.target.files[0]];
    
    if (!files || files.length === 0) return;

    // Validate file size (5MB for recipe, 2MB for avatar)
    const maxSize = type === 'avatar' ? 2 * 1024 * 1024 : 5 * 1024 * 1024;
    const invalidFiles = files.filter(file => file.size > maxSize);
    
    if (invalidFiles.length > 0) {
      setError(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const invalidTypes = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidTypes.length > 0) {
      setError('Please upload only JPG, PNG, GIF, or WebP images');
      return;
    }

    setError('');
    setUploading(true);

    try {
      // Create FormData
      const formData = new FormData();
      
      if (multiple) {
        files.forEach(file => {
          formData.append('images', file);
        });
      } else {
        formData.append(type === 'avatar' ? 'avatar' : type === 'cover' ? 'cover' : 'image', files[0]);
        
        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }

      // Upload to API
      const token = localStorage.getItem('token');
      const endpoint = multiple ? '/upload/recipe/multiple' : `/upload/${type}`;
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      
      if (multiple) {
        onImageUploaded(data.data); // Array of images
      } else {
        onImageUploaded(data.data.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload image. Please try again.');
      setPreview(currentImage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUploaded(null);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className={`w-full object-cover rounded-lg ${
              type === 'avatar' ? 'h-32 w-32 rounded-full' : 
              type === 'cover' ? 'h-48' : 
              'h-64'
            }`}
          />
          
          {!uploading && (
            <button
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}

          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
              <Loader size={32} className="text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className={`w-full border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 transition-colors ${
            type === 'avatar' ? 'h-32 w-32 rounded-full' : 
            type === 'cover' ? 'h-48' : 
            'h-64'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {uploading ? (
              <Loader size={32} className="text-primary-600 animate-spin" />
            ) : (
              <>
                {type === 'avatar' || type === 'cover' ? (
                  <Camera size={32} className="text-gray-400" />
                ) : (
                  <Upload size={32} className="text-gray-400" />
                )}
                <span className="text-sm text-gray-500">
                  {type === 'avatar' ? 'Upload avatar' : 
                   type === 'cover' ? 'Upload cover' : 
                   multiple ? 'Upload images' : 'Upload image'}
                </span>
              </>
            )}
          </div>
        </button>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

export default ImageUpload;
