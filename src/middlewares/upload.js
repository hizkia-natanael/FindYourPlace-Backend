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

// Ekspor middleware upload secara terpisah
export { upload };

// Fungsi createPlace yang juga diekspor
export const createPlace = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    try {
      const { name, description, googleMapsLink, address } = req.body;
      // Upload gambar ke Cloudinary
      const result = await cloudinary.uploader.upload(req.file.buffer, {
        folder: 'places',  // Anda dapat menentukan folder di Cloudinary
        public_id: `${Date.now()}`, // Menentukan nama unik untuk file yang diupload
      });

      // Mendapatkan URL gambar dari Cloudinary
      const imageUrl = result.secure_url;

      // Simpan data tempat ke database
      const place = new Place({
        name,
        description,
        googleMapsLink,
        image: imageUrl,  // Menggunakan URL gambar dari Cloudinary
        address,
      });

      await place.save();
      return res.status(201).json({ message: 'Place created successfully', data: place });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating place', error: error.message });
    }
  });
};
