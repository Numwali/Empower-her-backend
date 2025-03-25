"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUser = exports.userLogin = exports.updateUserProfile = exports.resetPassword = exports.requestPasswordReset = exports.registerUser = exports.getUserProfile = exports.getUserInfor = exports.getTherapists = exports.getAllUsers = exports.findByEmail = exports.deleteUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _crypto = _interopRequireDefault(require("crypto"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var _ResetToken = _interopRequireDefault(require("../models/ResetToken.js"));
var _photoUpload = _interopRequireDefault(require("../helpers/photoUpload.js"));
var _email = _interopRequireDefault(require("../utils/email"));
var _post = _interopRequireDefault(require("../models/post.js"));
var _Conversation = _interopRequireDefault(require("../models/Conversation.js"));
var _message = _interopRequireDefault(require("../models/message.js"));
var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, firstname, lastname, username, gender, phone, age, email, address, password, role, confirm_password, interests, userExist, salt, hashedPassword, verificationCode, profileImage, uploadResult, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, username = _req$body.username, gender = _req$body.gender, phone = _req$body.phone, age = _req$body.age, email = _req$body.email, address = _req$body.address, password = _req$body.password, role = _req$body.role, confirm_password = _req$body.confirm_password;
          interests = [];
          if (!req.body.interests) {
            _context.next = 16;
            break;
          }
          if (!Array.isArray(req.body.interests)) {
            _context.next = 8;
            break;
          }
          interests = req.body.interests;
          _context.next = 16;
          break;
        case 8:
          _context.prev = 8;
          interests = JSON.parse(req.body.interests);
          _context.next = 16;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](8);
          console.error("Error parsing interests:", _context.t0);
          return _context.abrupt("return", res.status(400).json({
            success: false,
            message: "Invalid interests format. Expected JSON array."
          }));
        case 16:
          if (!(!firstname || firstname == "")) {
            _context.next = 18;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "firstname is required"
          }));
        case 18:
          if (!(!lastname || lastname == "")) {
            _context.next = 20;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "lastname is required"
          }));
        case 20:
          if (!(!username || username == "")) {
            _context.next = 22;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "username is required"
          }));
        case 22:
          if (!(!gender || gender == "")) {
            _context.next = 24;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "gender is required"
          }));
        case 24:
          if (!(!phone || phone == "")) {
            _context.next = 26;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "phone is required"
          }));
        case 26:
          if (!(!age || age == "")) {
            _context.next = 28;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "age is required"
          }));
        case 28:
          if (!(!email || email == "")) {
            _context.next = 30;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "email is required"
          }));
        case 30:
          if (!(!address || address == "")) {
            _context.next = 32;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "address is required"
          }));
        case 32:
          if (!(!password || password == "")) {
            _context.next = 34;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "password is required"
          }));
        case 34:
          if (!(!role || role == "")) {
            _context.next = 36;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "role is required"
          }));
        case 36:
          if (!(!confirm_password || confirm_password == "")) {
            _context.next = 38;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "confirm_password is required"
          }));
        case 38:
          if (!(!interests || !Array.isArray(interests) || interests.length === 0)) {
            _context.next = 40;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "At least one interest is required"
          }));
        case 40:
          _context.next = 42;
          return _userModel["default"].findOne({
            email: email
          });
        case 42:
          userExist = _context.sent;
          if (!userExist) {
            _context.next = 47;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "user email already exist"
          }));
        case 47:
          if (!(password !== confirm_password)) {
            _context.next = 49;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "Two different password"
          }));
        case 49:
          _context.next = 51;
          return _bcryptjs["default"].genSalt(10);
        case 51:
          salt = _context.sent;
          _context.next = 54;
          return _bcryptjs["default"].hash(password, salt);
        case 54:
          hashedPassword = _context.sent;
          verificationCode = generateVerificationCode();
          profileImage = "";
          if (!(req.files && req.files.image)) {
            _context.next = 62;
            break;
          }
          _context.next = 60;
          return (0, _photoUpload["default"])(req);
        case 60:
          uploadResult = _context.sent;
          if (uploadResult && uploadResult.secure_url) {
            profileImage = uploadResult.secure_url;
          } else {
            console.error("Failed to upload image to Cloudinary");
          }
        case 62:
          user = new _userModel["default"]({
            firstname: firstname,
            lastname: lastname,
            username: username,
            gender: gender,
            age: age,
            email: email,
            address: address,
            phone: phone,
            password: hashedPassword,
            role: role,
            verificationToken: verificationCode,
            interests: interests,
            profileImage: profileImage
          });
          _context.next = 65;
          return new _email["default"](user, "", verificationCode).sendWelcome();
        case 65:
          _context.next = 67;
          return user.save();
        case 67:
          res.status(201).json({
            success: true,
            message: "Account created successfully, please check your email to verify your account"
          });
        case 68:
          _context.next = 74;
          break;
        case 70:
          _context.prev = 70;
          _context.t1 = _context["catch"](0);
          console.log("Error:", _context.t1.message);
          res.status(500).json({
            error: _context.t1
          });
        case 74:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 70], [8, 12]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.registerUser = registerUser;
var verifyUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var token, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(!req.body.token || req.body.token.trim() === "")) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            success: false,
            message: "Please provide a token"
          }));
        case 3:
          token = req.body.token;
          _context2.next = 6;
          return _userModel["default"].findOne({
            verificationToken: token
          });
        case 6:
          user = _context2.sent;
          if (user) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(200).json({
            success: false,
            message: "Invalid token"
          }));
        case 9:
          user.verified = true;
          user.verificationToken = null;
          _context2.next = 13;
          return user.save();
        case 13:
          return _context2.abrupt("return", res.status(200).json({
            success: true,
            message: "Account verified successfully"
          }));
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.log("Error:", _context2.t0.message);
          return _context2.abrupt("return", res.status(500).json({
            success: false,
            message: _context2.t0.message
          }));
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function verifyUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.verifyUser = verifyUser;
var findByEmail = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userEmail) {
    var userInfo, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _userModel["default"].findOne({
            email: userEmail
          });
        case 3:
          userInfo = _context3.sent;
          if (userInfo) {
            data = {
              success: true,
              token: generateToken(userInfo._id),
              userInfo: {
                id: userInfo._id,
                userInfoname: userInfo.userInfoname,
                firstname: userInfo.firstname,
                lastname: userInfo.lastname,
                gender: userInfo.gender,
                address: userInfo.address,
                email: userInfo.email,
                role: userInfo.role,
                phone: userInfo.phone,
                dob: userInfo.dob,
                profileImage: userInfo.profileImage
              }
            };
          }
          return _context3.abrupt("return", data);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          console.error("Error finding user by email:", _context3.t0);
          throw _context3.t0;
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function findByEmail(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.findByEmail = findByEmail;
var userLogin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, email, password, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context4.next = 4;
          return _userModel["default"].findOne({
            email: email
          });
        case 4:
          user = _context4.sent;
          _context4.t0 = user;
          if (!_context4.t0) {
            _context4.next = 10;
            break;
          }
          _context4.next = 9;
          return _bcryptjs["default"].compare(password, user.password);
        case 9:
          _context4.t0 = _context4.sent;
        case 10:
          if (!_context4.t0) {
            _context4.next = 16;
            break;
          }
          if (user.verified) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: "please verify your account first!"
          }));
        case 13:
          res.json({
            success: true,
            token: generateToken(user._id),
            user: {
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
              profileImage: user.profileImage,
              interests: user.interests
            }
          });
          _context4.next = 17;
          break;
        case 16:
          res.json({
            success: false,
            message: "Invalid credation"
          }).status(400);
        case 17:
          _context4.next = 22;
          break;
        case 19:
          _context4.prev = 19;
          _context4.t1 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t1
          });
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 19]]);
  }));
  return function userLogin(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
exports.userLogin = userLogin;
var getUserProfile = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          try {
            user = req.user;
            res.status(200).json({
              success: true,
              message: "user profile",
              data: user
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              message: error
            });
            console.log(error);
          }
        case 1:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function getUserProfile(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getUserProfile = getUserProfile;
var getTherapists = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, therapists;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = req.user;
          _context6.next = 4;
          return _userModel["default"].find({
            role: "therapist"
          });
        case 4:
          therapists = _context6.sent;
          res.status(200).json({
            success: true,
            data: therapists
          });
          _context6.next = 12;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            success: false,
            message: _context6.t0
          });
          console.log(_context6.t0);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 8]]);
  }));
  return function getTherapists(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getTherapists = getTherapists;
var updateUserProfile = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user_id, _req$body3, firstname, lastname, username, gender, address, email, phone, dob, image, updateUser;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user_id = req.user._id;
          _req$body3 = req.body, firstname = _req$body3.firstname, lastname = _req$body3.lastname, username = _req$body3.username, gender = _req$body3.gender, address = _req$body3.address, email = _req$body3.email, phone = _req$body3.phone, dob = _req$body3.dob;
          if (!(!firstname || firstname == "")) {
            _context7.next = 5;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "firstname is required"
          }));
        case 5:
          if (!(!lastname || lastname == "")) {
            _context7.next = 7;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "lastname is required"
          }));
        case 7:
          if (!(!username || username == "")) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "username is required"
          }));
        case 9:
          if (!(!gender && gender == "")) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "gender is required"
          }));
        case 11:
          if (!(!address || address == "")) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "address is required"
          }));
        case 13:
          if (!(!email || email == "")) {
            _context7.next = 15;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "email is required"
          }));
        case 15:
          if (!(!phone || phone == "")) {
            _context7.next = 17;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "phone is required"
          }));
        case 17:
          if (!(!dob || dob == "")) {
            _context7.next = 19;
            break;
          }
          return _context7.abrupt("return", res.status(200).json({
            success: false,
            message: "dob is required"
          }));
        case 19:
          image = req.user.profileImage;
          if (!req.files) {
            _context7.next = 25;
            break;
          }
          _context7.next = 23;
          return (0, _photoUpload["default"])(req);
        case 23:
          image = _context7.sent;
          image = image.url;
        case 25:
          _context7.next = 27;
          return _userModel["default"].findByIdAndUpdate(user_id, {
            firstname: firstname,
            lastname: lastname,
            username: username,
            gender: gender,
            dob: dob,
            email: email,
            address: address,
            phone: phone,
            profileImage: image
          }, {
            "new": true
          });
        case 27:
          updateUser = _context7.sent;
          res.status(200).json({
            success: true,
            message: "user updated successfully",
            user: {
              id: updateUser._id,
              firstname: firstname,
              lastname: lastname,
              username: username,
              gender: gender,
              dob: dob,
              email: email,
              address: address,
              phone: phone,
              profileImage: image
            }
          });
          _context7.next = 35;
          break;
        case 31:
          _context7.prev = 31;
          _context7.t0 = _context7["catch"](0);
          res.status(500).json({
            success: false,
            message: _context7.t0
          });
          console.log(_context7.t0);
        case 35:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 31]]);
  }));
  return function updateUserProfile(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateUserProfile = updateUserProfile;
var getUserInfor = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return _userModel["default"].findById(req.params.id).select("-password");
        case 3:
          user = _context8.sent;
          if (user) {
            res.json(user);
          } else {
            res.status(404).json({
              message: "User not found"
            });
          }
          _context8.next = 10;
          break;
        case 7:
          _context8.prev = 7;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            message: _context8.t0.message
          });
        case 10:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getUserInfor(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getUserInfor = getUserInfor;
var getAllUsers = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var user, users;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          user = req.user;
          _context9.prev = 1;
          _context9.next = 4;
          return _userModel["default"].find({
            _id: {
              $ne: user._id
            }
          }).select("-password").sort({
            firstname: 1
          });
        case 4:
          users = _context9.sent;
          // Sort users by firstname in ascending order

          res.json(users);
          _context9.next = 11;
          break;
        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          res.status(500).json({
            message: _context9.t0.message
          });
        case 11:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[1, 8]]);
  }));
  return function getAllUsers(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getAllUsers = getAllUsers;
var requestPasswordReset = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var email, user, resetToken, hashedToken, resetUrl;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          email = req.body.email;
          _context10.next = 4;
          return _userModel["default"].findOne({
            email: email
          });
        case 4:
          user = _context10.sent;
          if (user) {
            _context10.next = 7;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            message: "User doesn't exist"
          }));
        case 7:
          resetToken = _crypto["default"].randomBytes(32).toString("hex");
          hashedToken = _crypto["default"].createHash("sha256").update(resetToken).digest("hex");
          _context10.next = 11;
          return _ResetToken["default"].create({
            userId: user._id,
            resetToken: hashedToken
          });
        case 11:
          // reset url
          resetUrl = "http://localhost:3000/reset-password/".concat(resetToken);
          _context10.next = 14;
          return new _email["default"](user, resetUrl, "").sendPasswordReset();
        case 14:
          res.status(200).json({
            message: "Password reset link sent"
          });
          _context10.next = 20;
          break;
        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json({
            message: _context10.t0.message
          });
        case 20:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 17]]);
  }));
  return function requestPasswordReset(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
exports.requestPasswordReset = requestPasswordReset;
var resetPassword = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _req$body4, token, newPassword, confirmPassword, hashedToken, resetTokenDoc, user, salt;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _req$body4 = req.body, token = _req$body4.token, newPassword = _req$body4.newPassword, confirmPassword = _req$body4.confirmPassword;
          if (!(!newPassword || newPassword.trim() === "")) {
            _context11.next = 4;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Please provide a new password"
          }));
        case 4:
          if (!(!confirmPassword || confirmPassword.trim() === "")) {
            _context11.next = 6;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Please provide a confirm password"
          }));
        case 6:
          if (!(newPassword !== confirmPassword)) {
            _context11.next = 8;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Password does not match"
          }));
        case 8:
          if (!(!token || token.trim() === "")) {
            _context11.next = 10;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Please provide reset token"
          }));
        case 10:
          hashedToken = _crypto["default"].createHash("sha256").update(token).digest("hex");
          _context11.next = 13;
          return _ResetToken["default"].findOne({
            resetToken: hashedToken
          });
        case 13:
          resetTokenDoc = _context11.sent;
          if (resetTokenDoc) {
            _context11.next = 16;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "Invalid or expired token"
          }));
        case 16:
          _context11.next = 18;
          return _userModel["default"].findById(resetTokenDoc.userId);
        case 18:
          user = _context11.sent;
          _context11.next = 21;
          return _bcryptjs["default"].genSalt(10);
        case 21:
          salt = _context11.sent;
          _context11.next = 24;
          return _bcryptjs["default"].hash(newPassword, salt);
        case 24:
          newPassword = _context11.sent;
          user.password = newPassword;
          _context11.next = 28;
          return user.save();
        case 28:
          _context11.next = 30;
          return _ResetToken["default"].findByIdAndDelete(resetTokenDoc._id);
        case 30:
          return _context11.abrupt("return", res.status(200).json({
            message: "Password successfully reset"
          }));
        case 33:
          _context11.prev = 33;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", res.status(500).json({
            message: _context11.t0.message
          }));
        case 36:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 33]]);
  }));
  return function resetPassword(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
exports.resetPassword = resetPassword;
var deleteUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, user, resource, conversations, conversationIds;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          _context12.next = 4;
          return _userModel["default"].findById(id);
        case 4:
          user = _context12.sent;
          if (user) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            success: false,
            message: "User not found"
          }));
        case 7:
          if (!(user.role !== "therapist")) {
            _context12.next = 9;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            success: false,
            message: "Only therapists can be deleted"
          }));
        case 9:
          _context12.next = 11;
          return _post["default"].findOne({
            user: id
          });
        case 11:
          resource = _context12.sent;
          if (!resource) {
            _context12.next = 14;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            success: false,
            message: "This therapist has dependent resources!"
          }));
        case 14:
          _context12.next = 16;
          return _Conversation["default"].find({
            members: id
          });
        case 16:
          conversations = _context12.sent;
          conversationIds = conversations.map(function (conv) {
            return conv._id;
          });
          _context12.next = 20;
          return _message["default"].deleteMany({
            conversationId: {
              $in: conversationIds
            }
          });
        case 20:
          _context12.next = 22;
          return _Conversation["default"].deleteMany({
            _id: {
              $in: conversationIds
            }
          });
        case 22:
          res.status(200).json({
            success: true,
            message: "Therapist deleted successfully"
          });
          _context12.next = 29;
          break;
        case 25:
          _context12.prev = 25;
          _context12.t0 = _context12["catch"](0);
          console.error("Error deleting therapist:", _context12.t0);
          res.status(500).json({
            success: false,
            message: _context12.t0.message
          });
        case 29:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 25]]);
  }));
  return function deleteUser(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();

// generate token
exports.deleteUser = deleteUser;
var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

//generate verification code
function generateVerificationCode() {
  var code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNvbndlYnRva2VuIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfYmNyeXB0anMiLCJfY3J5cHRvIiwiX3VzZXJNb2RlbCIsIl9SZXNldFRva2VuIiwiX3Bob3RvVXBsb2FkIiwiX2VtYWlsIiwiX3Bvc3QiLCJfQ29udmVyc2F0aW9uIiwiX21lc3NhZ2UiLCJyZWdpc3RlclVzZXIiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXEiLCJyZXMiLCJfcmVxJGJvZHkiLCJmaXJzdG5hbWUiLCJsYXN0bmFtZSIsInVzZXJuYW1lIiwiZ2VuZGVyIiwicGhvbmUiLCJhZ2UiLCJlbWFpbCIsImFkZHJlc3MiLCJwYXNzd29yZCIsInJvbGUiLCJjb25maXJtX3Bhc3N3b3JkIiwiaW50ZXJlc3RzIiwidXNlckV4aXN0Iiwic2FsdCIsImhhc2hlZFBhc3N3b3JkIiwidmVyaWZpY2F0aW9uQ29kZSIsInByb2ZpbGVJbWFnZSIsInVwbG9hZFJlc3VsdCIsInVzZXIiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiYm9keSIsIkFycmF5IiwiaXNBcnJheSIsIkpTT04iLCJwYXJzZSIsInQwIiwiY29uc29sZSIsImVycm9yIiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwibGVuZ3RoIiwiVXNlciIsImZpbmRPbmUiLCJzZW50IiwiYmNyeXB0IiwiZ2VuU2FsdCIsImhhc2giLCJnZW5lcmF0ZVZlcmlmaWNhdGlvbkNvZGUiLCJmaWxlcyIsImltYWdlIiwiaW1hZ2VVcGxvYWRlciIsInNlY3VyZV91cmwiLCJ2ZXJpZmljYXRpb25Ub2tlbiIsIkVtYWlsIiwic2VuZFdlbGNvbWUiLCJzYXZlIiwidDEiLCJsb2ciLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJ2ZXJpZnlVc2VyIiwiX3JlZjIiLCJfY2FsbGVlMiIsInRva2VuIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwidHJpbSIsInZlcmlmaWVkIiwiX3gzIiwiX3g0IiwiZmluZEJ5RW1haWwiLCJfcmVmMyIsIl9jYWxsZWUzIiwidXNlckVtYWlsIiwidXNlckluZm8iLCJkYXRhIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZ2VuZXJhdGVUb2tlbiIsIl9pZCIsImlkIiwidXNlckluZm9uYW1lIiwiZG9iIiwiX3g1IiwidXNlckxvZ2luIiwiX3JlZjQiLCJfY2FsbGVlNCIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJjb21wYXJlIiwiX3g2IiwiX3g3IiwiZ2V0VXNlclByb2ZpbGUiLCJfcmVmNSIsIl9jYWxsZWU1IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwiX3g4IiwiX3g5IiwiZ2V0VGhlcmFwaXN0cyIsIl9yZWY2IiwiX2NhbGxlZTYiLCJ0aGVyYXBpc3RzIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZmluZCIsIl94MTAiLCJfeDExIiwidXBkYXRlVXNlclByb2ZpbGUiLCJfcmVmNyIsIl9jYWxsZWU3IiwidXNlcl9pZCIsIl9yZXEkYm9keTMiLCJ1cGRhdGVVc2VyIiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwidXJsIiwiZmluZEJ5SWRBbmRVcGRhdGUiLCJfeDEyIiwiX3gxMyIsImdldFVzZXJJbmZvciIsIl9yZWY4IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJmaW5kQnlJZCIsInBhcmFtcyIsInNlbGVjdCIsIl94MTQiLCJfeDE1IiwiZ2V0QWxsVXNlcnMiLCJfcmVmOSIsIl9jYWxsZWU5IiwidXNlcnMiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCIkbmUiLCJzb3J0IiwiX3gxNiIsIl94MTciLCJyZXF1ZXN0UGFzc3dvcmRSZXNldCIsIl9yZWYxMCIsIl9jYWxsZWUxMCIsInJlc2V0VG9rZW4iLCJoYXNoZWRUb2tlbiIsInJlc2V0VXJsIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJjcnlwdG8iLCJyYW5kb21CeXRlcyIsInRvU3RyaW5nIiwiY3JlYXRlSGFzaCIsInVwZGF0ZSIsImRpZ2VzdCIsIlJlc2V0VG9rZW4iLCJjcmVhdGUiLCJ1c2VySWQiLCJjb25jYXQiLCJzZW5kUGFzc3dvcmRSZXNldCIsIl94MTgiLCJfeDE5IiwicmVzZXRQYXNzd29yZCIsIl9yZWYxMSIsIl9jYWxsZWUxMSIsIl9yZXEkYm9keTQiLCJuZXdQYXNzd29yZCIsImNvbmZpcm1QYXNzd29yZCIsInJlc2V0VG9rZW5Eb2MiLCJfY2FsbGVlMTEkIiwiX2NvbnRleHQxMSIsImZpbmRCeUlkQW5kRGVsZXRlIiwiX3gyMCIsIl94MjEiLCJkZWxldGVVc2VyIiwiX3JlZjEyIiwiX2NhbGxlZTEyIiwicmVzb3VyY2UiLCJjb252ZXJzYXRpb25zIiwiY29udmVyc2F0aW9uSWRzIiwiX2NhbGxlZTEyJCIsIl9jb250ZXh0MTIiLCJwb3N0IiwiQ29udmVyc2F0aW9uIiwibWVtYmVycyIsIm1hcCIsImNvbnYiLCJkZWxldGVNYW55IiwiY29udmVyc2F0aW9uSWQiLCIkaW4iLCJfeDIyIiwiX3gyMyIsImp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImV4cGlyZXNJbiIsImNvZGUiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvdXNlckNvbnRyb2xsZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGp3dCBmcm9tIFwianNvbndlYnRva2VuXCI7XG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiO1xuaW1wb3J0IGNyeXB0byBmcm9tIFwiY3J5cHRvXCI7XG5pbXBvcnQgVXNlciBmcm9tIFwiLi4vbW9kZWxzL3VzZXJNb2RlbC5qc1wiO1xuaW1wb3J0IFJlc2V0VG9rZW4gZnJvbSBcIi4uL21vZGVscy9SZXNldFRva2VuLmpzXCI7XG5pbXBvcnQgaW1hZ2VVcGxvYWRlciBmcm9tIFwiLi4vaGVscGVycy9waG90b1VwbG9hZC5qc1wiO1xuaW1wb3J0IEVtYWlsIGZyb20gXCIuLi91dGlscy9lbWFpbFwiO1xuaW1wb3J0IHBvc3QgZnJvbSBcIi4uL21vZGVscy9wb3N0LmpzXCI7XG5pbXBvcnQgQ29udmVyc2F0aW9uIGZyb20gXCIuLi9tb2RlbHMvQ29udmVyc2F0aW9uLmpzXCI7XG5pbXBvcnQgbWVzc2FnZSBmcm9tIFwiLi4vbW9kZWxzL21lc3NhZ2UuanNcIjtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyVXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHtcbiAgICAgIGZpcnN0bmFtZSxcbiAgICAgIGxhc3RuYW1lLFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBnZW5kZXIsXG4gICAgICBwaG9uZSxcbiAgICAgIGFnZSxcbiAgICAgIGVtYWlsLFxuICAgICAgYWRkcmVzcyxcbiAgICAgIHBhc3N3b3JkLFxuICAgICAgcm9sZSxcbiAgICAgIGNvbmZpcm1fcGFzc3dvcmQsXG4gICAgfSA9IHJlcS5ib2R5O1xuXG4gICAgbGV0IGludGVyZXN0cyA9IFtdO1xuICAgIGlmIChyZXEuYm9keS5pbnRlcmVzdHMpIHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcS5ib2R5LmludGVyZXN0cykpIHtcbiAgICAgICAgaW50ZXJlc3RzID0gcmVxLmJvZHkuaW50ZXJlc3RzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpbnRlcmVzdHMgPSBKU09OLnBhcnNlKHJlcS5ib2R5LmludGVyZXN0cyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwYXJzaW5nIGludGVyZXN0czpcIiwgZXJyKTtcbiAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgaW50ZXJlc3RzIGZvcm1hdC4gRXhwZWN0ZWQgSlNPTiBhcnJheS5cIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZmlyc3RuYW1lIHx8IGZpcnN0bmFtZSA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJmaXJzdG5hbWUgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIWxhc3RuYW1lIHx8IGxhc3RuYW1lID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImxhc3RuYW1lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCF1c2VybmFtZSB8fCB1c2VybmFtZSA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJ1c2VybmFtZSBpcyByZXF1aXJlZFwiIH0pO1xuICAgIGlmICghZ2VuZGVyIHx8IGdlbmRlciA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJnZW5kZXIgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIXBob25lIHx8IHBob25lID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcInBob25lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCFhZ2UgfHwgYWdlID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImFnZSBpcyByZXF1aXJlZFwiIH0pO1xuICAgIGlmICghZW1haWwgfHwgZW1haWwgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiZW1haWwgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIWFkZHJlc3MgfHwgYWRkcmVzcyA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJhZGRyZXNzIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCFwYXNzd29yZCB8fCBwYXNzd29yZCA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJwYXNzd29yZCBpcyByZXF1aXJlZFwiIH0pO1xuICAgIGlmICghcm9sZSB8fCByb2xlID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcInJvbGUgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIWNvbmZpcm1fcGFzc3dvcmQgfHwgY29uZmlybV9wYXNzd29yZCA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJjb25maXJtX3Bhc3N3b3JkIGlzIHJlcXVpcmVkXCIgfSk7XG5cbiAgICBpZiAoIWludGVyZXN0cyB8fCAhQXJyYXkuaXNBcnJheShpbnRlcmVzdHMpIHx8IGludGVyZXN0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiQXQgbGVhc3Qgb25lIGludGVyZXN0IGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlckV4aXN0ID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XG4gICAgaWYgKHVzZXJFeGlzdClcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwidXNlciBlbWFpbCBhbHJlYWR5IGV4aXN0XCIgfSk7XG4gICAgZWxzZSB7XG4gICAgICBpZiAocGFzc3dvcmQgIT09IGNvbmZpcm1fcGFzc3dvcmQpXG4gICAgICAgIHJldHVybiByZXNcbiAgICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIlR3byBkaWZmZXJlbnQgcGFzc3dvcmRcIiB9KTtcblxuICAgICAgY29uc3Qgc2FsdCA9IGF3YWl0IGJjcnlwdC5nZW5TYWx0KDEwKTtcbiAgICAgIGNvbnN0IGhhc2hlZFBhc3N3b3JkID0gYXdhaXQgYmNyeXB0Lmhhc2gocGFzc3dvcmQsIHNhbHQpO1xuICAgICAgY29uc3QgdmVyaWZpY2F0aW9uQ29kZSA9IGdlbmVyYXRlVmVyaWZpY2F0aW9uQ29kZSgpO1xuXG4gICAgICBsZXQgcHJvZmlsZUltYWdlID0gXCJcIjtcbiAgICAgIGlmIChyZXEuZmlsZXMgJiYgcmVxLmZpbGVzLmltYWdlKSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IGF3YWl0IGltYWdlVXBsb2FkZXIocmVxKTtcbiAgICAgICAgaWYgKHVwbG9hZFJlc3VsdCAmJiB1cGxvYWRSZXN1bHQuc2VjdXJlX3VybCkge1xuICAgICAgICAgIHByb2ZpbGVJbWFnZSA9IHVwbG9hZFJlc3VsdC5zZWN1cmVfdXJsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gdXBsb2FkIGltYWdlIHRvIENsb3VkaW5hcnlcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKHtcbiAgICAgICAgZmlyc3RuYW1lLFxuICAgICAgICBsYXN0bmFtZSxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIGdlbmRlcixcbiAgICAgICAgYWdlLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgcGhvbmUsXG4gICAgICAgIHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCxcbiAgICAgICAgcm9sZSxcbiAgICAgICAgdmVyaWZpY2F0aW9uVG9rZW46IHZlcmlmaWNhdGlvbkNvZGUsXG4gICAgICAgIGludGVyZXN0czogaW50ZXJlc3RzLFxuICAgICAgICBwcm9maWxlSW1hZ2UsXG4gICAgICB9KTtcblxuICAgICAgYXdhaXQgbmV3IEVtYWlsKHVzZXIsIFwiXCIsIHZlcmlmaWNhdGlvbkNvZGUpLnNlbmRXZWxjb21lKCk7XG4gICAgICBhd2FpdCB1c2VyLnNhdmUoKTtcbiAgICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHtcbiAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICBcIkFjY291bnQgY3JlYXRlZCBzdWNjZXNzZnVsbHksIHBsZWFzZSBjaGVjayB5b3VyIGVtYWlsIHRvIHZlcmlmeSB5b3VyIGFjY291bnRcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdmVyaWZ5VXNlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGlmICghcmVxLmJvZHkudG9rZW4gfHwgcmVxLmJvZHkudG9rZW4udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIlBsZWFzZSBwcm92aWRlIGEgdG9rZW5cIiB9KTtcbiAgICB9XG4gICAgY29uc3QgeyB0b2tlbiB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZE9uZSh7XG4gICAgICB2ZXJpZmljYXRpb25Ub2tlbjogdG9rZW4sXG4gICAgfSk7XG4gICAgaWYgKCF1c2VyKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJJbnZhbGlkIHRva2VuXCIgfSk7XG4gICAgfVxuICAgIHVzZXIudmVyaWZpZWQgPSB0cnVlO1xuICAgIHVzZXIudmVyaWZpY2F0aW9uVG9rZW4gPSBudWxsO1xuICAgIGF3YWl0IHVzZXIuc2F2ZSgpO1xuICAgIHJldHVybiByZXNcbiAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBtZXNzYWdlOiBcIkFjY291bnQgdmVyaWZpZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coXCJFcnJvcjpcIiwgZXJyb3IubWVzc2FnZSk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBmaW5kQnlFbWFpbCA9IGFzeW5jICh1c2VyRW1haWwpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VySW5mbyA9IGF3YWl0IFVzZXIuZmluZE9uZSh7IGVtYWlsOiB1c2VyRW1haWwgfSk7XG4gICAgbGV0IGRhdGE7XG4gICAgaWYgKHVzZXJJbmZvKSB7XG4gICAgICBkYXRhID0ge1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB0b2tlbjogZ2VuZXJhdGVUb2tlbih1c2VySW5mby5faWQpLFxuICAgICAgICB1c2VySW5mbzoge1xuICAgICAgICAgIGlkOiB1c2VySW5mby5faWQsXG4gICAgICAgICAgdXNlckluZm9uYW1lOiB1c2VySW5mby51c2VySW5mb25hbWUsXG4gICAgICAgICAgZmlyc3RuYW1lOiB1c2VySW5mby5maXJzdG5hbWUsXG4gICAgICAgICAgbGFzdG5hbWU6IHVzZXJJbmZvLmxhc3RuYW1lLFxuICAgICAgICAgIGdlbmRlcjogdXNlckluZm8uZ2VuZGVyLFxuICAgICAgICAgIGFkZHJlc3M6IHVzZXJJbmZvLmFkZHJlc3MsXG4gICAgICAgICAgZW1haWw6IHVzZXJJbmZvLmVtYWlsLFxuICAgICAgICAgIHJvbGU6IHVzZXJJbmZvLnJvbGUsXG4gICAgICAgICAgcGhvbmU6IHVzZXJJbmZvLnBob25lLFxuICAgICAgICAgIGRvYjogdXNlckluZm8uZG9iLFxuICAgICAgICAgIHByb2ZpbGVJbWFnZTogdXNlckluZm8ucHJvZmlsZUltYWdlLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmaW5kaW5nIHVzZXIgYnkgZW1haWw6XCIsIGVycik7XG4gICAgdGhyb3cgZXJyO1xuICB9XG59O1xuZXhwb3J0IGNvbnN0IHVzZXJMb2dpbiA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XG4gICAgaWYgKHVzZXIgJiYgKGF3YWl0IGJjcnlwdC5jb21wYXJlKHBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkKSkpIHtcbiAgICAgIGlmICghdXNlci52ZXJpZmllZCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IFwicGxlYXNlIHZlcmlmeSB5b3VyIGFjY291bnQgZmlyc3QhXCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmVzLmpzb24oe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICB0b2tlbjogZ2VuZXJhdGVUb2tlbih1c2VyLl9pZCksXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBpZDogdXNlci5faWQsXG4gICAgICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWUsXG4gICAgICAgICAgZmlyc3RuYW1lOiB1c2VyLmZpcnN0bmFtZSxcbiAgICAgICAgICBsYXN0bmFtZTogdXNlci5sYXN0bmFtZSxcbiAgICAgICAgICBnZW5kZXI6IHVzZXIuZ2VuZGVyLFxuICAgICAgICAgIGFkZHJlc3M6IHVzZXIuYWRkcmVzcyxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgICAgcGhvbmU6IHVzZXIucGhvbmUsXG4gICAgICAgICAgZG9iOiB1c2VyLmRvYixcbiAgICAgICAgICBwcm9maWxlSW1hZ2U6IHVzZXIucHJvZmlsZUltYWdlLFxuICAgICAgICAgIGludGVyZXN0czogdXNlci5pbnRlcmVzdHMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2VcbiAgICAgIHJlcy5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBjcmVkYXRpb25cIiB9KS5zdGF0dXMoNDAwKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvciB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJQcm9maWxlID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlciA9IHJlcS51c2VyO1xuICAgIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwidXNlciBwcm9maWxlXCIsIGRhdGE6IHVzZXIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IgfSk7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGhlcmFwaXN0cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSByZXEudXNlcjtcbiAgICBjb25zdCB0aGVyYXBpc3RzID0gYXdhaXQgVXNlci5maW5kKHsgcm9sZTogXCJ0aGVyYXBpc3RcIiB9KTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IHRoZXJhcGlzdHMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IgfSk7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdXBkYXRlVXNlclByb2ZpbGUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB1c2VyX2lkID0gcmVxLnVzZXIuX2lkO1xuICAgIGNvbnN0IHtcbiAgICAgIGZpcnN0bmFtZSxcbiAgICAgIGxhc3RuYW1lLFxuICAgICAgdXNlcm5hbWUsXG4gICAgICBnZW5kZXIsXG4gICAgICBhZGRyZXNzLFxuICAgICAgZW1haWwsXG4gICAgICBwaG9uZSxcbiAgICAgIGRvYixcbiAgICB9ID0gcmVxLmJvZHk7XG5cbiAgICBpZiAoIWZpcnN0bmFtZSB8fCBmaXJzdG5hbWUgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiZmlyc3RuYW1lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCFsYXN0bmFtZSB8fCBsYXN0bmFtZSA9PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJsYXN0bmFtZSBpcyByZXF1aXJlZFwiIH0pO1xuICAgIGlmICghdXNlcm5hbWUgfHwgdXNlcm5hbWUgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwidXNlcm5hbWUgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIWdlbmRlciAmJiBnZW5kZXIgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiZ2VuZGVyIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCFhZGRyZXNzIHx8IGFkZHJlc3MgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiYWRkcmVzcyBpcyByZXF1aXJlZFwiIH0pO1xuICAgIGlmICghZW1haWwgfHwgZW1haWwgPT0gXCJcIilcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiZW1haWwgaXMgcmVxdWlyZWRcIiB9KTtcbiAgICBpZiAoIXBob25lIHx8IHBob25lID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcInBob25lIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgaWYgKCFkb2IgfHwgZG9iID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImRvYiBpcyByZXF1aXJlZFwiIH0pO1xuXG4gICAgbGV0IGltYWdlID0gcmVxLnVzZXIucHJvZmlsZUltYWdlO1xuICAgIGlmIChyZXEuZmlsZXMpIHtcbiAgICAgIGltYWdlID0gYXdhaXQgaW1hZ2VVcGxvYWRlcihyZXEpO1xuICAgICAgaW1hZ2UgPSBpbWFnZS51cmw7XG4gICAgfVxuXG4gICAgY29uc3QgdXBkYXRlVXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWRBbmRVcGRhdGUoXG4gICAgICB1c2VyX2lkLFxuICAgICAge1xuICAgICAgICBmaXJzdG5hbWUsXG4gICAgICAgIGxhc3RuYW1lLFxuICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgZ2VuZGVyLFxuICAgICAgICBkb2IsXG4gICAgICAgIGVtYWlsLFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBwaG9uZSxcbiAgICAgICAgcHJvZmlsZUltYWdlOiBpbWFnZSxcbiAgICAgIH0sXG4gICAgICB7IG5ldzogdHJ1ZSB9XG4gICAgKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgbWVzc2FnZTogXCJ1c2VyIHVwZGF0ZWQgc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGlkOiB1cGRhdGVVc2VyLl9pZCxcbiAgICAgICAgZmlyc3RuYW1lLFxuICAgICAgICBsYXN0bmFtZSxcbiAgICAgICAgdXNlcm5hbWUsXG4gICAgICAgIGdlbmRlcixcbiAgICAgICAgZG9iLFxuICAgICAgICBlbWFpbCxcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgcGhvbmUsXG4gICAgICAgIHByb2ZpbGVJbWFnZTogaW1hZ2UsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yIH0pO1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJJbmZvciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKHJlcS5wYXJhbXMuaWQpLnNlbGVjdChcIi1wYXNzd29yZFwiKTtcbiAgICBpZiAodXNlcikge1xuICAgICAgcmVzLmpzb24odXNlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJVc2VyIG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRBbGxVc2VycyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB1c2VyID0gcmVxLnVzZXI7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcnMgPSBhd2FpdCBVc2VyLmZpbmQoeyBfaWQ6IHsgJG5lOiB1c2VyLl9pZCB9IH0pXG4gICAgICAuc2VsZWN0KFwiLXBhc3N3b3JkXCIpXG4gICAgICAuc29ydCh7IGZpcnN0bmFtZTogMSB9KTsgLy8gU29ydCB1c2VycyBieSBmaXJzdG5hbWUgaW4gYXNjZW5kaW5nIG9yZGVyXG5cbiAgICByZXMuanNvbih1c2Vycyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdFBhc3N3b3JkUmVzZXQgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGVtYWlsIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kT25lKHsgZW1haWwgfSk7XG5cbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiVXNlciBkb2Vzbid0IGV4aXN0XCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzZXRUb2tlbiA9IGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoXCJoZXhcIik7XG4gICAgY29uc3QgaGFzaGVkVG9rZW4gPSBjcnlwdG9cbiAgICAgIC5jcmVhdGVIYXNoKFwic2hhMjU2XCIpXG4gICAgICAudXBkYXRlKHJlc2V0VG9rZW4pXG4gICAgICAuZGlnZXN0KFwiaGV4XCIpO1xuXG4gICAgYXdhaXQgUmVzZXRUb2tlbi5jcmVhdGUoe1xuICAgICAgdXNlcklkOiB1c2VyLl9pZCxcbiAgICAgIHJlc2V0VG9rZW46IGhhc2hlZFRva2VuLFxuICAgIH0pO1xuXG4gICAgLy8gcmVzZXQgdXJsXG4gICAgY29uc3QgcmVzZXRVcmwgPSBgaHR0cDovL2xvY2FsaG9zdDozMDAwL3Jlc2V0LXBhc3N3b3JkLyR7cmVzZXRUb2tlbn1gO1xuICAgIGF3YWl0IG5ldyBFbWFpbCh1c2VyLCByZXNldFVybCwgXCJcIikuc2VuZFBhc3N3b3JkUmVzZXQoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiUGFzc3dvcmQgcmVzZXQgbGluayBzZW50XCIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgcmVzZXRQYXNzd29yZCA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGxldCB7IHRva2VuLCBuZXdQYXNzd29yZCwgY29uZmlybVBhc3N3b3JkIH0gPSByZXEuYm9keTtcbiAgICBpZiAoIW5ld1Bhc3N3b3JkIHx8IG5ld1Bhc3N3b3JkLnRyaW0oKSA9PT0gXCJcIikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJQbGVhc2UgcHJvdmlkZSBhIG5ldyBwYXNzd29yZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoIWNvbmZpcm1QYXNzd29yZCB8fCBjb25maXJtUGFzc3dvcmQudHJpbSgpID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAwKVxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiUGxlYXNlIHByb3ZpZGUgYSBjb25maXJtIHBhc3N3b3JkXCIgfSk7XG4gICAgfVxuICAgIGlmIChuZXdQYXNzd29yZCAhPT0gY29uZmlybVBhc3N3b3JkKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIlBhc3N3b3JkIGRvZXMgbm90IG1hdGNoXCIgfSk7XG4gICAgfVxuICAgIGlmICghdG9rZW4gfHwgdG9rZW4udHJpbSgpID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIlBsZWFzZSBwcm92aWRlIHJlc2V0IHRva2VuXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgaGFzaGVkVG9rZW4gPSBjcnlwdG8uY3JlYXRlSGFzaChcInNoYTI1NlwiKS51cGRhdGUodG9rZW4pLmRpZ2VzdChcImhleFwiKTtcbiAgICBjb25zdCByZXNldFRva2VuRG9jID0gYXdhaXQgUmVzZXRUb2tlbi5maW5kT25lKHsgcmVzZXRUb2tlbjogaGFzaGVkVG9rZW4gfSk7XG5cbiAgICBpZiAoIXJlc2V0VG9rZW5Eb2MpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBvciBleHBpcmVkIHRva2VuXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5SWQocmVzZXRUb2tlbkRvYy51c2VySWQpO1xuXG4gICAgLy8gaGFzaGluZyBwYXNzd29yZFxuICAgIGNvbnN0IHNhbHQgPSBhd2FpdCBiY3J5cHQuZ2VuU2FsdCgxMCk7XG4gICAgbmV3UGFzc3dvcmQgPSBhd2FpdCBiY3J5cHQuaGFzaChuZXdQYXNzd29yZCwgc2FsdCk7XG5cbiAgICB1c2VyLnBhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG4gICAgYXdhaXQgdXNlci5zYXZlKCk7XG5cbiAgICAvLyBPcHRpb25hbGx5IGRlbGV0ZSB0aGUgcmVzZXQgdG9rZW4gYWZ0ZXIgdXNlXG4gICAgYXdhaXQgUmVzZXRUb2tlbi5maW5kQnlJZEFuZERlbGV0ZShyZXNldFRva2VuRG9jLl9pZCk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIlBhc3N3b3JkIHN1Y2Nlc3NmdWxseSByZXNldFwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVVc2VyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeUlkKGlkKTtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIlVzZXIgbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIHVzZXIgaXMgYSB0aGVyYXBpc3RcbiAgICBpZiAodXNlci5yb2xlICE9PSBcInRoZXJhcGlzdFwiKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJPbmx5IHRoZXJhcGlzdHMgY2FuIGJlIGRlbGV0ZWRcIiB9KTtcbiAgICB9XG5cbiAgICBjb25zdCByZXNvdXJjZSA9IGF3YWl0IHBvc3QuZmluZE9uZSh7IHVzZXI6IGlkIH0pO1xuICAgIGlmIChyZXNvdXJjZSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiVGhpcyB0aGVyYXBpc3QgaGFzIGRlcGVuZGVudCByZXNvdXJjZXMhXCIgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY29udmVyc2F0aW9ucyA9IGF3YWl0IENvbnZlcnNhdGlvbi5maW5kKHsgbWVtYmVyczogaWQgfSk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWRzID0gY29udmVyc2F0aW9ucy5tYXAoY29udiA9PiBjb252Ll9pZCk7XG5cbiAgICBhd2FpdCBtZXNzYWdlLmRlbGV0ZU1hbnkoeyBjb252ZXJzYXRpb25JZDogeyAkaW46IGNvbnZlcnNhdGlvbklkcyB9IH0pO1xuICAgIGF3YWl0IENvbnZlcnNhdGlvbi5kZWxldGVNYW55KHsgX2lkOiB7ICRpbjogY29udmVyc2F0aW9uSWRzIH0gfSk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6IHRydWUsIG1lc3NhZ2U6IFwiVGhlcmFwaXN0IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG5cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZGVsZXRpbmcgdGhlcmFwaXN0OlwiLCBlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuXG4vLyBnZW5lcmF0ZSB0b2tlblxuY29uc3QgZ2VuZXJhdGVUb2tlbiA9IChpZCkgPT4ge1xuICByZXR1cm4gand0LnNpZ24oeyBpZCB9LCBwcm9jZXNzLmVudi5KV1RfU0VDUkVULCB7IGV4cGlyZXNJbjogXCIzMGRcIiB9KTtcbn07XG5cbi8vZ2VuZXJhdGUgdmVyaWZpY2F0aW9uIGNvZGVcbmZ1bmN0aW9uIGdlbmVyYXRlVmVyaWZpY2F0aW9uQ29kZSgpIHtcbiAgbGV0IGNvZGUgPSBNYXRoLmZsb29yKDEwMDAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwMDApO1xuICByZXR1cm4gY29kZS50b1N0cmluZygpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFBQSxhQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxTQUFBLEdBQUFGLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRSxPQUFBLEdBQUFILHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBRyxVQUFBLEdBQUFKLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSSxXQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBSyxZQUFBLEdBQUFOLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBTSxNQUFBLEdBQUFQLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBTyxLQUFBLEdBQUFSLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBUSxhQUFBLEdBQUFULHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBUyxRQUFBLEdBQUFWLHNCQUFBLENBQUFDLE9BQUE7QUFFTyxJQUFNVSxZQUFZO0VBQUEsSUFBQUMsSUFBQSxPQUFBQyxrQkFBQSwyQkFBQUMsWUFBQSxZQUFBQyxJQUFBLENBQUcsU0FBQUMsUUFBT0MsR0FBRyxFQUFFQyxHQUFHO0lBQUEsSUFBQUMsU0FBQSxFQUFBQyxTQUFBLEVBQUFDLFFBQUEsRUFBQUMsUUFBQSxFQUFBQyxNQUFBLEVBQUFDLEtBQUEsRUFB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