import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        { username }
      ] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 
          "Email sudah terdaftar" : 
          "Username sudah digunakan" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Simpan user ke database
    const savedUser = await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registrasi berhasil",
      data: {
        userId: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Terjadi kesalahan saat registrasi",
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah user ada
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email atau password salah" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      data: {
        userId: user._id,
        username: user.username,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Terjadi kesalahan saat login",
      error: error.message 
    });
  }
};

// Fungsi untuk mendapatkan semua pengguna (hanya untuk admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil pengguna", error: error.message });
  }
};

// Fungsi untuk menghapus pengguna (hanya untuk admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan" });
    }
    res.json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat menghapus pengguna", error: error.message });
  }
}; 