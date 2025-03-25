import Conversation from "../models/Conversation";
import Message from "../models/message";

//new conv

export const newConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      return res.status(400).json({
        message: "Conversation already exists",
        conversation: existingConversation,
      });
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json({ conversation: savedConversation });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserConversation = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: req.params.userId,
    }).populate("members", "-password");

    const populatedConversations = await Promise.all(
      conversations.map(async (conversation) => {
        const lastMessage = await Message.findOne(
          { conversationId: conversation._id },
          {},
          { sort: { createdAt: -1 } }
        );

        return {
          conversation,
          lastMessage: lastMessage || null,
        };
      })
    );

    populatedConversations.sort(
      (a, b) =>
        (b.lastMessage?.createdAt || 0) - (a.lastMessage?.createdAt || 0)
    );

    res.status(200).json({ conversations: populatedConversations });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export const getTwoUsersConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
