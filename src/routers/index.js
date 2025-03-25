import express from "express";
import userRouter from "./userRoute.js";
import postRouter from "./postRoute.js";
import docrouter from "../Documentation/index.doc.js";
import conversationRouter from "./conversationRoute.js";
import messageRouter from "./messageRoute.js";
import communityRouter from "./communityRoute.js";
import tagRouter from "./tagRoute.js";
import ruleRouter from "./ruleRoute.js";
import notificationRouter from "./notificationRoute.js";
import appointmentRouter from "./ApointmentRoute.js";
import jounalRouter from "./jounalRoute.js";
const router = express.Router();

router.use("/conversations", conversationRouter);
router.use("/messages", messageRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/community", communityRouter);
router.use("/tag", tagRouter);
router.use("/rule", ruleRouter);
router.use("/notification", notificationRouter);
router.use("/appointment",appointmentRouter)
router.use("/jounal",jounalRouter)
router.use("/docs", docrouter);


export default router;
