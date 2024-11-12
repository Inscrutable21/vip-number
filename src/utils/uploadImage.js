// utils/uploadImage.js
export function validateImage(file) {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, or WebP images only.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 5MB limit.');
  }

  return true;
}

export async function uploadImageToStorage(file) {
  if (!file) throw new Error('No file provided');

  try {
    validateImage(file);

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/hero-images', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}