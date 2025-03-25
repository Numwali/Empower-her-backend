"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRule = exports.getRule = exports.getAllRules = exports.deleteRule = exports.createRule = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Rule = _interopRequireDefault(require("../models/Rule"));
var createRule = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, name, description, rule;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, description = _req$body.description;
          if (!(!name || name === "")) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "name is required"
          }));
        case 4:
          if (!(!description || description === "")) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Description is required"
          }));
        case 6:
          rule = new _Rule["default"]({
            name: name,
            description: description
          });
          _context.next = 9;
          return rule.save();
        case 9:
          return _context.abrupt("return", res.status(201).json({
            rule: rule
          }));
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function createRule(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createRule = createRule;
var getRule = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, rule;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _Rule["default"].findById(id);
        case 4:
          rule = _context2.sent;
          if (rule) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Rule not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            rule: rule
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: _context2.t0.message
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getRule(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getRule = getRule;
var getAllRules = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var rules;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Rule["default"].find();
        case 3:
          rules = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            rules: rules
          }));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getAllRules(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllRules = getAllRules;
var updateRule = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, name, description, newRule;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
          if (!(!name || name === "")) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Name is required"
          }));
        case 5:
          if (!(!description || description === "")) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Description is required"
          }));
        case 7:
          _context4.next = 9;
          return _Rule["default"].findByIdAndUpdate(id, {
            name: name,
            description: description
          }, {
            "new": true
          });
        case 9:
          newRule = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            newRule: newRule
          }));
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function updateRule(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateRule = updateRule;
var deleteRule = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return _Rule["default"].findByIdAndDelete(id);
        case 4:
          return _context5.abrupt("return", res.status(200).json({
            message: "Rule deleted successfully"
          }));
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: _context5.t0.message
          }));
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function deleteRule(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteRule = deleteRule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfUnVsZSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiY3JlYXRlUnVsZSIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIl9yZXEkYm9keSIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInJ1bGUiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiYm9keSIsImFicnVwdCIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwiUnVsZSIsInNhdmUiLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJnZXRSdWxlIiwiX3JlZjIiLCJfY2FsbGVlMiIsImlkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicGFyYW1zIiwiZmluZEJ5SWQiLCJzZW50IiwiX3gzIiwiX3g0IiwiZ2V0QWxsUnVsZXMiLCJfcmVmMyIsIl9jYWxsZWUzIiwicnVsZXMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kIiwiX3g1IiwiX3g2IiwidXBkYXRlUnVsZSIsIl9yZWY0IiwiX2NhbGxlZTQiLCJfcmVxJGJvZHkyIiwibmV3UnVsZSIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImZpbmRCeUlkQW5kVXBkYXRlIiwiX3g3IiwiX3g4IiwiZGVsZXRlUnVsZSIsIl9yZWY1IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJmaW5kQnlJZEFuZERlbGV0ZSIsIl94OSIsIl94MTAiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvcnVsZUNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJ1bGUgZnJvbSBcIi4uL21vZGVscy9SdWxlXCI7XG5cbmNvbnN0IGNyZWF0ZVJ1bGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIW5hbWUgfHwgbmFtZSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJuYW1lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgfVxuICAgIGlmICghZGVzY3JpcHRpb24gfHwgZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWRcIiB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBydWxlID0gbmV3IFJ1bGUoe1xuICAgICAgbmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgIH0pO1xuICAgIGF3YWl0IHJ1bGUuc2F2ZSgpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuanNvbih7IHJ1bGUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldFJ1bGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHJ1bGUgPSBhd2FpdCBSdWxlLmZpbmRCeUlkKGlkKTtcbiAgICBpZiAoIXJ1bGUpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiUnVsZSBub3QgZm91bmRcIiB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcnVsZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgZ2V0QWxsUnVsZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBydWxlcyA9IGF3YWl0IFJ1bGUuZmluZCgpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHJ1bGVzIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVSdWxlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIW5hbWUgfHwgbmFtZSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJOYW1lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgfVxuICAgIGlmICghZGVzY3JpcHRpb24gfHwgZGVzY3JpcHRpb24gPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWRcIiB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSdWxlID0gYXdhaXQgUnVsZS5maW5kQnlJZEFuZFVwZGF0ZShcbiAgICAgIGlkLFxuICAgICAge1xuICAgICAgICBuYW1lLFxuICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgIH0sXG4gICAgICB7IG5ldzogdHJ1ZSB9XG4gICAgKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBuZXdSdWxlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBkZWxldGVSdWxlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcblxuICAgIGF3YWl0IFJ1bGUuZmluZEJ5SWRBbmREZWxldGUoaWQpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiUnVsZSBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5leHBvcnQgeyBjcmVhdGVSdWxlLCBnZXRSdWxlLCBnZXRBbGxSdWxlcywgdXBkYXRlUnVsZSwgZGVsZXRlUnVsZSB9O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFNQyxVQUFVO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsR0FBRyxFQUFFQyxHQUFHO0lBQUEsSUFBQUMsU0FBQSxFQUFBQyxJQUFBLEVBQUFDLFdBQUEsRUFBQUMsSUFBQTtJQUFBLE9BQUFSLFlBQUEsWUFBQVMsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO01BQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFBQVAsU0FBQSxHQUVBRixHQUFHLENBQUNXLElBQUksRUFBOUJSLElBQUksR0FBQUQsU0FBQSxDQUFKQyxJQUFJLEVBQUVDLFdBQVcsR0FBQUYsU0FBQSxDQUFYRSxX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