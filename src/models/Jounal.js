import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    emotions: { type: [String] },
    actions: { type: [String] },
    isPrivate: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Journal= mongoose.model("Journal", JournalSchema);
export default Journal;
