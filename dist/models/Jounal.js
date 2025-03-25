"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var JournalSchema = new _mongoose["default"].Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  emotions: {
    type: [String]
  },
  actions: {
    type: [String]
  },
  isPrivate: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true
});
var Journal = _mongoose["default"].model("Journal", JournalSchema);
var _default = Journal;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbW9uZ29vc2UiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIkpvdXJuYWxTY2hlbWEiLCJtb25nb29zZSIsIlNjaGVtYSIsInVzZXJJZCIsInR5cGUiLCJUeXBlcyIsIk9iamVjdElkIiwicmVmIiwicmVxdWlyZWQiLCJ0aXRsZSIsIlN0cmluZyIsImNvbnRlbnQiLCJlbW90aW9ucyIsImFjdGlvbnMiLCJpc1ByaXZhdGUiLCJCb29sZWFuIiwidGltZXN0YW1wcyIsIkpvdXJuYWwiLCJtb2RlbCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvSm91bmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tIFwibW9uZ29vc2VcIjtcblxuY29uc3QgSm91cm5hbFNjaGVtYSA9IG5ldyBtb25nb29zZS5TY2hlbWEoXG4gIHtcbiAgICB1c2VySWQ6IHtcbiAgICAgIHR5cGU6IG1vbmdvb3NlLlNjaGVtYS5UeXBlcy5PYmplY3RJZCxcbiAgICAgIHJlZjogXCJVc2VyXCIsXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICB9LFxuICAgIHRpdGxlOiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBjb250ZW50OiB7IHR5cGU6IFN0cmluZywgcmVxdWlyZWQ6IHRydWUgfSxcbiAgICBlbW90aW9uczogeyB0eXBlOiBbU3RyaW5nXSB9LFxuICAgIGFjdGlvbnM6IHsgdHlwZTogW1N0cmluZ10gfSxcbiAgICBpc1ByaXZhdGU6IHsgdHlwZTogQm9vbGVhbiwgZGVmYXVsdDogdHJ1ZSB9LFxuICB9LFxuICB7IHRpbWVzdGFtcHM6IHRydWUgfVxuKTtcblxuY29uc3QgSm91cm5hbD0gbW9uZ29vc2UubW9kZWwoXCJKb3VybmFsXCIsIEpvdXJuYWxTY2hlbWEpO1xuZXhwb3J0IGRlZmF1bHQgSm91cm5hbDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLElBQUFBLFNBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQU1DLGFBQWEsR0FBRyxJQUFJQyxvQkFBUSxDQUFDQyxNQUFNLENBQ3ZDO0VBQ0VDLE1BQU0sRUFBRTtJQUNOQyxJQUFJLEVBQUVILG9CQUFRLENBQUNDLE1BQU0sQ0FBQ0csS0FBSyxDQUFDQyxRQUFRO0lBQ3BDQyxHQUFHLEVBQUUsTUFBTTtJQUNYQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RDLEtBQUssRUFBRTtJQUFFTCxJQUFJLEVBQUVNLE1BQU07SUFBRUYsUUFBUSxFQUFFO0VBQUssQ0FBQztFQUN2Q0csT0FBTyxFQUFFO0lBQUVQLElBQUksRUFBRU0sTUFBTTtJQUFFRixRQUFRLEVBQUU7RUFBSyxDQUFDO0VBQ3pDSSxRQUFRLEVBQUU7SUFBRVIsSUFBSSxFQUFFLENBQUNNLE1BQU07RUFBRSxDQUFDO0VBQzVCRyxPQUFPLEVBQUU7SUFBRVQsSUFBSSxFQUFFLENBQUNNLE1BQU07RUFBRSxDQUFDO0VBQzNCSSxTQUFTLEVBQUU7SUFBRVYsSUFBSSxFQUFFVyxPQUFPO0lBQUUsV0FBUztFQUFLO0FBQzVDLENBQUMsRUFDRDtFQUFFQyxVQUFVLEVBQUU7QUFBSyxDQUNyQixDQUFDO0FBRUQsSUFBTUMsT0FBTyxHQUFFaEIsb0JBQVEsQ0FBQ2lCLEtBQUssQ0FBQyxTQUFTLEVBQUVsQixhQUFhLENBQUM7QUFBQyxJQUFBbUIsUUFBQSxHQUN6Q0YsT0FBTztBQUFBRyxPQUFBLGNBQUFELFFBQUEifQ==