"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var connectDB = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _mongoose["default"].set("strictQuery", true);
          _context.next = 4;
          return _mongoose["default"].connect(process.env.NODE_ENV == "production" ? process.env.PRO_MONGODB_URL : process.env.DEV_MONGODB_URL, {
            useNewUrlParser: true
          });
        case 4:
          console.log("db connected successfully! ");
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error: ".concat(_context.t0, " "));
          process.exit(1);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function connectDB() {
    return _ref.apply(this, arguments);
  };
}();
var _default = connectDB;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9uZ29vc2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImNvbm5lY3REQiIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJtb25nb29zZSIsInNldCIsImNvbm5lY3QiLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJQUk9fTU9OR09EQl9VUkwiLCJERVZfTU9OR09EQl9VUkwiLCJ1c2VOZXdVcmxQYXJzZXIiLCJjb25zb2xlIiwibG9nIiwidDAiLCJlcnJvciIsImNvbmNhdCIsImV4aXQiLCJzdG9wIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlnL2RiLmNvbmZpZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IGNvbm5lY3REQiA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBtb25nb29zZS5zZXQoXCJzdHJpY3RRdWVyeVwiLCB0cnVlKTtcbiAgICBhd2FpdCBtb25nb29zZS5jb25uZWN0KFxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSBcInByb2R1Y3Rpb25cIlxuICAgICAgICAgICAgPyBwcm9jZXNzLmVudi5QUk9fTU9OR09EQl9VUkxcbiAgICAgICAgICAgIDogcHJvY2Vzcy5lbnYuREVWX01PTkdPREJfVVJMLFxuICAgICAgICB7XG4gICAgICAgICAgICB1c2VOZXdVcmxQYXJzZXI6IHRydWUsXG4gICAgICAgIH1cbiAgICApO1xuICAgIGNvbnNvbGUubG9nKGBkYiBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5ISBgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGBFcnJvcjogJHtlcnJvcn0gYCk7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0REI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLFNBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQU1DLFNBQVM7RUFBQSxJQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBRyxTQUFBQyxRQUFBO0lBQUEsT0FBQUYsWUFBQSxZQUFBRyxJQUFBLFVBQUFDLFNBQUFDLFFBQUE7TUFBQSxrQkFBQUEsUUFBQSxDQUFBQyxJQUFBLEdBQUFELFFBQUEsQ0FBQUUsSUFBQTtRQUFBO1VBQUFGLFFBQUEsQ0FBQUMsSUFBQTtVQUVkRSxvQkFBUSxDQUFDQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQztVQUFDSixRQUFBLENBQUFFLElBQUE7VUFBQSxPQUM1QkMsb0JBQVEsQ0FBQ0UsT0FBTyxDQUNsQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVEsSUFBSSxZQUFZLEdBQzlCRixPQUFPLENBQUNDLEdBQUcsQ0FBQ0UsZUFBZSxHQUMzQkgsT0FBTyxDQUFDQyxHQUFHLENBQUNHLGVBQWUsRUFDakM7WUFDSUMsZUFBZSxFQUFFO1VBQ3JCLENBQ0osQ0FBQztRQUFBO1VBQ0RDLE9BQU8sQ0FBQ0MsR0FBRyw4QkFBOEIsQ0FBQztVQUFDYixRQUFBLENBQUFFLElBQUE7VUFBQTtRQUFBO1VBQUFGLFFBQUEsQ0FBQUMsSUFBQTtVQUFBRCxRQUFBLENBQUFjLEVBQUEsR0FBQWQsUUFBQTtVQUUzQ1ksT0FBTyxDQUFDRyxLQUFLLFdBQUFDLE1BQUEsQ0FBQWhCLFFBQUEsQ0FBQWMsRUFBQSxNQUFtQixDQUFDO1VBQ2pDUixPQUFPLENBQUNXLElBQUksQ0FBQyxDQUFDLENBQUM7UUFBQztRQUFBO1VBQUEsT0FBQWpCLFFBQUEsQ0FBQWtCLElBQUE7TUFBQTtJQUFBLEdBQUFyQixPQUFBO0VBQUEsQ0FFbkI7RUFBQSxnQkFoQktMLFNBQVNBLENBQUE7SUFBQSxPQUFBQyxJQUFBLENBQUEwQixLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBZ0JkO0FBQUMsSUFBQUMsUUFBQSxHQUVhN0IsU0FBUztBQUFBOEIsT0FBQSxjQUFBRCxRQUFBIn0=