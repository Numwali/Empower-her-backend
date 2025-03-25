import express from "express";
const router = express.Router();
import { newMessage, getMessages } from "../controllers/messageController";

router.post("/", newMessage);
router.get("/:conversationId", getMessages);

export default router;
