"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewPublicJournals = exports.viewMyJournals = exports.updateEntry = exports.deleteEntry = exports.addEntry = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Jounal = _interopRequireDefault(require("../models/Jounal"));
//  Add a new journal entry

var addEntry = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, content, emotions, actions, isPrivate, userId, journal;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, title = _req$body.title, content = _req$body.content, emotions = _req$body.emotions, actions = _req$body.actions, isPrivate = _req$body.isPrivate;
          userId = req.user._id;
          journal = new _Jounal["default"]({
            userId: userId,
            title: title,
            content: content,
            emotions: emotions,
            actions: actions,
            isPrivate: isPrivate
          });
          _context.next = 6;
          return journal.save();
        case 6:
          res.status(201).json({
            message: "Journal entry added successfully",
            journal: journal
          });
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function addEntry(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// Update an existing journal entry
exports.addEntry = addEntry;
var updateEntry = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var journalId, _req$body2, title, content, emotions, actions, isPrivate, userId, journal;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          journalId = req.params.journalId;
          _req$body2 = req.body, title = _req$body2.title, content = _req$body2.content, emotions = _req$body2.emotions, actions = _req$body2.actions, isPrivate = _req$body2.isPrivate;
          userId = req.user._id;
          _context2.next = 6;
          return _Jounal["default"].findOne({
            _id: journalId,
            userId: userId
          });
        case 6:
          journal = _context2.sent;
          if (journal) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Journal entry not found"
          }));
        case 9:
          journal.title = title || journal.title;
          journal.content = content || journal.content;
          journal.emotions = emotions || journal.emotions;
          journal.actions = actions || journal.actions;
          journal.isPrivate = isPrivate !== undefined ? isPrivate : journal.isPrivate;
          _context2.next = 16;
          return journal.save();
        case 16:
          res.status(200).json({
            message: "Journal entry updated successfully",
            journal: journal
          });
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Failed to update journal entry",
            error: _context2.t0.message
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function updateEntry(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Delete a journal entry
exports.updateEntry = updateEntry;
var deleteEntry = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var journalId, userId, journal;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          journalId = req.params.journalId;
          userId = req.user._id;
          _context3.next = 5;
          return _Jounal["default"].findOneAndDelete({
            _id: journalId,
            userId: userId
          });
        case 5:
          journal = _context3.sent;
          if (journal) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Journal entry not found"
          }));
        case 8:
          res.status(200).json({
            message: "Journal entry deleted successfully"
          });
          _context3.next = 14;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Failed to delete journal entry",
            error: _context3.t0.message
          });
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return function deleteEntry(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// View all journal entries of the logged-in user
exports.deleteEntry = deleteEntry;
var viewMyJournals = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, journals;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user._id;
          _context4.next = 4;
          return _Jounal["default"].find({
            userId: userId
          }).sort({
            createdAt: -1
          });
        case 4:
          journals = _context4.sent;
          res.status(200).json({
            journals: journals
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "Failed to retrieve journals",
            error: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function viewMyJournals(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// View all public (not private) journal entries
exports.viewMyJournals = viewMyJournals;
var viewPublicJournals = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var journals;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _Jounal["default"].find({
            isPrivate: false
          }).sort({
            createdAt: -1
          });
        case 3:
          journals = _context5.sent;
          res.status(200).json({
            journals: journals
          });
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: "Failed to retrieve public journals",
            error: _context5.t0.message
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function viewPublicJournals(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.viewPublicJournals = viewPublicJournals;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfSm91bmFsIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJhZGRFbnRyeSIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIl9yZXEkYm9keSIsInRpdGxlIiwiY29udGVudCIsImVtb3Rpb25zIiwiYWN0aW9ucyIsImlzUHJpdmF0ZSIsInVzZXJJZCIsImpvdXJuYWwiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiYm9keSIsInVzZXIiLCJfaWQiLCJKb3VybmFsIiwic2F2ZSIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIiwidDAiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJ1cGRhdGVFbnRyeSIsIl9yZWYyIiwiX2NhbGxlZTIiLCJqb3VybmFsSWQiLCJfcmVxJGJvZHkyIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicGFyYW1zIiwiZmluZE9uZSIsInNlbnQiLCJhYnJ1cHQiLCJ1bmRlZmluZWQiLCJlcnJvciIsIl94MyIsIl94NCIsImRlbGV0ZUVudHJ5IiwiX3JlZjMiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsImZpbmRPbmVBbmREZWxldGUiLCJfeDUiLCJfeDYiLCJ2aWV3TXlKb3VybmFscyIsIl9yZWY0IiwiX2NhbGxlZTQiLCJqb3VybmFscyIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsImZpbmQiLCJzb3J0IiwiY3JlYXRlZEF0IiwiX3g3IiwiX3g4Iiwidmlld1B1YmxpY0pvdXJuYWxzIiwiX3JlZjUiLCJfY2FsbGVlNSIsIl9jYWxsZWU1JCIsIl9jb250ZXh0NSIsIl94OSIsIl94MTAiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvam91bmFsQ29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vICBBZGQgYSBuZXcgam91cm5hbCBlbnRyeVxuXG5pbXBvcnQgSm91cm5hbCBmcm9tIFwiLi4vbW9kZWxzL0pvdW5hbFwiO1xuXG5leHBvcnQgY29uc3QgYWRkRW50cnkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBlbW90aW9ucywgYWN0aW9ucywgaXNQcml2YXRlIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1c2VySWQgPSByZXEudXNlci5faWQ7XG5cbiAgICBjb25zdCBqb3VybmFsID0gbmV3IEpvdXJuYWwoe1xuICAgICAgdXNlcklkLFxuICAgICAgdGl0bGUsXG4gICAgICBjb250ZW50LFxuICAgICAgZW1vdGlvbnMsXG4gICAgICBhY3Rpb25zLFxuICAgICAgaXNQcml2YXRlLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgam91cm5hbC5zYXZlKCk7XG4gICAgcmVzLnN0YXR1cygyMDEpLmpzb24oeyBtZXNzYWdlOiBcIkpvdXJuYWwgZW50cnkgYWRkZWQgc3VjY2Vzc2Z1bGx5XCIsIGpvdXJuYWwgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG4vLyBVcGRhdGUgYW4gZXhpc3Rpbmcgam91cm5hbCBlbnRyeVxuXG5leHBvcnQgY29uc3QgdXBkYXRlRW50cnkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGpvdXJuYWxJZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBlbW90aW9ucywgYWN0aW9ucywgaXNQcml2YXRlIH0gPSByZXEuYm9keTtcbiAgICBjb25zdCB1c2VySWQgPSByZXEudXNlci5faWQ7XG4gICAgY29uc3Qgam91cm5hbCA9IGF3YWl0IEpvdXJuYWwuZmluZE9uZSh7IF9pZDogam91cm5hbElkLCB1c2VySWQgfSk7XG4gICAgaWYgKCFqb3VybmFsKSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkpvdXJuYWwgZW50cnkgbm90IGZvdW5kXCIgfSk7XG5cbiAgICBqb3VybmFsLnRpdGxlID0gdGl0bGUgfHwgam91cm5hbC50aXRsZTtcbiAgICBqb3VybmFsLmNvbnRlbnQgPSBjb250ZW50IHx8IGpvdXJuYWwuY29udGVudDtcbiAgICBqb3VybmFsLmVtb3Rpb25zID0gZW1vdGlvbnMgfHwgam91cm5hbC5lbW90aW9ucztcbiAgICBqb3VybmFsLmFjdGlvbnMgPSBhY3Rpb25zIHx8IGpvdXJuYWwuYWN0aW9ucztcbiAgICBqb3VybmFsLmlzUHJpdmF0ZSA9IGlzUHJpdmF0ZSAhPT0gdW5kZWZpbmVkID8gaXNQcml2YXRlIDogam91cm5hbC5pc1ByaXZhdGU7XG5cbiAgICBhd2FpdCBqb3VybmFsLnNhdmUoKTtcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiSm91cm5hbCBlbnRyeSB1cGRhdGVkIHN1Y2Nlc3NmdWxseVwiLCBqb3VybmFsIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJGYWlsZWQgdG8gdXBkYXRlIGpvdXJuYWwgZW50cnlcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cblxuLy8gRGVsZXRlIGEgam91cm5hbCBlbnRyeVxuXG5leHBvcnQgY29uc3QgZGVsZXRlRW50cnkgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGpvdXJuYWxJZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB1c2VySWQgPSByZXEudXNlci5faWQ7XG5cbiAgICBjb25zdCBqb3VybmFsID0gYXdhaXQgSm91cm5hbC5maW5kT25lQW5kRGVsZXRlKHsgX2lkOiBqb3VybmFsSWQsIHVzZXJJZCB9KTtcbiAgICBpZiAoIWpvdXJuYWwpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiSm91cm5hbCBlbnRyeSBub3QgZm91bmRcIiB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgbWVzc2FnZTogXCJKb3VybmFsIGVudHJ5IGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5XCIgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkZhaWxlZCB0byBkZWxldGUgam91cm5hbCBlbnRyeVwiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuXG4vLyBWaWV3IGFsbCBqb3VybmFsIGVudHJpZXMgb2YgdGhlIGxvZ2dlZC1pbiB1c2VyXG5cbmV4cG9ydCBjb25zdCB2aWV3TXlKb3VybmFscyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcS51c2VyLl9pZDtcbiAgICBjb25zdCBqb3VybmFscyA9IGF3YWl0IEpvdXJuYWwuZmluZCh7IHVzZXJJZCB9KS5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgam91cm5hbHMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkZhaWxlZCB0byByZXRyaWV2ZSBqb3VybmFsc1wiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuXG4vLyBWaWV3IGFsbCBwdWJsaWMgKG5vdCBwcml2YXRlKSBqb3VybmFsIGVudHJpZXNcblxuZXhwb3J0IGNvbnN0IHZpZXdQdWJsaWNKb3VybmFscyA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGpvdXJuYWxzID0gYXdhaXQgSm91cm5hbC5maW5kKHsgaXNQcml2YXRlOiBmYWxzZSB9KS5zb3J0KHsgY3JlYXRlZEF0OiAtMSB9KTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgam91cm5hbHMgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBtZXNzYWdlOiBcIkZhaWxlZCB0byByZXRyaWV2ZSBwdWJsaWMgam91cm5hbHNcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUZBOztBQUlPLElBQU1DLFFBQVE7RUFBQSxJQUFBQyxJQUFBLE9BQUFDLGtCQUFBLDJCQUFBQyxZQUFBLFlBQUFDLElBQUEsQ0FBRyxTQUFBQyxRQUFPQyxHQUFHLEVBQUVDLEdBQUc7SUFBQSxJQUFBQyxTQUFBLEVBQUFDLEtBQUEsRUFBQUMsT0FBQSxFQUFBQyxRQUFBLEVBQUFDLE9BQUEsRUFBQUMsU0FBQSxFQUFBQyxNQUFBLEVBQUFDLE9BQUE7SUFBQSxPQUFBWixZQUFBLFlBQUFhLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBQUFYLFNBQUEsR0FFc0JGLEdBQUcsQ0FBQ2UsSUFBSSxFQUF6RFosS0FBSyxHQUFBRCxTQUFBLENBQUxDLEtBQUssRUFBRUMsT0FBTyxHQUFBRixTQUFBLENBQVBFLE9BQU8sRUFBRUMsUUFBUSxHQUFBSCxTQUFBLENBQVJHLFFBQVEsRUFBRUMsT0FBTyxHQUFBSixTQUFBLENBQVBJLE9BQU8sRUFBRUMsU0FBUyxHQUFBTCxTQUFBLENBQVRLLFNBQVM7VUFDOUNDLE1BQU0sR0FBR1IsR0FBRyxDQUFDZ0IsSUFBSSxDQUFDQyxHQUFHO1VBRXJCUixPQUFPLEdBQUcsSUFBSVMsa0JBQU8sQ0FBQztZQUMxQlYsTUFBTSxFQUFOQSxNQUFNO1lBQ05MLEtBQUssRUFBTEEsS0FBSztZQUNMQyxPQUFPLEVBQVBBLE9BQU87WUFDUEMsUUFBUSxFQUFSQSxRQUFRO1lBQ1JD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