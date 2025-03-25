import express from "express";
const router = express.Router();

import {
  addMember,
  addPost,
  createCommunity,
  deleteCommunity,
  getAllCommunities,
  getCommunitiesCreatedByMe,
  getCommunitiesJoinedByMe,
  getCommunity,
  approvePendingMember,
  getCommunityPosts,
  getMyCommunities,
  getPendingMembers,
  joinCommunity,
  leaveCommunity,
  updateCommunity,
} from "../controllers/communityController.js";
import protect from "../middleware/protectRoute.js";

router.use(protect);

router.post("/", createCommunity);
router.get("/my-communities", getMyCommunities);
router.get("/created-by-me", getCommunitiesCreatedByMe);
router.get("/joined-by-me", getCommunitiesJoinedByMe);
router.get("/:id", getCommunity);
router.get("/", getAllCommunities);
router.put("/:id", updateCommunity);
router.delete("/:id", deleteCommunity);
router.post("/join/:id", joinCommunity);
router.put("/leave/:id", leaveCommunity);
router.get("/:id/posts", getCommunityPosts);
router.post("/:id/post", addPost);
router.put("/:id/add-member", addMember);
router.get("/:id/pending-members", getPendingMembers);
router.put("/:id/approve-members", approvePendingMember);

export default router;
