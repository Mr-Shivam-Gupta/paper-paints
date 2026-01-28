import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    preferredRole: String,
    experience: String,
    message: String,
    jobId: String,
    resumeUrl: String,
  },
  { timestamps: true }
);

export const CareerSubmission = mongoose.model("CareerSubmission", schema);

