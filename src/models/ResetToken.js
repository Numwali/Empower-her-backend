import mongoose from "mongoose";

const resetTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  resetToken: {
    type: String,
    required: true,
  },
  expireDate: {
    type: Date,
    default: Date.now,
    expires: 3600, // This token will be deleted after 1 hour
  },
});

export default mongoose.model("ResetToken", resetTokenSchema);
