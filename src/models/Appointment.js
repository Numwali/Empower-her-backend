import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start: {
      type: Date,
      required: false, // Not required
    },
    end: {
      type: Date,
      required: false, // Not required
      validate: {
        validator: function (value) {
          return !this.startDate || !value || value > this.startDate;
        },
        message: "End date must be after start date.",
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "canceled"],
      default: "pending",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
