import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    company: String,
    location: String,
    experience: String,
    message: String,
  },
  { timestamps: true }
);

export const DealerSubmission = mongoose.model("DealerSubmission", schema);
