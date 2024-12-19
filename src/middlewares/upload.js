import cloudinary from 'cloudinary';
import multer from 'multer';

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasi Multer untuk menangani file
const storage = multer.memoryStorage(); // Menggunakan memory storage untuk mengirim file ke Cloudinary
const upload = multer({ storage: storage }); // Menangani file dengan Multer

// Ekspor middleware upload
export const uploadMiddleware = upload.single('image'); // Ekspor middleware sebagai uploadMiddleware
