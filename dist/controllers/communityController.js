"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCommunity = exports.rejectPendingMember = exports.leaveCommunity = exports.joinCommunity = exports.getPendingMembers = exports.getMyCommunities = exports.getCommunityPosts = exports.getCommunity = exports.getCommunitiesJoinedByMe = exports.getCommunitiesCreatedByMe = exports.getAllCommunities = exports.deleteCommunity = exports.createCommunity = exports.approvePendingMember = exports.addPost = exports.addMember = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Community = _interopRequireDefault(require("../models/Community"));
var _post = _interopRequireDefault(require("../models/post.js"));
var _userModel = _interopRequireDefault(require("../models/userModel.js"));
var _photoUpload = _interopRequireDefault(require("../helpers/photoUpload.js"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var createCommunity = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, _req$body, name, description, privacy, members, initialMembers, _iterator, _step, memberId, memberExists, image, community;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.user;
          _req$body = req.body, name = _req$body.name, description = _req$body.description, privacy = _req$body.privacy; // Handle members field
          members = req.body.members ? req.body.members.split(",") : []; // Validate required fields
          if (!(!name || name === "")) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Name is required"
          }));
        case 6:
          if (!(!description || description === "")) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Description is required"
          }));
        case 8:
          // Initialize the community with the creator as the first member
          initialMembers = new Set([user._id.toString()]); // Validate and add additional members
          if (!(members && Array.isArray(members))) {
            _context.next = 35;
            break;
          }
          _iterator = _createForOfIteratorHelper(members);
          _context.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context.next = 27;
            break;
          }
          memberId = _step.value;
          if (!(!memberId || !mongoose.Types.ObjectId.isValid(memberId))) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("continue", 25);
        case 17:
          _context.next = 19;
          return _userModel["default"].findById(memberId);
        case 19:
          memberExists = _context.sent;
          if (!memberExists) {
            _context.next = 24;
            break;
          }
          initialMembers.add(memberId.toString());
          _context.next = 25;
          break;
        case 24:
          return _context.abrupt("return", res.status(400).json({
            message: "User not found: ".concat(memberId)
          }));
        case 25:
          _context.next = 13;
          break;
        case 27:
          _context.next = 32;
          break;
        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](11);
          _iterator.e(_context.t0);
        case 32:
          _context.prev = 32;
          _iterator.f();
          return _context.finish(32);
        case 35:
          if (!(privacy && privacy !== "")) {
            _context.next = 38;
            break;
          }
          if (!(privacy !== "public" && privacy !== "private")) {
            _context.next = 38;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: "Invalid privacy setting"
          }));
        case 38:
          // Handle image upload
          image = "";
          if (!req.files) {
            _context.next = 44;
            break;
          }
          _context.next = 42;
          return (0, _photoUpload["default"])(req);
        case 42:
          image = _context.sent;
          image = image.url;
        case 44:
          // Create the community
          community = new _Community["default"]({
            name: name,
            description: description,
            profileImage: image,
            creator: user._id,
            privacy: privacy,
            members: Array.from(initialMembers) // Ensure members is an array of valid ObjectIds
          });
          _context.next = 47;
          return community.save();
        case 47:
          return _context.abrupt("return", res.status(201).json({
            community: community
          }));
        case 50:
          _context.prev = 50;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t1.message
          }));
        case 54:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 50], [11, 29, 32, 35]]);
  }));
  return function createCommunity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createCommunity = createCommunity;
var getCommunity = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, community;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id; // Extract limit from query parameter
          _context2.next = 4;
          return _Community["default"].findById(id).populate("creator", "-password -verificationToken -createdAt -updatedAt -__v").populate("members", "-password -verificationToken -createdAt -updatedAt -__v").populate("pendingMembers", "-password -verificationToken -createdAt -updatedAt -__v").populate("posts", "title").populate("rules", "name").populate("tags", "name");
        case 4:
          community = _context2.sent;
          if (community) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            community: community
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
  return function getCommunity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getCommunity = getCommunity;
var getAllCommunities = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, userCommunities, userCommunityIds, communities;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          user = req.user; // Extract limit from query parameter
          _context3.next = 4;
          return _Community["default"].find({
            members: {
              $in: [user._id]
            }
          });
        case 4:
          userCommunities = _context3.sent;
          userCommunityIds = userCommunities.map(function (community) {
            return community._id;
          });
          _context3.next = 8;
          return _Community["default"].find({
            _id: {
              $nin: userCommunityIds
            }
          }).populate("creator", "-password -verificationToken -createdAt -updatedAt -__v").populate("members", "-password -verificationToken -createdAt -updatedAt -__v").populate("pendingMembers", "-password -verificationToken -createdAt -updatedAt -__v").populate("posts").populate("rules", "name").populate("tags", "name");
        case 8:
          communities = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            communities: communities
          }));
        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: _context3.t0.message
          }));
        case 16:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return function getAllCommunities(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getAllCommunities = getAllCommunities;
var getMyCommunities = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user, page, limit, communities;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user = req.user;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context4.next = 6;
          return _Community["default"].find({
            members: user._id
          }).populate("creator", "-password -verificationToken -createdAt -updatedAt -__v").populate("members", "-password -verificationToken -createdAt -updatedAt -__v").populate("pendingMembers", "-password -verificationToken -createdAt -updatedAt -__v").populate({
            path: "posts",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "comments.user",
              select: "-password"
            }, {
              path: "likes.user",
              select: "-password"
            }]
          }).populate("rules", "name").populate("tags", "name").skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 6:
          communities = _context4.sent;
          _context4.t0 = res.status(200);
          _context4.t1 = communities;
          _context4.t2 = page;
          _context4.t3 = Math;
          _context4.next = 13;
          return _Community["default"].countDocuments({
            members: user._id
          });
        case 13:
          _context4.t4 = _context4.sent;
          _context4.t5 = limit;
          _context4.t6 = _context4.t4 / _context4.t5;
          _context4.t7 = _context4.t3.ceil.call(_context4.t3, _context4.t6);
          _context4.t8 = {
            communities: _context4.t1,
            currentPage: _context4.t2,
            totalPages: _context4.t7
          };
          return _context4.abrupt("return", _context4.t0.json.call(_context4.t0, _context4.t8));
        case 21:
          _context4.prev = 21;
          _context4.t9 = _context4["catch"](0);
          console.log(_context4.t9);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t9.message
          }));
        case 25:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 21]]);
  }));
  return function getMyCommunities(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getMyCommunities = getMyCommunities;
var getCommunitiesCreatedByMe = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user, page, limit, communities;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user = req.user;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context5.next = 6;
          return _Community["default"].find({
            creator: user._id
          }).populate("creator", "firstname lastname username profileImage").populate("members", "-password -verificationToken -createdAt -updatedAt -__v").populate({
            path: "posts",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "comments.user",
              select: "-password"
            }, {
              path: "likes.user",
              select: "-password"
            }]
          }).populate("rules", "name").populate("tags", "name").skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 6:
          communities = _context5.sent;
          _context5.t0 = res.status(200);
          _context5.t1 = communities;
          _context5.t2 = page;
          _context5.t3 = Math;
          _context5.next = 13;
          return _Community["default"].countDocuments({
            creator: user._id
          });
        case 13:
          _context5.t4 = _context5.sent;
          _context5.t5 = limit;
          _context5.t6 = _context5.t4 / _context5.t5;
          _context5.t7 = _context5.t3.ceil.call(_context5.t3, _context5.t6);
          _context5.t8 = {
            communities: _context5.t1,
            currentPage: _context5.t2,
            totalPages: _context5.t7
          };
          return _context5.abrupt("return", _context5.t0.json.call(_context5.t0, _context5.t8));
        case 21:
          _context5.prev = 21;
          _context5.t9 = _context5["catch"](0);
          console.log(_context5.t9);
          return _context5.abrupt("return", res.status(500).json({
            message: _context5.t9.message
          }));
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 21]]);
  }));
  return function getCommunitiesCreatedByMe(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getCommunitiesCreatedByMe = getCommunitiesCreatedByMe;
var getCommunitiesJoinedByMe = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, page, limit, communities;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = req.user;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context6.next = 6;
          return _Community["default"].find({
            members: user._id,
            creator: {
              $ne: user.id
            } // Exclude communities where user is the creator
          }).populate("creator", "firstname lastname username profileImage").populate("members", "-password -verificationToken -createdAt -updatedAt -__v").populate({
            path: "posts",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "comments.user",
              select: "-password"
            }, {
              path: "likes.user",
              select: "-password"
            }]
          }).populate("rules", "name").populate("tags", "name").skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 6:
          communities = _context6.sent;
          _context6.t0 = res.status(200);
          _context6.t1 = communities;
          _context6.t2 = page;
          _context6.t3 = Math;
          _context6.next = 13;
          return _Community["default"].countDocuments({
            members: user._id
          });
        case 13:
          _context6.t4 = _context6.sent;
          _context6.t5 = limit;
          _context6.t6 = _context6.t4 / _context6.t5;
          _context6.t7 = _context6.t3.ceil.call(_context6.t3, _context6.t6);
          _context6.t8 = {
            communities: _context6.t1,
            currentPage: _context6.t2,
            totalPages: _context6.t7
          };
          return _context6.abrupt("return", _context6.t0.json.call(_context6.t0, _context6.t8));
        case 21:
          _context6.prev = 21;
          _context6.t9 = _context6["catch"](0);
          console.log(_context6.t9);
          return _context6.abrupt("return", res.status(500).json({
            message: _context6.t9.message
          }));
        case 25:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 21]]);
  }));
  return function getCommunitiesJoinedByMe(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getCommunitiesJoinedByMe = getCommunitiesJoinedByMe;
var updateCommunity = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var user, id, _req$body2, name, description, community;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          user = req.user;
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description;
          _context7.next = 6;
          return _Community["default"].findById(id);
        case 6:
          community = _context7.sent;
          if (community) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 9:
          if (!(community.creator.toString() !== user._id.toString())) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(403).json({
            message: "You are not authorized to edit this community"
          }));
        case 11:
          if (name && name !== "") {
            community.name = name;
          }
          if (description && description !== "") {
            community.description = description;
          }
          _context7.next = 15;
          return community.save();
        case 15:
          return _context7.abrupt("return", res.status(200).json({
            community: community
          }));
        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          return _context7.abrupt("return", res.status(500).json({
            message: _context7.t0.message
          }));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 18]]);
  }));
  return function updateCommunity(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.updateCommunity = updateCommunity;
var deleteCommunity = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var user, id, community;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          user = req.user;
          id = req.params.id;
          _context8.next = 5;
          return _Community["default"].findById(id);
        case 5:
          community = _context8.sent;
          if (community) {
            _context8.next = 8;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 8:
          if (!(community.creator.toString() !== user._id.toString())) {
            _context8.next = 10;
            break;
          }
          return _context8.abrupt("return", res.status(403).json({
            message: "You are not authorized to delete this community"
          }));
        case 10:
          _context8.next = 12;
          return community["delete"]();
        case 12:
          return _context8.abrupt("return", res.status(200).json({
            message: "Community deleted successfully"
          }));
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(500).json({
            message: _context8.t0.message
          }));
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 15]]);
  }));
  return function deleteCommunity(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteCommunity = deleteCommunity;
var joinCommunity = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var id, user, community;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id;
          user = req.user;
          _context9.next = 5;
          return _Community["default"].findById(id);
        case 5:
          community = _context9.sent;
          if (community) {
            _context9.next = 8;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 8:
          if (!community.members.includes(user._id)) {
            _context9.next = 10;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "You are already a member of this community"
          }));
        case 10:
          if (!(community.privacy === "private")) {
            _context9.next = 16;
            break;
          }
          if (!community.pendingMembers.includes(user._id)) {
            _context9.next = 13;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            message: "You have already sent a request to join this community"
          }));
        case 13:
          community.pendingMembers.push(user._id);
          community.save();
          return _context9.abrupt("return", res.status(200).json({
            message: "This community is private, your requist to join have been sent to the admin"
          }));
        case 16:
          community.members.push(user._id);
          _context9.next = 19;
          return community.save();
        case 19:
          return _context9.abrupt("return", res.status(200).json({
            community: community
          }));
        case 22:
          _context9.prev = 22;
          _context9.t0 = _context9["catch"](0);
          console.log(_context9.t0);
          return _context9.abrupt("return", res.status(500).json({
            message: _context9.t0.message
          }));
        case 26:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 22]]);
  }));
  return function joinCommunity(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.joinCommunity = joinCommunity;
var getPendingMembers = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var id, user, community;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          id = req.params.id;
          user = req.user;
          _context10.next = 5;
          return _Community["default"].findById(id);
        case 5:
          community = _context10.sent;
          if (community) {
            _context10.next = 8;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 8:
          if (!(community.creator.toString() !== user._id.toString())) {
            _context10.next = 10;
            break;
          }
          return _context10.abrupt("return", res.status(403).json({
            message: "You are not authorized to view pending members"
          }));
        case 10:
          return _context10.abrupt("return", res.status(200).json({
            pendingMembers: community.pendingMembers
          }));
        case 13:
          _context10.prev = 13;
          _context10.t0 = _context10["catch"](0);
          console.log(_context10.t0);
          return _context10.abrupt("return", res.status(500).json({
            message: _context10.t0.message
          }));
        case 17:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 13]]);
  }));
  return function getPendingMembers(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.getPendingMembers = getPendingMembers;
var approvePendingMember = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var id, user, userId, community;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          id = req.params.id;
          user = req.user;
          userId = req.body.userId;
          _context11.next = 6;
          return _Community["default"].findById(id);
        case 6:
          community = _context11.sent;
          if (community) {
            _context11.next = 9;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 9:
          if (!(community.creator.toString() !== user._id.toString())) {
            _context11.next = 11;
            break;
          }
          return _context11.abrupt("return", res.status(403).json({
            message: "You are not authorized to approve members"
          }));
        case 11:
          if (community.pendingMembers.includes(userId)) {
            _context11.next = 13;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            message: "This user is not a pending member of this community"
          }));
        case 13:
          community.pendingMembers = community.pendingMembers.filter(function (member) {
            return member.toString() !== userId.toString();
          });
          community.members.push(userId);
          _context11.next = 17;
          return community.save();
        case 17:
          return _context11.abrupt("return", res.status(200).json({
            community: community
          }));
        case 20:
          _context11.prev = 20;
          _context11.t0 = _context11["catch"](0);
          console.log(_context11.t0);
          return _context11.abrupt("return", res.status(500).json({
            message: _context11.t0.message
          }));
        case 24:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 20]]);
  }));
  return function approvePendingMember(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.approvePendingMember = approvePendingMember;
var rejectPendingMember = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var id, user, userId, community;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          id = req.params.id;
          user = req.user;
          userId = req.body.userId;
          _context12.next = 6;
          return _Community["default"].findById(id);
        case 6:
          community = _context12.sent;
          if (community) {
            _context12.next = 9;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 9:
          if (!(community.creator.toString() !== user._id.toString())) {
            _context12.next = 11;
            break;
          }
          return _context12.abrupt("return", res.status(403).json({
            message: "You are not authorized to reject members"
          }));
        case 11:
          if (community.pendingMembers.includes(userId)) {
            _context12.next = 13;
            break;
          }
          return _context12.abrupt("return", res.status(400).json({
            message: "This user is not a pending member of this community"
          }));
        case 13:
          community.pendingMembers = community.pendingMembers.filter(function (member) {
            return member.toString() !== userId.toString();
          });
          _context12.next = 16;
          return community.save();
        case 16:
          return _context12.abrupt("return", res.status(200).json({
            message: "member rejected successfuly",
            community: community
          }));
        case 19:
          _context12.prev = 19;
          _context12.t0 = _context12["catch"](0);
          console.log(_context12.t0);
          return _context12.abrupt("return", res.status(500).json({
            message: _context12.t0.message
          }));
        case 23:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 19]]);
  }));
  return function rejectPendingMember(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.rejectPendingMember = rejectPendingMember;
var leaveCommunity = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var id, user, community;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          id = req.params.id;
          user = req.user;
          _context13.next = 5;
          return _Community["default"].findById(id);
        case 5:
          community = _context13.sent;
          if (community) {
            _context13.next = 8;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 8:
          if (community.members.includes(user._id)) {
            _context13.next = 10;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            message: "You are not a member of this community"
          }));
        case 10:
          community.members = community.members.filter(function (member) {
            return member.toString() !== user._id.toString();
          });
          _context13.next = 13;
          return community.save();
        case 13:
          return _context13.abrupt("return", res.status(200).json({
            community: community
          }));
        case 16:
          _context13.prev = 16;
          _context13.t0 = _context13["catch"](0);
          console.log(_context13.t0);
          return _context13.abrupt("return", res.status(500).json({
            message: _context13.t0.message
          }));
        case 20:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 16]]);
  }));
  return function leaveCommunity(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.leaveCommunity = leaveCommunity;
var addPost = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var id, user, content, community, image, post;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          id = req.params.id;
          user = req.user;
          content = req.body.content;
          if (!(!content || content === "")) {
            _context14.next = 6;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            message: "Content is required"
          }));
        case 6:
          _context14.next = 8;
          return _Community["default"].findById(id);
        case 8:
          community = _context14.sent;
          if (community) {
            _context14.next = 11;
            break;
          }
          return _context14.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 11:
          if (community.members.includes(user._id)) {
            _context14.next = 13;
            break;
          }
          return _context14.abrupt("return", res.status(400).json({
            message: "You are not a member of this community"
          }));
        case 13:
          image = "";
          if (!req.files) {
            _context14.next = 19;
            break;
          }
          _context14.next = 17;
          return (0, _photoUpload["default"])(req);
        case 17:
          image = _context14.sent;
          image = image.url;
        case 19:
          _context14.next = 21;
          return new _post["default"]({
            user: user._id,
            content: content,
            image: image,
            type: "community"
          });
        case 21:
          post = _context14.sent;
          _context14.next = 24;
          return post.save();
        case 24:
          community.posts.push(post._id);
          _context14.next = 27;
          return community.save();
        case 27:
          return _context14.abrupt("return", res.status(201).json({
            post: post
          }));
        case 30:
          _context14.prev = 30;
          _context14.t0 = _context14["catch"](0);
          console.log(_context14.t0);
          return _context14.abrupt("return", res.status(500).json({
            message: _context14.t0.message
          }));
        case 34:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 30]]);
  }));
  return function addPost(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.addPost = addPost;
var getCommunityPosts = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var id, page, limit, community, posts;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          id = req.params.id;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context15.next = 6;
          return _Community["default"].findById(id).populate({
            path: "posts",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "comments.user",
              select: "-password"
            }, {
              path: "likes.user",
              select: "-password"
            }],
            options: {
              sort: {
                _id: -1
              },
              // Sort posts by _id in descending order
              skip: (page - 1) * limit,
              // Skip records based on pagination
              limit: limit // Limit the number of records returned
            }
          });
        case 6:
          community = _context15.sent;
          if (community) {
            _context15.next = 9;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 9:
          posts = community.posts;
          return _context15.abrupt("return", res.status(200).json({
            posts: posts,
            currentPage: page,
            totalPages: Math.ceil(posts.length / limit)
          }));
        case 13:
          _context15.prev = 13;
          _context15.t0 = _context15["catch"](0);
          console.error(_context15.t0);
          return _context15.abrupt("return", res.status(500).json({
            message: "Server Error"
          }));
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 13]]);
  }));
  return function getCommunityPosts(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
exports.getCommunityPosts = getCommunityPosts;
var addMember = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var id, user, userId, community;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          id = req.params.id;
          user = req.user;
          userId = req.body.userId;
          _context16.next = 6;
          return _Community["default"].findById(id);
        case 6:
          community = _context16.sent;
          if (community) {
            _context16.next = 9;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: "Community not found"
          }));
        case 9:
          if (community.members.includes(user._id)) {
            _context16.next = 11;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: "You are not a member of this community"
          }));
        case 11:
          if (!community.members.includes(userId)) {
            _context16.next = 13;
            break;
          }
          return _context16.abrupt("return", res.status(400).json({
            message: "This user is already a member of this community"
          }));
        case 13:
          community.members.push(userId);
          _context16.next = 16;
          return community.save();
        case 16:
          return _context16.abrupt("return", res.status(200).json({
            community: community
          }));
        case 19:
          _context16.prev = 19;
          _context16.t0 = _context16["catch"](0);
          console.log(_context16.t0);
          return _context16.abrupt("return", res.status(500).json({
            message: _context16.t0.message
          }));
        case 23:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 19]]);
  }));
  return function addMember(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
exports.addMember = addMember;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfQ29tbXVuaXR5IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcG9zdCIsIl91c2VyTW9kZWwiLCJfcGhvdG9VcGxvYWQiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIm8iLCJhbGxvd0FycmF5TGlrZSIsIml0IiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJBcnJheSIsImlzQXJyYXkiLCJfdW5zdXBwb3J0ZWRJdGVyYWJsZVRvQXJyYXkiLCJsZW5ndGgiLCJpIiwiRiIsInMiLCJuIiwiZG9uZSIsInZhbHVlIiwiZSIsIl9lIiwiZiIsIlR5cGVFcnJvciIsIm5vcm1hbENvbXBsZXRpb24iLCJkaWRFcnIiLCJlcnIiLCJjYWxsIiwic3RlcCIsIm5leHQiLCJfZTIiLCJtaW5MZW4iLCJfYXJyYXlMaWtlVG9BcnJheSIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwic2xpY2UiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJmcm9tIiwidGVzdCIsImFyciIsImxlbiIsImFycjIiLCJjcmVhdGVDb21tdW5pdHkiLCJfcmVmIiwiX2FzeW5jVG9HZW5lcmF0b3IyIiwiX3JlZ2VuZXJhdG9yIiwibWFyayIsIl9jYWxsZWUiLCJyZXEiLCJyZXMiLCJ1c2VyIiwiX3JlcSRib2R5IiwiZGVzY3JpcHRpb24iLCJwcml2YWN5IiwibWVtYmVycyIsImluaXRpYWxNZW1iZXJzIiwiX2l0ZXJhdG9yIiwiX3N0ZXAiLCJtZW1iZXJJZCIsIm1lbWJlckV4aXN0cyIsImltYWdlIiwiY29tbXVuaXR5Iiwid3JhcCIsIl9jYWxsZWUkIiwiX2NvbnRleHQiLCJwcmV2IiwiYm9keSIsInNwbGl0IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsIm1lc3NhZ2UiLCJTZXQiLCJfaWQiLCJtb25nb29zZSIsIlR5cGVzIiwiT2JqZWN0SWQiLCJpc1ZhbGlkIiwiVXNlciIsImZpbmRCeUlkIiwic2VudCIsImFkZCIsImNvbmNhdCIsInQwIiwiZmluaXNoIiwiZmlsZXMiLCJpbWFnZVVwbG9hZGVyIiwidXJsIiwiQ29tbXVuaXR5IiwicHJvZmlsZUltYWdlIiwiY3JlYXRvciIsInNhdmUiLCJ0MSIsImNvbnNvbGUiLCJlcnJvciIsInN0b3AiLCJfeCIsIl94MiIsImFwcGx5IiwiYXJndW1lbnRzIiwiZXhwb3J0cyIsImdldENvbW11bml0eSIsIl9yZWYyIiwiX2NhbGxlZTIiLCJpZCIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInBhcmFtcyIsInBvcHVsYXRlIiwibG9nIiwiX3gzIiwiX3g0IiwiZ2V0QWxsQ29tbXVuaXRpZXMiLCJfcmVmMyIsIl9jYWxsZWUzIiwidXNlckNvbW11bml0aWVzIiwidXNlckNvbW11bml0eUlkcyIsImNvbW11bml0aWVzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiZmluZCIsIiRpbiIsIm1hcCIsIiRuaW4iLCJfeDUiLCJfeDYiLCJnZXRNeUNvbW11bml0aWVzIiwiX3JlZjQiLCJfY2FsbGVlNCIsInBhZ2UiLCJsaW1pdCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsInF1ZXJ5IiwicGFyc2VJbnQiLCJwYXRoIiwic2VsZWN0Iiwic2tpcCIsInQyIiwidDMiLCJNYXRoIiwiY291bnREb2N1bWVudHMiLCJ0NCIsInQ1IiwidDYiLCJ0NyIsImNlaWwiLCJ0OCIsImN1cnJlbnRQYWdlIiwidG90YWxQYWdlcyIsInQ5IiwiX3g3IiwiX3g4IiwiZ2V0Q29tbXVuaXRpZXNDcmVhdGVkQnlNZSIsIl9yZWY1IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJfeDkiLCJfeDEwIiwiZ2V0Q29tbXVuaXRpZXNKb2luZWRCeU1lIiwiX3JlZjYiLCJfY2FsbGVlNiIsIl9jYWxsZWU2JCIsIl9jb250ZXh0NiIsIiRuZSIsIl94MTEiLCJfeDEyIiwidXBkYXRlQ29tbXVuaXR5IiwiX3JlZjciLCJfY2FsbGVlNyIsIl9yZXEkYm9keTIiLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJfeDEzIiwiX3gxNCIsImRlbGV0ZUNvbW11bml0eSIsIl9yZWY4IiwiX2NhbGxlZTgiLCJfY2FsbGVlOCQiLCJfY29udGV4dDgiLCJfeDE1IiwiX3gxNiIsImpvaW5Db21tdW5pdHkiLCJfcmVmOSIsIl9jYWxsZWU5IiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiaW5jbHVkZXMiLCJwZW5kaW5nTWVtYmVycyIsInB1c2giLCJfeDE3IiwiX3gxOCIsImdldFBlbmRpbmdNZW1iZXJzIiwiX3JlZjEwIiwiX2NhbGxlZTEwIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJfeDE5IiwiX3gyMCIsImFwcHJvdmVQZW5kaW5nTWVtYmVyIiwiX3JlZjExIiwiX2NhbGxlZTExIiwidXNlcklkIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJmaWx0ZXIiLCJtZW1iZXIiLCJfeDIxIiwiX3gyMiIsInJlamVjdFBlbmRpbmdNZW1iZXIiLCJfcmVmMTIiLCJfY2FsbGVlMTIiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsIl94MjMiLCJfeDI0IiwibGVhdmVDb21tdW5pdHkiLCJfcmVmMTMiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsIl94MjUiLCJfeDI2IiwiYWRkUG9zdCIsIl9yZWYxNCIsIl9jYWxsZWUxNCIsImNvbnRlbnQiLCJwb3N0IiwiX2NhbGxlZTE0JCIsIl9jb250ZXh0MTQiLCJQb3N0IiwidHlwZSIsInBvc3RzIiwiX3gyNyIsIl94MjgiLCJnZXRDb21tdW5pdHlQb3N0cyIsIl9yZWYxNSIsIl9jYWxsZWUxNSIsIl9jYWxsZWUxNSQiLCJfY29udGV4dDE1Iiwib3B0aW9ucyIsInNvcnQiLCJfeDI5IiwiX3gzMCIsImFkZE1lbWJlciIsIl9yZWYxNiIsIl9jYWxsZWUxNiIsIl9jYWxsZWUxNiQiLCJfY29udGV4dDE2IiwiX3gzMSIsIl94MzIiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvY29tbXVuaXR5Q29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbXVuaXR5IGZyb20gXCIuLi9tb2RlbHMvQ29tbXVuaXR5XCI7XG5pbXBvcnQgUG9zdCBmcm9tIFwiLi4vbW9kZWxzL3Bvc3QuanNcIjtcbmltcG9ydCBVc2VyIGZyb20gXCIuLi9tb2RlbHMvdXNlck1vZGVsLmpzXCI7XG5pbXBvcnQgaW1hZ2VVcGxvYWRlciBmcm9tIFwiLi4vaGVscGVycy9waG90b1VwbG9hZC5qc1wiO1xuXG5jb25zdCBjcmVhdGVDb21tdW5pdHkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBwcml2YWN5IH0gPSByZXEuYm9keTtcblxuICAgIC8vIEhhbmRsZSBtZW1iZXJzIGZpZWxkXG4gICAgY29uc3QgbWVtYmVycyA9IHJlcS5ib2R5Lm1lbWJlcnMgPyByZXEuYm9keS5tZW1iZXJzLnNwbGl0KFwiLFwiKSA6IFtdO1xuXG4gICAgLy8gVmFsaWRhdGUgcmVxdWlyZWQgZmllbGRzXG4gICAgaWYgKCFuYW1lIHx8IG5hbWUgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiTmFtZSBpcyByZXF1aXJlZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoIWRlc2NyaXB0aW9uIHx8IGRlc2NyaXB0aW9uID09PSBcIlwiKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBtZXNzYWdlOiBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkXCIgfSk7XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgY29tbXVuaXR5IHdpdGggdGhlIGNyZWF0b3IgYXMgdGhlIGZpcnN0IG1lbWJlclxuICAgIGNvbnN0IGluaXRpYWxNZW1iZXJzID0gbmV3IFNldChbdXNlci5faWQudG9TdHJpbmcoKV0pO1xuXG4gICAgLy8gVmFsaWRhdGUgYW5kIGFkZCBhZGRpdGlvbmFsIG1lbWJlcnNcbiAgICBpZiAobWVtYmVycyAmJiBBcnJheS5pc0FycmF5KG1lbWJlcnMpKSB7XG4gICAgICBmb3IgKGNvbnN0IG1lbWJlcklkIG9mIG1lbWJlcnMpIHtcbiAgICAgICAgLy8gU2tpcCBlbXB0eSBvciBpbnZhbGlkIG1lbWJlcklkIHZhbHVlc1xuICAgICAgICBpZiAoIW1lbWJlcklkIHx8ICFtb25nb29zZS5UeXBlcy5PYmplY3RJZC5pc1ZhbGlkKG1lbWJlcklkKSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgZWFjaCBtZW1iZXIgZXhpc3RzXG4gICAgICAgIGNvbnN0IG1lbWJlckV4aXN0cyA9IGF3YWl0IFVzZXIuZmluZEJ5SWQobWVtYmVySWQpO1xuICAgICAgICBpZiAobWVtYmVyRXhpc3RzKSB7XG4gICAgICAgICAgaW5pdGlhbE1lbWJlcnMuYWRkKG1lbWJlcklkLnRvU3RyaW5nKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IGBVc2VyIG5vdCBmb3VuZDogJHttZW1iZXJJZH1gIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmFsaWRhdGUgcHJpdmFjeSBmaWVsZFxuICAgIGlmIChwcml2YWN5ICYmIHByaXZhY3kgIT09IFwiXCIpIHtcbiAgICAgIGlmIChwcml2YWN5ICE9PSBcInB1YmxpY1wiICYmIHByaXZhY3kgIT09IFwicHJpdmF0ZVwiKSB7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiSW52YWxpZCBwcml2YWN5IHNldHRpbmdcIiB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgaW1hZ2UgdXBsb2FkXG4gICAgbGV0IGltYWdlID0gXCJcIjtcbiAgICBpZiAocmVxLmZpbGVzKSB7XG4gICAgICBpbWFnZSA9IGF3YWl0IGltYWdlVXBsb2FkZXIocmVxKTtcbiAgICAgIGltYWdlID0gaW1hZ2UudXJsO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSB0aGUgY29tbXVuaXR5XG4gICAgY29uc3QgY29tbXVuaXR5ID0gbmV3IENvbW11bml0eSh7XG4gICAgICBuYW1lLFxuICAgICAgZGVzY3JpcHRpb24sXG4gICAgICBwcm9maWxlSW1hZ2U6IGltYWdlLFxuICAgICAgY3JlYXRvcjogdXNlci5faWQsXG4gICAgICBwcml2YWN5LFxuICAgICAgbWVtYmVyczogQXJyYXkuZnJvbShpbml0aWFsTWVtYmVycyksIC8vIEVuc3VyZSBtZW1iZXJzIGlzIGFuIGFycmF5IG9mIHZhbGlkIE9iamVjdElkc1xuICAgIH0pO1xuXG4gICAgYXdhaXQgY29tbXVuaXR5LnNhdmUoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBjb21tdW5pdHkgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgZ2V0Q29tbXVuaXR5ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAvLyBFeHRyYWN0IGxpbWl0IGZyb20gcXVlcnkgcGFyYW1ldGVyXG4gICAgY29uc3QgY29tbXVuaXR5ID0gYXdhaXQgQ29tbXVuaXR5LmZpbmRCeUlkKGlkKVxuICAgICAgLnBvcHVsYXRlKFxuICAgICAgICBcImNyZWF0b3JcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZShcbiAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgIFwiLXBhc3N3b3JkIC12ZXJpZmljYXRpb25Ub2tlbiAtY3JlYXRlZEF0IC11cGRhdGVkQXQgLV9fdlwiXG4gICAgICApXG4gICAgICAucG9wdWxhdGUoXG4gICAgICAgIFwicGVuZGluZ01lbWJlcnNcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZShcInBvc3RzXCIsIFwidGl0bGVcIilcbiAgICAgIC5wb3B1bGF0ZShcInJ1bGVzXCIsIFwibmFtZVwiKVxuICAgICAgLnBvcHVsYXRlKFwidGFnc1wiLCBcIm5hbWVcIik7XG5cbiAgICBpZiAoIWNvbW11bml0eSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJDb21tdW5pdHkgbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIGNvbW11bml0eSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgZ2V0QWxsQ29tbXVuaXRpZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTsgLy8gRXh0cmFjdCBsaW1pdCBmcm9tIHF1ZXJ5IHBhcmFtZXRlclxuXG4gICAgY29uc3QgdXNlckNvbW11bml0aWVzID0gYXdhaXQgQ29tbXVuaXR5LmZpbmQoe1xuICAgICAgbWVtYmVyczogeyAkaW46IFt1c2VyLl9pZF0gfSxcbiAgICB9KTtcbiAgICBjb25zdCB1c2VyQ29tbXVuaXR5SWRzID0gdXNlckNvbW11bml0aWVzLm1hcCgoY29tbXVuaXR5KSA9PiBjb21tdW5pdHkuX2lkKTtcblxuICAgIGNvbnN0IGNvbW11bml0aWVzID0gYXdhaXQgQ29tbXVuaXR5LmZpbmQoe1xuICAgICAgX2lkOiB7ICRuaW46IHVzZXJDb21tdW5pdHlJZHMgfSxcbiAgICB9KVxuICAgICAgLnBvcHVsYXRlKFxuICAgICAgICBcImNyZWF0b3JcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZShcbiAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgIFwiLXBhc3N3b3JkIC12ZXJpZmljYXRpb25Ub2tlbiAtY3JlYXRlZEF0IC11cGRhdGVkQXQgLV9fdlwiXG4gICAgICApXG4gICAgICAucG9wdWxhdGUoXG4gICAgICAgIFwicGVuZGluZ01lbWJlcnNcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZShcInBvc3RzXCIpXG4gICAgICAucG9wdWxhdGUoXCJydWxlc1wiLCBcIm5hbWVcIilcbiAgICAgIC5wb3B1bGF0ZShcInRhZ3NcIiwgXCJuYW1lXCIpOyAvLyBMaW1pdCB0aGUgbnVtYmVyIG9mIHJlY29yZHMgcmV0dXJuZWRcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgY29tbXVuaXRpZXMsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldE15Q29tbXVuaXRpZXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCBwYWdlID0gcmVxLnF1ZXJ5LnBhZ2UgPyBwYXJzZUludChyZXEucXVlcnkucGFnZSkgOiAxOyAvLyBFeHRyYWN0IHBhZ2UgbnVtYmVyIGZyb20gcXVlcnkgcGFyYW1ldGVyXG4gICAgY29uc3QgbGltaXQgPSByZXEucXVlcnkubGltaXQgPyBwYXJzZUludChyZXEucXVlcnkubGltaXQpIDogMTA7IC8vIEV4dHJhY3QgbGltaXQgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcblxuICAgIGNvbnN0IGNvbW11bml0aWVzID0gYXdhaXQgQ29tbXVuaXR5LmZpbmQoeyBtZW1iZXJzOiB1c2VyLl9pZCB9KVxuICAgICAgLnBvcHVsYXRlKFxuICAgICAgICBcImNyZWF0b3JcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZShcbiAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgIFwiLXBhc3N3b3JkIC12ZXJpZmljYXRpb25Ub2tlbiAtY3JlYXRlZEF0IC11cGRhdGVkQXQgLV9fdlwiXG4gICAgICApXG4gICAgICAucG9wdWxhdGUoXG4gICAgICAgIFwicGVuZGluZ01lbWJlcnNcIixcbiAgICAgICAgXCItcGFzc3dvcmQgLXZlcmlmaWNhdGlvblRva2VuIC1jcmVhdGVkQXQgLXVwZGF0ZWRBdCAtX192XCJcbiAgICAgIClcbiAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgIHBhdGg6IFwicG9zdHNcIixcbiAgICAgICAgcG9wdWxhdGU6IFtcbiAgICAgICAgICB7IHBhdGg6IFwidXNlclwiLCBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIgfSxcbiAgICAgICAgICB7IHBhdGg6IFwiY29tbWVudHMudXNlclwiLCBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIgfSxcbiAgICAgICAgICB7IHBhdGg6IFwibGlrZXMudXNlclwiLCBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAucG9wdWxhdGUoXCJydWxlc1wiLCBcIm5hbWVcIilcbiAgICAgIC5wb3B1bGF0ZShcInRhZ3NcIiwgXCJuYW1lXCIpXG4gICAgICAuc2tpcCgocGFnZSAtIDEpICogbGltaXQpIC8vIFNraXAgcmVjb3JkcyBiYXNlZCBvbiBwYWdpbmF0aW9uXG4gICAgICAubGltaXQobGltaXQpOyAvLyBMaW1pdCB0aGUgbnVtYmVyIG9mIHJlY29yZHMgcmV0dXJuZWRcblxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBjb21tdW5pdGllcyxcbiAgICAgIGN1cnJlbnRQYWdlOiBwYWdlLFxuICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKFxuICAgICAgICAoYXdhaXQgQ29tbXVuaXR5LmNvdW50RG9jdW1lbnRzKHsgbWVtYmVyczogdXNlci5faWQgfSkpIC8gbGltaXRcbiAgICAgICksXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGdldENvbW11bml0aWVzQ3JlYXRlZEJ5TWUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCBwYWdlID0gcmVxLnF1ZXJ5LnBhZ2UgPyBwYXJzZUludChyZXEucXVlcnkucGFnZSkgOiAxOyAvLyBFeHRyYWN0IHBhZ2UgbnVtYmVyIGZyb20gcXVlcnkgcGFyYW1ldGVyXG4gICAgY29uc3QgbGltaXQgPSByZXEucXVlcnkubGltaXQgPyBwYXJzZUludChyZXEucXVlcnkubGltaXQpIDogMTA7IC8vIEV4dHJhY3QgbGltaXQgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcblxuICAgIGNvbnN0IGNvbW11bml0aWVzID0gYXdhaXQgQ29tbXVuaXR5LmZpbmQoeyBjcmVhdG9yOiB1c2VyLl9pZCB9KVxuICAgICAgLnBvcHVsYXRlKFwiY3JlYXRvclwiLCBcImZpcnN0bmFtZSBsYXN0bmFtZSB1c2VybmFtZSBwcm9maWxlSW1hZ2VcIilcbiAgICAgIC5wb3B1bGF0ZShcbiAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgIFwiLXBhc3N3b3JkIC12ZXJpZmljYXRpb25Ub2tlbiAtY3JlYXRlZEF0IC11cGRhdGVkQXQgLV9fdlwiXG4gICAgICApXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcInBvc3RzXCIsXG4gICAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgICAgeyBwYXRoOiBcInVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgICAgeyBwYXRoOiBcImNvbW1lbnRzLnVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgICAgeyBwYXRoOiBcImxpa2VzLnVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgLnBvcHVsYXRlKFwicnVsZXNcIiwgXCJuYW1lXCIpXG4gICAgICAucG9wdWxhdGUoXCJ0YWdzXCIsIFwibmFtZVwiKVxuICAgICAgLnNraXAoKHBhZ2UgLSAxKSAqIGxpbWl0KSAvLyBTa2lwIHJlY29yZHMgYmFzZWQgb24gcGFnaW5hdGlvblxuICAgICAgLmxpbWl0KGxpbWl0KTsgLy8gTGltaXQgdGhlIG51bWJlciBvZiByZWNvcmRzIHJldHVybmVkXG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgY29tbXVuaXRpZXMsXG4gICAgICBjdXJyZW50UGFnZTogcGFnZSxcbiAgICAgIHRvdGFsUGFnZXM6IE1hdGguY2VpbChcbiAgICAgICAgKGF3YWl0IENvbW11bml0eS5jb3VudERvY3VtZW50cyh7IGNyZWF0b3I6IHVzZXIuX2lkIH0pKSAvIGxpbWl0XG4gICAgICApLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBnZXRDb21tdW5pdGllc0pvaW5lZEJ5TWUgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCBwYWdlID0gcmVxLnF1ZXJ5LnBhZ2UgPyBwYXJzZUludChyZXEucXVlcnkucGFnZSkgOiAxOyAvLyBFeHRyYWN0IHBhZ2UgbnVtYmVyIGZyb20gcXVlcnkgcGFyYW1ldGVyXG4gICAgY29uc3QgbGltaXQgPSByZXEucXVlcnkubGltaXQgPyBwYXJzZUludChyZXEucXVlcnkubGltaXQpIDogMTA7IC8vIEV4dHJhY3QgbGltaXQgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcblxuICAgIGNvbnN0IGNvbW11bml0aWVzID0gYXdhaXQgQ29tbXVuaXR5LmZpbmQoe1xuICAgICAgbWVtYmVyczogdXNlci5faWQsXG4gICAgICBjcmVhdG9yOiB7ICRuZTogdXNlci5pZCB9LCAvLyBFeGNsdWRlIGNvbW11bml0aWVzIHdoZXJlIHVzZXIgaXMgdGhlIGNyZWF0b3JcbiAgICB9KVxuICAgICAgLnBvcHVsYXRlKFwiY3JlYXRvclwiLCBcImZpcnN0bmFtZSBsYXN0bmFtZSB1c2VybmFtZSBwcm9maWxlSW1hZ2VcIilcbiAgICAgIC5wb3B1bGF0ZShcbiAgICAgICAgXCJtZW1iZXJzXCIsXG4gICAgICAgIFwiLXBhc3N3b3JkIC12ZXJpZmljYXRpb25Ub2tlbiAtY3JlYXRlZEF0IC11cGRhdGVkQXQgLV9fdlwiXG4gICAgICApXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcInBvc3RzXCIsXG4gICAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgICAgeyBwYXRoOiBcInVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgICAgeyBwYXRoOiBcImNvbW1lbnRzLnVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgICAgeyBwYXRoOiBcImxpa2VzLnVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgLnBvcHVsYXRlKFwicnVsZXNcIiwgXCJuYW1lXCIpXG4gICAgICAucG9wdWxhdGUoXCJ0YWdzXCIsIFwibmFtZVwiKVxuICAgICAgLnNraXAoKHBhZ2UgLSAxKSAqIGxpbWl0KSAvLyBTa2lwIHJlY29yZHMgYmFzZWQgb24gcGFnaW5hdGlvblxuICAgICAgLmxpbWl0KGxpbWl0KTsgLy8gTGltaXQgdGhlIG51bWJlciBvZiByZWNvcmRzIHJldHVybmVkXG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgY29tbXVuaXRpZXMsXG4gICAgICBjdXJyZW50UGFnZTogcGFnZSxcbiAgICAgIHRvdGFsUGFnZXM6IE1hdGguY2VpbChcbiAgICAgICAgKGF3YWl0IENvbW11bml0eS5jb3VudERvY3VtZW50cyh7IG1lbWJlcnM6IHVzZXIuX2lkIH0pKSAvIGxpbWl0XG4gICAgICApLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCB1cGRhdGVDb21tdW5pdHkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgbmFtZSwgZGVzY3JpcHRpb24gfSA9IHJlcS5ib2R5O1xuICAgIGNvbnN0IGNvbW11bml0eSA9IGF3YWl0IENvbW11bml0eS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29tbXVuaXR5IG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbXVuaXR5LmNyZWF0b3IudG9TdHJpbmcoKSAhPT0gdXNlci5faWQudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMylcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gZWRpdCB0aGlzIGNvbW11bml0eVwiIH0pO1xuICAgIH1cbiAgICBpZiAobmFtZSAmJiBuYW1lICE9PSBcIlwiKSB7XG4gICAgICBjb21tdW5pdHkubmFtZSA9IG5hbWU7XG4gICAgfVxuICAgIGlmIChkZXNjcmlwdGlvbiAmJiBkZXNjcmlwdGlvbiAhPT0gXCJcIikge1xuICAgICAgY29tbXVuaXR5LmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgfVxuICAgIGF3YWl0IGNvbW11bml0eS5zYXZlKCk7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgY29tbXVuaXR5IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBkZWxldGVDb21tdW5pdHkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IGNvbW11bml0eSA9IGF3YWl0IENvbW11bml0eS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29tbXVuaXR5IG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbXVuaXR5LmNyZWF0b3IudG9TdHJpbmcoKSAhPT0gdXNlci5faWQudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMylcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gZGVsZXRlIHRoaXMgY29tbXVuaXR5XCIgfSk7XG4gICAgfVxuICAgIGF3YWl0IGNvbW11bml0eS5kZWxldGUoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIkNvbW11bml0eSBkZWxldGVkIHN1Y2Nlc3NmdWxseVwiIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBqb2luQ29tbXVuaXR5ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCBjb21tdW5pdHkgPSBhd2FpdCBDb21tdW5pdHkuZmluZEJ5SWQoaWQpO1xuICAgIGlmICghY29tbXVuaXR5KSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkNvbW11bml0eSBub3QgZm91bmRcIiB9KTtcbiAgICB9XG4gICAgaWYgKGNvbW11bml0eS5tZW1iZXJzLmluY2x1ZGVzKHVzZXIuX2lkKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMClcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIllvdSBhcmUgYWxyZWFkeSBhIG1lbWJlciBvZiB0aGlzIGNvbW11bml0eVwiIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbXVuaXR5LnByaXZhY3kgPT09IFwicHJpdmF0ZVwiKSB7XG4gICAgICBpZiAoY29tbXVuaXR5LnBlbmRpbmdNZW1iZXJzLmluY2x1ZGVzKHVzZXIuX2lkKSkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGhhdmUgYWxyZWFkeSBzZW50IGEgcmVxdWVzdCB0byBqb2luIHRoaXMgY29tbXVuaXR5XCIsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29tbXVuaXR5LnBlbmRpbmdNZW1iZXJzLnB1c2godXNlci5faWQpO1xuICAgICAgY29tbXVuaXR5LnNhdmUoKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgIG1lc3NhZ2U6XG4gICAgICAgICAgXCJUaGlzIGNvbW11bml0eSBpcyBwcml2YXRlLCB5b3VyIHJlcXVpc3QgdG8gam9pbiBoYXZlIGJlZW4gc2VudCB0byB0aGUgYWRtaW5cIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tdW5pdHkubWVtYmVycy5wdXNoKHVzZXIuX2lkKTtcbiAgICBhd2FpdCBjb21tdW5pdHkuc2F2ZSgpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGNvbW11bml0eSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgZ2V0UGVuZGluZ01lbWJlcnMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICAgIGNvbnN0IGNvbW11bml0eSA9IGF3YWl0IENvbW11bml0eS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29tbXVuaXR5IG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbXVuaXR5LmNyZWF0b3IudG9TdHJpbmcoKSAhPT0gdXNlci5faWQudG9TdHJpbmcoKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMylcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIllvdSBhcmUgbm90IGF1dGhvcml6ZWQgdG8gdmlldyBwZW5kaW5nIG1lbWJlcnNcIiB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgcGVuZGluZ01lbWJlcnM6IGNvbW11bml0eS5wZW5kaW5nTWVtYmVycyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcbmNvbnN0IGFwcHJvdmVQZW5kaW5nTWVtYmVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgY29tbXVuaXR5ID0gYXdhaXQgQ29tbXVuaXR5LmZpbmRCeUlkKGlkKTtcbiAgICBpZiAoIWNvbW11bml0eSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJDb21tdW5pdHkgbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuICAgIGlmIChjb21tdW5pdHkuY3JlYXRvci50b1N0cmluZygpICE9PSB1c2VyLl9pZC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAzKVxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byBhcHByb3ZlIG1lbWJlcnNcIiB9KTtcbiAgICB9XG4gICAgaWYgKCFjb21tdW5pdHkucGVuZGluZ01lbWJlcnMuaW5jbHVkZXModXNlcklkKSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHtcbiAgICAgICAgbWVzc2FnZTogXCJUaGlzIHVzZXIgaXMgbm90IGEgcGVuZGluZyBtZW1iZXIgb2YgdGhpcyBjb21tdW5pdHlcIixcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb21tdW5pdHkucGVuZGluZ01lbWJlcnMgPSBjb21tdW5pdHkucGVuZGluZ01lbWJlcnMuZmlsdGVyKFxuICAgICAgKG1lbWJlcikgPT4gbWVtYmVyLnRvU3RyaW5nKCkgIT09IHVzZXJJZC50b1N0cmluZygpXG4gICAgKTtcbiAgICBjb21tdW5pdHkubWVtYmVycy5wdXNoKHVzZXJJZCk7XG4gICAgYXdhaXQgY29tbXVuaXR5LnNhdmUoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBjb21tdW5pdHkgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5jb25zdCByZWplY3RQZW5kaW5nTWVtYmVyID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IHVzZXJJZCB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgY29tbXVuaXR5ID0gYXdhaXQgQ29tbXVuaXR5LmZpbmRCeUlkKGlkKTtcbiAgICBpZiAoIWNvbW11bml0eSkge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJDb21tdW5pdHkgbm90IGZvdW5kXCIgfSk7XG4gICAgfVxuICAgIGlmIChjb21tdW5pdHkuY3JlYXRvci50b1N0cmluZygpICE9PSB1c2VyLl9pZC50b1N0cmluZygpKSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDAzKVxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiWW91IGFyZSBub3QgYXV0aG9yaXplZCB0byByZWplY3QgbWVtYmVyc1wiIH0pO1xuICAgIH1cbiAgICBpZiAoIWNvbW11bml0eS5wZW5kaW5nTWVtYmVycy5pbmNsdWRlcyh1c2VySWQpKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oe1xuICAgICAgICBtZXNzYWdlOiBcIlRoaXMgdXNlciBpcyBub3QgYSBwZW5kaW5nIG1lbWJlciBvZiB0aGlzIGNvbW11bml0eVwiLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbW11bml0eS5wZW5kaW5nTWVtYmVycyA9IGNvbW11bml0eS5wZW5kaW5nTWVtYmVycy5maWx0ZXIoXG4gICAgICAobWVtYmVyKSA9PiBtZW1iZXIudG9TdHJpbmcoKSAhPT0gdXNlcklkLnRvU3RyaW5nKClcbiAgICApO1xuICAgIGF3YWl0IGNvbW11bml0eS5zYXZlKCk7XG4gICAgcmV0dXJuIHJlc1xuICAgICAgLnN0YXR1cygyMDApXG4gICAgICAuanNvbih7IG1lc3NhZ2U6IFwibWVtYmVyIHJlamVjdGVkIHN1Y2Nlc3NmdWx5XCIsIGNvbW11bml0eSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuY29uc3QgbGVhdmVDb21tdW5pdHkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICAgIGNvbnN0IGNvbW11bml0eSA9IGF3YWl0IENvbW11bml0eS5maW5kQnlJZChpZCk7XG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29tbXVuaXR5IG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cbiAgICBpZiAoIWNvbW11bml0eS5tZW1iZXJzLmluY2x1ZGVzKHVzZXIuX2lkKSkge1xuICAgICAgcmV0dXJuIHJlc1xuXG4gICAgICAgIC5zdGF0dXMoNDAwKVxuICAgICAgICAuanNvbih7IG1lc3NhZ2U6IFwiWW91IGFyZSBub3QgYSBtZW1iZXIgb2YgdGhpcyBjb21tdW5pdHlcIiB9KTtcbiAgICB9XG4gICAgY29tbXVuaXR5Lm1lbWJlcnMgPSBjb21tdW5pdHkubWVtYmVycy5maWx0ZXIoXG4gICAgICAobWVtYmVyKSA9PiBtZW1iZXIudG9TdHJpbmcoKSAhPT0gdXNlci5faWQudG9TdHJpbmcoKVxuICAgICk7XG4gICAgYXdhaXQgY29tbXVuaXR5LnNhdmUoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oeyBjb21tdW5pdHkgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZFBvc3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICAgIGNvbnN0IHsgY29udGVudCB9ID0gcmVxLmJvZHk7XG4gICAgaWYgKCFjb250ZW50IHx8IGNvbnRlbnQgPT09IFwiXCIpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IG1lc3NhZ2U6IFwiQ29udGVudCBpcyByZXF1aXJlZFwiIH0pO1xuICAgIH1cbiAgICBjb25zdCBjb21tdW5pdHkgPSBhd2FpdCBDb21tdW5pdHkuZmluZEJ5SWQoaWQpO1xuICAgIGlmICghY29tbXVuaXR5KSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkNvbW11bml0eSBub3QgZm91bmRcIiB9KTtcbiAgICB9XG4gICAgaWYgKCFjb21tdW5pdHkubWVtYmVycy5pbmNsdWRlcyh1c2VyLl9pZCkpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyg0MDApXG4gICAgICAgIC5qc29uKHsgbWVzc2FnZTogXCJZb3UgYXJlIG5vdCBhIG1lbWJlciBvZiB0aGlzIGNvbW11bml0eVwiIH0pO1xuICAgIH1cbiAgICBsZXQgaW1hZ2UgPSBcIlwiO1xuICAgIGlmIChyZXEuZmlsZXMpIHtcbiAgICAgIGltYWdlID0gYXdhaXQgaW1hZ2VVcGxvYWRlcihyZXEpO1xuICAgICAgaW1hZ2UgPSBpbWFnZS51cmw7XG4gICAgfVxuXG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IG5ldyBQb3N0KHtcbiAgICAgIHVzZXI6IHVzZXIuX2lkLFxuICAgICAgY29udGVudCxcbiAgICAgIGltYWdlLFxuICAgICAgdHlwZTogXCJjb21tdW5pdHlcIixcbiAgICB9KTtcbiAgICBhd2FpdCBwb3N0LnNhdmUoKTtcbiAgICBjb21tdW5pdHkucG9zdHMucHVzaChwb3N0Ll9pZCk7XG4gICAgYXdhaXQgY29tbXVuaXR5LnNhdmUoKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oeyBwb3N0IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5jb25zdCBnZXRDb21tdW5pdHlQb3N0cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgcGFnZSA9IHJlcS5xdWVyeS5wYWdlID8gcGFyc2VJbnQocmVxLnF1ZXJ5LnBhZ2UpIDogMTsgLy8gRXh0cmFjdCBwYWdlIG51bWJlciBmcm9tIHF1ZXJ5IHBhcmFtZXRlclxuICAgIGNvbnN0IGxpbWl0ID0gcmVxLnF1ZXJ5LmxpbWl0ID8gcGFyc2VJbnQocmVxLnF1ZXJ5LmxpbWl0KSA6IDEwOyAvLyBFeHRyYWN0IGxpbWl0IGZyb20gcXVlcnkgcGFyYW1ldGVyXG5cbiAgICBjb25zdCBjb21tdW5pdHkgPSBhd2FpdCBDb21tdW5pdHkuZmluZEJ5SWQoaWQpLnBvcHVsYXRlKHtcbiAgICAgIHBhdGg6IFwicG9zdHNcIixcbiAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgIHsgcGF0aDogXCJ1c2VyXCIsIHNlbGVjdDogXCItcGFzc3dvcmRcIiB9LFxuICAgICAgICB7IHBhdGg6IFwiY29tbWVudHMudXNlclwiLCBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIgfSxcbiAgICAgICAgeyBwYXRoOiBcImxpa2VzLnVzZXJcIiwgc2VsZWN0OiBcIi1wYXNzd29yZFwiIH0sXG4gICAgICBdLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBzb3J0OiB7IF9pZDogLTEgfSwgLy8gU29ydCBwb3N0cyBieSBfaWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgICAgICBza2lwOiAocGFnZSAtIDEpICogbGltaXQsIC8vIFNraXAgcmVjb3JkcyBiYXNlZCBvbiBwYWdpbmF0aW9uXG4gICAgICAgIGxpbWl0OiBsaW1pdCwgLy8gTGltaXQgdGhlIG51bWJlciBvZiByZWNvcmRzIHJldHVybmVkXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCFjb21tdW5pdHkpIHtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQ29tbXVuaXR5IG5vdCBmb3VuZFwiIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHBvc3RzID0gY29tbXVuaXR5LnBvc3RzO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBwb3N0cyxcbiAgICAgIGN1cnJlbnRQYWdlOiBwYWdlLFxuICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKHBvc3RzLmxlbmd0aCAvIGxpbWl0KSxcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIlNlcnZlciBFcnJvclwiIH0pO1xuICB9XG59O1xuXG5jb25zdCBhZGRNZW1iZXIgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICAgIGNvbnN0IHsgdXNlcklkIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCBjb21tdW5pdHkgPSBhd2FpdCBDb21tdW5pdHkuZmluZEJ5SWQoaWQpO1xuICAgIGlmICghY29tbXVuaXR5KSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkNvbW11bml0eSBub3QgZm91bmRcIiB9KTtcbiAgICB9XG4gICAgaWYgKCFjb21tdW5pdHkubWVtYmVycy5pbmNsdWRlcyh1c2VyLl9pZCkpIHtcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyg0MDApXG4gICAgICAgIC5qc29uKHsgbWVzc2FnZTogXCJZb3UgYXJlIG5vdCBhIG1lbWJlciBvZiB0aGlzIGNvbW11bml0eVwiIH0pO1xuICAgIH1cbiAgICBpZiAoY29tbXVuaXR5Lm1lbWJlcnMuaW5jbHVkZXModXNlcklkKSkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMClcbiAgICAgICAgLmpzb24oeyBtZXNzYWdlOiBcIlRoaXMgdXNlciBpcyBhbHJlYWR5IGEgbWVtYmVyIG9mIHRoaXMgY29tbXVuaXR5XCIgfSk7XG4gICAgfVxuICAgIGNvbW11bml0eS5tZW1iZXJzLnB1c2godXNlcklkKTtcbiAgICBhd2FpdCBjb21tdW5pdHkuc2F2ZSgpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGNvbW11bml0eSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuZXhwb3J0IHtcbiAgY3JlYXRlQ29tbXVuaXR5LFxuICBnZXRDb21tdW5pdHksXG4gIGdldEFsbENvbW11bml0aWVzLFxuICB1cGRhdGVDb21tdW5pdHksXG4gIGRlbGV0ZUNvbW11bml0eSxcbiAgam9pbkNvbW11bml0eSxcbiAgbGVhdmVDb21tdW5pdHksXG4gIGFkZFBvc3QsXG4gIGdldENvbW11bml0eVBvc3RzLFxuICBhcHByb3ZlUGVuZGluZ01lbWJlcixcbiAgcmVqZWN0UGVuZGluZ01lbWJlcixcbiAgZ2V0UGVuZGluZ01lbWJlcnMsXG4gIGdldE15Q29tbXVuaXRpZXMsXG4gIGFkZE1lbWJlcixcbiAgZ2V0Q29tbXVuaXRpZXNKb2luZWRCeU1lLFxuICBnZXRDb21tdW5pdGllc0NyZWF0ZWRCeU1lLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsVUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsS0FBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsVUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUcsWUFBQSxHQUFBSixzQkFBQSxDQUFBQyxPQUFBO0FBQXNELFNBQUFJLDJCQUFBQyxDQUFBLEVBQUFDLGNBQUEsUUFBQUMsRUFBQSxVQUFBQyxNQUFBLG9CQUFBSCxDQUFBLENBQUFHLE1BQUEsQ0FBQUMsUUFBQSxLQUFBSixDQUFBLHFCQUFBRSxFQUFBLFFBQUFHLEtBQUEsQ0FBQUMsT0FBQSxDQUFBTixDQUFBLE1BQUFFLEVBQUEsR0FBQUssMkJBQUEsQ0FBQVAsQ0FBQSxNQUFBQyxjQUFBLElBQUFE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