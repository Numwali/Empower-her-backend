import express from "express";
import protect from "../middleware/protectRoute.js";
import { addEntry, deleteEntry, updateEntry, viewMyJournals, viewPublicJournals } from "../controllers/jounalController.js";

const jounalRouter = express.Router();

jounalRouter.post("/", protect, addEntry);
jounalRouter.put("/:journalId", protect, updateEntry);
jounalRouter.delete("/:journalId", protect, deleteEntry);
jounalRouter.get("/my", protect, viewMyJournals);
jounalRouter.get("/public", viewPublicJournals);

export default jounalRouter;
