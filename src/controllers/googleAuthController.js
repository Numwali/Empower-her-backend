import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
const googleAuth = async (req, res) => {
  try {
    const logingUser = await User.findOne({
      email: req.user.email,
    });
    if (logingUser) {
      var userInfo = {
        id: logingUser._id,
        username: logingUser.username,
        firstname: logingUser.firstname,
        lastname: logingUser.lastname,
        gender: logingUser.gender,
        address: logingUser.address,
        email: logingUser.email,
        role: logingUser.role,
        phone: logingUser.phone,
        dob: logingUser.dob,
        profileImage: logingUser.profileImage,
      };
      userInfo = JSON.stringify(userInfo);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?token=${createToken(
          logingUser._id
        )}&&user=${userInfo}`
      );
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.user.displayName, salt);

      const user = await User.create({
        firstname: req.user.name.givenName,
        lastname: req.user.name.familyName,
        username: req.user.displayName,
        email: req.user.email,
        profileImage: req.user.picture,
        password: hashedPassword,
        role: "user",
      });
      var userInfo = {
        id: user._id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        address: user.address,
        email: user.email,
        role: user.role,
        phone: user.phone,
        dob: user.dob,
        profileImage: user.profileImage,
      };
      userInfo = JSON.stringify(userInfo);
      return res.redirect(
        `${process.env.FRONTEND_URL}/login/?token=${createToken(
          user._id
        )}&&user=${userInfo}}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
export default googleAuth;
