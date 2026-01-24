import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    projectName: String,
    location: String,
    workDescription: String,
    productsUsed: String,
    mainImage: String,
    projectImages: String,
    completionDate: Date,
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", schema);
