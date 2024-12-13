import Admin from "../models/adminModel.js";
import { comparePassword } from "../utils/passwordHasher.js";
import { generateAccesToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (admin) {
      return res.status(409).json({ message: "user already exists" });
    }
    const newAdmin = await Admin.create({ username, email, password });
    return res.status(201).json({ message: "admin created", data: newAdmin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "unable to register" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt with email: ${email}`);

    const admin = await Admin.findOne({ email });

    if (!admin) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccesToken({
      adminId: admin._id,
      userName: admin.username,
    });

    console.log("Login successful");
    return res
      .status(200)
      .json({ message: "Login successful", data: { accessToken } });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to login" });
  }
};
