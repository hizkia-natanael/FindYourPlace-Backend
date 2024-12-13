import express from "express";
import { body } from "express-validator";
import { register, login } from "../controllers/adminController.js";
import { validateRequest } from "../middlewares/validateRequest.js";

const router = express.Router();

router.post(
  "/login-admin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").not().isEmpty().withMessage("password is required"),
  ],
  validateRequest,
  login
);
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
