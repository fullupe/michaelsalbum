// Cloudinary configuration and utility functions
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'nkansah'); // Make sure this matches your Cloudinary upload preset
  formData.append('dtho1iv7d', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }
    
    const data = await response.json();
    
    if (!data.secure_url) {
      throw new Error('No URL received from Cloudinary');
    }
    
    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
};