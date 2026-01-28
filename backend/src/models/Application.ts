import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    mainImage: String,
    category: String,
    keyBenefits: String,
    salaryRange: String,
    slug: String,
    learnMoreUrl: String,
  },
  { timestamps: true }
);

export const Application = mongoose.model("Application", schema);
