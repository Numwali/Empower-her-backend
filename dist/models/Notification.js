"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var schema = _mongoose["default"].Schema({
  receiverId: {
    type: String
  },
  data: {
    type: Object
  },
  isRead: {
    type: Boolean,
    "default": false
  }
});
var _default = _mongoose["default"].model("Notification", schema);
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9uZ29vc2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsInNjaGVtYSIsIm1vbmdvb3NlIiwiU2NoZW1hIiwicmVjZWl2ZXJJZCIsInR5cGUiLCJTdHJpbmciLCJkYXRhIiwiT2JqZWN0IiwiaXNSZWFkIiwiQm9vbGVhbiIsIl9kZWZhdWx0IiwibW9kZWwiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Ob3RpZmljYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBzY2hlbWEgPSBtb25nb29zZS5TY2hlbWEoe1xuICByZWNlaXZlcklkOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICB9LFxuICBkYXRhOiB7XG4gICAgdHlwZTogT2JqZWN0LFxuICB9LFxuICBpc1JlYWQ6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IGZhbHNlLFxuICB9LFxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbmdvb3NlLm1vZGVsKFwiTm90aWZpY2F0aW9uXCIsIHNjaGVtYSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxTQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFFQSxJQUFNQyxNQUFNLEdBQUdDLG9CQUFRLENBQUNDLE1BQU0sQ0FBQztFQUM3QkMsVUFBVSxFQUFFO0lBQ1ZDLElBQUksRUFBRUM7RUFDUixDQUFDO0VBQ0RDLElBQUksRUFBRTtJQUNKRixJQUFJLEVBQUVHO0VBQ1IsQ0FBQztFQUNEQyxNQUFNLEVBQUU7SUFDTkosSUFBSSxFQUFFSyxPQUFPO0lBQ2IsV0FBUztFQUNYO0FBQ0YsQ0FBQyxDQUFDO0FBQUMsSUFBQUMsUUFBQSxHQUVZVCxvQkFBUSxDQUFDVSxLQUFLLENBQUMsY0FBYyxFQUFFWCxNQUFNLENBQUM7QUFBQVksT0FBQSxjQUFBRixRQUFBIn0=