"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _conversationController = require("../controllers/conversationController.js");
var router = _express["default"].Router();
router.post("/", _conversationController.newConversation);
// //get conv of a user

router.get("/:userId", _conversationController.getUserConversation);

// // get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", _conversationController.getTwoUsersConversation);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2NvbnZlcnNhdGlvbkNvbnRyb2xsZXIiLCJyb3V0ZXIiLCJleHByZXNzIiwiUm91dGVyIiwicG9zdCIsIm5ld0NvbnZlcnNhdGlvbiIsImdldCIsImdldFVzZXJDb252ZXJzYXRpb24iLCJnZXRUd29Vc2Vyc0NvbnZlcnNhdGlvbiIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb3V0ZXJzL2NvbnZlcnNhdGlvblJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5jb25zdCByb3V0ZXIgPSBleHByZXNzLlJvdXRlcigpO1xuXG5pbXBvcnQge1xuICBuZXdDb252ZXJzYXRpb24sXG4gIGdldFR3b1VzZXJzQ29udmVyc2F0aW9uLFxuICBnZXRVc2VyQ29udmVyc2F0aW9uLFxufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvY29udmVyc2F0aW9uQ29udHJvbGxlci5qc1wiO1xuXG5yb3V0ZXIucG9zdChcIi9cIiwgbmV3Q29udmVyc2F0aW9uKTtcbi8vIC8vZ2V0IGNvbnYgb2YgYSB1c2VyXG5cbnJvdXRlci5nZXQoXCIvOnVzZXJJZFwiLCBnZXRVc2VyQ29udmVyc2F0aW9uKTtcblxuLy8gLy8gZ2V0IGNvbnYgaW5jbHVkZXMgdHdvIHVzZXJJZFxuXG5yb3V0ZXIuZ2V0KFwiL2ZpbmQvOmZpcnN0VXNlcklkLzpzZWNvbmRVc2VySWRcIiwgZ2V0VHdvVXNlcnNDb252ZXJzYXRpb24pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxJQUFBQSxRQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFHQSxJQUFBQyx1QkFBQSxHQUFBRCxPQUFBO0FBRkEsSUFBTUUsTUFBTSxHQUFHQyxtQkFBTyxDQUFDQyxNQUFNLENBQUMsQ0FBQztBQVEvQkYsTUFBTSxDQUFDRyxJQUFJLENBQUMsR0FBRyxFQUFFQyx1Q0FBZSxDQUFDO0FBQ2pDOztBQUVBSixNQUFNLENBQUNLLEdBQUcsQ0FBQyxVQUFVLEVBQUVDLDJDQUFtQixDQUFDOztBQUUzQzs7QUFFQU4sTUFBTSxDQUFDSyxHQUFHLENBQUMsa0NBQWtDLEVBQUVFLCtDQUF1QixDQUFDO0FBQUMsSUFBQUMsUUFBQSxHQUV6RFIsTUFBTTtBQUFBUyxPQUFBLGNBQUFELFFBQUEifQ==