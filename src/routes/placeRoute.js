import express from "express";
import {
  createPlace,
  deletePlace,
  getPlace,
  getPlaceById,
  updatePlace,
} from "../controllers/placesController.js";
import { upload } from "../middlewares/upload.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: Nama tempat
 *         description:
 *           type: string
 *           description: Deskripsi tempat
 *         googleMapsLink:
 *           type: string
 *           description: Link Google Maps
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array dari path gambar
 */

/**
 * @swagger
 * /place:
 *   get:
 *     summary: Mendapatkan semua tempat
 *     tags: [Places]
 *     responses:
 *       200:
 *         description: List semua tempat
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 */
router.get("/place", getPlace);

/**
 * @swagger
 * /place/{id}:
 *   get:
 *     summary: Mendapatkan tempat berdasarkan ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tempat
 *     responses:
 *       200:
 *         description: Detail tempat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Tempat tidak ditemukan
 */
router.get("/place/:id", getPlaceById);

/**
 * @swagger
 * /place:
 *   post:
 *     summary: Membuat tempat baru
 *     tags: [Places]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               googleMapsLink:
 *                 type: string
 *               images:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tempat berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 */
router.post(
  "/place",
  upload.single("images"), // Changed to match the Swagger schema
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  validateRequest,
  createPlace
);

/**
 * @swagger
 * /place/{id}:
 *   put:
 *     summary: Update tempat berdasarkan ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tempat
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               googleMapsLink:
 *                 type: string
 *               images:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tempat berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Place'
 *       404:
 *         description: Tempat tidak ditemukan
 */
router.put(
  "/place/:id",
  upload.single("image"),
  [
    body("name")
      .optional()
      .not()
      .isEmpty()
      .withMessage("name tidak boleh kosong"),
    body("description")
      .optional()
      .not()
      .isEmpty()
      .withMessage("description tidak boleh kosong"),
  ],
  validateRequest,
  updatePlace
);

/**
 * @swagger
 * /place/{id}:
 *   delete:
 *     summary: Hapus tempat berdasarkan ID
 *     tags: [Places]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID tempat
 *     responses:
 *       200:
 *         description: Tempat berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Place'
 *       404:
 *         description: Tempat tidak ditemukan
 */
router.delete("/place/:id", deletePlace);

export default router;
