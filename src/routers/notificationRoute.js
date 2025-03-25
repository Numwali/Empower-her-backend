import express from "express";
import {
  getUserNotifications,
  readNotification,
  deleteAllNotification,
  deleteNotification,
} from "../controllers/notificationController";
import protect from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", protect, getUserNotifications);
router.delete("/:id", protect, deleteNotification);
router.delete("/all/:id", protect, deleteAllNotification);
router.put("/:id", protect, readNotification);

export default router;
