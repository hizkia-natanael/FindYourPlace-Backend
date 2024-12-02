import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/placeRoute.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(404).json({ message: "NOT FOUND" });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(
        `server is running on port ${process.env.PORT} and database connected `
      );
    })
  )
  .catch((error) => {
    console.log(error);
  });
