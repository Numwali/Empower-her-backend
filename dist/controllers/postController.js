"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePost = exports.replyingToComment = exports.likePost = exports.getSinglePost = exports.getMyPosts = exports.getMyLikedPosts = exports.getAllPosts = exports.deletePost = exports.createPost = exports.commentingOnPost = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _post3 = _interopRequireDefault(require("../models/post.js"));
var _photoUpload = _interopRequireDefault(require("../helpers/photoUpload.js"));
var _videoUploader = _interopRequireDefault(require("../helpers/videoUploader.js"));
var createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, content, image, _video, post, newPost;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.user;
          content = req.body.content;
          if (!(!content || content == "")) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: false,
            message: "content is required"
          }));
        case 5:
          image = "";
          if (!(req.files && req.files.image != null && req.files.video == null)) {
            _context.next = 11;
            break;
          }
          _context.next = 9;
          return (0, _photoUpload["default"])(req);
        case 9:
          image = _context.sent;
          image = image.url;
        case 11:
          _video = "";
          if (!(req.files && req.files.video && !req.files.image)) {
            _context.next = 17;
            break;
          }
          _context.next = 15;
          return (0, _videoUploader["default"])(req);
        case 15:
          _video = _context.sent;
          _video = _video.url;
        case 17:
          post = new _post3["default"]({
            user: user._id,
            content: content,
            image: image,
            video: _video,
            type: "blog"
          });
          _context.next = 20;
          return post.save();
        case 20:
          newPost = _context.sent;
          res.status(201).json({
            success: true,
            post: {
              id: newPost._id,
              content: content,
              image: newPost.image,
              video: newPost.video,
              comments: newPost.comments,
              postedDate: newPost.postedDate
            }
          });
          _context.next = 28;
          break;
        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).json({
            error: _context.t0
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 24]]);
  }));
  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({
//       type: "blog",
//     })
//       .populate("user", "-password")
//       .populate("comments.user", "-password")
//       .populate("likes.user", "-password")
//       .sort({ _id: -1 });
//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error });
//   }
// };
exports.createPost = createPost;
var getAllPosts = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var page, limit, posts;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context2.next = 5;
          return _post3["default"].find({
            type: "blog"
          }).populate({
            path: "user",
            select: "-password"
          }).populate({
            path: "comments",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "replies",
              populate: {
                path: "user",
                select: "-password"
              }
            }]
          }).populate("likes.user", "-password").sort({
            _id: -1
          }).skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 5:
          posts = _context2.sent;
          _context2.t0 = res.status(200);
          _context2.t1 = posts;
          _context2.t2 = page;
          _context2.t3 = Math;
          _context2.next = 12;
          return _post3["default"].countDocuments({
            type: "blog"
          });
        case 12:
          _context2.t4 = _context2.sent;
          _context2.t5 = limit;
          _context2.t6 = _context2.t4 / _context2.t5;
          _context2.t7 = _context2.t3.ceil.call(_context2.t3, _context2.t6);
          _context2.t8 = {
            success: true,
            posts: _context2.t1,
            currentPage: _context2.t2,
            totalPages: _context2.t7
          };
          _context2.t0.json.call(_context2.t0, _context2.t8);
          _context2.next = 23;
          break;
        case 20:
          _context2.prev = 20;
          _context2.t9 = _context2["catch"](0);
          res.status(500).json({
            success: false,
            message: _context2.t9.message
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 20]]);
  }));
  return function getAllPosts(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// export const getMyPosts = async (req, res) => {
//   const { user } = req;
//   try {
//     const posts = await Post.find({
//       user: user._id,
//       type: "blog",
//     })
//       .populate("user", "-password")
//       .populate("comments.user", "-password")
//       .populate("likes.user", "-password")
//       .sort({ _id: -1 });
//     res.status(200).json({
//       success: true,
//       posts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: error });
//   }
// };
exports.getAllPosts = getAllPosts;
var getMyPosts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, page, limit, posts;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          user = req.user;
          _context3.prev = 1;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context3.next = 6;
          return _post3["default"].find({
            user: user._id,
            type: "blog"
          }).populate({
            path: "user",
            select: "-password"
          }).populate({
            path: "comments",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "replies",
              populate: {
                path: "user",
                select: "-password"
              }
            }]
          }).populate("likes.user", "-password").sort({
            _id: -1
          }).skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 6:
          posts = _context3.sent;
          _context3.t0 = res.status(200);
          _context3.t1 = posts;
          _context3.t2 = page;
          _context3.t3 = Math;
          _context3.next = 13;
          return _post3["default"].countDocuments({
            user: user._id,
            type: "blog"
          });
        case 13:
          _context3.t4 = _context3.sent;
          _context3.t5 = limit;
          _context3.t6 = _context3.t4 / _context3.t5;
          _context3.t7 = _context3.t3.ceil.call(_context3.t3, _context3.t6);
          _context3.t8 = {
            success: true,
            posts: _context3.t1,
            currentPage: _context3.t2,
            totalPages: _context3.t7
          };
          _context3.t0.json.call(_context3.t0, _context3.t8);
          _context3.next = 25;
          break;
        case 21:
          _context3.prev = 21;
          _context3.t9 = _context3["catch"](1);
          console.log(_context3.t9);
          res.status(500).json({
            success: false,
            message: _context3.t9.message
          });
        case 25:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 21]]);
  }));
  return function getMyPosts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getMyPosts = getMyPosts;
var getSinglePost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var postId, post;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          postId = req.params.postId;
          _context4.next = 4;
          return _post3["default"].findById(postId).populate({
            path: "user",
            select: "-password"
          }).populate({
            path: "likes.user",
            select: "-password"
          }).populate({
            path: "comments",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "replies",
              populate: {
                path: "user",
                select: "-password"
              }
            }]
          });
        case 4:
          post = _context4.sent;
          res.status(200).json({
            success: true,
            post: post
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            success: false,
            message: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getSinglePost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getSinglePost = getSinglePost;
var updatePost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user, postId, content, postExist, image;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user = req.user;
          postId = req.params.postId;
          content = req.body.content;
          if (!(!content || content == "")) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: false,
            message: "content is required"
          }));
        case 6:
          _context5.next = 8;
          return _post3["default"].findById(postId);
        case 8:
          postExist = _context5.sent;
          if (postExist) {
            _context5.next = 11;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: false,
            message: "post doesn't exist"
          }));
        case 11:
          if (!(postExist.user.toString().replace(/ObjectId\("(.*)"\)/, "$1") != user._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"))) {
            _context5.next = 13;
            break;
          }
          return _context5.abrupt("return", res.status(200).json({
            success: false,
            message: "this post doesn't belong to you"
          }));
        case 13:
          postExist.content = content;
          if (!req.files) {
            _context5.next = 19;
            break;
          }
          _context5.next = 17;
          return (0, _photoUpload["default"])(req);
        case 17:
          image = _context5.sent;
          postExist.image = image.url;
        case 19:
          if (!(req.files && req.files.video && !req.files.image)) {
            _context5.next = 24;
            break;
          }
          _context5.next = 22;
          return (0, _videoUploader["default"])(req);
        case 22:
          video = _context5.sent;
          postExist.video = video.url;
        case 24:
          _context5.next = 26;
          return postExist.save();
        case 26:
          return _context5.abrupt("return", res.status(200).json({
            success: true,
            message: "post updated successful"
          }));
        case 29:
          _context5.prev = 29;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          res.status(500).json({
            success: false,
            message: _context5.t0
          });
        case 33:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 29]]);
  }));
  return function updatePost(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updatePost = updatePost;
var deletePost = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user, postId, post;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          user = req.user;
          postId = req.params.postId;
          _context6.next = 5;
          return _post3["default"].findById(postId);
        case 5:
          post = _context6.sent;
          if (post) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: false,
            message: "post doesn't exist"
          }));
        case 8:
          if (!(post.user.toString().replace(/ObjectId\("(.*)"\)/, "$1") != user._id.toString().replace(/ObjectId\("(.*)"\)/, "$1"))) {
            _context6.next = 10;
            break;
          }
          return _context6.abrupt("return", res.status(200).json({
            success: false,
            message: "this post doesn't belong to you"
          }));
        case 10:
          _context6.next = 12;
          return _post3["default"].deleteOne({
            _id: postId
          });
        case 12:
          res.status(200).json({
            success: true,
            message: "Post deleted successful"
          });
          _context6.next = 18;
          break;
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            success: false,
            message: _context6.t0
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function deletePost(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deletePost = deletePost;
var commentingOnPost = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var postId, user, comment, post, newComment;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          postId = req.params.postId;
          user = req.user;
          comment = req.body.comment;
          if (!(!comment || comment == "")) {
            _context8.next = 6;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            success: false,
            message: "comment is required!"
          }));
        case 6:
          _context8.next = 8;
          return _post3["default"].findById(postId);
        case 8:
          post = _context8.sent;
          if (post) {
            _context8.next = 11;
            break;
          }
          return _context8.abrupt("return", res.status(200).json({
            success: false,
            message: "Invalid post id"
          }));
        case 11:
          newComment = {
            user: user._id,
            comment: comment,
            postedDate: new Date()
          };
          post.comments.push(newComment);
          post.save().then( /*#__PURE__*/function () {
            var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(result) {
              var _post;
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!result) {
                      _context7.next = 5;
                      break;
                    }
                    _context7.next = 3;
                    return _post3["default"].findById(result._id).populate({
                      path: "user",
                      select: "-password"
                    }).populate({
                      path: "likes.user",
                      select: "-password"
                    }).populate({
                      path: "comments",
                      populate: [{
                        path: "user",
                        select: "-password"
                      }, {
                        path: "replies",
                        populate: {
                          path: "user",
                          select: "-password"
                        }
                      }]
                    });
                  case 3:
                    _post = _context7.sent;
                    return _context7.abrupt("return", res.status(200).json({
                      success: true,
                      post: _post
                    }));
                  case 5:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return function (_x15) {
              return _ref8.apply(this, arguments);
            };
          }());
          _context8.next = 19;
          break;
        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](0);
          res.status(500).json({
            success: false,
            message: _context8.t0
          });
        case 19:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 16]]);
  }));
  return function commentingOnPost(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.commentingOnPost = commentingOnPost;
var replyingToComment = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$params, postId, commentId, user, reply, post, comment, newReply, updatedPost;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _req$params = req.params, postId = _req$params.postId, commentId = _req$params.commentId;
          user = req.user;
          reply = req.body.reply; // Check if reply is provided and not empty
          if (!(!reply || reply === "")) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", res.status(400).json({
            success: false,
            message: "Reply is required!"
          }));
        case 6:
          _context9.next = 8;
          return _post3["default"].findById(postId);
        case 8:
          post = _context9.sent;
          if (post) {
            _context9.next = 11;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "Post not found"
          }));
        case 11:
          // Find the comment within the post
          comment = post.comments.id(commentId);
          if (comment) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            success: false,
            message: "Comment not found"
          }));
        case 14:
          // Create a new reply object
          newReply = {
            user: user._id,
            reply: reply,
            postedDate: new Date()
          }; // Push the reply to the replies array within the comment
          comment.replies.push(newReply);

          // Save the post
          _context9.next = 18;
          return post.save();
        case 18:
          _context9.next = 20;
          return _post3["default"].findById(postId).populate({
            path: "user",
            select: "-password"
          }).populate({
            path: "likes.user",
            select: "-password"
          }).populate({
            path: "comments",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "replies",
              populate: {
                path: "user",
                select: "-password"
              }
            }]
          });
        case 20:
          updatedPost = _context9.sent;
          // Return the updated post
          res.status(200).json({
            success: true,
            post: updatedPost
          });
          _context9.next = 28;
          break;
        case 24:
          _context9.prev = 24;
          _context9.t0 = _context9["catch"](0);
          // Handle errors
          console.error("Error replying to comment:", _context9.t0);
          res.status(500).json({
            success: false,
            message: "Internal Server Error"
          });
        case 28:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 24]]);
  }));
  return function replyingToComment(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
exports.replyingToComment = replyingToComment;
var likePost = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var postId, user_id;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          postId = req.params.postId;
          user_id = req.user._id;
          _post3["default"].findById(postId).then( /*#__PURE__*/function () {
            var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(post) {
              var found;
              return _regenerator["default"].wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    if (!post) {
                      _context11.next = 12;
                      break;
                    }
                    found = post.likes.some(function (el) {
                      return el.user.toString() === user_id.toString();
                    });
                    if (!found) {
                      _context11.next = 6;
                      break;
                    }
                    post.likes = post.likes.filter(function (item) {
                      return item.user.toString() !== user_id.toString();
                    });
                    _context11.next = 9;
                    break;
                  case 6:
                    post.likes.push({
                      user: user_id
                    });
                    _context11.next = 9;
                    return post.save();
                  case 9:
                    post.save().then( /*#__PURE__*/function () {
                      var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(result) {
                        var _post2;
                        return _regenerator["default"].wrap(function _callee10$(_context10) {
                          while (1) switch (_context10.prev = _context10.next) {
                            case 0:
                              if (!result) {
                                _context10.next = 5;
                                break;
                              }
                              _context10.next = 3;
                              return _post3["default"].findById(result._id).populate({
                                path: "user",
                                select: "-password"
                              }).populate({
                                path: "likes.user",
                                select: "-password"
                              }).populate({
                                path: "comments",
                                populate: [{
                                  path: "user",
                                  select: "-password"
                                }, {
                                  path: "replies",
                                  populate: {
                                    path: "user",
                                    select: "-password"
                                  }
                                }]
                              });
                            case 3:
                              _post2 = _context10.sent;
                              return _context10.abrupt("return", res.status(200).json({
                                success: true,
                                post: _post2
                              }));
                            case 5:
                            case "end":
                              return _context10.stop();
                          }
                        }, _callee10);
                      }));
                      return function (_x21) {
                        return _ref12.apply(this, arguments);
                      };
                    }())["catch"](function (error) {
                      return res.status(500).json({
                        error: error.message
                      });
                    });
                    _context11.next = 13;
                    break;
                  case 12:
                    res.status(404).json({
                      error: "post doesn't exist"
                    });
                  case 13:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function (_x20) {
              return _ref11.apply(this, arguments);
            };
          }())["catch"](function (error) {
            return res.json({
              error: error.message
            });
          });
        case 3:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function likePost(_x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();
exports.likePost = likePost;
var getMyLikedPosts = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var user, page, limit, posts;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          user = req.user;
          _context13.prev = 1;
          page = req.query.page ? parseInt(req.query.page) : 1; // Extract page number from query parameter
          limit = req.query.limit ? parseInt(req.query.limit) : 10; // Extract limit from query parameter
          _context13.next = 6;
          return _post3["default"].find({
            "likes.user": user._id,
            // Match posts where the user has liked
            type: "blog"
          }).populate({
            path: "user",
            select: "-password"
          }).populate({
            path: "comments",
            populate: [{
              path: "user",
              select: "-password"
            }, {
              path: "replies",
              populate: {
                path: "user",
                select: "-password"
              }
            }]
          }).populate("likes.user", "-password").sort({
            _id: -1
          }).skip((page - 1) * limit) // Skip records based on pagination
          .limit(limit);
        case 6:
          posts = _context13.sent;
          _context13.t0 = res.status(200);
          _context13.t1 = posts;
          _context13.t2 = page;
          _context13.t3 = Math;
          _context13.next = 13;
          return _post3["default"].countDocuments({
            "likes.user": user._id,
            type: "blog"
          });
        case 13:
          _context13.t4 = _context13.sent;
          _context13.t5 = limit;
          _context13.t6 = _context13.t4 / _context13.t5;
          _context13.t7 = _context13.t3.ceil.call(_context13.t3, _context13.t6);
          _context13.t8 = {
            success: true,
            posts: _context13.t1,
            currentPage: _context13.t2,
            totalPages: _context13.t7
          };
          _context13.t0.json.call(_context13.t0, _context13.t8);
          _context13.next = 25;
          break;
        case 21:
          _context13.prev = 21;
          _context13.t9 = _context13["catch"](1);
          console.log(_context13.t9);
          res.status(500).json({
            success: false,
            message: _context13.t9.message
          });
        case 25:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1, 21]]);
  }));
  return function getMyLikedPosts(_x22, _x23) {
    return _ref13.apply(this, arguments);
  };
}();
exports.getMyLikedPosts = getMyLikedPosts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcG9zdDMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9waG90b1VwbG9hZCIsIl92aWRlb1VwbG9hZGVyIiwiY3JlYXRlUG9zdCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsInVzZXIiLCJjb250ZW50IiwiaW1hZ2UiLCJfdmlkZW8iLCJwb3N0IiwibmV3UG9zdCIsIndyYXAiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwicHJldiIsIm5leHQiLCJib2R5IiwiYWJydXB0Iiwic3RhdHVzIiwianNvbiIsInN1Y2Nlc3MiLCJtZXNzYWdlIiwiZmlsZXMiLCJ2aWRlbyIsImltYWdlVXBsb2FkZXIiLCJzZW50IiwidXJsIiwidmlkZW9VcGxvYWRlciIsIlBvc3QiLCJfaWQiLCJ0eXBlIiwic2F2ZSIsImlkIiwiY29tbWVudHMiLCJwb3N0ZWREYXRlIiwidDAiLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJnZXRBbGxQb3N0cyIsIl9yZWYyIiwiX2NhbGxlZTIiLCJwYWdlIiwibGltaXQiLCJwb3N0cyIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInF1ZXJ5IiwicGFyc2VJbnQiLCJmaW5kIiwicG9wdWxhdGUiLCJwYXRoIiwic2VsZWN0Iiwic29ydCIsInNraXAiLCJ0MSIsInQyIiwidDMiLCJNYXRoIiwiY291bnREb2N1bWVudHMiLCJ0NCIsInQ1IiwidDYiLCJ0NyIsImNlaWwiLCJjYWxsIiwidDgiLCJjdXJyZW50UGFnZSIsInRvdGFsUGFnZXMiLCJ0OSIsIl94MyIsIl94NCIsImdldE15UG9zdHMiLCJfcmVmMyIsIl9jYWxsZWUzIiwiX2NhbGxlZTMkIiwiX2NvbnRleHQzIiwiX3g1IiwiX3g2IiwiZ2V0U2luZ2xlUG9zdCIsIl9yZWY0IiwiX2NhbGxlZTQiLCJwb3N0SWQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJwYXJhbXMiLCJmaW5kQnlJZCIsIl94NyIsIl94OCIsInVwZGF0ZVBvc3QiLCJfcmVmNSIsIl9jYWxsZWU1IiwicG9zdEV4aXN0IiwiX2NhbGxlZTUkIiwiX2NvbnRleHQ1IiwidG9TdHJpbmciLCJyZXBsYWNlIiwiX3g5IiwiX3gxMCIsImRlbGV0ZVBvc3QiLCJfcmVmNiIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGVsZXRlT25lIiwiX3gxMSIsIl94MTIiLCJjb21tZW50aW5nT25Qb3N0IiwiX3JlZjciLCJfY2FsbGVlOCIsImNvbW1lbnQiLCJuZXdDb21tZW50IiwiX2NhbGxlZTgkIiwiX2NvbnRleHQ4IiwiRGF0ZSIsInB1c2giLCJ0aGVuIiwiX3JlZjgiLCJfY2FsbGVlNyIsInJlc3VsdCIsIl9wb3N0IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiX3gxNSIsIl94MTMiLCJfeDE0IiwicmVwbHlpbmdUb0NvbW1lbnQiLCJfcmVmOSIsIl9jYWxsZWU5IiwiX3JlcSRwYXJhbXMiLCJjb21tZW50SWQiLCJyZXBseSIsIm5ld1JlcGx5IiwidXBkYXRlZFBvc3QiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJyZXBsaWVzIiwiX3gxNiIsIl94MTciLCJsaWtlUG9zdCIsIl9yZWYxMCIsIl9jYWxsZWUxMiIsInVzZXJfaWQiLCJfY2FsbGVlMTIkIiwiX2NvbnRleHQxMiIsIl9yZWYxMSIsIl9jYWxsZWUxMSIsImZvdW5kIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJsaWtlcyIsInNvbWUiLCJlbCIsImZpbHRlciIsIml0ZW0iLCJfcmVmMTIiLCJfY2FsbGVlMTAiLCJfcG9zdDIiLCJfY2FsbGVlMTAkIiwiX2NvbnRleHQxMCIsIl94MjEiLCJfeDIwIiwiX3gxOCIsIl94MTkiLCJnZXRNeUxpa2VkUG9zdHMiLCJfcmVmMTMiLCJfY2FsbGVlMTMiLCJfY2FsbGVlMTMkIiwiX2NvbnRleHQxMyIsIl94MjIiLCJfeDIzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3Bvc3RDb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQb3N0IGZyb20gXCIuLi9tb2RlbHMvcG9zdC5qc1wiO1xuaW1wb3J0IGltYWdlVXBsb2FkZXIgZnJvbSBcIi4uL2hlbHBlcnMvcGhvdG9VcGxvYWQuanNcIjtcbmltcG9ydCB2aWRlb1VwbG9hZGVyIGZyb20gXCIuLi9oZWxwZXJzL3ZpZGVvVXBsb2FkZXIuanNcIjtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBvc3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IGNvbnRlbnQgfSA9IHJlcS5ib2R5O1xuICAgIGlmICghY29udGVudCB8fCBjb250ZW50ID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImNvbnRlbnQgaXMgcmVxdWlyZWRcIiB9KTtcblxuICAgIGxldCBpbWFnZSA9IFwiXCI7XG4gICAgaWYgKHJlcS5maWxlcyAmJiByZXEuZmlsZXMuaW1hZ2UgIT0gbnVsbCAmJiByZXEuZmlsZXMudmlkZW8gPT0gbnVsbCkge1xuICAgICAgaW1hZ2UgPSBhd2FpdCBpbWFnZVVwbG9hZGVyKHJlcSk7XG4gICAgICBpbWFnZSA9IGltYWdlLnVybDtcbiAgICB9XG5cbiAgICBsZXQgdmlkZW8gPSBcIlwiO1xuICAgIGlmIChyZXEuZmlsZXMgJiYgcmVxLmZpbGVzLnZpZGVvICYmICFyZXEuZmlsZXMuaW1hZ2UpIHtcbiAgICAgIHZpZGVvID0gYXdhaXQgdmlkZW9VcGxvYWRlcihyZXEpO1xuICAgICAgdmlkZW8gPSB2aWRlby51cmw7XG4gICAgfVxuXG4gICAgY29uc3QgcG9zdCA9IG5ldyBQb3N0KHtcbiAgICAgIHVzZXI6IHVzZXIuX2lkLFxuICAgICAgY29udGVudCxcbiAgICAgIGltYWdlLFxuICAgICAgdmlkZW8sXG4gICAgICB0eXBlOiBcImJsb2dcIixcbiAgICB9KTtcbiAgICBjb25zdCBuZXdQb3N0ID0gYXdhaXQgcG9zdC5zYXZlKCk7XG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgaWQ6IG5ld1Bvc3QuX2lkLFxuICAgICAgICBjb250ZW50LFxuICAgICAgICBpbWFnZTogbmV3UG9zdC5pbWFnZSxcbiAgICAgICAgdmlkZW86IG5ld1Bvc3QudmlkZW8sXG4gICAgICAgIGNvbW1lbnRzOiBuZXdQb3N0LmNvbW1lbnRzLFxuICAgICAgICBwb3N0ZWREYXRlOiBuZXdQb3N0LnBvc3RlZERhdGUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yIH0pO1xuICB9XG59O1xuXG4vLyBleHBvcnQgY29uc3QgZ2V0QWxsUG9zdHMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBwb3N0cyA9IGF3YWl0IFBvc3QuZmluZCh7XG4vLyAgICAgICB0eXBlOiBcImJsb2dcIixcbi8vICAgICB9KVxuLy8gICAgICAgLnBvcHVsYXRlKFwidXNlclwiLCBcIi1wYXNzd29yZFwiKVxuLy8gICAgICAgLnBvcHVsYXRlKFwiY29tbWVudHMudXNlclwiLCBcIi1wYXNzd29yZFwiKVxuLy8gICAgICAgLnBvcHVsYXRlKFwibGlrZXMudXNlclwiLCBcIi1wYXNzd29yZFwiKVxuLy8gICAgICAgLnNvcnQoeyBfaWQ6IC0xIH0pO1xuLy8gICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbi8vICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4vLyAgICAgICBwb3N0cyxcbi8vICAgICB9KTtcbi8vICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvciB9KTtcbi8vICAgfVxuLy8gfTtcblxuZXhwb3J0IGNvbnN0IGdldEFsbFBvc3RzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFnZSA9IHJlcS5xdWVyeS5wYWdlID8gcGFyc2VJbnQocmVxLnF1ZXJ5LnBhZ2UpIDogMTsgLy8gRXh0cmFjdCBwYWdlIG51bWJlciBmcm9tIHF1ZXJ5IHBhcmFtZXRlclxuICAgIGNvbnN0IGxpbWl0ID0gcmVxLnF1ZXJ5LmxpbWl0ID8gcGFyc2VJbnQocmVxLnF1ZXJ5LmxpbWl0KSA6IDEwOyAvLyBFeHRyYWN0IGxpbWl0IGZyb20gcXVlcnkgcGFyYW1ldGVyXG5cbiAgICBjb25zdCBwb3N0cyA9IGF3YWl0IFBvc3QuZmluZCh7XG4gICAgICB0eXBlOiBcImJsb2dcIixcbiAgICB9KVxuICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgIH0pXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcImNvbW1lbnRzXCIsXG4gICAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcInJlcGxpZXNcIixcbiAgICAgICAgICAgIHBvcHVsYXRlOiB7XG4gICAgICAgICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KVxuICAgICAgLnBvcHVsYXRlKFwibGlrZXMudXNlclwiLCBcIi1wYXNzd29yZFwiKVxuICAgICAgLnNvcnQoeyBfaWQ6IC0xIH0pXG4gICAgICAuc2tpcCgocGFnZSAtIDEpICogbGltaXQpIC8vIFNraXAgcmVjb3JkcyBiYXNlZCBvbiBwYWdpbmF0aW9uXG4gICAgICAubGltaXQobGltaXQpOyAvLyBMaW1pdCB0aGUgbnVtYmVyIG9mIHJlY29yZHMgcmV0dXJuZWRcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBwb3N0cyxcbiAgICAgIGN1cnJlbnRQYWdlOiBwYWdlLFxuICAgICAgdG90YWxQYWdlczogTWF0aC5jZWlsKFxuICAgICAgICAoYXdhaXQgUG9zdC5jb3VudERvY3VtZW50cyh7IHR5cGU6IFwiYmxvZ1wiIH0pKSAvIGxpbWl0XG4gICAgICApLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbi8vIGV4cG9ydCBjb25zdCBnZXRNeVBvc3RzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4vLyAgIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuLy8gICB0cnkge1xuLy8gICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgUG9zdC5maW5kKHtcbi8vICAgICAgIHVzZXI6IHVzZXIuX2lkLFxuLy8gICAgICAgdHlwZTogXCJibG9nXCIsXG4vLyAgICAgfSlcbi8vICAgICAgIC5wb3B1bGF0ZShcInVzZXJcIiwgXCItcGFzc3dvcmRcIilcbi8vICAgICAgIC5wb3B1bGF0ZShcImNvbW1lbnRzLnVzZXJcIiwgXCItcGFzc3dvcmRcIilcbi8vICAgICAgIC5wb3B1bGF0ZShcImxpa2VzLnVzZXJcIiwgXCItcGFzc3dvcmRcIilcbi8vICAgICAgIC5zb3J0KHsgX2lkOiAtMSB9KTtcbi8vICAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4vLyAgICAgICBzdWNjZXNzOiB0cnVlLFxuLy8gICAgICAgcG9zdHMsXG4vLyAgICAgfSk7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuLy8gICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yIH0pO1xuLy8gICB9XG4vLyB9O1xuXG5leHBvcnQgY29uc3QgZ2V0TXlQb3N0cyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYWdlID0gcmVxLnF1ZXJ5LnBhZ2UgPyBwYXJzZUludChyZXEucXVlcnkucGFnZSkgOiAxOyAvLyBFeHRyYWN0IHBhZ2UgbnVtYmVyIGZyb20gcXVlcnkgcGFyYW1ldGVyXG4gICAgY29uc3QgbGltaXQgPSByZXEucXVlcnkubGltaXQgPyBwYXJzZUludChyZXEucXVlcnkubGltaXQpIDogMTA7IC8vIEV4dHJhY3QgbGltaXQgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcblxuICAgIGNvbnN0IHBvc3RzID0gYXdhaXQgUG9zdC5maW5kKHtcbiAgICAgIHVzZXI6IHVzZXIuX2lkLFxuICAgICAgdHlwZTogXCJibG9nXCIsXG4gICAgfSlcbiAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICB9KVxuICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgcGF0aDogXCJjb21tZW50c1wiLFxuICAgICAgICBwb3B1bGF0ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCJyZXBsaWVzXCIsXG4gICAgICAgICAgICBwb3B1bGF0ZToge1xuICAgICAgICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICAgIC5wb3B1bGF0ZShcImxpa2VzLnVzZXJcIiwgXCItcGFzc3dvcmRcIilcbiAgICAgIC5zb3J0KHsgX2lkOiAtMSB9KVxuICAgICAgLnNraXAoKHBhZ2UgLSAxKSAqIGxpbWl0KSAvLyBTa2lwIHJlY29yZHMgYmFzZWQgb24gcGFnaW5hdGlvblxuICAgICAgLmxpbWl0KGxpbWl0KTsgLy8gTGltaXQgdGhlIG51bWJlciBvZiByZWNvcmRzIHJldHVybmVkXG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgcG9zdHMsXG4gICAgICBjdXJyZW50UGFnZTogcGFnZSxcbiAgICAgIHRvdGFsUGFnZXM6IE1hdGguY2VpbChcbiAgICAgICAgKGF3YWl0IFBvc3QuY291bnREb2N1bWVudHMoeyB1c2VyOiB1c2VyLl9pZCwgdHlwZTogXCJibG9nXCIgfSkpIC8gbGltaXRcbiAgICAgICksXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBnZXRTaW5nbGVQb3N0ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwb3N0SWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZmluZEJ5SWQocG9zdElkKVxuICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgIH0pXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcImxpa2VzLnVzZXJcIixcbiAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgfSlcbiAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgIHBhdGg6IFwiY29tbWVudHNcIixcbiAgICAgICAgcG9wdWxhdGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVwbGllc1wiLFxuICAgICAgICAgICAgcG9wdWxhdGU6IHtcbiAgICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pO1xuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICBwb3N0LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB1cGRhdGVQb3N0ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSByZXE7XG4gICAgY29uc3QgeyBwb3N0SWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgeyBjb250ZW50IH0gPSByZXEuYm9keTtcblxuICAgIGlmICghY29udGVudCB8fCBjb250ZW50ID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImNvbnRlbnQgaXMgcmVxdWlyZWRcIiB9KTtcblxuICAgIGNvbnN0IHBvc3RFeGlzdCA9IGF3YWl0IFBvc3QuZmluZEJ5SWQocG9zdElkKTtcbiAgICBpZiAoIXBvc3RFeGlzdCkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJwb3N0IGRvZXNuJ3QgZXhpc3RcIiB9KTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgcG9zdEV4aXN0LnVzZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9PYmplY3RJZFxcKFwiKC4qKVwiXFwpLywgXCIkMVwiKSAhPVxuICAgICAgdXNlci5faWQudG9TdHJpbmcoKS5yZXBsYWNlKC9PYmplY3RJZFxcKFwiKC4qKVwiXFwpLywgXCIkMVwiKVxuICAgICkge1xuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDIwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJ0aGlzIHBvc3QgZG9lc24ndCBiZWxvbmcgdG8geW91XCIgfSk7XG4gICAgfVxuXG4gICAgcG9zdEV4aXN0LmNvbnRlbnQgPSBjb250ZW50O1xuICAgIGlmIChyZXEuZmlsZXMpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gYXdhaXQgaW1hZ2VVcGxvYWRlcihyZXEpO1xuICAgICAgcG9zdEV4aXN0LmltYWdlID0gaW1hZ2UudXJsO1xuICAgIH1cblxuICAgIGlmIChyZXEuZmlsZXMgJiYgcmVxLmZpbGVzLnZpZGVvICYmICFyZXEuZmlsZXMuaW1hZ2UpIHtcbiAgICAgIHZpZGVvID0gYXdhaXQgdmlkZW9VcGxvYWRlcihyZXEpO1xuICAgICAgcG9zdEV4aXN0LnZpZGVvID0gdmlkZW8udXJsO1xuICAgIH1cblxuICAgIGF3YWl0IHBvc3RFeGlzdC5zYXZlKCk7XG5cbiAgICByZXR1cm4gcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwicG9zdCB1cGRhdGVkIHN1Y2Nlc3NmdWxcIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogZXJyb3IgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVQb3N0ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyB1c2VyIH0gPSByZXE7XG4gICAgY29uc3QgeyBwb3N0SWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgcG9zdCA9IGF3YWl0IFBvc3QuZmluZEJ5SWQocG9zdElkKTtcbiAgICBpZiAoIXBvc3QpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcInBvc3QgZG9lc24ndCBleGlzdFwiIH0pO1xuXG4gICAgaWYgKFxuICAgICAgcG9zdC51c2VyLnRvU3RyaW5nKCkucmVwbGFjZSgvT2JqZWN0SWRcXChcIiguKilcIlxcKS8sIFwiJDFcIikgIT1cbiAgICAgIHVzZXIuX2lkLnRvU3RyaW5nKCkucmVwbGFjZSgvT2JqZWN0SWRcXChcIiguKilcIlxcKS8sIFwiJDFcIilcbiAgICApXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcInRoaXMgcG9zdCBkb2Vzbid0IGJlbG9uZyB0byB5b3VcIiB9KTtcblxuICAgIGF3YWl0IFBvc3QuZGVsZXRlT25lKHsgX2lkOiBwb3N0SWQgfSk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6IFwiUG9zdCBkZWxldGVkIHN1Y2Nlc3NmdWxcIixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvciB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNvbW1lbnRpbmdPblBvc3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBvc3RJZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IGNvbW1lbnQgfSA9IHJlcS5ib2R5O1xuICAgIGlmICghY29tbWVudCB8fCBjb21tZW50ID09IFwiXCIpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoMjAwKVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcImNvbW1lbnQgaXMgcmVxdWlyZWQhXCIgfSk7XG5cbiAgICBjb25zdCBwb3N0ID0gYXdhaXQgUG9zdC5maW5kQnlJZChwb3N0SWQpO1xuICAgIGlmICghcG9zdClcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cygyMDApXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBwb3N0IGlkXCIgfSk7XG5cbiAgICBjb25zdCBuZXdDb21tZW50ID0ge1xuICAgICAgdXNlcjogdXNlci5faWQsXG4gICAgICBjb21tZW50LFxuICAgICAgcG9zdGVkRGF0ZTogbmV3IERhdGUoKSxcbiAgICB9O1xuXG4gICAgcG9zdC5jb21tZW50cy5wdXNoKG5ld0NvbW1lbnQpO1xuICAgIHBvc3Quc2F2ZSgpLnRoZW4oYXN5bmMgKHJlc3VsdCkgPT4ge1xuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBjb25zdCBwb3N0ID0gYXdhaXQgUG9zdC5maW5kQnlJZChyZXN1bHQuX2lkKVxuICAgICAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiBcImxpa2VzLnVzZXJcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgICAgICBwYXRoOiBcImNvbW1lbnRzXCIsXG4gICAgICAgICAgICBwb3B1bGF0ZTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aDogXCJyZXBsaWVzXCIsXG4gICAgICAgICAgICAgICAgcG9wdWxhdGU6IHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICBwb3N0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvciB9KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlcGx5aW5nVG9Db21tZW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwb3N0SWQsIGNvbW1lbnRJZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcTtcbiAgICBjb25zdCB7IHJlcGx5IH0gPSByZXEuYm9keTtcblxuICAgIC8vIENoZWNrIGlmIHJlcGx5IGlzIHByb3ZpZGVkIGFuZCBub3QgZW1wdHlcbiAgICBpZiAoIXJlcGx5IHx8IHJlcGx5ID09PSBcIlwiKVxuICAgICAgcmV0dXJuIHJlc1xuICAgICAgICAuc3RhdHVzKDQwMClcbiAgICAgICAgLmpzb24oeyBzdWNjZXNzOiBmYWxzZSwgbWVzc2FnZTogXCJSZXBseSBpcyByZXF1aXJlZCFcIiB9KTtcblxuICAgIC8vIEZpbmQgdGhlIHBvc3RcbiAgICBjb25zdCBwb3N0ID0gYXdhaXQgUG9zdC5maW5kQnlJZChwb3N0SWQpO1xuICAgIGlmICghcG9zdClcbiAgICAgIHJldHVybiByZXNcbiAgICAgICAgLnN0YXR1cyg0MDQpXG4gICAgICAgIC5qc29uKHsgc3VjY2VzczogZmFsc2UsIG1lc3NhZ2U6IFwiUG9zdCBub3QgZm91bmRcIiB9KTtcblxuICAgIC8vIEZpbmQgdGhlIGNvbW1lbnQgd2l0aGluIHRoZSBwb3N0XG4gICAgY29uc3QgY29tbWVudCA9IHBvc3QuY29tbWVudHMuaWQoY29tbWVudElkKTtcbiAgICBpZiAoIWNvbW1lbnQpXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zdGF0dXMoNDA0KVxuICAgICAgICAuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkNvbW1lbnQgbm90IGZvdW5kXCIgfSk7XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgcmVwbHkgb2JqZWN0XG4gICAgY29uc3QgbmV3UmVwbHkgPSB7XG4gICAgICB1c2VyOiB1c2VyLl9pZCxcbiAgICAgIHJlcGx5LFxuICAgICAgcG9zdGVkRGF0ZTogbmV3IERhdGUoKSxcbiAgICB9O1xuXG4gICAgLy8gUHVzaCB0aGUgcmVwbHkgdG8gdGhlIHJlcGxpZXMgYXJyYXkgd2l0aGluIHRoZSBjb21tZW50XG4gICAgY29tbWVudC5yZXBsaWVzLnB1c2gobmV3UmVwbHkpO1xuXG4gICAgLy8gU2F2ZSB0aGUgcG9zdFxuICAgIGF3YWl0IHBvc3Quc2F2ZSgpO1xuXG4gICAgLy8gRmV0Y2ggdGhlIHVwZGF0ZWQgcG9zdCB3aXRoIHBvcHVsYXRlZCB1c2VyIGRldGFpbHMgYW5kIGNvbW1lbnRzXG4gICAgY29uc3QgdXBkYXRlZFBvc3QgPSBhd2FpdCBQb3N0LmZpbmRCeUlkKHBvc3RJZClcbiAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICB9KVxuICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgcGF0aDogXCJsaWtlcy51c2VyXCIsXG4gICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgIH0pXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcImNvbW1lbnRzXCIsXG4gICAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcInJlcGxpZXNcIixcbiAgICAgICAgICAgIHBvcHVsYXRlOiB7XG4gICAgICAgICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgIC8vIFJldHVybiB0aGUgdXBkYXRlZCBwb3N0XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBzdWNjZXNzOiB0cnVlLCBwb3N0OiB1cGRhdGVkUG9zdCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBIYW5kbGUgZXJyb3JzXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIHJlcGx5aW5nIHRvIGNvbW1lbnQ6XCIsIGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiIH0pO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbGlrZVBvc3QgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgY29uc3QgeyBwb3N0SWQgfSA9IHJlcS5wYXJhbXM7XG4gIGNvbnN0IHVzZXJfaWQgPSByZXEudXNlci5faWQ7XG5cbiAgUG9zdC5maW5kQnlJZChwb3N0SWQpXG4gICAgLnRoZW4oYXN5bmMgKHBvc3QpID0+IHtcbiAgICAgIGlmIChwb3N0KSB7XG4gICAgICAgIGNvbnN0IGZvdW5kID0gcG9zdC5saWtlcy5zb21lKFxuICAgICAgICAgIChlbCkgPT4gZWwudXNlci50b1N0cmluZygpID09PSB1c2VyX2lkLnRvU3RyaW5nKClcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgcG9zdC5saWtlcyA9IHBvc3QubGlrZXMuZmlsdGVyKFxuICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0udXNlci50b1N0cmluZygpICE9PSB1c2VyX2lkLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvc3QubGlrZXMucHVzaCh7IHVzZXI6IHVzZXJfaWQgfSk7XG4gICAgICAgICAgYXdhaXQgcG9zdC5zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zdFxuICAgICAgICAgIC5zYXZlKClcbiAgICAgICAgICAudGhlbihhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBQb3N0LmZpbmRCeUlkKHJlc3VsdC5faWQpXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6IFwidXNlclwiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6IFwibGlrZXMudXNlclwiLFxuICAgICAgICAgICAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnBvcHVsYXRlKHtcbiAgICAgICAgICAgICAgICAgIHBhdGg6IFwiY29tbWVudHNcIixcbiAgICAgICAgICAgICAgICAgIHBvcHVsYXRlOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBcInJlcGxpZXNcIixcbiAgICAgICAgICAgICAgICAgICAgICBwb3B1bGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Q6IFwiLXBhc3N3b3JkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvc3QsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KSk7XG4gICAgICB9IGVsc2UgcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogXCJwb3N0IGRvZXNuJ3QgZXhpc3RcIiB9KTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlcy5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSkpO1xufTtcblxuXG5leHBvcnQgY29uc3QgZ2V0TXlMaWtlZFBvc3RzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IHsgdXNlciB9ID0gcmVxO1xuICB0cnkge1xuICAgIGNvbnN0IHBhZ2UgPSByZXEucXVlcnkucGFnZSA/IHBhcnNlSW50KHJlcS5xdWVyeS5wYWdlKSA6IDE7IC8vIEV4dHJhY3QgcGFnZSBudW1iZXIgZnJvbSBxdWVyeSBwYXJhbWV0ZXJcbiAgICBjb25zdCBsaW1pdCA9IHJlcS5xdWVyeS5saW1pdCA/IHBhcnNlSW50KHJlcS5xdWVyeS5saW1pdCkgOiAxMDsgLy8gRXh0cmFjdCBsaW1pdCBmcm9tIHF1ZXJ5IHBhcmFtZXRlclxuXG4gICAgY29uc3QgcG9zdHMgPSBhd2FpdCBQb3N0LmZpbmQoe1xuICAgICAgXCJsaWtlcy51c2VyXCI6IHVzZXIuX2lkLCAvLyBNYXRjaCBwb3N0cyB3aGVyZSB0aGUgdXNlciBoYXMgbGlrZWRcbiAgICAgIHR5cGU6IFwiYmxvZ1wiLFxuICAgIH0pXG4gICAgICAucG9wdWxhdGUoe1xuICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgc2VsZWN0OiBcIi1wYXNzd29yZFwiLFxuICAgICAgfSlcbiAgICAgIC5wb3B1bGF0ZSh7XG4gICAgICAgIHBhdGg6IFwiY29tbWVudHNcIixcbiAgICAgICAgcG9wdWxhdGU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZXJcIixcbiAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVwbGllc1wiLFxuICAgICAgICAgICAgcG9wdWxhdGU6IHtcbiAgICAgICAgICAgICAgcGF0aDogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgIHNlbGVjdDogXCItcGFzc3dvcmRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgICAucG9wdWxhdGUoXCJsaWtlcy51c2VyXCIsIFwiLXBhc3N3b3JkXCIpXG4gICAgICAuc29ydCh7IF9pZDogLTEgfSlcbiAgICAgIC5za2lwKChwYWdlIC0gMSkgKiBsaW1pdCkgLy8gU2tpcCByZWNvcmRzIGJhc2VkIG9uIHBhZ2luYXRpb25cbiAgICAgIC5saW1pdChsaW1pdCk7IC8vIExpbWl0IHRoZSBudW1iZXIgb2YgcmVjb3JkcyByZXR1cm5lZFxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oe1xuICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgIHBvc3RzLFxuICAgICAgY3VycmVudFBhZ2U6IHBhZ2UsXG4gICAgICB0b3RhbFBhZ2VzOiBNYXRoLmNlaWwoXG4gICAgICAgIChhd2FpdCBQb3N0LmNvdW50RG9jdW1lbnRzKHtcbiAgICAgICAgICBcImxpa2VzLnVzZXJcIjogdXNlci5faWQsXG4gICAgICAgICAgdHlwZTogXCJibG9nXCIsXG4gICAgICAgIH0pKSAvIGxpbWl0XG4gICAgICApLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IHN1Y2Nlc3M6IGZhbHNlLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUFBLE1BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFlBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLGNBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUVPLElBQU1HLFVBQVU7RUFBQSxJQUFBQyxJQUFBLE9BQUFD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