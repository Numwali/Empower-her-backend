import express from "express";
import protect from "../middleware/protectRoute.js";
import {
  commentingOnPost,
  createPost,
  getAllPosts,
  getSinglePost,
  getMyPosts,
  deletePost,
  updatePost,
  likePost,
  replyingToComment,
  getMyLikedPosts
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", protect, getAllPosts);
router.get("/my-posts", protect, getMyPosts);
router.get("/my-like-posts", protect, getMyLikedPosts);
router.get("/:postId", protect, getSinglePost);
router.post("/add", protect, createPost);
router.patch("/update/:postId", protect, updatePost);
router.delete("/:postId", protect, deletePost);
// ................comments ...................
router.post("/comment/:postId", protect, commentingOnPost);

router.post("/:postId/reply/:commentId", protect, replyingToComment);

//..................likes.....................
router.post("/like/:postId", protect, likePost);

export default router;
