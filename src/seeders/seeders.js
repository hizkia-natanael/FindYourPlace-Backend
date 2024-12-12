import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Place from "../models/placeModel.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import fs from "fs";

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
    image: ["couvee.jpg"],
    address: "Jl. Taman Siswa No.117, Wirogunan, Kec. Mergangsan, Kota Yogyakarta, Daerah Istimewa Yogyakarta"
  },
  {
    name: "Kupiku Coffee Umbulharjo",
    description:
      "Jalan Kupiku Coffee Umbulharjo adalah destinasi wajib bagi kamu yang ingin menikmati kopi sambil bersantai di suasana yang cozy. Kafe ini menyajikan perpaduan sempurna antara desain interior yang instagramable dengan kenyamanan pengunjung.",
    googleMapsLink: "https://g.co/kgs/2d832s2",
    image: ["kupiku.jpg"],
    address: "Jl. Sokonandi II No.9, Semaki, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta"
  },
  {
    name: "Coklat Café",
    description:
      "Coklat Cafe dikenal dengan suasana yang nyaman dan menyajikan berbagai macam olahan coklat yang menggugah selera. Coklat Cafe telah berhasil mempertahankan cita rasa dan kualitasnya, membuat tetap eksis dan dicintai hingga kini. Coklat Cafe menawarkan berbagai macam pilihan menu berbahan dasar coklat yang bisa memanjakan lidah. Secara interior, Coklat Cafe mengusung tema vintage yang kental. Dekorasinya dibuat serba warna cokelat dengan penerangan yang remang-remang sehingga terasa syahdu dan cozy cocok untuk bersantai, belajar maupun bekerja. Café ini sudah berdiri sejak 2003 di mana artinya sudah 20 tahun lebih café ini berdiri. Café ini masih eksis hingga sekarang apalagi lokasinya yang terletak di Tengah kota menjadikan Coklat Café ramai didatangi dari segala penjuru. Dengan range harga mulai 20 ribuan saja, kamu bisa menikmati menu- menu yang enak di Coklat Café.",
    googleMapsLink: "https://maps.app.goo.gl/Lrcw18GZ9ZzGZ4RAA",
    image: ["cokelatCafe.jpg"],
    address: "Jalan Cik Di Tiro Nomor 19, Terban, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta."
  },
  {
    name: "Carroll Coffe",
    description: 
    "Carroll Coffe, ruang hangout yang memikat dengan sentuhan urban tropis, menciptakan atmosfer menyegarkan di tengah hamparan sawah yang menawan. Kursi berbalut bantalan kuning di dalam ruangan memberikan kenyamanan luar biasa, menjadikannya tempat yang pas untuk berkumpul santai dengan teman-teman. Sementara di teras, deretan kursi kayu mengelilingi tanaman hijau yang melambangkan kesegaran alam. Dekorasi penuh lampu hias dan balon mempercantik ruang, sembari pengunjung menikmati suasana hijau dari balik kafe. Tempat ini menjadi pilihan sempurna untuk menikmati waktu berkualitas dengan suasana yang unik dan penuh keceriaan, di mana keindahan urban tropis dan kesejukan sawah berpadu harmonis. Kafe bertema tropical ala Bali ini menghadirkan ragam hidangan, melibatkan cita rasa tradisional, Asia, hingga western. Kafe ini bukan hanya sekadar tempat bersantai, melainkan juga destinasi kuliner yang menyuguhkan beragam hidangan lokal, Asia, dan western dengan harga terjangkau, mulai dari Rp15.000-an.", 
    googleMapsLink: "https://maps.app.goo.gl/AjbiEFMfqJcTC3UNA",
    image: ["carrolCoffe.jpeg"],
    address: "Jalan Kledokan III A, Blok C, Kledokan, Caturtunggal, Kabupaten Sleman, Yogyakarta"
  },
  {
    name: "Filosofi Kopi",
    description: 
    "Filosofi Kopi Jogja adalah kedai kopi yang menawarkan lebih dari sekadar secangkir kopi. Terinspirasi dari film dengan judul yang sama, tempat ini menyajikan pengalaman ngopi yang unik dan menenangkan dengan suasana khas Jogja. Desain interior yang natural dan pilihan biji kopi berkualitas tinggi menciptakan atmosfer yang sempurna untuk bersantai dan menikmati waktu bersama teman atau keluarga. Selain itu, lokasi yang strategis dan menu yang beragam membuat Filosofi Kopi Jogja menjadi salah satu tempat favorit bagi para pecinta kopi di Yogyakarta.",
    googleMapsLink: "https://g.co/kgs/xNq2xG3",
    image: ["filosofiKopi.jpg"],
    address: "Jl. Pandhawa No.001/17, Tegal Rejo, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta"
  },
  {
    name: "Legend Coffee",
    description: 
    "Legend Coffee menawarkan pengalaman bersantap yang lengkap. Dengan desain interior yang nyaman dan tenang, tempat ini menjadi pilihan tepat untuk bersantai sambil menikmati beragam pilihan kopi berkualitas tinggi, mulai dari espresso klasik hingga kreasi unik yang menggugah selera. Selain kopi, Legend Coffee juga menyajikan hidangan lezat seperti steak, pasta, dan berbagai camilan khas Indonesia. Atmosfer malamnya yang hangat, ditambah dengan live music akustik di akhir pekan, membuat Legend Coffee semakin menarik untuk dikunjungi.", 
    googleMapsLink: "https://g.co/kgs/75D85u6",
    image: ["legendCoffee.jpeg"],
    address: "Jl. Abu Bakar Ali No.24-26, Kotabaru, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta", 
  },
  {
    name: "Silol Kopi & Eatery",
    description: 
    "Bagi kamu yang mencari tempat nongkrong yang buka 24 jam, Silol Kopi & Eatery adalah jawabannya. Dengan menu yang sangat beragam, mulai dari kopi, teh, jus, hingga makanan berat seperti nasi goreng dan mie ayam, kamu bisa menikmati hidangan favoritmu kapan saja. Desain interiornya yang modern dan minimalis, serta suasana yang santai, membuat Silol Kopi & Eatery menjadi tempat yang nyaman untuk bersantai bersama teman atau keluarga.", 
    googleMapsLink: "https://g.co/kgs/mv3vkKP",
    image: ["silolCoffee.jpg"],
    address: "Jl. Suroto, Kotabaru, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta", 
  },
  {
    name: "Blanco Coffee and Books",
    description: 
    "agi para pecinta buku dan kopi, Blanco Coffee and Books adalah surga kecil di tengah kota Jogja. Kafe ini menyajikan beragam pilihan kopi berkualitas tinggi, yang diseduh dengan metode manual brewing. Selain menikmati kopi, kamu juga bisa membaca buku-buku menarik yang tersedia di rak buku yang tertata rapi. Suasana yang tenang dan nyaman membuat Blanco Coffee and Books menjadi tempat yang sempurna untuk bersantai sambil membaca buku favoritmu.", 
    googleMapsLink: "https://g.co/kgs/K4hD5K6",
    image: ["blanco.png"],
    address: "Jl. Kranggan No.30, Cokrodiningratan, Kec. Jetis, Kota Yogyakarta, Daerah Istimewa Yogyakarta", 
  },
  
];

// Fungsi untuk menyalin gambar ke folder public/uploads
const copyImagesToPublic = (imagePaths) => {
  imagePaths.forEach(imagePath => {
    const sourcePath = path.join(__dirname, imagePath); // Path sumber
    const destPath = path.join(__dirname, '../../public/uploads', path.basename(imagePath)); // Path tujuan
    fs.copyFileSync(sourcePath, destPath); // Menyalin file
  });
};

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

    // Menyalin gambar ke folder public/uploads
    places.forEach(place => {
      copyImagesToPublic(place.image);
    });

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
