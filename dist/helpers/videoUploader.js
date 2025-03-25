"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = _interopRequireDefault(require("../config/cloudinary.js"));
var videoUploader = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var tmp, Result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          tmp = req.files.video.tempFilePath;
          _context.next = 4;
          return _cloudinary["default"].upload(tmp, {
            folder: "Heal-the-world",
            resource_type: "video"
          }, function (_, result) {
            return result;
          });
        case 4:
          Result = _context.sent;
          return _context.abrupt("return", Result);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function videoUploader(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = videoUploader;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY2xvdWRpbmFyeSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwidmlkZW9VcGxvYWRlciIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInRtcCIsIlJlc3VsdCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlcyIsInZpZGVvIiwidGVtcEZpbGVQYXRoIiwidXBsb2FkZXIiLCJ1cGxvYWQiLCJmb2xkZXIiLCJyZXNvdXJjZV90eXBlIiwiXyIsInJlc3VsdCIsInNlbnQiLCJhYnJ1cHQiLCJ0MCIsImNvbnNvbGUiLCJsb2ciLCJzdG9wIiwiX3giLCJhcHBseSIsImFyZ3VtZW50cyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL3ZpZGVvVXBsb2FkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwbG9hZGVyIGZyb20gXCIuLi9jb25maWcvY2xvdWRpbmFyeS5qc1wiO1xuXG5jb25zdCB2aWRlb1VwbG9hZGVyID0gYXN5bmMgKHJlcSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRtcCA9IHJlcS5maWxlcy52aWRlby50ZW1wRmlsZVBhdGg7XG4gICAgY29uc3QgUmVzdWx0ID0gYXdhaXQgdXBsb2FkZXIudXBsb2FkKFxuICAgICAgdG1wLFxuICAgICAgeyBmb2xkZXI6IFwiSGVhbC10aGUtd29ybGRcIiwgcmVzb3VyY2VfdHlwZTogXCJ2aWRlb1wiIH0sXG4gICAgICAoXywgcmVzdWx0KSA9PiByZXN1bHRcbiAgICApO1xuICAgIHJldHVybiBSZXN1bHQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCB2aWRlb1VwbG9hZGVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxXQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFNQyxhQUFhO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsR0FBRztJQUFBLElBQUFDLEdBQUEsRUFBQUMsTUFBQTtJQUFBLE9BQUFMLFlBQUEsWUFBQU0sSUFBQSxVQUFBQyxTQUFBQyxRQUFBO01BQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFFdEJMLEdBQUcsR0FBR0QsR0FBRyxDQUFDUSxLQUFLLENBQUNDLEtBQUssQ0FBQ0MsWUFBWTtVQUFBTCxRQUFBLENBQUFFLElBQUE7VUFBQSxPQUNuQkksc0JBQVEsQ0FBQ0MsTUFBTSxDQUNsQ1gsR0FBRyxFQUNIO1lBQUVZLE1BQU0sRUFBRSxnQkFBZ0I7WUFBRUMsYUFBYSxFQUFFO1VBQVEsQ0FBQyxFQUNwRCxVQUFDQyxDQUFDLEVBQUVDLE1BQU07WUFBQSxPQUFLQSxNQUFNO1VBQUEsQ0FDdkIsQ0FBQztRQUFBO1VBSktkLE1BQU0sR0FBQUcsUUFBQSxDQUFBWSxJQUFBO1VBQUEsT0FBQVosUUFBQSxDQUFBYSxNQUFBLFdBS0xoQixNQUFNO1FBQUE7VUFBQUcsUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQWMsRUFBQSxHQUFBZCxRQUFBO1VBRWJlLE9BQU8sQ0FBQ0MsR0FBRyxDQUFBaEIsUUFBQSxDQUFBYyxFQUFNLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQWQsUUFBQSxDQUFBaUIsSUFBQTtNQUFBO0lBQUEsR0FBQXZCLE9BQUE7RUFBQSxDQUV0QjtFQUFBLGdCQVpLTCxhQUFhQSxDQUFBNkIsRUFBQTtJQUFBLE9BQUE1QixJQUFBLENBQUE2QixLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBWWxCO0FBQUMsSUFBQUMsUUFBQSxHQUVhaEMsYUFBYTtBQUFBaUMsT0FBQSxjQUFBRCxRQUFBIn0=