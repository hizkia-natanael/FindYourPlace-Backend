import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import placeRouter from "./routes/placeRoute.js";
import userRouter from "./routes/userRoute.js";
import reviewRouter from "./routes/reviewsRoutes.js";
import morgan from "morgan";
import cors from 'cors'; 


dotenv.config();

const app = express();

// Konfigurasi CORS
app.use(cors({
  origin: 'http://localhost:5173', // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
  credentials: true // Jika Anda perlu mengizinkan cookies
}));

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));

// Swagger UI route 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", placeRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/", reviewRouter);

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API Find Your Place" });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "NOT FOUND" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on http://localhost:${process.env.PORT} and database connected `
      );
      console.log(
        `Swagger display on http://localhost:${process.env.PORT}/docs `
      );
    })
  )
  .catch((error) => {
    console.log(error);
  });