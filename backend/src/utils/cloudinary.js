import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_CLOUD_API,
  api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return nill;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    console.log('file is uploaded on cloudinary', response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
  }
};
export default uploadOnCloudinary;
