import express from "express";
const router = express.Router();

import {
    getRule,
    createRule,
    getAllRules,
    updateRule,
    deleteRule,
} from "../controllers/ruleController.js";

router.post("/", createRule);
router.get("/:id", getRule);
router.get("/", getAllRules);
router.put("/:id", updateRule);
router.delete("/:id", deleteRule);

export default router;
