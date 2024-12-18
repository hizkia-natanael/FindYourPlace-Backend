import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Change this line to set req.user instead of req.userId
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token tidak valid" });
  }
};