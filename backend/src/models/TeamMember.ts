import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    jobTitle: String,
    bio: String,
    profilePhoto: String,
    linkedInProfile: String,
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model("TeamMember", schema);
