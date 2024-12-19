import cloudinary from 'cloudinary';
import multer from 'multer';

// Konfigurasi Cloudinary menggunakan variabel dari file .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasi Multer untuk menangani file
const storage = multer.memoryStorage();  // Menggunakan memory storage untuk mengirim file ke Cloudinary
const upload = multer({ storage: storage }).single('image');  // Menangani satu file dengan field 'image'

// Ekspor middleware upload
export { upload };
