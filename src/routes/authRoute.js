import express from "express";
import { register, login } from "../controllers/authController.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * components:
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
    body("username").not().isEmpty().withMessage("Username wajib diisi"),
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

export default router; 