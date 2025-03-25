"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
// update last seen to current date

var updateLastSeen = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userModel["default"].findOneAndUpdate({
            _id: userId
          }, {
            lastSeen: new Date()
          }, {
            "new": true
          });
        case 3:
          user = _context.sent;
          return _context.abrupt("return", user);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function updateLastSeen(_x) {
    return _ref.apply(this, arguments);
  };
}();
var _default = updateLastSeen;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfdXNlck1vZGVsIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJ1cGRhdGVMYXN0U2VlbiIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInVzZXJJZCIsInVzZXIiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiVXNlciIsImZpbmRPbmVBbmRVcGRhdGUiLCJfaWQiLCJsYXN0U2VlbiIsIkRhdGUiLCJzZW50IiwiYWJydXB0IiwidDAiLCJjb25zb2xlIiwibG9nIiwic3RvcCIsIl94IiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfZGVmYXVsdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXBkYXRlTGFzdFNlZW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gdXBkYXRlIGxhc3Qgc2VlbiB0byBjdXJyZW50IGRhdGVcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9tb2RlbHMvdXNlck1vZGVsLmpzXCI7XG5jb25zdCB1cGRhdGVMYXN0U2VlbiA9IGFzeW5jICh1c2VySWQpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lQW5kVXBkYXRlKFxuICAgICAgeyBfaWQ6IHVzZXJJZCB9LFxuICAgICAgeyBsYXN0U2VlbjogbmV3IERhdGUoKSB9LFxuICAgICAgeyBuZXc6IHRydWUgfVxuICAgICk7XG4gICAgcmV0dXJuIHVzZXI7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZUxhc3RTZWVuO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQSxJQUFBQSxVQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFEQTs7QUFFQSxJQUFNQyxjQUFjO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsTUFBTTtJQUFBLElBQUFDLElBQUE7SUFBQSxPQUFBSixZQUFBLFlBQUFLLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQUUsSUFBQTtVQUFBLE9BRWJDLHFCQUFJLENBQUNDLGdCQUFnQixDQUN0QztZQUFFQyxHQUFHLEVBQUVUO1VBQU8sQ0FBQyxFQUNmO1lBQUVVLFFBQVEsRUFBRSxJQUFJQyxJQUFJLENBQUM7VUFBRSxDQUFDLEVBQ3hCO1lBQUUsT0FBSztVQUFLLENBQ2QsQ0FBQztRQUFBO1VBSktWLElBQUksR0FBQUcsUUFBQSxDQUFBUSxJQUFBO1VBQUEsT0FBQVIsUUFBQSxDQUFBUyxNQUFBLFdBS0haLElBQUk7UUFBQTtVQUFBRyxRQUFBLENBQUFDLElBQUE7VUFBQUQsUUFBQSxDQUFBVSxFQUFBLEdBQUFWLFFBQUE7VUFFWFcsT0FBTyxDQUFDQyxHQUFHLENBQUFaLFFBQUEsQ0FBQVUsRUFBSSxDQUFDO1FBQUM7UUFBQTtVQUFBLE9BQUFWLFFBQUEsQ0FBQWEsSUFBQTtNQUFBO0lBQUEsR0FBQWxCLE9BQUE7RUFBQSxDQUVwQjtFQUFBLGdCQVhLTCxjQUFjQSxDQUFBd0IsRUFBQTtJQUFBLE9BQUF2QixJQUFBLENBQUF3QixLQUFBLE9BQUFDLFNBQUE7RUFBQTtBQUFBLEdBV25CO0FBQUMsSUFBQUMsUUFBQSxHQUVhM0IsY0FBYztBQUFBNEIsT0FBQSxjQUFBRCxRQUFBIn0=