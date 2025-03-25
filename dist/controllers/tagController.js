"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateTag = exports.getTag = exports.getAllTags = exports.deleteTag = exports.createTag = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Tag = _interopRequireDefault(require("../models/Tag"));
var createTag = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var name, tag;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          name = req.body.name;
          if (!(!name || name === "")) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Name is required"
          }));
        case 4:
          tag = new _Tag["default"]({
            name: name
          });
          _context.next = 7;
          return tag.save();
        case 7:
          return _context.abrupt("return", res.status(201).json({
            tag: tag
          }));
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function createTag(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createTag = createTag;
var getTag = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, tag;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return _Tag["default"].findById(id);
        case 4:
          tag = _context2.sent;
          if (tag) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Tag not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            tag: tag
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
  return function getTag(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getTag = getTag;
var getAllTags = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var tags;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _Tag["default"].find();
        case 3:
          tags = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            tags: tags
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
  return function getAllTags(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllTags = getAllTags;
var updateTag = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, name, newTag;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          name = req.body.name;
          if (!(!name || name === "")) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: "Name is required"
          }));
        case 5:
          _context4.next = 7;
          return _Tag["default"].findByIdAndUpdate(id, {
            name: name
          }, {
            "new": true
          });
        case 7:
          newTag = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            newTag: newTag
          }));
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function updateTag(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.updateTag = updateTag;
var deleteTag = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          _context5.next = 4;
          return _Tag["default"].findByIdAndDelete(id);
        case 4:
          return _context5.abrupt("return", res.status(200).json({
            message: "Tag deleted successfully"
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
  return function deleteTag(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.deleteTag = deleteTag;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfVGFnIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJjcmVhdGVUYWciLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXEiLCJyZXMiLCJuYW1lIiwidGFnIiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwibmV4dCIsImJvZHkiLCJhYnJ1cHQiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsIlRhZyIsInNhdmUiLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJnZXRUYWciLCJfcmVmMiIsIl9jYWxsZWUyIiwiaWQiLCJfY2FsbGVlMiQiLCJfY29udGV4dDIiLCJwYXJhbXMiLCJmaW5kQnlJZCIsInNlbnQiLCJfeDMiLCJfeDQiLCJnZXRBbGxUYWdzIiwiX3JlZjMiLCJfY2FsbGVlMyIsInRhZ3MiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kIiwiX3g1IiwiX3g2IiwidXBkYXRlVGFnIiwiX3JlZjQiLCJfY2FsbGVlNCIsIm5ld1RhZyIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImZpbmRCeUlkQW5kVXBkYXRlIiwiX3g3IiwiX3g4IiwiZGVsZXRlVGFnIiwiX3JlZjUiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsImZpbmRCeUlkQW5kRGVsZXRlIiwiX3g5IiwiX3gxMCJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90YWdDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYWcgZnJvbSBcIi4uL21vZGVscy9UYWdcIjtcblxuY29uc3QgY3JlYXRlVGFnID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIW5hbWUgfHwgbmFtZSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJOYW1lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFnID0gbmV3IFRhZyh7XG4gICAgICBuYW1lLFxuICAgIH0pO1xuICAgIGF3YWl0IHRhZy5zYXZlKCk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgdGFnIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBnZXRUYWcgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHRhZyA9IGF3YWl0IFRhZy5maW5kQnlJZChpZCk7XG4gICAgaWYgKCF0YWcpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiVGFnIG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyB0YWcgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEFsbFRhZ3MgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB0YWdzID0gYXdhaXQgVGFnLmZpbmQoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyB0YWdzIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVUYWcgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcmVxLmJvZHk7XG4gICAgaWYgKCFuYW1lIHx8IG5hbWUgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiTmFtZSBpcyByZXF1aXJlZFwiIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld1RhZyA9IGF3YWl0IFRhZy5maW5kQnlJZEFuZFVwZGF0ZShcbiAgICAgIGlkLFxuICAgICAge1xuICAgICAgICBuYW1lLFxuICAgICAgfSxcbiAgICAgIHsgbmV3OiB0cnVlIH1cbiAgICApO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IG5ld1RhZyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgZGVsZXRlVGFnID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcblxuICAgIGF3YWl0IFRhZy5maW5kQnlJZEFuZERlbGV0ZShpZCk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJUYWcgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHsg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