import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Place from "../models/placeModel.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load variabel environment
dotenv.config();

const users = [
  {
    username: "adminUser",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    username: "pak vinsen",
    email: "vinsen@example.com",
    password: "user123",
    role: "user",
  },
];

const places = [
  {
    name: "Couvee - Taman Siswa",
    description:
      "Couvee - Taman Siswa merupakan kedai kopi modern di Yogyakarta yang menawarkan suasana nyaman dan estetik. Lokasinya yang strategis di kawasan Taman Siswa membuatnya mudah diakses. Dengan desain interior minimalis dan kombinasi area indoor dan outdoor, Couvee cocok untuk berbagai aktivitas, mulai dari bersantai hingga bekerja.",
    googleMapsLink: "https://g.co/kgs/iDfeSp2",
    images: ["./photos/couvee.jpg"],
  },
  {
    name: "Kupiku Coffee Umbulharjo",
    description:
      "Jalan Kupiku Coffee Umbulharjo adalah destinasi wajib bagi kamu yang ingin menikmati kopi sambil bersantai di suasana yang cozy. Kafe ini menyajikan perpaduan sempurna antara desain interior yang instagramable dengan kenyamanan pengunjung.",
    googleMapsLink: "https://g.co/kgs/2d832s2",
    images: ["./photos/kupiku.jpg"],
  },
];

const seedDatabase = async () => {
  try {
    // Pastikan variabel environment tersedia
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI tidak ditemukan di environment variables");
    }

    // Koneksi ke database
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Koneksi ke database berhasil");

    // Menghapus semua pengguna dan tempat yang ada
    await User.deleteMany({});
    await Place.deleteMany({});

    console.log("Semua data lama telah dihapus");

    // Meng-hash password dan menyimpan pengguna
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        return {
          ...user,
          password: await bcrypt.hash(user.password, salt),
        };
      })
    );

    // Menyimpan pengguna
    await User.insertMany(hashedUsers);
    console.log("Pengguna berhasil dimasukkan");

    // Menyimpan tempat
    await Place.insertMany(places);
    console.log("Tempat berhasil dimasukkan");

    mongoose.connection.close();
    console.log("Seeder berhasil dijalankan dan koneksi ditutup");
  } catch (error) {
    console.error("Terjadi kesalahan saat menjalankan seeder:", error.message);
    mongoose.connection.close();
  }
};

// Jalankan seeder hanya jika file ini dieksekusi langsung
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.argv[1] === __filename) {
  seedDatabase();
}

export default seedDatabase;
