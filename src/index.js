import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import placeRouter from "./routes/placeRoute.js";
import userRouter from "./routes/userRoute.js";
import reviewRouter from "./routes/reviewsRoutes.js";
import adminRouter from "./routes/adminRoute.js"
import morgan from "morgan";
import cors from 'cors'; 


dotenv.config();

const app = express();

// Konfigurasi CORS
const allowedOrigins = [
  'https://find-your-place-frontend.vercel.app', // Origin yang diizinkan
  'http://localhost:5173' // Tambahkan origin lokal Anda
];

const corsOptions = {
  origin: function (origin, callback) {
    // Jika origin tidak ada (misalnya, saat menguji di Postman), izinkan
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  credentials: true, // Jika Anda perlu mengizinkan cookie
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));

// Swagger UI route 
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", placeRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/", reviewRouter);
app.use("/api/v1/auth", adminRouter);

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