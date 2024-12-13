import mongoose from "mongoose";
import { passwordHasher } from "../utils/passwordHasher.js";
const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

adminSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await passwordHasher(this.get("password"));
    this.set("password", hashed);
  }
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
