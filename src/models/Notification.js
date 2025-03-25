import mongoose from "mongoose";

const schema = mongoose.Schema({
  receiverId: {
    type: String,
  },
  data: {
    type: Object,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Notification", schema);
