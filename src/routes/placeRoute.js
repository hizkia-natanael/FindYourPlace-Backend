import express from "express";
import {
  createPlace,
  getPlace,
  getPlaceById,
} from "../controllers/placesController.js";
import { upload } from "../middlewares/upload.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { body } from "express-validator";

const router = express.Router();

router.get("/place", getPlace);
router.get("/place/:id", getPlaceById);
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

export default router;
