import express from "express";
import protect from "../middleware/protectRoute.js";
import {
  registerUser,
  userLogin,
  getUserProfile,
  updateUserProfile,
  getTherapists,
  getAllUsers,
  requestPasswordReset,
  resetPassword,
  verifyUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.put("/verify", verifyUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/allUsers", protect, getAllUsers);
router.get("/therapists", protect, getTherapists);
router.post("/forgot-password", requestPasswordReset);
router.put("/reset-password", resetPassword);
router.delete("/delete/:id",protect,deleteUser)

export default router;
