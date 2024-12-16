import express from "express";
import { register, login, getAllUsers, deleteUser, profile, editProfile, signout  } from "../controllers/userController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { body } from "express-validator";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username pengguna
 *         email:
 *           type: string
 *           description: Email pengguna
 *         password:
 *           type: string
 *           description: Password pengguna
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           description: Peran pengguna
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register pengguna baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registrasi berhasil
 *       400:
 *         description: Data tidak valid
 */
router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username minimal 3 karakter"),
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter"),
  ],
  validateRequest,
  register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *       400:
 *         description: Email atau password salah
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email tidak valid"),
    body("password").not().isEmpty().withMessage("Password wajib diisi"),
  ],
  validateRequest,
  login
);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Mendapatkan semua pengguna (hanya untuk admin)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List semua pengguna
 *       403:
 *         description: Akses ditolak, hanya admin yang dapat mengakses
 */
router.get("/users", auth, getAllUsers);

/**
 * @swagger
 * /auth/users/{id}:
 *   delete:
 *     summary: Hapus pengguna berdasarkan ID (hanya untuk admin)
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID pengguna
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pengguna berhasil dihapus
 *       404:
 *         description: Pengguna tidak ditemukan
 *       403:
 *         description: Akses ditolak, hanya admin yang dapat mengakses
 */
router.delete("/users/:id", auth, deleteUser);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Mendapatkan profil pengguna
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil mengambil profil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Tidak terotorisasi
 *       500:
 *         description: Kesalahan server
 */
router.get("/profile", auth, profile);

/**
 * @swagger
 * /auth/edit-profile:
 *   put:
 *     summary: Edit profil pengguna
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil berhasil diperbarui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       400:
 *         description: Username atau email sudah digunakan
 *       401:
 *         description: Tidak terotorisasi
 *       500:
 *         description: Kesalahan server
 */
router.put(
  "/edit-profile",
  auth,
  [
    body("username")
      .optional()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username minimal 3 karakter"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Email tidak valid"),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter"),
  ],
  validateRequest,
  editProfile
);

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: Keluar dari akun
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Berhasil keluar
 *       401:
 *         description: Tidak terotorisasi
 *       500:
 *         description: Kesalahan server
 */
router.post("/signout", auth, signout);

export default router; 