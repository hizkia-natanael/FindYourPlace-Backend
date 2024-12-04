# **FindYourPlace Backend API** 🌍  
Platform backend untuk mencari tempat nongkrong dengan fitur autentikasi dan manajemen tempat. Dibangun dengan teknologi modern menggunakan Node.js, Express.js, MongoDB, dan Swagger untuk dokumentasi API.

---

## **Tech Stack** 🛠  
- **Node.js** & **Express.js**: Framework utama untuk pengembangan server-side.  
- **MongoDB** dengan **Mongoose**: Basis data NoSQL yang digunakan untuk menyimpan data pengguna dan tempat.  
- **JWT** (JSON Web Token): Autentikasi berbasis token untuk keamanan API.  
- **Swagger**: Untuk mendokumentasikan endpoint API.  
- **Bcrypt.js**: Untuk enkripsi password.  

---

## **Cara Install & Setup** 🔧  

### 1. **Clone Repository dan Install Dependencies**

```bash
# Clone repository ini
git clone https://github.com/hizkia-natanael/FindYourPlace-Backend.git

# Masuk ke folder project
cd FindYourPlace-Backend

# Install dependencies yang dibutuhkan
npm install
```

### 2. **Setup Environment Variables**

Buat file `.env` di root folder project. Anda dapat menyalin dari file `.env.example` dan sesuaikan isinya seperti berikut:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/findyourplace
JWT_SECRET=rahasia_jwt_anda
```

- **`JWT_SECRET`**: Gunakan string acak yang aman (misalnya 32 karakter).  
- **`MONGODB_URI`**: Pastikan MongoDB berjalan di sistem Anda atau gunakan layanan seperti MongoDB Atlas.

### 3. **Jalankan Database Seeder (Opsional)**

Seeder berguna untuk mengisi database dengan data awal seperti pengguna admin dan beberapa tempat nongkrong.

```bash
cd /src/seeders
```

```bash
npm run seed
```

Seeder akan:
- Membuat pengguna admin dengan email `admin@example.com` dan password `admin123`.
- Menambahkan tempat-tempat dummy untuk testing.

### 4. **Jalankan Server**

```bash
# Mode development (pake nodemon)
npm run dev

# Mode production
npm start
```

---

## **Cara Menggunakan Swagger UI** 📚

1. Buka browser dan akses dokumentasi Swagger di:
   ```
   http://localhost:3000/docs
   ```

2. **Autentikasi di Swagger:**
   - Gunakan endpoint `/api/users/login` untuk mendapatkan token JWT.
   - Salin token dari respons login.
   - Klik tombol **"Authorize"** di Swagger UI.
   - Masukkan token dengan format `Bearer <token>`.

---

## **Endpoints API** 🚀

### **Endpoints Utama**
#### **Auth**
- `POST /api/auth/login` - Login user.
- `POST /api/auth/register` - Registrasi pengguna baru.
- `GET /api/auth/users` - Ambil data profil pengguna yang terdaftar (hanya admin).
- `DELETE /api/auth/users/:id` - Hapus pengguna berdasarkan id (hanya admin).

#### **Places**
- `GET /api/places` - Ambil semua tempat.
- `GET /api/places/:id` - Ambil tempat berdasarkan ID.
- `POST /api/places` - Tambah tempat baru (hanya admin).
- `PUT /api/places/:id` - Update tempat (hanya admin).
- `DELETE /api/places/:id` - Hapus tempat (hanya admin).

---

## **Contoh Penggunaan di Swagger**

### **Login**
```json
{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### **Tambah Tempat Baru (Admin)**
```json
{
  "name": "Kafe Nongkrong Asik",
  "description": "Kafe dengan suasana nyaman dan menu lengkap.",
  "googleMapsLink": "https://g.co/kgs/abc123",
  "images": ["image1.jpg", "image2.jpg"]
}
```

---

## **Tips Penggunaan** 💡

1. **Testing API:**
   - Gunakan Swagger UI untuk eksplorasi endpoint (direkomendasikan untuk pemula).
   - Bisa juga menggunakan Postman atau cURL.
   - Jangan lupa menambahkan header `Authorization: Bearer <token>` untuk endpoint yang memerlukan autentikasi.

2. **Troubleshooting:**
   - Jika **"Unauthorized"**:
     - Periksa format token, harus berupa: `Bearer <token>`.
     - Pastikan token belum kedaluwarsa.
   - Jika **MongoDB Error**:
     - Pastikan MongoDB sudah berjalan di sistem Anda.
     - Periksa koneksi ke database di **`MONGODB_URI`**.

3. **Best Practices:**
   - Jangan membagikan **`JWT_SECRET`** ke siapa pun.
   - Gunakan password yang kuat untuk akun admin.
   - Selalu testing endpoint sebelum integrasi ke frontend.


Made with 💡 and ☕ by Hizkia Natanael.
