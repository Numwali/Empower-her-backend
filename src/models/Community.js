import mongoose from "mongoose";

const CommunityModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    pendingMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    rules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rule",
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    privacy: {
      type: String,
      default: "public",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Community", CommunityModel);
