import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/adminController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

/**
 * @swagger
 * /login-admin:
 *   post:
 *     summary: Login admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email admin
 *               password:
 *                 type: string
 *                 description: Password admin
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Validasi gagal
 *       401:
 *         description: Email atau password salah
 */
router.post(
  "/login-admin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("password is required"),
  ],
  validateRequest,
  login
);

/**
 * @swagger
 * /register-admin:
 *   post:
 *     summary: Register admin baru
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username admin
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email admin
 *               password:
 *                 type: string
 *                 description: Password admin
 *     responses:
 *       201:
 *         description: Register berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Validasi gagal
 *       409:
 *         description: Email sudah terdaftar
 */
router.post(
  "/register-admin",
  [
    body("username").not().isEmpty().withMessage("username is required"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("password is required"),
  ],
  validateRequest,
  register
);

export default router;