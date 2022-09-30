import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.v2.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (err, result) => {
      if (err) {
        reject(Error('Cloudinary Error'));
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

export default uploadToCloudinary;