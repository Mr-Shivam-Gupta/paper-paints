import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    productName: String,
    category: String,
    description: String,
    technicalSpecifications: String,
    features: String,
    mainImage: String,
    brochureUrl: String,
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", schema);
