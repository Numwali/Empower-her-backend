"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var googleAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var logingUser, userInfo, salt, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _userModel["default"].findOne({
            email: req.user.email
          });
        case 3:
          logingUser = _context.sent;
          if (!logingUser) {
            _context.next = 10;
            break;
          }
          userInfo = {
            id: logingUser._id,
            username: logingUser.username,
            firstname: logingUser.firstname,
            lastname: logingUser.lastname,
            gender: logingUser.gender,
            address: logingUser.address,
            email: logingUser.email,
            role: logingUser.role,
            phone: logingUser.phone,
            dob: logingUser.dob,
            profileImage: logingUser.profileImage
          };
          userInfo = JSON.stringify(userInfo);
          return _context.abrupt("return", res.redirect("".concat(process.env.FRONTEND_URL, "/login?token=").concat(createToken(logingUser._id), "&&user=").concat(userInfo)));
        case 10:
          _context.next = 12;
          return _bcryptjs["default"].genSalt(10);
        case 12:
          salt = _context.sent;
          _context.next = 15;
          return _bcryptjs["default"].hash(req.user.displayName, salt);
        case 15:
          hashedPassword = _context.sent;
          _context.next = 18;
          return _userModel["default"].create({
            firstname: req.user.name.givenName,
            lastname: req.user.name.familyName,
            username: req.user.displayName,
            email: req.user.email,
            profileImage: req.user.picture,
            password: hashedPassword,
            role: "user"
          });
        case 18:
          user = _context.sent;
          userInfo = {
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            address: user.address,
            email: user.email,
            role: user.role,
            phone: user.phone,
            dob: user.dob,
            profileImage: user.profileImage
          };
          userInfo = JSON.stringify(userInfo);
          return _context.abrupt("return", res.redirect("".concat(process.env.FRONTEND_URL, "/login/?token=").concat(createToken(user._id), "&&user=").concat(userInfo, "}")));
        case 22:
          _context.next = 27;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
        case 27:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function googleAuth(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var createToken = function createToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};
var _default = googleAuth;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNvbndlYnRva2VuIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfYmNyeXB0anMiLCJfdXNlck1vZGVsIiwiZ29vZ2xlQXV0aCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsImxvZ2luZ1VzZXIiLCJ1c2VySW5mbyIsInNhbHQiLCJoYXNoZWRQYXNzd29yZCIsInVzZXIiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiVXNlciIsImZpbmRPbmUiLCJlbWFpbCIsInNlbnQiLCJpZCIsIl9pZCIsInVzZXJuYW1lIiwiZmlyc3RuYW1lIiwibGFzdG5hbWUiLCJnZW5kZXIiLCJhZGRyZXNzIiwicm9sZSIsInBob25lIiwiZG9iIiwicHJvZmlsZUltYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsImFicnVwdCIsInJlZGlyZWN0IiwiY29uY2F0IiwicHJvY2VzcyIsImVudiIsIkZST05URU5EX1VSTCIsImNyZWF0ZVRva2VuIiwiYmNyeXB0IiwiZ2VuU2FsdCIsImhhc2giLCJkaXNwbGF5TmFtZSIsImNyZWF0ZSIsIm5hbWUiLCJnaXZlbk5hbWUiLCJmYW1pbHlOYW1lIiwicGljdHVyZSIsInBhc3N3b3JkIiwidDAiLCJjb25zb2xlIiwibG9nIiwic3RvcCIsIl94IiwiX3gyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJqd3QiLCJzaWduIiwiSldUX1NFQ1JFVCIsImV4cGlyZXNJbiIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9nb29nbGVBdXRoQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vbW9kZWxzL3VzZXJNb2RlbC5qc1wiO1xuY29uc3QgZ29vZ2xlQXV0aCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGxvZ2luZ1VzZXIgPSBhd2FpdCBVc2VyLmZpbmRPbmUoe1xuICAgICAgZW1haWw6IHJlcS51c2VyLmVtYWlsLFxuICAgIH0pO1xuICAgIGlmIChsb2dpbmdVc2VyKSB7XG4gICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgIGlkOiBsb2dpbmdVc2VyLl9pZCxcbiAgICAgICAgdXNlcm5hbWU6IGxvZ2luZ1VzZXIudXNlcm5hbWUsXG4gICAgICAgIGZpcnN0bmFtZTogbG9naW5nVXNlci5maXJzdG5hbWUsXG4gICAgICAgIGxhc3RuYW1lOiBsb2dpbmdVc2VyLmxhc3RuYW1lLFxuICAgICAgICBnZW5kZXI6IGxvZ2luZ1VzZXIuZ2VuZGVyLFxuICAgICAgICBhZGRyZXNzOiBsb2dpbmdVc2VyLmFkZHJlc3MsXG4gICAgICAgIGVtYWlsOiBsb2dpbmdVc2VyLmVtYWlsLFxuICAgICAgICByb2xlOiBsb2dpbmdVc2VyLnJvbGUsXG4gICAgICAgIHBob25lOiBsb2dpbmdVc2VyLnBob25lLFxuICAgICAgICBkb2I6IGxvZ2luZ1VzZXIuZG9iLFxuICAgICAgICBwcm9maWxlSW1hZ2U6IGxvZ2luZ1VzZXIucHJvZmlsZUltYWdlLFxuICAgICAgfTtcbiAgICAgIHVzZXJJbmZvID0gSlNPTi5zdHJpbmdpZnkodXNlckluZm8pO1xuICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdChcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuRlJPTlRFTkRfVVJMfS9sb2dpbj90b2tlbj0ke2NyZWF0ZVRva2VuKFxuICAgICAgICAgIGxvZ2luZ1VzZXIuX2lkXG4gICAgICAgICl9JiZ1c2VyPSR7dXNlckluZm99YFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcbiAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocmVxLnVzZXIuZGlzcGxheU5hbWUsIHNhbHQpO1xuXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgICBmaXJzdG5hbWU6IHJlcS51c2VyLm5hbWUuZ2l2ZW5OYW1lLFxuICAgICAgICBsYXN0bmFtZTogcmVxLnVzZXIubmFtZS5mYW1pbHlOYW1lLFxuICAgICAgICB1c2VybmFtZTogcmVxLnVzZXIuZGlzcGxheU5hbWUsXG4gICAgICAgIGVtYWlsOiByZXEudXNlci5lbWFpbCxcbiAgICAgICAgcHJvZmlsZUltYWdlOiByZXEudXNlci5waWN0dXJlLFxuICAgICAgICBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsXG4gICAgICAgIHJvbGU6IFwidXNlclwiLFxuICAgICAgfSk7XG4gICAgICB2YXIgdXNlckluZm8gPSB7XG4gICAgICAgIGlkOiB1c2VyLl9pZCxcbiAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgIGZpcnN0bmFtZTogdXNlci5maXJzdG5hbWUsXG4gICAgICAgIGxhc3RuYW1lOiB1c2VyLmxhc3RuYW1lLFxuICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxuICAgICAgICBhZGRyZXNzOiB1c2VyLmFkZHJlc3MsXG4gICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIHBob25lOiB1c2VyLnBob25lLFxuICAgICAgICBkb2I6IHVzZXIuZG9iLFxuICAgICAgICBwcm9maWxlSW1hZ2U6IHVzZXIucHJvZmlsZUltYWdlLFxuICAgICAgfTtcbiAgICAgIHVzZXJJbmZvID0gSlNPTi5zdHJpbmdpZnkodXNlckluZm8pO1xuICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdChcbiAgICAgICAgYCR7cHJvY2Vzcy5lbnYuRlJPTlRFTkRfVVJMfS9sb2dpbi8/dG9rZW49JHtjcmVhdGVUb2tlbihcbiAgICAgICAgICB1c2VyLl9pZFxuICAgICAgICApfSYmdXNlcj0ke3VzZXJJbmZvfX1gXG4gICAgICApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVRva2VuID0gKGlkKSA9PiB7XG4gIHJldHVybiBqd3Quc2lnbih7IGlkIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsIHsgZXhwaXJlc0luOiBcIjFkXCIgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ29vZ2xlQXV0aDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsYUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsVUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBTUcsVUFBVTtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFBQU9DLEdBQUcsRUFBRUMsR0FBRztJQUFBLElBQUFDLFVBQUEsRUFBQUMsUUFBQSxFQUFBQyxJQUFBLEVBQUFDLGNBQUEsRUFBQUMsSUFBQTtJQUFBLE9BQUFULFlBQUEsWUFBQVUsSUFBQSxVQUFBQyxTQUFBQyxRQUFBO01BQUEsa0JBQUFBLFFBQUEsQ0FBQUMsSUFBQSxHQUFBRCxRQUFBLENBQUFFLElBQUE7UUFBQTtVQUFBRixRQUFBLENBQUFDLElBQUE7VUFBQUQsUUFBQSxDQUFBRSxJQUFBO1VBQUEsT0FFTEMscUJBQUksQ0FBQ0MsT0FBTyxDQUFDO1lBQ3BDQyxLQUFLLEVBQUVkLEdBQUcsQ0FBQ00sSUFBSSxDQUFDUTtVQUNsQixDQUFDLENBQUM7UUFBQTtVQUZJWixVQUFVLEdBQUFPLFFBQUEsQ0FBQU0sSUFBQTtVQUFBLEtBR1piLFVBQVU7WUFBQU8sUUFBQSxDQUFBRSxJQUFBO1lBQUE7VUFBQTtVQUNSUixRQUFRLEdBQUc7WUFDYmEsRUFBRSxFQUFFZCxV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