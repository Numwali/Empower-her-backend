import Appointment from "../models/Appointment";

//  User books an appointment

export const bookAppointment = async (req, res) => {
  try {
    const { providerId, start, end, notes } = req.body;
    const userId = req.user._id;
    const appointment = new Appointment({
      userId,
      providerId,
      start,
      end,
      notes,
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ message: "Failed to book appointment", error: error.message });
  }
};


//  Therapist accepts/cancels an appointment

export const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    // Changed this line - removed the curly braces around appointmentId
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ message: `Appointment ${status}`, appointment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment status", error: error.message });
  }
};


// Therapist updates the start and end time of an appointment

export const updateAppointmentTime = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { start, end } = req.body;
    const providerId = req.user._id;

    const appointment = await Appointment.findOne({ _id: appointmentId, providerId });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    if (start) appointment.start = start;
    if (end) {
      if (start && end <= start) {
        return res.status(400).json({ message: "End time must be after start time" });
      }
      appointment.end = end;
    }

    await appointment.save();
    res.status(200).json({ message: "Appointment time updated", appointment });
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment time", error: error.message });
  }
};


//   Provider views their scheduled appointments

export const getProviderAppointments = async (req, res) => {
  try {
    const providerId = req.user._id; 
    const appointments = await Appointment.find({ providerId }).populate("userId", "firstname lastname email interests");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve appointments", error: error.message });
  }
};


//  User views their booked appointments

export const getUserAppointments = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointments = await Appointment.find({ userId }).populate("providerId", "firstname lastname email interests");

    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user appointments", error: error.message });
  }
};


//  Delete an appointment (Only user who booked it can delete)

export const deleteAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user._id;

    const appointment = await Appointment.findOneAndDelete({ _id: appointmentId, userId });
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appointment", error: error.message });
  }
};
