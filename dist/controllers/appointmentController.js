"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAppointmentTime = exports.updateAppointmentStatus = exports.getUserAppointments = exports.getProviderAppointments = exports.deleteAppointment = exports.bookAppointment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _Appointment = _interopRequireDefault(require("../models/Appointment"));
//  User books an appointment

var bookAppointment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, providerId, start, end, notes, userId, appointment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, providerId = _req$body.providerId, start = _req$body.start, end = _req$body.end, notes = _req$body.notes;
          userId = req.user._id;
          appointment = new _Appointment["default"]({
            userId: userId,
            providerId: providerId,
            start: start,
            end: end,
            notes: notes
          });
          _context.next = 6;
          return appointment.save();
        case 6:
          res.status(201).json({
            message: "Appointment booked successfully",
            appointment: appointment
          });
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: "Failed to book appointment",
            error: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function bookAppointment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//  Therapist accepts/cancels an appointment
exports.bookAppointment = bookAppointment;
var updateAppointmentStatus = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var appointmentId, status, appointment;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          appointmentId = req.params.appointmentId;
          status = req.body.status; // Changed this line - removed the curly braces around appointmentId
          _context2.next = 5;
          return _Appointment["default"].findById(appointmentId);
        case 5:
          appointment = _context2.sent;
          if (appointment) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "Appointment not found"
          }));
        case 8:
          appointment.status = status;
          _context2.next = 11;
          return appointment.save();
        case 11:
          res.status(200).json({
            message: "Appointment ".concat(status),
            appointment: appointment
          });
          _context2.next = 17;
          break;
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: "Failed to update appointment status",
            error: _context2.t0.message
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function updateAppointmentStatus(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Therapist updates the start and end time of an appointment
exports.updateAppointmentStatus = updateAppointmentStatus;
var updateAppointmentTime = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var appointmentId, _req$body2, start, end, providerId, appointment;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          appointmentId = req.params.appointmentId;
          _req$body2 = req.body, start = _req$body2.start, end = _req$body2.end;
          providerId = req.user._id;
          _context3.next = 6;
          return _Appointment["default"].findOne({
            _id: appointmentId,
            providerId: providerId
          });
        case 6:
          appointment = _context3.sent;
          if (appointment) {
            _context3.next = 9;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Appointment not found"
          }));
        case 9:
          if (start) appointment.start = start;
          if (!end) {
            _context3.next = 14;
            break;
          }
          if (!(start && end <= start)) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "End time must be after start time"
          }));
        case 13:
          appointment.end = end;
        case 14:
          _context3.next = 16;
          return appointment.save();
        case 16:
          res.status(200).json({
            message: "Appointment time updated",
            appointment: appointment
          });
          _context3.next = 22;
          break;
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: "Failed to update appointment time",
            error: _context3.t0.message
          });
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 19]]);
  }));
  return function updateAppointmentTime(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

//   Provider views their scheduled appointments
exports.updateAppointmentTime = updateAppointmentTime;
var getProviderAppointments = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var providerId, appointments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          providerId = req.user._id;
          _context4.next = 4;
          return _Appointment["default"].find({
            providerId: providerId
          }).populate("userId", "firstname lastname email interests");
        case 4:
          appointments = _context4.sent;
          res.status(200).json({
            appointments: appointments
          });
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            message: "Failed to retrieve appointments",
            error: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function getProviderAppointments(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

//  User views their booked appointments
exports.getProviderAppointments = getProviderAppointments;
var getUserAppointments = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userId, appointments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user._id;
          _context5.next = 4;
          return _Appointment["default"].find({
            userId: userId
          }).populate("providerId", "firstname lastname email interests");
        case 4:
          appointments = _context5.sent;
          res.status(200).json({
            appointments: appointments
          });
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: "Failed to retrieve user appointments",
            error: _context5.t0.message
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function getUserAppointments(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

//  Delete an appointment (Only user who booked it can delete)
exports.getUserAppointments = getUserAppointments;
var deleteAppointment = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var appointmentId, userId, appointment;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          appointmentId = req.params.appointmentId;
          userId = req.user._id;
          _context6.next = 5;
          return _Appointment["default"].findOneAndDelete({
            _id: appointmentId,
            userId: userId
          });
        case 5:
          appointment = _context6.sent;
          if (appointment) {
            _context6.next = 8;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "Appointment not found"
          }));
        case 8:
          res.status(200).json({
            message: "Appointment deleted successfully"
          });
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: "Failed to delete appointment",
            error: _context6.t0.message
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function deleteAppointment(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteAppointment = deleteAppointment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfQXBwb2ludG1lbnQiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsImJvb2tBcHBvaW50bWVudCIsIl9yZWYiLCJfYXN5bmNUb0dlbmVyYXRvcjIiLCJfcmVnZW5lcmF0b3IiLCJtYXJrIiwiX2NhbGxlZSIsInJlcSIsInJlcyIsIl9yZXEkYm9keSIsInByb3ZpZGVySWQiLCJzdGFydCIsImVuZCIsIm5vdGVzIiwidXNlcklkIiwiYXBwb2ludG1lbnQiLCJ3cmFwIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsInByZXYiLCJuZXh0IiwiYm9keSIsInVzZXIiLCJfaWQiLCJBcHBvaW50bWVudCIsInNhdmUiLCJzdGF0dXMiLCJqc29uIiwibWVzc2FnZSIsInQwIiwiZXJyb3IiLCJzdG9wIiwiX3giLCJfeDIiLCJhcHBseSIsImFyZ3VtZW50cyIsImV4cG9ydHMiLCJ1cGRhdGVBcHBvaW50bWVudFN0YXR1cyIsIl9yZWYyIiwiX2NhbGxlZTIiLCJhcHBvaW50bWVudElkIiwiX2NhbGxlZTIkIiwiX2NvbnRleHQyIiwicGFyYW1zIiwiZmluZEJ5SWQiLCJzZW50IiwiYWJydXB0IiwiY29uY2F0IiwiX3gzIiwiX3g0IiwidXBkYXRlQXBwb2ludG1lbnRUaW1lIiwiX3JlZjMiLCJfY2FsbGVlMyIsIl9yZXEkYm9keTIiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJmaW5kT25lIiwiX3g1IiwiX3g2IiwiZ2V0UHJvdmlkZXJBcHBvaW50bWVudHMiLCJfcmVmNCIsIl9jYWxsZWU0IiwiYXBwb2ludG1lbnRzIiwiX2NhbGxlZTQkIiwiX2NvbnRleHQ0IiwiZmluZCIsInBvcHVsYXRlIiwiX3g3IiwiX3g4IiwiZ2V0VXNlckFwcG9pbnRtZW50cyIsIl9yZWY1IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJfeDkiLCJfeDEwIiwiZGVsZXRlQXBwb2ludG1lbnQiLCJfcmVmNiIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZmluZE9uZUFuZERlbGV0ZSIsIl94MTEiLCJfeDEyIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2FwcG9pbnRtZW50Q29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXBwb2ludG1lbnQgZnJvbSBcIi4uL21vZGVscy9BcHBvaW50bWVudFwiO1xuXG4vLyAgVXNlciBib29rcyBhbiBhcHBvaW50bWVudFxuXG5leHBvcnQgY29uc3QgYm9va0FwcG9pbnRtZW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBwcm92aWRlcklkLCBzdGFydCwgZW5kLCBub3RlcyB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgdXNlcklkID0gcmVxLnVzZXIuX2lkO1xuICAgIGNvbnN0IGFwcG9pbnRtZW50ID0gbmV3IEFwcG9pbnRtZW50KHtcbiAgICAgIHVzZXJJZCxcbiAgICAgIHByb3ZpZGVySWQsXG4gICAgICBzdGFydCxcbiAgICAgIGVuZCxcbiAgICAgIG5vdGVzLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgYXBwb2ludG1lbnQuc2F2ZSgpO1xuICAgIHJlcy5zdGF0dXMoMjAxKS5qc29uKHsgbWVzc2FnZTogXCJBcHBvaW50bWVudCBib29rZWQgc3VjY2Vzc2Z1bGx5XCIsIGFwcG9pbnRtZW50IH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJGYWlsZWQgdG8gYm9vayBhcHBvaW50bWVudFwiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuXG4vLyAgVGhlcmFwaXN0IGFjY2VwdHMvY2FuY2VscyBhbiBhcHBvaW50bWVudFxuXG5leHBvcnQgY29uc3QgdXBkYXRlQXBwb2ludG1lbnRTdGF0dXMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IGFwcG9pbnRtZW50SWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgY29uc3QgeyBzdGF0dXMgfSA9IHJlcS5ib2R5O1xuXG4gICAgLy8gQ2hhbmdlZCB0aGlzIGxpbmUgLSByZW1vdmVkIHRoZSBjdXJseSBicmFjZXMgYXJvdW5kIGFwcG9pbnRtZW50SWRcbiAgICBjb25zdCBhcHBvaW50bWVudCA9IGF3YWl0IEFwcG9pbnRtZW50LmZpbmRCeUlkKGFwcG9pbnRtZW50SWQpO1xuXG4gICAgaWYgKCFhcHBvaW50bWVudCkgcmV0dXJuIHJlcy5zdGF0dXMoNDA0KS5qc29uKHsgbWVzc2FnZTogXCJBcHBvaW50bWVudCBub3QgZm91bmRcIiB9KTtcblxuICAgIGFwcG9pbnRtZW50LnN0YXR1cyA9IHN0YXR1cztcbiAgICBhd2FpdCBhcHBvaW50bWVudC5zYXZlKCk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IGBBcHBvaW50bWVudCAke3N0YXR1c31gLCBhcHBvaW50bWVudCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBhcHBvaW50bWVudCBzdGF0dXNcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cblxuLy8gVGhlcmFwaXN0IHVwZGF0ZXMgdGhlIHN0YXJ0IGFuZCBlbmQgdGltZSBvZiBhbiBhcHBvaW50bWVudFxuXG5leHBvcnQgY29uc3QgdXBkYXRlQXBwb2ludG1lbnRUaW1lID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhcHBvaW50bWVudElkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgc3RhcnQsIGVuZCB9ID0gcmVxLmJvZHk7XG4gICAgY29uc3QgcHJvdmlkZXJJZCA9IHJlcS51c2VyLl9pZDtcblxuICAgIGNvbnN0IGFwcG9pbnRtZW50ID0gYXdhaXQgQXBwb2ludG1lbnQuZmluZE9uZSh7IF9pZDogYXBwb2ludG1lbnRJZCwgcHJvdmlkZXJJZCB9KTtcbiAgICBpZiAoIWFwcG9pbnRtZW50KSByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBtZXNzYWdlOiBcIkFwcG9pbnRtZW50IG5vdCBmb3VuZFwiIH0pO1xuXG4gICAgaWYgKHN0YXJ0KSBhcHBvaW50bWVudC5zdGFydCA9IHN0YXJ0O1xuICAgIGlmIChlbmQpIHtcbiAgICAgIGlmIChzdGFydCAmJiBlbmQgPD0gc3RhcnQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgbWVzc2FnZTogXCJFbmQgdGltZSBtdXN0IGJlIGFmdGVyIHN0YXJ0IHRpbWVcIiB9KTtcbiAgICAgIH1cbiAgICAgIGFwcG9pbnRtZW50LmVuZCA9IGVuZDtcbiAgICB9XG5cbiAgICBhd2FpdCBhcHBvaW50bWVudC5zYXZlKCk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24oeyBtZXNzYWdlOiBcIkFwcG9pbnRtZW50IHRpbWUgdXBkYXRlZFwiLCBhcHBvaW50bWVudCB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHVwZGF0ZSBhcHBvaW50bWVudCB0aW1lXCIsIGVycm9yOiBlcnJvci5tZXNzYWdlIH0pO1xuICB9XG59O1xuXG5cbi8vICAgUHJvdmlkZXIgdmlld3MgdGhlaXIgc2NoZWR1bGVkIGFwcG9pbnRtZW50c1xuXG5leHBvcnQgY29uc3QgZ2V0UHJvdmlkZXJBcHBvaW50bWVudHMgPSBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwcm92aWRlcklkID0gcmVxLnVzZXIuX2lkOyBcbiAgICBjb25zdCBhcHBvaW50bWVudHMgPSBhd2FpdCBBcHBvaW50bWVudC5maW5kKHsgcHJvdmlkZXJJZCB9KS5wb3B1bGF0ZShcInVzZXJJZFwiLCBcImZpcnN0bmFtZSBsYXN0bmFtZSBlbWFpbCBpbnRlcmVzdHNcIik7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IGFwcG9pbnRtZW50cyB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIHJldHJpZXZlIGFwcG9pbnRtZW50c1wiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcblxuXG4vLyAgVXNlciB2aWV3cyB0aGVpciBib29rZWQgYXBwb2ludG1lbnRzXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyQXBwb2ludG1lbnRzID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgdXNlcklkID0gcmVxLnVzZXIuX2lkO1xuICAgIGNvbnN0IGFwcG9pbnRtZW50cyA9IGF3YWl0IEFwcG9pbnRtZW50LmZpbmQoeyB1c2VySWQgfSkucG9wdWxhdGUoXCJwcm92aWRlcklkXCIsIFwiZmlyc3RuYW1lIGxhc3RuYW1lIGVtYWlsIGludGVyZXN0c1wiKTtcblxuICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgYXBwb2ludG1lbnRzIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgbWVzc2FnZTogXCJGYWlsZWQgdG8gcmV0cmlldmUgdXNlciBhcHBvaW50bWVudHNcIiwgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gIH1cbn07XG5cblxuLy8gIERlbGV0ZSBhbiBhcHBvaW50bWVudCAoT25seSB1c2VyIHdobyBib29rZWQgaXQgY2FuIGRlbGV0ZSlcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFwcG9pbnRtZW50ID0gYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgeyBhcHBvaW50bWVudElkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHVzZXJJZCA9IHJlcS51c2VyLl9pZDtcblxuICAgIGNvbnN0IGFwcG9pbnRtZW50ID0gYXdhaXQgQXBwb2ludG1lbnQuZmluZE9uZUFuZERlbGV0ZSh7IF9pZDogYXBwb2ludG1lbnRJZCwgdXNlcklkIH0pO1xuICAgIGlmICghYXBwb2ludG1lbnQpIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgbm90IGZvdW5kXCIgfSk7XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbih7IG1lc3NhZ2U6IFwiQXBwb2ludG1lbnQgZGVsZXRlZCBzdWNjZXNzZnVsbHlcIiB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGRlbGV0ZSBhcHBvaW50bWVudFwiLCBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsSUFBQUEsWUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBRUE7O0FBRU8sSUFBTUMsZUFBZTtFQUFBLElBQUFDLElBQUEsT0FBQUMsa0JBQUEsMkJBQUFDLFlBQUEsWUFBQUMsSUFBQSxDQUFHLFNBQUFDLFFBQU9DLEdBQUcsRUFBRUMsR0FBRztJQUFBLElBQUFDLFNBQUEsRUFBQUMsVUFBQSxFQUFBQyxLQUFBLEVBQUFDLEdBQUEsRUFBQUMsS0FBQSxFQUFBQyxNQUFBLEVBQUFDLFdBQUE7SUFBQSxPQUFBWCxZQUFBLFlBQUFZLElBQUEsVUFBQUMsU0FBQUMsUUFBQTtNQUFBLGtCQUFBQSxRQUFBLENBQUFDLElBQUEsR0FBQUQsUUFBQSxDQUFBRSxJQUFBO1FBQUE7VUFBQUYsUUFBQSxDQUFBQyxJQUFBO1VBQUFWLFNBQUEsR0FFQUYsR0FBRyxDQUFDYyxJQUFJLEVBQTFDWCxVQUFVLEdBQUFELFNBQUEsQ0FBVkMsVUFBVSxFQUFFQyxLQUFLLEdBQUFGLFNBQUEsQ0FBTEUsS0FBSyxFQUFFQyxHQUFHLEdBQUFILFNBQUEsQ0FBSEcsR0FBRyxFQUFFQyxLQUFLLEdBQUFKLFNBQUEsQ0FBTEksS0FBSztVQUMvQkMsTUFBTSxHQUFHUCxHQUFHLENBQUNlLElBQUksQ0FBQ0MsR0FBRztVQUNyQlIsV0FBVyxHQUFHLElB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