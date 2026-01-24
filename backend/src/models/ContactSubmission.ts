import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

export const ContactSubmission = mongoose.model("ContactSubmission", schema);
