// update last seen to current date
import User from "../models/userModel.js";
const updateLastSeen = async (userId) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { lastSeen: new Date() },
      { new: true }
    );
    return user;
  } catch (err) {
    console.log(err);
  }
};

export default updateLastSeen;
