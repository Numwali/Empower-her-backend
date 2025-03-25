"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var ConversationSchema = new _mongoose["default"].Schema({
  members: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});
var _default = _mongoose["default"].model("Conversation", ConversationSchema);
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9uZ29vc2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIkNvbnZlcnNhdGlvblNjaGVtYSIsIm1vbmdvb3NlIiwiU2NoZW1hIiwibWVtYmVycyIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwidGltZXN0YW1wcyIsIl9kZWZhdWx0IiwibW9kZWwiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Db252ZXJzYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuXG5jb25zdCBDb252ZXJzYXRpb25TY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKFxuICB7XG4gICAgbWVtYmVyczogW3tcbiAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICAgIHJlZjogJ1VzZXInXG4gICAgfV0sXG4gIH0sXG4gIHsgdGltZXN0YW1wczogdHJ1ZSB9XG4pO1xuXG5leHBvcnQgZGVmYXVsdCBtb25nb29zZS5tb2RlbChcIkNvbnZlcnNhdGlvblwiLCBDb252ZXJzYXRpb25TY2hlbWEpOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFNBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQU1DLGtCQUFrQixHQUFHLElBQUlDLG9CQUFRLENBQUNDLE1BQU0sQ0FDNUM7RUFDRUMsT0FBTyxFQUFFLENBQUM7SUFDUkMsSUFBSSxFQUFFSCxvQkFBUSxDQUFDQyxNQUFNLENBQUNHLEtBQUssQ0FBQ0MsUUFBUTtJQUNwQ0MsR0FBRyxFQUFFO0VBQ1AsQ0FBQztBQUNILENBQUMsRUFDRDtFQUFFQyxVQUFVLEVBQUU7QUFBSyxDQUNyQixDQUFDO0FBQUMsSUFBQUMsUUFBQSxHQUVhUixvQkFBUSxDQUFDUyxLQUFLLENBQUMsY0FBYyxFQUFFVixrQkFBa0IsQ0FBQztBQUFBVyxPQUFBLGNBQUFGLFFBQUEifQ==