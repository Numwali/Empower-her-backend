"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var protect = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))) {
            _context.next = 14;
            break;
          }
          _context.prev = 1;
          // Get token from header
          token = req.headers.authorization.split(" ")[1];

          // Verify token
          decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET); // Get user from the token
          _context.next = 6;
          return _userModel["default"].findById(decoded.id).select("-password");
        case 6:
          req.user = _context.sent;
          next();
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(401).json({
            message: "Not authorized"
          });
        case 14:
          if (!token) {
            res.status(401).json({
              message: "Not authorized, no token"
            });
          }
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 10]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = protect;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNvbndlYnRva2VuIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfZXhwcmVzc0FzeW5jSGFuZGxlciIsIl91c2VyTW9kZWwiLCJwcm90ZWN0IiwiYXN5bmNIYW5kbGVyIiwiX3JlZiIsIl9hc3luY1RvR2VuZXJhdG9yMiIsIl9yZWdlbmVyYXRvciIsIm1hcmsiLCJfY2FsbGVlIiwicmVxIiwicmVzIiwibmV4dCIsInRva2VuIiwiZGVjb2RlZCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsImhlYWRlcnMiLCJhdXRob3JpemF0aW9uIiwic3RhcnRzV2l0aCIsInNwbGl0Iiwiand0IiwidmVyaWZ5IiwicHJvY2VzcyIsImVudiIsIkpXVF9TRUNSRVQiLCJVc2VyIiwiZmluZEJ5SWQiLCJpZCIsInNlbGVjdCIsInVzZXIiLCJzZW50IiwidDAiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJzdG9wIiwiX3giLCJfeDIiLCJfeDMiLCJhcHBseSIsImFyZ3VtZW50cyIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL3Byb3RlY3RSb3V0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBhc3luY0hhbmRsZXIgZnJvbSBcImV4cHJlc3MtYXN5bmMtaGFuZGxlclwiO1xuaW1wb3J0IFVzZXIgZnJvbSBcIi4uL21vZGVscy91c2VyTW9kZWwuanNcIjtcblxuY29uc3QgcHJvdGVjdCA9IGFzeW5jSGFuZGxlcihhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgbGV0IHRva2VuO1xuXG4gIGlmIChcbiAgICByZXEuaGVhZGVycy5hdXRob3JpemF0aW9uICYmXG4gICAgcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbi5zdGFydHNXaXRoKFwiQmVhcmVyXCIpXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgdG9rZW4gZnJvbSBoZWFkZXJcbiAgICAgIHRva2VuID0gcmVxLmhlYWRlcnMuYXV0aG9yaXphdGlvbi5zcGxpdChcIiBcIilbMV07XG5cbiAgICAgIC8vIFZlcmlmeSB0b2tlblxuICAgICAgY29uc3QgZGVjb2RlZCA9IGp3dC52ZXJpZnkodG9rZW4sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQpO1xuXG4gICAgICAvLyBHZXQgdXNlciBmcm9tIHRoZSB0b2tlblxuICAgICAgcmVxLnVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKGRlY29kZWQuaWQpLnNlbGVjdChcIi1wYXNzd29yZFwiKTtcblxuICAgICAgbmV4dCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IG1lc3NhZ2U6IFwiTm90IGF1dGhvcml6ZWRcIiB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAoIXRva2VuKSB7XG4gICAgcmVzLnN0YXR1cyg0MDEpLmpzb24oeyBtZXNzYWdlOiBcIk5vdCBhdXRob3JpemVkLCBubyB0b2tlblwiIH0pO1xuICB9XG59KTtcbmV4cG9ydCBkZWZhdWx0IHByb3RlY3Q7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLG9CQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxVQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFNRyxPQUFPLEdBQUcsSUFBQUMsK0JBQVk7RUFBQSxJQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBQyxTQUFBQyxRQUFPQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsSUFBSTtJQUFBLElBQUFDLEtBQUEsRUFBQUMsT0FBQTtJQUFBLE9BQUFQLFlBQUEsWUFBQVEsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO01BQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFMLElBQUE7UUFBQTtVQUFBLE1BSTlDRixHQUFHLENBQUNTLE9BQU8sQ0FBQ0MsYUFBYSxJQUN6QlYsR0FBRyxDQUFDUyxPQUFPLENBQUNDLGFBQWEsQ0FBQ0MsVUFBVSxDQUFDLFFBQVEsQ0FBQztZQUFBSixRQUFBLENBQUFMLElBQUE7WUFBQTtVQUFBO1VBQUFLLFFBQUEsQ0FBQUMsSUFBQTtVQUc1QztVQUNBTCxLQUFLLEdBQUdILEdBQUcsQ0FBQ1MsT0FBTyxDQUFDQyxhQUFhLENBQUNFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1VBRS9DO1VBQ01SLE9BQU8sR0FBR1Msd0JBQUcsQ0FBQ0MsTUFBTSxDQUFDWCxLQUFLLEVBQUVZLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLENBQUMsRUFFekQ7VUFBQVYsUUFBQSxDQUFBTCxJQUFBO1VBQUEsT0FDaUJnQixxQkFBSSxDQUFDQyxRQUFRLENBQUNmLE9BQU8sQ0FBQ2dCLEVBQUUsQ0FBQyxDQUFDQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQUE7VUFBOURyQixHQUFHLENBQUNzQixJQUFJLEdBQUFmLFFBQUEsQ0FBQWdCLElBQUE7VUFFUnJCLElBQUksQ0FBQyxDQUFDO1VBQUNLLFFBQUEsQ0FBQUwsSUFBQTtVQUFBO1FBQUE7VUFBQUssUUFBQSxDQUFBQyxJQUFBO1VBQUFELFFBQUEsQ0FBQWlCLEVBQUEsR0FBQWpCLFFBQUE7VUFFUGtCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFBbkIsUUFBQSxDQUFBaUIsRUFBTSxDQUFDO1VBQ2xCdkIsR0FBRyxDQUFDMEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsT0FBTyxFQUFFO1VBQWlCLENBQUMsQ0FBQztRQUFDO1VBSXhELElBQUksQ0FBQzFCLEtBQUssRUFBRTtZQUNWRixHQUFHLENBQUMwQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztjQUFFQyxPQUFPLEVBQUU7WUFBMkIsQ0FBQyxDQUFDO1VBQy9EO1FBQUM7UUFBQTtVQUFBLE9BQUF0QixRQUFBLENBQUF1QixJQUFBO01BQUE7SUFBQSxHQUFBL0IsT0FBQTtFQUFBLENBQ0Y7RUFBQSxpQkFBQWdDLEVBQUEsRUFBQUMsR0FBQSxFQUFBQyxHQUFBO0lBQUEsT0FBQXRDLElBQUEsQ0FBQXVDLEtBQUEsT0FBQUMsU0FBQTtFQUFBO0FBQUEsSUFBQztBQUFDLElBQUFDLFFBQUEsR0FDWTNDLE9BQU87QUFBQTRDLE9BQUEsY0FBQUQsUUFBQSJ9