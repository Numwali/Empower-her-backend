import Notification from "../models/Notification";

export const getUserNotifications = async (req, res) => {
  try {
    const { user } = req;
    const notifications = await Notification.find({
      receiverId: user.id,
    });
    return res
      .status(200)
      .json({ message: "Notification retrieved successful", notifications });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).json({ message: "Notification deleted successful" });
  } catch (error) {}
};

export const deleteAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.deleteMany({
      recieverId: req.params.id,
    });
    if (!notifications) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res
      .status(200)
      .json({ message: "All Notification deleted successful" });
  } catch (error) {}
};

export const readNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    return res.status(200).json({ message: "Notification read successful" });
  } catch (error) {}
};
