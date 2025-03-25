"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newMessage = exports.getMessages = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _message = _interopRequireDefault(require("../models/message"));
//add
var newMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var newMessage, savedMessage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          newMessage = new _message["default"](req.body);
          _context.prev = 1;
          _context.next = 4;
          return newMessage.save();
        case 4:
          savedMessage = _context.sent;
          res.status(200).json(savedMessage);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function newMessage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//get
exports.newMessage = newMessage;
var getMessages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var conversationId, messages;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          conversationId = req.params.conversationId;
          if (conversationId) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: "conversationId is required"
          }));
        case 4:
          _context2.next = 6;
          return _message["default"].find({
            conversationId: conversationId
          });
        case 6:
          messages = _context2.sent;
          res.status(200).json(messages);
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getMessages(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getMessages = getMessages;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbWVzc2FnZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwibmV3TWVzc2FnZSIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsInNhdmVkTWVzc2FnZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJNZXNzYWdlIiwiYm9keSIsInNhdmUiLCJzZW50Iiwic3RhdHVzIiwianNvbiIsInQwIiwic3RvcCIsIl94IiwiX3gyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJleHBvcnRzIiwiZ2V0TWVzc2FnZXMiLCJfcmVmMiIsIl9jYWxsZWUyIiwiY29udmVyc2F0aW9uSWQiLCJtZXNzYWdlcyIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInBhcmFtcyIsImFicnVwdCIsIm1lc3NhZ2UiLCJmaW5kIiwiX3gzIiwiX3g0Il0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL21lc3NhZ2VDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNZXNzYWdlIGZyb20gXCIuLi9tb2RlbHMvbWVzc2FnZVwiO1xuXG4vL2FkZFxuZXhwb3J0IGNvbnN0IG5ld01lc3NhZ2UgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgbmV3TWVzc2FnZSA9IG5ldyBNZXNzYWdlKHJlcS5ib2R5KTtcblxuICB0cnkge1xuICAgIGNvbnN0IHNhdmVkTWVzc2FnZSA9IGF3YWl0IG5ld01lc3NhZ2Uuc2F2ZSgpO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHNhdmVkTWVzc2FnZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKGVycik7XG4gIH1cbn07XG5cbi8vZ2V0XG5leHBvcnQgY29uc3QgZ2V0TWVzc2FnZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkIH0gPSByZXEucGFyYW1zO1xuICAgIGlmICghY29udmVyc2F0aW9uSWQpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiY29udmVyc2F0aW9uSWQgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICB9XG4gICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBNZXNzYWdlLmZpbmQoe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbklkLFxuICAgIH0pO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKG1lc3NhZ2VzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oZXJyKTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsUUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBRUE7QUFDTyxJQUFNQyxVQUFVO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsR0FBRyxFQUFFQyxHQUFHO0lBQUEsSUFBQVAsVUFBQSxFQUFBUSxZQUFBO0lBQUEsT0FBQUwsWUFBQSxZQUFBTSxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7TUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtRQUFBO1VBQ2pDYixVQUFVLEdBQUcsSUFBSWMsbUJBQU8sQ0FBQ1IsR0FBRyxDQUFDUyxJQUFJLENBQUM7VUFBQUosUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBLE9BR1hiLFVBQVUsQ0FBQ2dCLElBQUksQ0FBQyxDQUFDO1FBQUE7VUFBdENSLFlBQVksR0FBQUcsUUFBQSxDQUFBTSxJQUFBO1VBQ2xCVixHQUFHLENBQUNXLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDWCxZQUFZLENBQUM7VUFBQ0csUUFBQSxDQUFBRSxJQUFBO1VBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFBQUQsUUFBQSxDQUFBUyxFQUFBLEdBQUFULFFBQUE7VUFFbkNKLEdBQUcsQ0FBQ1csTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUFSLFFBQUEsQ0FBQVMsRUFBSSxDQUFDO1FBQUM7UUFBQTtVQUFBLE9BQUFULFFBQUEsQ0FBQVUsSUFBQTtNQUFBO0lBQUEsR0FBQWhCLE9BQUE7RUFBQSxDQUU3QjtFQUFBLGdCQUFBTCxXQUFBc0IsRUFBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQXRCLElBQUEsQ0FBQXVCLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0FBQUE7O0FBRUQ7QUFBQUMsT0FBQSxDQUFBMUIsVUFBQSxHQUFBQSxVQUFBO0FBQ08sSUFBTTJCLFdBQVc7RUFBQSxJQUFBQyxLQUFBLE9BQUExQixrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQXlCLFNBQU92QixHQUFHLEVBQUVDLEdBQUc7SUFBQSxJQUFBdUIsY0FBQSxFQUFBQyxRQUFBO0lBQUEsT0FBQTVCLFlBQUEsWUFBQU0sSUFBQSxVQUFBdUIsVUFBQUMsU0FBQTtNQUFBLGtCQUFBQSxTQUFBLENBQUFyQixJQUFBLEdBQUFxQixTQUFBLENBQUFwQixJQUFBO1FBQUE7VUFBQW9CLFNBQUEsQ0FBQXJCLElBQUE7VUFFOUJrQixjQUFjLEdBQUt4QixHQUFHLENBQUM0QixNQUFNLENBQTdCSixjQUFjO1VBQUEsSUFDakJBLGNBQWM7WUFBQUcsU0FBQSxDQUFBcEIsSUFBQTtZQUFBO1VBQUE7VUFBQSxPQUFBb0IsU0FBQSxDQUFBRSxNQUFBLFdBQ1Y1QixHQUFHLENBQUNXLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVpQixPQUFPLEVBQUU7VUFBNkIsQ0FBQyxDQUFDO1FBQUE7VUFBQUgsU0FBQSxDQUFBcEIsSUFBQTtVQUFBLE9BRWpEQyxtQkFBTyxDQUFDdUIsSUFBSSxDQUFDO1lBQ2xDUCxjQUFjLEVBQUVBO1VBQ2xCLENBQUMsQ0FBQztRQUFBO1VBRklDLFFBQVEsR0FBQUUsU0FBQSxDQUFBaEIsSUFBQTtVQUdkVixHQUFHLENBQUNXLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDWSxRQUFRLENBQUM7VUFBQ0UsU0FBQSxDQUFBcEIsSUFBQTtVQUFBO1FBQUE7VUFBQW9CLFNBQUEsQ0FBQXJCLElBQUE7VUFBQXFCLFNBQUEsQ0FBQWIsRUFBQSxHQUFBYSxTQUFBO1VBRS9CMUIsR0FBRyxDQUFDVyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQWMsU0FBQSxDQUFBYixFQUFJLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQWEsU0FBQSxDQUFBWixJQUFBO01BQUE7SUFBQSxHQUFBUSxRQUFBO0VBQUEsQ0FFN0I7RUFBQSxnQkFiWUYsV0FBV0EsQ0FBQVcsR0FBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQVgsS0FBQSxDQUFBSixLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBYXZCO0FBQUNDLE9BQUEsQ0FBQUMsV0FBQSxHQUFBQSxXQUFBIn0=