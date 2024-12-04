import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import router from "./routes/placeRoute.js";
import userRouter from "./routes/userRoute.js";
import morgan from "morgan";

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));

// Swagger UI route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", router);
app.use("/api/v1/auth", userRouter);

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
