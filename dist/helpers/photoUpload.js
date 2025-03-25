"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = _interopRequireDefault(require("../config/cloudinary.js"));
var imageUploader = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var tmp, Result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          tmp = req.files.image.tempFilePath;
          _context.next = 4;
          return _cloudinary["default"].upload(tmp, {
            folder: "empower_pic"
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
  return function imageUploader(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = imageUploader;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY2xvdWRpbmFyeSIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiaW1hZ2VVcGxvYWRlciIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInRtcCIsIlJlc3VsdCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJmaWxlcyIsImltYWdlIiwidGVtcEZpbGVQYXRoIiwidXBsb2FkZXIiLCJ1cGxvYWQiLCJmb2xkZXIiLCJfIiwicmVzdWx0Iiwic2VudCIsImFicnVwdCIsInQwIiwiY29uc29sZSIsImxvZyIsInN0b3AiLCJfeCIsImFwcGx5IiwiYXJndW1lbnRzIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvcGhvdG9VcGxvYWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVwbG9hZGVyIGZyb20gXCIuLi9jb25maWcvY2xvdWRpbmFyeS5qc1wiO1xuXG5jb25zdCBpbWFnZVVwbG9hZGVyID0gYXN5bmMgKHJlcSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHRtcCA9IHJlcS5maWxlcy5pbWFnZS50ZW1wRmlsZVBhdGg7XG4gICAgY29uc3QgUmVzdWx0ID0gYXdhaXQgdXBsb2FkZXIudXBsb2FkKFxuICAgICAgdG1wLFxuICAgICAgeyBmb2xkZXI6IFwiZW1wb3dlcl9waWNcIiB9LFxuICAgICAgKF8sIHJlc3VsdCkgPT4gcmVzdWx0XG4gICAgKTtcbiAgICByZXR1cm4gUmVzdWx0O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgaW1hZ2VVcGxvYWRlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsV0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBRUEsSUFBTUMsYUFBYTtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFBQU9DLEdBQUc7SUFBQSxJQUFBQyxHQUFBLEVBQUFDLE1BQUE7SUFBQSxPQUFBTCxZQUFBLFlBQUFNLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBRXRCTCxHQUFHLEdBQUdELEdBQUcsQ0FBQ1EsS0FBSyxDQUFDQyxLQUFLLENBQUNDLFlBQVk7VUFBQUwsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FDbkJJLHNCQUFRLENBQUNDLE1BQU0sQ0FDbENYLEdBQUcsRUFDSDtZQUFFWSxNQUFNLEVBQUU7VUFBYyxDQUFDLEVBQ3pCLFVBQUNDLENBQUMsRUFBRUMsTUFBTTtZQUFBLE9BQUtBLE1BQU07VUFBQSxDQUN2QixDQUFDO1FBQUE7VUFKS2IsTUFBTSxHQUFBRyxRQUFBLENBQUFXLElBQUE7VUFBQSxPQUFBWCxRQUFBLENBQUFZLE1BQUEsV0FLTGYsTUFBTTtRQUFBO1VBQUFHLFFBQUEsQ0FBQUMsSUFBQTtVQUFBRCxRQUFBLENBQUFhLEVBQUEsR0FBQWIsUUFBQTtVQUViYyxPQUFPLENBQUNDLEdBQUcsQ0FBQWYsUUFBQSxDQUFBYSxFQUFNLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQWIsUUFBQSxDQUFBZ0IsSUFBQTtNQUFBO0lBQUEsR0FBQXRCLE9BQUE7RUFBQSxDQUV0QjtFQUFBLGdCQVpLTCxhQUFhQSxDQUFBNEIsRUFBQTtJQUFBLE9BQUEzQixJQUFBLENBQUE0QixLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBWWxCO0FBQUMsSUFBQUMsUUFBQSxHQUVhL0IsYUFBYTtBQUFBZ0MsT0FBQSxjQUFBRCxRQUFBIn0=