import express from "express";
const router = express.Router();

import {
  getTag,
  createTag,
  getAllTags,
  updateTag,
  deleteTag,
} from "../controllers/tagController.js";

router.post("/", createTag);
router.get("/:id", getTag);
router.get("/", getAllTags);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

export default router;
