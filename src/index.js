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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://find-your-place-frontend.vercel.app',
      'http://localhost:5173', // Add your local development URL
      // Add any other origins you want to allow
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
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