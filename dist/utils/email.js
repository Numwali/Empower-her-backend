"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _ejs = _interopRequireDefault(require("ejs"));
var _path = _interopRequireDefault(require("path"));
var _mail = _interopRequireDefault(require("@sendgrid/mail"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var Email = /*#__PURE__*/function () {
  function Email(user, url, verifcationCode) {
    (0, _classCallCheck2["default"])(this, Email);
    this.to = user.email;
    this.firstname = user.firstname;
    this.email = user.email;
    this.from = process.env.EMAIL_FROM;
    this.resetUrl = url;
    this.verifcationCode = verifcationCode;
    this.frontendUrl = process.env.FRONTEND_URL;
  }

  // Send the actual email
  (0, _createClass2["default"])(Email, [{
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(template, subject, title) {
        var html, mailOptions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

              // 1) Render HTML based on a ejs template
              _context.next = 3;
              return _ejs["default"].renderFile(_path["default"].join(__dirname, "./../views/email/".concat(template, ".ejs")), {
                firstname: this.firstname,
                business: this.business,
                email: this.email,
                resetUrl: this.resetUrl,
                verifcationCode: this.verifcationCode,
                frontendUrl: this.frontendUrl // Pass frontend URL to template
              });
            case 3:
              html = _context.sent;
              // 2) Define email options
              mailOptions = {
                to: this.to,
                // Change to your recipient
                from: this.from,
                // Change to your verified sender
                subject: subject,
                text: html,
                html: html
              }; // 3) Create a transport and send email
              _mail["default"].send(mailOptions).then(function () {
                console.log("Email sent");
              })["catch"](function (error) {
                console.error(error);
              });
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function send(_x, _x2, _x3) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "sendWelcome",
    value: function () {
      var _sendWelcome = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.send("welcome", "Welcome to Empower Her");
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function sendWelcome() {
        return _sendWelcome.apply(this, arguments);
      }
      return sendWelcome;
    }()
  }, {
    key: "sendPasswordReset",
    value: function () {
      var _sendPasswordReset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.send("ResetPassword", "Your password reset token (valid for only 10 minutes)");
            case 2:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function sendPasswordReset() {
        return _sendPasswordReset.apply(this, arguments);
      }
      return sendPasswordReset;
    }()
  }]);
  return Email;
}();
var _default = Email;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZWpzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcGF0aCIsIl9tYWlsIiwiX2RvdGVudiIsImRvdGVudiIsImNvbmZpZyIsIkVtYWlsIiwidXNlciIsInVybCIsInZlcmlmY2F0aW9uQ29kZSIsIl9jbGFzc0NhbGxDaGVjazIiLCJ0byIsImVtYWlsIiwiZmlyc3RuYW1lIiwiZnJvbSIsInByb2Nlc3MiLCJlbnYiLCJFTUFJTF9GUk9NIiwicmVzZXRVcmwiLCJmcm9udGVuZFVybCIsIkZST05URU5EX1VSTCIsIl9jcmVhdGVDbGFzczIiLCJrZXkiLCJ2YWx1ZSIsIl9zZW5kIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJ0ZW1wbGF0ZSIsInN1YmplY3QiLCJ0aXRsZSIsImh0bWwiLCJtYWlsT3B0aW9ucyIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJzZ01haWwiLCJzZXRBcGlLZXkiLCJTRU5ER1JJRF9BUElfS0VZIiwiZWpzIiwicmVuZGVyRmlsZSIsInBhdGgiLCJqb2luIiwiX19kaXJuYW1lIiwiY29uY2F0IiwiYnVzaW5lc3MiLCJzZW50IiwidGV4dCIsInNlbmQiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImVycm9yIiwic3RvcCIsIl94IiwiX3gyIiwiX3gzIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfc2VuZFdlbGNvbWUiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInNlbmRXZWxjb21lIiwiX3NlbmRQYXNzd29yZFJlc2V0IiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJzZW5kUGFzc3dvcmRSZXNldCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lbWFpbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZWpzIGZyb20gXCJlanNcIjtcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgc2dNYWlsIGZyb20gXCJAc2VuZGdyaWQvbWFpbFwiO1xuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCI7XG5kb3RlbnYuY29uZmlnKCk7XG5cbmNsYXNzIEVtYWlsIHtcbiAgY29uc3RydWN0b3IodXNlciwgdXJsLCB2ZXJpZmNhdGlvbkNvZGUpIHtcbiAgICB0aGlzLnRvID0gdXNlci5lbWFpbDtcbiAgICB0aGlzLmZpcnN0bmFtZSA9IHVzZXIuZmlyc3RuYW1lO1xuICAgIHRoaXMuZW1haWwgPSB1c2VyLmVtYWlsO1xuICAgIHRoaXMuZnJvbSA9IHByb2Nlc3MuZW52LkVNQUlMX0ZST007XG4gICAgdGhpcy5yZXNldFVybCA9IHVybDtcbiAgICB0aGlzLnZlcmlmY2F0aW9uQ29kZSA9IHZlcmlmY2F0aW9uQ29kZTtcbiAgICB0aGlzLmZyb250ZW5kVXJsID0gcHJvY2Vzcy5lbnYuRlJPTlRFTkRfVVJMIFxuICB9XG5cbiAgLy8gU2VuZCB0aGUgYWN0dWFsIGVtYWlsXG4gIGFzeW5jIHNlbmQodGVtcGxhdGUsIHN1YmplY3QsIHRpdGxlKSB7XG4gICAgc2dNYWlsLnNldEFwaUtleShwcm9jZXNzLmVudi5TRU5ER1JJRF9BUElfS0VZKTtcblxuICAgIC8vIDEpIFJlbmRlciBIVE1MIGJhc2VkIG9uIGEgZWpzIHRlbXBsYXRlXG4gICAgY29uc3QgaHRtbCA9IGF3YWl0IGVqcy5yZW5kZXJGaWxlKFxuICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgYC4vLi4vdmlld3MvZW1haWwvJHt0ZW1wbGF0ZX0uZWpzYCksXG4gICAgICB7XG4gICAgICAgIGZpcnN0bmFtZTogdGhpcy5maXJzdG5hbWUsXG4gICAgICAgIGJ1c2luZXNzOiB0aGlzLmJ1c2luZXNzLFxuICAgICAgICBlbWFpbDogdGhpcy5lbWFpbCxcbiAgICAgICAgcmVzZXRVcmw6IHRoaXMucmVzZXRVcmwsXG4gICAgICAgIHZlcmlmY2F0aW9uQ29kZTogdGhpcy52ZXJpZmNhdGlvbkNvZGUsXG4gICAgICAgIGZyb250ZW5kVXJsOiB0aGlzLmZyb250ZW5kVXJsLCAvLyBQYXNzIGZyb250ZW5kIFVSTCB0byB0ZW1wbGF0ZVxuICAgICAgfVxuICAgICk7XG4gICAgLy8gMikgRGVmaW5lIGVtYWlsIG9wdGlvbnNcbiAgICBjb25zdCBtYWlsT3B0aW9ucyA9IHtcbiAgICAgIHRvOiB0aGlzLnRvLCAvLyBDaGFuZ2UgdG8geW91ciByZWNpcGllbnRcbiAgICAgIGZyb206IHRoaXMuZnJvbSwgLy8gQ2hhbmdlIHRvIHlvdXIgdmVyaWZpZWQgc2VuZGVyXG4gICAgICBzdWJqZWN0LFxuICAgICAgdGV4dDogaHRtbCxcbiAgICAgIGh0bWwsXG4gICAgfTtcbiAgICAvLyAzKSBDcmVhdGUgYSB0cmFuc3BvcnQgYW5kIHNlbmQgZW1haWxcbiAgICBzZ01haWxcbiAgICAgIC5zZW5kKG1haWxPcHRpb25zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVtYWlsIHNlbnRcIik7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgc2VuZFdlbGNvbWUoKSB7XG4gICAgYXdhaXQgdGhpcy5zZW5kKFwid2VsY29tZVwiLCBcIldlbGNvbWUgdG8gRW1wb3dlciBIZXJcIik7XG4gIH1cblxuICBhc3luYyBzZW5kUGFzc3dvcmRSZXNldCgpIHtcbiAgICBhd2FpdCB0aGlzLnNlbmQoXG4gICAgICBcIlJlc2V0UGFzc3dvcmRcIixcbiAgICAgIFwiWW91ciBwYXNzd29yZCByZXNldCB0b2tlbiAodmFsaWQgZm9yIG9ubHkgMTAgbWludXRlcylcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRW1haWw7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLElBQUFBLElBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFD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