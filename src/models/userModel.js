import mongoose from "mongoose";

const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please add a firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Please add a lastname"],
  },
  username: {
    type: String,
    required: [true, "Please add a name"],
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add a email"],
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
  role: {
    type: String,
    required: [true, "Please add a role"],
  },
  interests: {
    type: [String],
    default: [],   
  },
  lastSeen: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
});

export default mongoose.model("User", schema);
