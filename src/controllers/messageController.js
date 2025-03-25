import Message from "../models/message";

//add
export const newMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    if (!conversationId) {
      return res.status(400).json({ message: "conversationId is required" });
    }
    const messages = await Message.find({
      conversationId: conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
