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
 * /place:
 *   get:
 *     tags: [Place]
 *     summary: Get  place
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: place retrieved successfully
 */
router.get("/place", getPlace);

/**
 * @swagger
 * /place/{id}/done:
 *   patch:
 *     tags: [Place]
 *     summary: Get Place Id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.get("/place/:id", getPlaceById);

/**
 * @swagger
 * /place:
 *   post:
 *     tags: [Place]
 *     summary: Create new Place
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Place created successfully
 */
router.post(
  "/place",
  upload.single("images"),
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  validateRequest,
  createPlace
);

router.put(
  "/place/:id",
  upload.single("images"),
  [
    body("name").not().isEmpty().withMessage("name is required"),
    body("description").not().isEmpty().withMessage("description is required"),
  ],
  validateRequest,
  updatePlace
);
router.delete("/place/:id", deletePlace);
export default router;
