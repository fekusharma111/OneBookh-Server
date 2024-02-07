import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "SuperAdmin"],
    },
    lastloginTime: {
      type: Date,
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);
const User = mongoose.model("userDetails", userSchema, "userDetails");
export default User;
