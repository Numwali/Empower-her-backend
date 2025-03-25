import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/userModel.js";
import ResetToken from "../models/ResetToken.js";
import imageUploader from "../helpers/photoUpload.js";
import Email from "../utils/email";
import post from "../models/post.js";
import Conversation from "../models/Conversation.js";
import message from "../models/message.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      username,
      gender,
      phone,
      age,
      email,
      address,
      password,
      role,
      confirm_password,
    } = req.body;

    let interests = [];
    if (req.body.interests) {
      if (Array.isArray(req.body.interests)) {
        interests = req.body.interests;
      } else {
        try {
          interests = JSON.parse(req.body.interests);
        } catch (err) {
          console.error("Error parsing interests:", err);
          return res.status(400).json({
            success: false,
            message: "Invalid interests format. Expected JSON array.",
          });
        }
      }
    }

    if (!firstname || firstname == "")
      return res
        .status(200)
        .json({ success: false, message: "firstname is required" });
    if (!lastname || lastname == "")
      return res
        .status(200)
        .json({ success: false, message: "lastname is required" });
    if (!username || username == "")
      return res
        .status(200)
        .json({ success: false, message: "username is required" });
    if (!gender || gender == "")
      return res
        .status(200)
        .json({ success: false, message: "gender is required" });
    if (!phone || phone == "")
      return res
        .status(200)
        .json({ success: false, message: "phone is required" });
    if (!age || age == "")
      return res
        .status(200)
        .json({ success: false, message: "age is required" });
    if (!email || email == "")
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    if (!address || address == "")
      return res
        .status(200)
        .json({ success: false, message: "address is required" });
    if (!password || password == "")
      return res
        .status(200)
        .json({ success: false, message: "password is required" });
    if (!role || role == "")
      return res
        .status(200)
        .json({ success: false, message: "role is required" });
    if (!confirm_password || confirm_password == "")
      return res
        .status(200)
        .json({ success: false, message: "confirm_password is required" });

    if (!interests || !Array.isArray(interests) || interests.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "At least one interest is required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(200)
        .json({ success: false, message: "user email already exist" });
    else {
      if (password !== confirm_password)
        return res
          .status(200)
          .json({ success: false, message: "Two different password" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const verificationCode = generateVerificationCode();

      let profileImage = "";
      if (req.files && req.files.image) {
        const uploadResult = await imageUploader(req);
        if (uploadResult && uploadResult.secure_url) {
          profileImage = uploadResult.secure_url;
        } else {
          console.error("Failed to upload image to Cloudinary");
        }
      }

      const user = new User({
        firstname,
        lastname,
        username,
        gender,
        age,
        email,
        address,
        phone,
        password: hashedPassword,
        role,
        verificationToken: verificationCode,
        interests: interests,
        profileImage,
      });

      await new Email(user, "", verificationCode).sendWelcome();
      await user.save();
      res.status(201).json({
        success: true,
        message:
          "Account created successfully, please check your email to verify your account",
      });
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ error });
  }
};

export const verifyUser = async (req, res) => {
  try {
    if (!req.body.token || req.body.token.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a token" });
    }
    const { token } = req.body;
    const user = await User.findOne({
      verificationToken: token,
    });
    if (!user) {
      return res.status(200).json({ success: false, message: "Invalid token" });
    }
    user.verified = true;
    user.verificationToken = null;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const findByEmail = async (userEmail) => {
  try {
    const userInfo = await User.findOne({ email: userEmail });
    let data;
    if (userInfo) {
      data = {
        success: true,
        token: generateToken(userInfo._id),
        userInfo: {
          id: userInfo._id,
          userInfoname: userInfo.userInfoname,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          gender: userInfo.gender,
          address: userInfo.address,
          email: userInfo.email,
          role: userInfo.role,
          phone: userInfo.phone,
          dob: userInfo.dob,
          profileImage: userInfo.profileImage,
        },
      };
    }
    return data;
  } catch (err) {
    console.error("Error finding user by email:", err);
    throw err;
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (!user.verified) {
        return res.status(400).json({
          success: false,
          message: "please verify your account first!",
        });
      }
      res.json({
        success: true,
        token: generateToken(user._id),
        user: {
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
          interests: user.interests,
        },
      });
    } else
      res.json({ success: false, message: "Invalid credation" }).status(400);
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ success: true, message: "user profile", data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
};

export const getTherapists = async (req, res) => {
  try {
    const user = req.user;
    const therapists = await User.find({ role: "therapist" });
    res.status(200).json({ success: true, data: therapists });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user_id = req.user._id;
    const {
      firstname,
      lastname,
      username,
      gender,
      address,
      email,
      phone,
      dob,
    } = req.body;

    if (!firstname || firstname == "")
      return res
        .status(200)
        .json({ success: false, message: "firstname is required" });
    if (!lastname || lastname == "")
      return res
        .status(200)
        .json({ success: false, message: "lastname is required" });
    if (!username || username == "")
      return res
        .status(200)
        .json({ success: false, message: "username is required" });
    if (!gender && gender == "")
      return res
        .status(200)
        .json({ success: false, message: "gender is required" });
    if (!address || address == "")
      return res
        .status(200)
        .json({ success: false, message: "address is required" });
    if (!email || email == "")
      return res
        .status(200)
        .json({ success: false, message: "email is required" });
    if (!phone || phone == "")
      return res
        .status(200)
        .json({ success: false, message: "phone is required" });
    if (!dob || dob == "")
      return res
        .status(200)
        .json({ success: false, message: "dob is required" });

    let image = req.user.profileImage;
    if (req.files) {
      image = await imageUploader(req);
      image = image.url;
    }

    const updateUser = await User.findByIdAndUpdate(
      user_id,
      {
        firstname,
        lastname,
        username,
        gender,
        dob,
        email,
        address,
        phone,
        profileImage: image,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      user: {
        id: updateUser._id,
        firstname,
        lastname,
        username,
        gender,
        dob,
        email,
        address,
        phone,
        profileImage: image,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
    console.log(error);
  }
};

export const getUserInfor = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  const user = req.user;
  try {
    const users = await User.find({ _id: { $ne: user._id } })
      .select("-password")
      .sort({ firstname: 1 }); // Sort users by firstname in ascending order

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await ResetToken.create({
      userId: user._id,
      resetToken: hashedToken,
    });

    // reset url
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    await new Email(user, resetUrl, "").sendPasswordReset();
    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    let { token, newPassword, confirmPassword } = req.body;
    if (!newPassword || newPassword.trim() === "") {
      return res.status(400).json({ message: "Please provide a new password" });
    }
    if (!confirmPassword || confirmPassword.trim() === "") {
      return res
        .status(400)
        .json({ message: "Please provide a confirm password" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match" });
    }
    if (!token || token.trim() === "") {
      return res.status(400).json({ message: "Please provide reset token" });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const resetTokenDoc = await ResetToken.findOne({ resetToken: hashedToken });

    if (!resetTokenDoc) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(resetTokenDoc.userId);

    // hashing password
    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(newPassword, salt);

    user.password = newPassword;
    await user.save();

    // Optionally delete the reset token after use
    await ResetToken.findByIdAndDelete(resetTokenDoc._id);

    return res.status(200).json({ message: "Password successfully reset" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the user is a therapist
    if (user.role !== "therapist") {
      return res.status(400).json({ success: false, message: "Only therapists can be deleted" });
    }

    const resource = await post.findOne({ user: id });
    if (resource) {
      return res.status(400).json({ success: false, message: "This therapist has dependent resources!" });
    }

    const conversations = await Conversation.find({ members: id });
    const conversationIds = conversations.map(conv => conv._id);

    await message.deleteMany({ conversationId: { $in: conversationIds } });
    await Conversation.deleteMany({ _id: { $in: conversationIds } });

    res.status(200).json({ success: true, message: "Therapist deleted successfully" });

  } catch (error) {
    console.error("Error deleting therapist:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

//generate verification code
function generateVerificationCode() {
  let code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
}
