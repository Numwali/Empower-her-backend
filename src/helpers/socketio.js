import socketio from "socket.io";
import updateLastSeen from "../utils/updateLastSeen.js";
import Post from "../models/post.js";
import User from "../models/userModel.js";
import Notification from "../models/Notification.js";
let io;

const ioConnect = (http) => {
  io = socketio(http, {
    cors: { origin: `${process.env.FRONTEND_URL}` },
  });

  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };

  const removeUser = (socketId) => {
    const user = users.find((user) => user.socketId === socketId);
    if (user) updateLastSeen(user?.userId);
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  };

  const getUserInformation = async (userId) => {
    const user = await User.findById(userId);
    if (user) return user;
    else return null;
  };

  // Function to find the owner of a content
  const findContentOwner = async (contentId) => {
    const content = await Post.findById(contentId);
    if (content) return content.user;
    else return null;
  };

  // Function to send a notification
  const sendNotification = async (receiverId, data) => {
    const notification = await Notification.create({
      receiverId,
      data,
    });
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getNotification", notification);
    } else {
      console.log("user is not connected");
    }
  };

  io.on("connection", (socket) => {
    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user)
        io.to(user.socketId).emit("getMessage", {
          senderId,
          text,
        });
      const senderUser = await getUserInformation(senderId);
      const message = `${senderUser.firstname}: ${text}`;
      sendNotification(receiverId, { type: "message", message });
    });

    socket.on("sendLikeNotification", async ({ userId, contentId }) => {
      // Replace with logic to determine the owner of the content
      const user = await getUserInformation(userId);
      let contentOwner = await findContentOwner(contentId);
      contentOwner = contentOwner.toString();
      if (contentOwner === userId) return;
      const message = `${user.firstname} ${user.lastname} liked your post`;
      sendNotification(contentOwner, { type: "post", message, contentId });
    });

    // When a user comments on something
    socket.on(
      "sendCommentNotification",
      async ({ userId, contentId, comment }) => {
        // Replace with logic to determine the owner of the content
        const user = await getUserInformation(userId);
        let contentOwner = await findContentOwner(contentId);
        contentOwner = contentOwner.toString();
        if (contentOwner === userId) return;
        const message = `${user.firstname} ${user.lastname} commented on your post`;

        sendNotification(contentOwner, { type: "post", message, contentId });
      }
    );

    //when disconnect
    socket.on("disconnect", () => {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};

export { ioConnect };
