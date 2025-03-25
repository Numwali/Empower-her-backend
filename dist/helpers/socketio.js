"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ioConnect = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _socket = _interopRequireDefault(require("socket.io"));
var _updateLastSeen = _interopRequireDefault(require("../utils/updateLastSeen.js"));
var _post = _interopRequireDefault(require("../models/post.js"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var _Notification = _interopRequireDefault(require("../models/Notification.js"));
var io;
var ioConnect = function ioConnect(http) {
  io = (0, _socket["default"])(http, {
    cors: {
      origin: "".concat(process.env.FRONTEND_URL)
    }
  });
  var users = [];
  var addUser = function addUser(userId, socketId) {
    !users.some(function (user) {
      return user.userId === userId;
    }) && users.push({
      userId: userId,
      socketId: socketId
    });
  };
  var removeUser = function removeUser(socketId) {
    var user = users.find(function (user) {
      return user.socketId === socketId;
    });
    if (user) (0, _updateLastSeen["default"])(user === null || user === void 0 ? void 0 : user.userId);
    users = users.filter(function (user) {
      return user.socketId !== socketId;
    });
  };
  var getUser = function getUser(userId) {
    return users.find(function (user) {
      return user.userId === userId;
    });
  };
  var getUserInformation = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
      var user;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel["default"].findById(userId);
          case 2:
            user = _context.sent;
            if (!user) {
              _context.next = 7;
              break;
            }
            return _context.abrupt("return", user);
          case 7:
            return _context.abrupt("return", null);
          case 8:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function getUserInformation(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  // Function to find the owner of a content
  var findContentOwner = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(contentId) {
      var content;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _post["default"].findById(contentId);
          case 2:
            content = _context2.sent;
            if (!content) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", content.user);
          case 7:
            return _context2.abrupt("return", null);
          case 8:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function findContentOwner(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  // Function to send a notification
  var sendNotification = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(receiverId, data) {
      var notification, user;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _Notification["default"].create({
              receiverId: receiverId,
              data: data
            });
          case 2:
            notification = _context3.sent;
            user = getUser(receiverId);
            if (user) {
              io.to(user.socketId).emit("getNotification", notification);
            } else {
              console.log("user is not connected");
            }
          case 5:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function sendNotification(_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }();
  io.on("connection", function (socket) {
    //when connect
    console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", function (userId) {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });
    socket.on("sendMessage", /*#__PURE__*/function () {
      var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
        var senderId, receiverId, text, user, senderUser, message;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              senderId = _ref4.senderId, receiverId = _ref4.receiverId, text = _ref4.text;
              user = getUser(receiverId);
              if (user) io.to(user.socketId).emit("getMessage", {
                senderId: senderId,
                text: text
              });
              _context4.next = 5;
              return getUserInformation(senderId);
            case 5:
              senderUser = _context4.sent;
              message = "".concat(senderUser.firstname, ": ").concat(text);
              sendNotification(receiverId, {
                type: "message",
                message: message
              });
            case 8:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      return function (_x5) {
        return _ref5.apply(this, arguments);
      };
    }());
    socket.on("sendLikeNotification", /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref6) {
        var userId, contentId, user, contentOwner, message;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              userId = _ref6.userId, contentId = _ref6.contentId;
              _context5.next = 3;
              return getUserInformation(userId);
            case 3:
              user = _context5.sent;
              _context5.next = 6;
              return findContentOwner(contentId);
            case 6:
              contentOwner = _context5.sent;
              contentOwner = contentOwner.toString();
              if (!(contentOwner === userId)) {
                _context5.next = 10;
                break;
              }
              return _context5.abrupt("return");
            case 10:
              message = "".concat(user.firstname, " ").concat(user.lastname, " liked your post");
              sendNotification(contentOwner, {
                type: "post",
                message: message,
                contentId: contentId
              });
            case 12:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      return function (_x6) {
        return _ref7.apply(this, arguments);
      };
    }());

    // When a user comments on something
    socket.on("sendCommentNotification", /*#__PURE__*/function () {
      var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_ref8) {
        var userId, contentId, comment, user, contentOwner, message;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              userId = _ref8.userId, contentId = _ref8.contentId, comment = _ref8.comment;
              _context6.next = 3;
              return getUserInformation(userId);
            case 3:
              user = _context6.sent;
              _context6.next = 6;
              return findContentOwner(contentId);
            case 6:
              contentOwner = _context6.sent;
              contentOwner = contentOwner.toString();
              if (!(contentOwner === userId)) {
                _context6.next = 10;
                break;
              }
              return _context6.abrupt("return");
            case 10:
              message = "".concat(user.firstname, " ").concat(user.lastname, " commented on your post");
              sendNotification(contentOwner, {
                type: "post",
                message: message,
                contentId: contentId
              });
            case 12:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      return function (_x7) {
        return _ref9.apply(this, arguments);
      };
    }());

    //when disconnect
    socket.on("disconnect", function () {
      console.log("a user disconnected!");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
};
exports.ioConnect = ioConnect;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc29ja2V0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfdXBkYXRlTGFzdFNlZW4iLCJfcG9zdCIsIl91c2VyTW9kZWwiLCJfTm90aWZpY2F0aW9uIiwiaW8iLCJpb0Nvbm5lY3QiLCJodHRwIiwic29ja2V0aW8iLCJjb3JzIiwib3JpZ2luIiwiY29uY2F0IiwicHJvY2VzcyIsImVudiIsIkZST05URU5EX1VSTCIsInVzZXJzIiwiYWRkVXNlciIsInVzZXJJZCIsInNvY2tldElkIiwic29tZSIsInVzZXIiLCJwdXNoIiwicmVtb3ZlVXNlciIsImZpbmQiLCJ1cGRhdGVMYXN0U2VlbiIsImZpbHRlciIsImdldFVzZXIiLCJnZXRVc2VySW5mb3JtYXRpb24iLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiVXNlciIsImZpbmRCeUlkIiwic2VudCIsImFicnVwdCIsInN0b3AiLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiZmluZENvbnRlbnRPd25lciIsIl9yZWYyIiwiX2NhbGxlZTIiLCJjb250ZW50SWQiLCJjb250ZW50IiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwiUG9zdCIsIl94MiIsInNlbmROb3RpZmljYXRpb24iLCJfcmVmMyIsIl9jYWxsZWUzIiwicmVjZWl2ZXJJZCIsImRhdGEiLCJub3RpZmljYXRpb24iLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJOb3RpZmljYXRpb24iLCJjcmVhdGUiLCJ0byIsImVtaXQiLCJjb25zb2xlIiwibG9nIiwiX3gzIiwiX3g0Iiwib24iLCJzb2NrZXQiLCJpZCIsIl9yZWY1IiwiX2NhbGxlZTQiLCJfcmVmNCIsInNlbmRlcklkIiwidGV4dCIsInNlbmRlclVzZXIiLCJtZXNzYWdlIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmlyc3RuYW1lIiwidHlwZSIsIl94NSIsIl9yZWY3IiwiX2NhbGxlZTUiLCJfcmVmNiIsImNvbnRlbnRPd25lciIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsInRvU3RyaW5nIiwibGFzdG5hbWUiLCJfeDYiLCJfcmVmOSIsIl9jYWxsZWU2IiwiX3JlZjgiLCJjb21tZW50IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiX3g3IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3NvY2tldGlvLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzb2NrZXRpbyBmcm9tIFwic29ja2V0LmlvXCI7XG5pbXBvcnQgdXBkYXRlTGFzdFNlZW4gZnJvbSBcIi4uL3V0aWxzL3VwZGF0ZUxhc3RTZWVuLmpzXCI7XG5pbXBvcnQgUG9zdCBmcm9tIFwiLi4vbW9kZWxzL3Bvc3QuanNcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9tb2RlbHMvdXNlck1vZGVsLmpzXCI7XG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gXCIuLi9tb2RlbHMvTm90aWZpY2F0aW9uLmpzXCI7XG5sZXQgaW87XG5cbmNvbnN0IGlvQ29ubmVjdCA9IChodHRwKSA9PiB7XG4gIGlvID0gc29ja2V0aW8oaHR0cCwge1xuICAgIGNvcnM6IHsgb3JpZ2luOiBgJHtwcm9jZXNzLmVudi5GUk9OVEVORF9VUkx9YCB9LFxuICB9KTtcblxuICBsZXQgdXNlcnMgPSBbXTtcbiAgY29uc3QgYWRkVXNlciA9ICh1c2VySWQsIHNvY2tldElkKSA9PiB7XG4gICAgIXVzZXJzLnNvbWUoKHVzZXIpID0+IHVzZXIudXNlcklkID09PSB1c2VySWQpICYmXG4gICAgICB1c2Vycy5wdXNoKHsgdXNlcklkLCBzb2NrZXRJZCB9KTtcbiAgfTtcblxuICBjb25zdCByZW1vdmVVc2VyID0gKHNvY2tldElkKSA9PiB7XG4gICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoKHVzZXIpID0+IHVzZXIuc29ja2V0SWQgPT09IHNvY2tldElkKTtcbiAgICBpZiAodXNlcikgdXBkYXRlTGFzdFNlZW4odXNlcj8udXNlcklkKTtcbiAgICB1c2VycyA9IHVzZXJzLmZpbHRlcigodXNlcikgPT4gdXNlci5zb2NrZXRJZCAhPT0gc29ja2V0SWQpO1xuICB9O1xuXG4gIGNvbnN0IGdldFVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgcmV0dXJuIHVzZXJzLmZpbmQoKHVzZXIpID0+IHVzZXIudXNlcklkID09PSB1c2VySWQpO1xuICB9O1xuXG4gIGNvbnN0IGdldFVzZXJJbmZvcm1hdGlvbiA9IGFzeW5jICh1c2VySWQpID0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnlJZCh1c2VySWQpO1xuICAgIGlmICh1c2VyKSByZXR1cm4gdXNlcjtcbiAgICBlbHNlIHJldHVybiBudWxsO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGZpbmQgdGhlIG93bmVyIG9mIGEgY29udGVudFxuICBjb25zdCBmaW5kQ29udGVudE93bmVyID0gYXN5bmMgKGNvbnRlbnRJZCkgPT4ge1xuICAgIGNvbnN0IGNvbnRlbnQgPSBhd2FpdCBQb3N0LmZpbmRCeUlkKGNvbnRlbnRJZCk7XG4gICAgaWYgKGNvbnRlbnQpIHJldHVybiBjb250ZW50LnVzZXI7XG4gICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvLyBGdW5jdGlvbiB0byBzZW5kIGEgbm90aWZpY2F0aW9uXG4gIGNvbnN0IHNlbmROb3RpZmljYXRpb24gPSBhc3luYyAocmVjZWl2ZXJJZCwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IGF3YWl0IE5vdGlmaWNhdGlvbi5jcmVhdGUoe1xuICAgICAgcmVjZWl2ZXJJZCxcbiAgICAgIGRhdGEsXG4gICAgfSk7XG4gICAgY29uc3QgdXNlciA9IGdldFVzZXIocmVjZWl2ZXJJZCk7XG4gICAgaWYgKHVzZXIpIHtcbiAgICAgIGlvLnRvKHVzZXIuc29ja2V0SWQpLmVtaXQoXCJnZXROb3RpZmljYXRpb25cIiwgbm90aWZpY2F0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ1c2VyIGlzIG5vdCBjb25uZWN0ZWRcIik7XG4gICAgfVxuICB9O1xuXG4gIGlvLm9uKFwiY29ubmVjdGlvblwiLCAoc29ja2V0KSA9PiB7XG4gICAgLy93aGVuIGNvbm5lY3RcbiAgICBjb25zb2xlLmxvZyhcImEgdXNlciBjb25uZWN0ZWQuXCIpO1xuXG4gICAgLy90YWtlIHVzZXJJZCBhbmQgc29ja2V0SWQgZnJvbSB1c2VyXG4gICAgc29ja2V0Lm9uKFwiYWRkVXNlclwiLCAodXNlcklkKSA9PiB7XG4gICAgICBhZGRVc2VyKHVzZXJJZCwgc29ja2V0LmlkKTtcbiAgICAgIGlvLmVtaXQoXCJnZXRVc2Vyc1wiLCB1c2Vycyk7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oXCJzZW5kTWVzc2FnZVwiLCBhc3luYyAoeyBzZW5kZXJJZCwgcmVjZWl2ZXJJZCwgdGV4dCB9KSA9PiB7XG4gICAgICBjb25zdCB1c2VyID0gZ2V0VXNlcihyZWNlaXZlcklkKTtcbiAgICAgIGlmICh1c2VyKVxuICAgICAgICBpby50byh1c2VyLnNvY2tldElkKS5lbWl0KFwiZ2V0TWVzc2FnZVwiLCB7XG4gICAgICAgICAgc2VuZGVySWQsXG4gICAgICAgICAgdGV4dCxcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBzZW5kZXJVc2VyID0gYXdhaXQgZ2V0VXNlckluZm9ybWF0aW9uKHNlbmRlcklkKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHtzZW5kZXJVc2VyLmZpcnN0bmFtZX06ICR7dGV4dH1gO1xuICAgICAgc2VuZE5vdGlmaWNhdGlvbihyZWNlaXZlcklkLCB7IHR5cGU6IFwibWVzc2FnZVwiLCBtZXNzYWdlIH0pO1xuICAgIH0pO1xuXG4gICAgc29ja2V0Lm9uKFwic2VuZExpa2VOb3RpZmljYXRpb25cIiwgYXN5bmMgKHsgdXNlcklkLCBjb250ZW50SWQgfSkgPT4ge1xuICAgICAgLy8gUmVwbGFjZSB3aXRoIGxvZ2ljIHRvIGRldGVybWluZSB0aGUgb3duZXIgb2YgdGhlIGNvbnRlbnRcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VySW5mb3JtYXRpb24odXNlcklkKTtcbiAgICAgIGxldCBjb250ZW50T3duZXIgPSBhd2FpdCBmaW5kQ29udGVudE93bmVyKGNvbnRlbnRJZCk7XG4gICAgICBjb250ZW50T3duZXIgPSBjb250ZW50T3duZXIudG9TdHJpbmcoKTtcbiAgICAgIGlmIChjb250ZW50T3duZXIgPT09IHVzZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3VzZXIuZmlyc3RuYW1lfSAke3VzZXIubGFzdG5hbWV9IGxpa2VkIHlvdXIgcG9zdGA7XG4gICAgICBzZW5kTm90aWZpY2F0aW9uKGNvbnRlbnRPd25lciwgeyB0eXBlOiBcInBvc3RcIiwgbWVzc2FnZSwgY29udGVudElkIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gV2hlbiBhIHVzZXIgY29tbWVudHMgb24gc29tZXRoaW5nXG4gICAgc29ja2V0Lm9uKFxuICAgICAgXCJzZW5kQ29tbWVudE5vdGlmaWNhdGlvblwiLFxuICAgICAgYXN5bmMgKHsgdXNlcklkLCBjb250ZW50SWQsIGNvbW1lbnQgfSkgPT4ge1xuICAgICAgICAvLyBSZXBsYWNlIHdpdGggbG9naWMgdG8gZGV0ZXJtaW5lIHRoZSBvd25lciBvZiB0aGUgY29udGVudFxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0VXNlckluZm9ybWF0aW9uKHVzZXJJZCk7XG4gICAgICAgIGxldCBjb250ZW50T3duZXIgPSBhd2FpdCBmaW5kQ29udGVudE93bmVyKGNvbnRlbnRJZCk7XG4gICAgICAgIGNvbnRlbnRPd25lciA9IGNvbnRlbnRPd25lci50b1N0cmluZygpO1xuICAgICAgICBpZiAoY29udGVudE93bmVyID09PSB1c2VySWQpIHJldHVybjtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3VzZXIuZmlyc3RuYW1lfSAke3VzZXIubGFzdG5hbWV9IGNvbW1lbnRlZCBvbiB5b3VyIHBvc3RgO1xuXG4gICAgICAgIHNlbmROb3RpZmljYXRpb24oY29udGVudE93bmVyLCB7IHR5cGU6IFwicG9zdFwiLCBtZXNzYWdlLCBjb250ZW50SWQgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vd2hlbiBkaXNjb25uZWN0XG4gICAgc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImEgdXNlciBkaXNjb25uZWN0ZWQhXCIpO1xuICAgICAgcmVtb3ZlVXNlcihzb2NrZXQuaWQpO1xuICAgICAgaW8uZW1pdChcImdldFVzZXJzXCIsIHVzZXJzKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBpb0Nvbm5lY3QgfTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsZUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsS0FBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUcsVUFBQSxHQUFBSixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUksYUFBQSxHQUFBTCxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBSUssRUFBRTtBQUVOLElBQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJQyxJQUFJLEVBQUs7RUFDMUJGLEVBQUUsR0FBRyxJQUFBRyxrQkFBUSxFQUFDRCxJQUFJLEVBQUU7SUFDbEJFLElBQUksRUFBRTtNQUFFQyxNQUFNLEtBQUFDLE1BQUEsQ0FBS0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFlBQVk7SUFBRztFQUNoRCxDQUFDLENBQUM7RUFFRixJQUFJQyxLQUFLLEdBQUcsRUFBRTtFQUNkLElBQU1DLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFJQyxNQUFNLEVBQUVDLFFBQVEsRUFBSztJQUNwQyxDQUFDSCxLQUFLLENBQUNJLElBQUksQ0FBQyxVQUFDQyxJQUFJO01BQUEsT0FBS0EsSUFB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