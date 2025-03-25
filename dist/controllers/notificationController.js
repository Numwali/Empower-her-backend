"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readNotification = exports.getUserNotifications = exports.deleteNotification = exports.deleteAllNotification = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Notification = _interopRequireDefault(require("../models/Notification"));
var getUserNotifications = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, notifications;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.user;
          _context.next = 4;
          return _Notification["default"].find({
            receiverId: user.id
          });
        case 4:
          notifications = _context.sent;
          return _context.abrupt("return", res.status(200).json({
            message: "Notification retrieved successful",
            notifications: notifications
          }));
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function getUserNotifications(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUserNotifications = getUserNotifications;
var deleteNotification = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _Notification["default"].findByIdAndDelete(req.params.id);
        case 3:
          notification = _context2.sent;
          if (notification) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Notification not found"
          }));
        case 6:
          return _context2.abrupt("return", res.status(200).json({
            message: "Notification deleted successful"
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function deleteNotification(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.deleteNotification = deleteNotification;
var deleteAllNotification = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var notifications;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Notification["default"].deleteMany({
            recieverId: req.params.id
          });
        case 3:
          notifications = _context3.sent;
          if (notifications) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Notification not found"
          }));
        case 6:
          return _context3.abrupt("return", res.status(200).json({
            message: "All Notification deleted successful"
          }));
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function deleteAllNotification(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deleteAllNotification = deleteAllNotification;
var readNotification = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var notification;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _Notification["default"].findByIdAndUpdate(req.params.id, {
            isRead: true
          }, {
            "new": true
          });
        case 3:
          notification = _context4.sent;
          if (notification) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Notification not found"
          }));
        case 6:
          return _context4.abrupt("return", res.status(200).json({
            message: "Notification read successful"
          }));
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function readNotification(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.readNotification = readNotification;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfTm90aWZpY2F0aW9uIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJnZXRVc2VyTm90aWZpY2F0aW9ucyIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsInVzZXIiLCJub3RpZmljYXRpb25zIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsIk5vdGlmaWNhdGlvbiIsImZpbmQiLCJyZWNlaXZlcklkIiwiaWQiLCJzZW50IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInN0b3AiLCJfeCIsIl94MiIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXhwb3J0cyIsImRlbGV0ZU5vdGlmaWNhdGlvbiIsIl9yZWYyIiwiX2NhbGxlZTIiLCJub3RpZmljYXRpb24iLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJmaW5kQnlJZEFuZERlbGV0ZSIsInBhcmFtcyIsIl94MyIsIl94NCIsImRlbGV0ZUFsbE5vdGlmaWNhdGlvbiIsIl9yZWYzIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJkZWxldGVNYW55IiwicmVjaWV2ZXJJZCIsIl94NSIsIl94NiIsInJlYWROb3RpZmljYXRpb24iLCJfcmVmNCIsIl9jYWxsZWU0IiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmluZEJ5SWRBbmRVcGRhdGUiLCJpc1JlYWQiLCJfeDciLCJfeDgiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvbm90aWZpY2F0aW9uQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gXCIuLi9tb2RlbHMvTm90aWZpY2F0aW9uXCI7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyTm90aWZpY2F0aW9ucyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbnMgPSBhd2FpdCBOb3RpZmljYXRpb24uZmluZCh7XG4gICAgICByZWNlaXZlcklkOiB1c2VyLmlkLFxuICAgIH0pO1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIk5vdGlmaWNhdGlvbiByZXRyaWV2ZWQgc3VjY2Vzc2Z1bFwiLCBub3RpZmljYXRpb25zIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvciB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZU5vdGlmaWNhdGlvbiA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbiA9IGF3YWl0IE5vdGlmaWNhdGlvbi5maW5kQnlJZEFuZERlbGV0ZShyZXEucGFyYW1zLmlkKTtcbiAgICBpZiAoIW5vdGlmaWNhdGlvbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJOb3RpZmljYXRpb24gbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiTm90aWZpY2F0aW9uIGRlbGV0ZWQgc3VjY2Vzc2Z1bFwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge31cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVBbGxOb3RpZmljYXRpb24gPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBub3RpZmljYXRpb25zID0gYXdhaXQgTm90aWZpY2F0aW9uLmRlbGV0ZU1hbnkoe1xuICAgICAgcmVjaWV2ZXJJZDogcmVxLnBhcmFtcy5pZCxcbiAgICB9KTtcbiAgICBpZiAoIW5vdGlmaWNhdGlvbnMpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiTm90aWZpY2F0aW9uIG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gICAgICAuc3RhdHVzKDIwMClcbiAgICAgIC5qc29uKHsgbWVzc2FnZTogXCJBbGwgTm90aWZpY2F0aW9uIGRlbGV0ZWQgc3VjY2Vzc2Z1bFwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge31cbn07XG5cbmV4cG9ydCBjb25zdCByZWFkTm90aWZpY2F0aW9uID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uID0gYXdhaXQgTm90aWZpY2F0aW9uLmZpbmRCeUlkQW5kVXBkYXRlKFxuICAgICAgcmVxLnBhcmFtcy5pZCxcbiAgICAgIHsgaXNSZWFkOiB0cnVlIH0sXG4gICAgICB7IG5ldzogdHJ1ZSB9XG4gICAgKTtcbiAgICBpZiAoIW5vdGlmaWNhdGlvbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJOb3RpZmljYXRpb24gbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiTm90aWZpY2F0aW9uIHJlYWQgc3VjY2Vzc2Z1bFwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge31cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVPLElBQU1DLG9CQUFvQjtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFBQU9DLEdBQUcsRUFBRUMsR0FBRztJQUFBLElBQUFDLElBQUEsRUFBQUMsYUFBQTtJQUFBLE9BQUFOLFlBQUEsWUFBQU8sSUFBQSxVQUFBQyxTQUFBQyxRQUFB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