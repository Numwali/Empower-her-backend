import express from "express";
const router = express.Router();

import {
  newConversation,
  getTwoUsersConversation,
  getUserConversation,
} from "../controllers/conversationController.js";

router.post("/", newConversation);
// //get conv of a user

router.get("/:userId", getUserConversation);

// // get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", getTwoUsersConversation);

export default router;
