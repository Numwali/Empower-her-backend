import mongoose from "mongoose";

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: [true, "Please add a lastname"],
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
  postedDate: {
    type: String,
    required: true,
    default: new Date(),
  },
  whoCanReplay: {
    type: String,
  },
  type: {
    type: String,
    enum: ["blog", "community"],
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      likedDate: {
        type: String,
        required: true,
        default: new Date(),
      },
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      comment: {
        type: String,
        required: [true, "Please add a comment"],
      },
      postedDate: {
        type: String,
        required: true,
        default: new Date(),
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
          },
          reply: {
            type: String,
            required: [true, "Please add a reply"],
          },
          postedDate: {
            type: String,
            required: true,
            default: new Date(),
          },
        },
      ],
    },
  ],
});

export default mongoose.model("Post", schema);
