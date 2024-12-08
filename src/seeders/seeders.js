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
  {
    username: "andika_123",
    email: "andika@example.com",
    password: "andika123",
    role: "user",
  },
  {
    username: "yuni_akbar",
    email: "yuni@example.com",
    password: "yuniakbar123",
    role: "user",
  },
  {
    username: "reza_gilang",
    email: "reza@example.com",
    password: "rezagilang123",
    role: "user",
  },
  {
    username: "sari_cahya",
    email: "sari@example.com",
    password: "saricahya123",
    role: "user",
  },
  {
    username: "hendra_putra",
    email: "hendra@example.com",
    password: "hendra123",
    role: "user",
  },
  {
    username: "melisa_sulistyo",
    email: "melisa@example.com",
    password: "melisa123",
    role: "user",
  },
  {
    username: "gilang_nugroho",
    email: "gilang@example.com",
    password: "gilang123",
    role: "user",
  },
  {
    username: "faisal_rahman",
    email: "faisal@example.com",
    password: "faisal123",
    role: "user",
  },
  {
    username: "diana_novianti",
    email: "diana@example.com",
    password: "diana123",
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
  {
    name: "Dapur Solo",
    description:
      "Dapur Solo menyajikan masakan khas Jawa dengan cita rasa yang autentik. Terletak di tengah kota Yogyakarta, tempat ini menjadi pilihan favorit bagi para pencinta kuliner yang ingin menikmati hidangan lezat dalam suasana yang nyaman.",
    googleMapsLink: "https://g.co/kgs/mLZJ7A",
    images: ["./photos/dapur_solo.jpg"],
  },
  {
    name: "The Woke Up Cafe",
    description:
      "The Woke Up Cafe memiliki desain interior yang sangat instagramable dengan banyak spot foto menarik. Selain itu, kafe ini juga menyediakan menu-menu sehat dan kopi premium yang cocok untuk bersantai atau bekerja.",
    googleMapsLink: "https://g.co/kgs/Fn53p4",
    images: ["./photos/woke_up_cafe.jpg"],
  },
  {
    name: "Angkringan Kopi Jos Mbah Lindu",
    description:
      "Angkringan Kopi Jos Mbah Lindu terkenal dengan sajian kopi jos-nya yang unik, dengan menggunakan arang panas dalam proses penyajiannya. Tempat ini cocok untuk kamu yang ingin menikmati suasana tradisional sambil menikmati makanan khas Yogyakarta seperti nasi kucing.",
    googleMapsLink: "https://g.co/kgs/f55Lt4",
    images: ["./photos/angkringan_mbah_lindu.jpg"],
  },
  {
    name: "Sate Klathak Pak Pong",
    description:
      "Sate Klathak Pak Pong adalah tempat yang wajib dikunjungi bagi penggemar kuliner sate. Sate kambing yang dibakar dengan cara unik dan rasa bumbu khas membuat tempat ini selalu ramai pengunjung.",
    googleMapsLink: "https://g.co/kgs/QgTKdz",
    images: ["./photos/sate_klathak.jpg"],
  },
  {
    name: "Merapi Coffee",
    description:
      "Merapi Coffee menawarkan pengalaman ngopi yang menyenangkan dengan pemandangan Gunung Merapi. Kafe ini cocok untuk bersantai sambil menikmati kopi lokal dan pemandangan alam yang menyejukkan.",
    googleMapsLink: "https://g.co/kgs/kyk9Tp",
    images: ["./photos/merapi_coffee.jpg"],
  },
  {
    name: "Les Belles Yogyakarta",
    description:
      "Les Belles Yogyakarta adalah kafe dengan konsep French-style yang menawarkan suasana elegan dan santai. Tempat ini sangat cocok untuk bersantai sambil menikmati berbagai jenis pastry dan kopi berkualitas.",
    googleMapsLink: "https://g.co/kgs/QJhTg5",
    images: ["./photos/les_belles.jpg"],
  },
  {
    name: "Taman Sari Water Castle",
    description:
      "Taman Sari Water Castle merupakan destinasi wisata bersejarah yang juga populer sebagai tempat nongkrong. Dengan arsitektur yang menawan dan suasana yang tenang, tempat ini sering digunakan untuk bersantai sambil menikmati pemandangan.",
    googleMapsLink: "https://g.co/kgs/g9rHfZ",
    images: ["./photos/taman_sari.jpg"],
  },
  {
    name: "House of Raminten",
    description:
      "House of Raminten adalah restoran dan kafe yang menawarkan masakan tradisional Jawa dengan sentuhan modern. Tempat ini terkenal dengan konsep unik dan pelayanan yang ramah, serta menu khas yang menggugah selera.",
    googleMapsLink: "https://g.co/kgs/vfhHMm",
    images: ["./photos/house_of_raminten.jpg"],
  },
  {
    name: "Cafe Brick",
    description:
      "Cafe Brick adalah kafe dengan konsep industrial yang nyaman dan instagramable. Menyajikan berbagai pilihan kopi dan makanan ringan, tempat ini cocok untuk nongkrong santai atau bekerja.",
    googleMapsLink: "https://g.co/kgs/43mhLt",
    images: ["./photos/cafe_brick.jpg"],
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
