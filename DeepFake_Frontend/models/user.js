import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure each user has a unique email
    },
    password: {
      type: String,
      required: function () {
        // Only require password if it's not Google authentication
        return !this.provider || this.provider !== "google";
      },
    },
    provider: {
      type: String,
      default: "local", // "local" for email/password, "google" for Google authentication
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
