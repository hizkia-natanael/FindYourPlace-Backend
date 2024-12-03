import mongoose from 'mongoose';
import Place from '../models/placeModel.js';
import dotenv from 'dotenv';

dotenv.config();

const places = [
  {
    name: "Couvee - Taman Siswa",
    description: "Couvee - Taman Siswa merupakan kedai kopi modern di Yogyakarta yang menawarkan suasana nyaman dan estetik. Lokasinya yang strategis di kawasan Taman Siswa membuatnya mudah diakses. Dengan desain interior minimalis dan kombinasi area indoor dan outdoor, Couvee cocok untuk berbagai aktivitas, mulai dari bersantai hingga bekerja. Meskipun tidak memiliki ruang meeting formal, Couvee menyediakan area yang cukup fleksibel untuk pertemuan kecil. Tersedia pula smoking area bagi para perokok. Secara keseluruhan, Couvee menyajikan perpaduan sempurna antara kenyamanan, desain modern, dan minuman lezat dengan harga yang terjangkau. Buddha terbesar di dunia yang dibangun pada abad ke-8. Merupakan situs warisan dunia UNESCO yang menampilkan arsitektur megah dan relief yang menakjubkan.",
    googleMapsLink: "https://g.co/kgs/iDfeSp2",
    images: [
      "./photos/couvee.jpg"
    ]
  },
  {
    name: "Kupiku Coffee Umbulharjo",
    description: "Jalan Kupiku Coffee Umbulharjo adalah destinasi wajib bagi kamu yang ingin menikmati kopi sambil bersantai di suasana yang cozy. Kafe ini menyajikan perpaduan sempurna antara desain interior yang instagramable dengan kenyamanan pengunjung. Dengan fasilitas lengkap seperti Wi-Fi gratis, stop kontak, dan area parkir yang luas, Kupiku sangat mendukung produktivitas maupun sekadar bersantai. Tak hanya itu, menu makanan dan minuman yang bervariasi dengan harga yang ramah di kantong semakin melengkapi pengalamanmu di sini. di pusat Yogyakarta yang terkenal dengan shopping street, kuliner tradisional, dan suasana kulturalnya yang khas.",
    googleMapsLink: "https://g.co/kgs/2d832s2",
    images: [
      "./photos/kupiku.jpg"
    ]
  }
];

const seedPlaces = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Terhubung ke database...');

    // Hapus data yang ada sebelumnya
    await Place.deleteMany({});
    console.log('Data tempat lama dihapus');

    // Masukkan data baru
    await Place.insertMany(places);
    console.log('Data tempat baru berhasil ditambahkan!');

    // Tutup koneksi
    await mongoose.connection.close();
    console.log('Koneksi database ditutup');

  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    process.exit(1);
  }
};

// Jalankan seeder
seedPlaces(); 