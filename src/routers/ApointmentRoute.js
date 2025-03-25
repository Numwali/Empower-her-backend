import express from "express";
import protect from "../middleware/protectRoute.js";
import { bookAppointment, deleteAppointment, getProviderAppointments, getUserAppointments, updateAppointmentStatus, updateAppointmentTime } from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/", protect, bookAppointment);
appointmentRouter.put("/:appointmentId/status", protect, updateAppointmentStatus);
appointmentRouter.put("/:appointmentId/time", protect, updateAppointmentTime);
appointmentRouter.get("/provider", protect, getProviderAppointments);
appointmentRouter.get("/user", protect, getUserAppointments);
appointmentRouter.delete("/:appointmentId", protect, deleteAppointment);

export default appointmentRouter;
