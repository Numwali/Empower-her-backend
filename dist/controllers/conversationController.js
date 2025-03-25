"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newConversation = exports.getUserConversation = exports.getTwoUsersConversation = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Conversation = _interopRequireDefault(require("../models/Conversation"));
var _message = _interopRequireDefault(require("../models/message"));
//new conv

var newConversation = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, senderId, receiverId, existingConversation, _newConversation, savedConversation;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, senderId = _req$body.senderId, receiverId = _req$body.receiverId;
          _context.prev = 1;
          _context.next = 4;
          return _Conversation["default"].findOne({
            members: {
              $all: [senderId, receiverId]
            }
          });
        case 4:
          existingConversation = _context.sent;
          if (!existingConversation) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Conversation already exists",
            conversation: existingConversation
          }));
        case 7:
          _newConversation = new _Conversation["default"]({
            members: [senderId, receiverId]
          });
          _context.next = 10;
          return _newConversation.save();
        case 10:
          savedConversation = _context.sent;
          res.status(200).json({
            conversation: savedConversation
          });
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 14]]);
  }));
  return function newConversation(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.newConversation = newConversation;
var getUserConversation = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var conversations, populatedConversations;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Conversation["default"].find({
            members: req.params.userId
          }).populate("members", "-password");
        case 3:
          conversations = _context3.sent;
          _context3.next = 6;
          return Promise.all(conversations.map( /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(conversation) {
              var lastMessage;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _message["default"].findOne({
                      conversationId: conversation._id
                    }, {}, {
                      sort: {
                        createdAt: -1
                      }
                    });
                  case 2:
                    lastMessage = _context2.sent;
                    return _context2.abrupt("return", {
                      conversation: conversation,
                      lastMessage: lastMessage || null
                    });
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 6:
          populatedConversations = _context3.sent;
          populatedConversations.sort(function (a, b) {
            var _b$lastMessage, _a$lastMessage;
            return (((_b$lastMessage = b.lastMessage) === null || _b$lastMessage === void 0 ? void 0 : _b$lastMessage.createdAt) || 0) - (((_a$lastMessage = a.lastMessage) === null || _a$lastMessage === void 0 ? void 0 : _a$lastMessage.createdAt) || 0);
          });
          res.status(200).json({
            conversations: populatedConversations
          });
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          res.status(500).json(_context3.t0);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function getUserConversation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getUserConversation = getUserConversation;
var getTwoUsersConversation = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var conversation;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Conversation["default"].findOne({
            members: {
              $all: [req.params.firstUserId, req.params.secondUserId]
            }
          });
        case 3:
          conversation = _context4.sent;
          res.status(200).json(conversation);
          _context4.next = 10;
          break;
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json(_context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getTwoUsersConversation(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getTwoUsersConversation = getTwoUsersConversation;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfQ29udmVyc2F0aW9uIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfbWVzc2FnZSIsIm5ld0NvbnZlcnNhdGlvbiIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIl9yZXEkYm9keSIsInNlbmRlcklkIiwicmVjZWl2ZXJJZCIsImV4aXN0aW5nQ29udmVyc2F0aW9uIiwiX25ld0NvbnZlcnNhdGlvbiIsInNhdmVkQ29udmVyc2F0aW9uIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImJvZHkiLCJDb252ZXJzYXRpb24iLCJmaW5kT25lIiwibWVtYmVycyIsIiRhbGwiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJjb252ZXJzYXRpb24iLCJzYXZlIiwidDAiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJnZXRVc2VyQ29udmVyc2F0aW9uIiwiX3JlZjIiLCJfY2FsbGVlMyIsImNvbnZlcnNhdGlvbnMiLCJwb3B1bGF0ZWRDb252ZXJzYXRpb25zIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZCIsInBhcmFtcyIsInVzZXJJZCIsInBvcHVsYXRlIiwiUHJvbWlzZSIsImFsbCIsIm1hcCIsIl9yZWYzIiwiX2NhbGxlZTIiLCJsYXN0TWVzc2FnZSIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsIk1lc3NhZ2UiLCJjb252ZXJzYXRpb25JZCIsIl9pZCIsInNvcnQiLCJjcmVhdGVkQXQiLCJfeDUiLCJhIiwiYiIsIl9iJGxhc3RNZXNzYWdlIiwiX2EkbGFzdE1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiX3gzIiwiX3g0IiwiZ2V0VHdvVXNlcnNDb252ZXJzYXRpb24iLCJfcmVmNCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmlyc3RVc2VySWQiLCJzZWNvbmRVc2VySWQiLCJfeDYiLCJfeDciXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvY29udmVyc2F0aW9uQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVyc2F0aW9uIGZyb20gXCIuLi9tb2RlbHMvQ29udmVyc2F0aW9uXCI7XG5pbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi4vbW9kZWxzL21lc3NhZ2VcIjtcblxuLy9uZXcgY29udlxuXG5leHBvcnQgY29uc3QgbmV3Q29udmVyc2F0aW9uID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgc2VuZGVySWQsIHJlY2VpdmVySWQgfSA9IHJlcS5ib2R5O1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBhd2FpdCBDb252ZXJzYXRpb24uZmluZE9uZSh7XG4gICAgICBtZW1iZXJzOiB7ICRhbGw6IFtzZW5kZXJJZCwgcmVjZWl2ZXJJZF0gfSxcbiAgICB9KTtcblxuICAgIGlmIChleGlzdGluZ0NvbnZlcnNhdGlvbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgbWVzc2FnZTogXCJDb252ZXJzYXRpb24gYWxyZWFkeSBleGlzdHNcIixcbiAgICAgICAgY29udmVyc2F0aW9uOiBleGlzdGluZ0NvbnZlcnNhdGlvbixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0NvbnZlcnNhdGlvbiA9IG5ldyBDb252ZXJzYXRpb24oe1xuICAgICAgbWVtYmVyczogW3NlbmRlcklkLCByZWNlaXZlcklkXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNhdmVkQ29udmVyc2F0aW9uID0gYXdhaXQgbmV3Q29udmVyc2F0aW9uLnNhdmUoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGNvbnZlcnNhdGlvbjogc2F2ZWRDb252ZXJzYXRpb24gfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQ29udmVyc2F0aW9uID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udmVyc2F0aW9ucyA9IGF3YWl0IENvbnZlcnNhdGlvbi5maW5kKHtcbiAgICAgIG1lbWJlcnM6IHJlcS5wYXJhbXMudXNlcklkLFxuICAgIH0pLnBvcHVsYXRlKFwibWVtYmVyc1wiLCBcIi1wYXNzd29yZFwiKTtcblxuICAgIGNvbnN0IHBvcHVsYXRlZENvbnZlcnNhdGlvbnMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGNvbnZlcnNhdGlvbnMubWFwKGFzeW5jIChjb252ZXJzYXRpb24pID0+IHtcbiAgICAgICAgY29uc3QgbGFzdE1lc3NhZ2UgPSBhd2FpdCBNZXNzYWdlLmZpbmRPbmUoXG4gICAgICAgICAgeyBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLl9pZCB9LFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHsgc29ydDogeyBjcmVhdGVkQXQ6IC0xIH0gfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICAgIGxhc3RNZXNzYWdlOiBsYXN0TWVzc2FnZSB8fCBudWxsLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgcG9wdWxhdGVkQ29udmVyc2F0aW9ucy5zb3J0KFxuICAgICAgKGEsIGIpID0+XG4gICAgICAgIChiLmxhc3RNZXNzYWdlPy5jcmVhdGVkQXQgfHwgMCkgLSAoYS5sYXN0TWVzc2FnZT8uY3JlYXRlZEF0IHx8IDApXG4gICAgKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgY29udmVyc2F0aW9uczogcG9wdWxhdGVkQ29udmVyc2F0aW9ucyB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VHdvVXNlcnNDb252ZXJzYXRpb24gPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSBhd2FpdCBDb252ZXJzYXRpb24uZmluZE9uZSh7XG4gICAgICBtZW1iZXJzOiB7ICRhbGw6IFtyZXEucGFyYW1zLmZpcnN0VXNlcklkLCByZXEucGFyYW1zLnNlY29uZFVzZXJJZF0gfSxcbiAgICB9KTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihjb252ZXJzYXRpb24pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbihlcnIpO1xuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxhQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxRQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFFQTs7QUFFTyxJQUFNRSxlQUFlO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsR0FBRyxFQUFFQyxHQUFHO0lBQUEsSUFBQUMsU0FBQSxFQUFBQyxRQUFBLEVBQUFDLFVBQUEsRUFBQUMsb0JBQUEsRUFBQUMsZ0JBQUEsRUFBQUMsaUJBQUE7SUFBQSxPQUFBVixZQUFBLFlBQUFXLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQVYsU0FBQSxHQUNYRixHQUFHLENBQUNhLElBQUksRUFBakNWLFFBQVEsR0FBQUQsU0FBQSxDQUFSQyxRQUFRLEVBQUVDLFVBQVUsR0FBQUYsU0FBQSxDQUFWRSxVQUFVO1VBQUFNLFFBQUEsQ0FBQUMsSUFBQTtVQUFBRCxRQUFBLENBQUFFLElBQUE7VUFBQSxPQUdTRSx3QkFBWSxDQUFDQyxPQUFPLENB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