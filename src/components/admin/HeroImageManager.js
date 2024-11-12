import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Trash2, Upload, X } from 'lucide-react';

const HeroImageManager = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/hero-images');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      if (!file) return;
      
      // Validate file
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        throw new Error('Please upload a valid image file (JPEG, PNG, or WebP)');
      }
      
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Image size should be less than 5MB');
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/hero-images', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      setSuccess('Image uploaded successfully!');
      fetchImages();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/hero-images?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete image');

      setSuccess('Image deleted successfully!');
      fetchImages();
    } catch (err) {
      setError('Failed to delete image');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
    e.target.value = '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hero Image Manager</h2>
        <p className="text-gray-600">
          Upload and manage hero section images. Maximum 3 images allowed.
        </p>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-red-700 hover:text-red-800">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-lg flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')} className="text-green-700 hover:text-green-800">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Upload Section */}
      <div 
        className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center
          ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${images.length >= 3 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDrop={images.length < 3 ? handleDrop : null}
        onDragOver={images.length < 3 ? handleDragOver : null}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          disabled={images.length >= 3}
        />
        <label 
          htmlFor="image-upload"
          className={`flex flex-col items-center ${images.length >= 3 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <Upload size={32} className="text-gray-400 mb-2" />
          <span className="text-gray-600">
            {dragging ? 'Drop image here' : 'Drag and drop or click to upload'}
          </span>
          <span className="text-sm text-gray-500 mt-2">
            {`${images.length}/3 images uploaded`}
          </span>
        </label>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={image.id} className="relative group">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={image.imageUrl}
                alt={`Hero image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => handleDelete(image.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroImageManager;