"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _protectRoute = _interopRequireDefault(require("../middleware/protectRoute.js"));
var _postController = require("../controllers/postController.js");
var router = _express["default"].Router();
router.get("/", _protectRoute["default"], _postController.getAllPosts);
router.get("/my-posts", _protectRoute["default"], _postController.getMyPosts);
router.get("/my-like-posts", _protectRoute["default"], _postController.getMyLikedPosts);
router.get("/:postId", _protectRoute["default"], _postController.getSinglePost);
router.post("/add", _protectRoute["default"], _postController.createPost);
router.patch("/update/:postId", _protectRoute["default"], _postController.updatePost);
router["delete"]("/:postId", _protectRoute["default"], _postController.deletePost);
// ................comments ...................
router.post("/comment/:postId", _protectRoute["default"], _postController.commentingOnPost);
router.post("/:postId/reply/:commentId", _protectRoute["default"], _postController.replyingToComment);

//..................likes.....................
router.post("/like/:postId", _protectRoute["default"], _postController.likePost);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3Byb3RlY3RSb3V0ZSIsIl9wb3N0Q29udHJvbGxlciIsInJvdXRlciIsImV4cHJlc3MiLCJSb3V0ZXIiLCJnZXQiLCJwcm90ZWN0IiwiZ2V0QWxsUG9zdHMiLCJnZXRNeVBvc3RzIiwiZ2V0TXlMaWtlZFBvc3RzIiwiZ2V0U2luZ2xlUG9zdCIsInBvc3QiLCJjcmVhdGVQb3N0IiwicGF0Y2giLCJ1cGRhdGVQb3N0IiwiZGVsZXRlUG9zdCIsImNvbW1lbnRpbmdPblBvc3QiLCJyZXBseWluZ1RvQ29tbWVudCIsImxpa2VQb3N0IiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcnMvcG9zdFJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgcHJvdGVjdCBmcm9tIFwiLi4vbWlkZGxld2FyZS9wcm90ZWN0Um91dGUuanNcIjtcbmltcG9ydCB7XG4gIGNvbW1lbnRpbmdPblBvc3QsXG4gIGNyZWF0ZVBvc3QsXG4gIGdldEFsbFBvc3RzLFxuICBnZXRTaW5nbGVQb3N0LFxuICBnZXRNeVBvc3RzLFxuICBkZWxldGVQb3N0LFxuICB1cGRhdGVQb3N0LFxuICBsaWtlUG9zdCxcbiAgcmVwbHlpbmdUb0NvbW1lbnQsXG4gIGdldE15TGlrZWRQb3N0c1xufSBmcm9tIFwiLi4vY29udHJvbGxlcnMvcG9zdENvbnRyb2xsZXIuanNcIjtcblxuY29uc3Qgcm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcblxucm91dGVyLmdldChcIi9cIiwgcHJvdGVjdCwgZ2V0QWxsUG9zdHMpO1xucm91dGVyLmdldChcIi9teS1wb3N0c1wiLCBwcm90ZWN0LCBnZXRNeVBvc3RzKTtcbnJvdXRlci5nZXQoXCIvbXktbGlrZS1wb3N0c1wiLCBwcm90ZWN0LCBnZXRNeUxpa2VkUG9zdHMpO1xucm91dGVyLmdldChcIi86cG9zdElkXCIsIHByb3RlY3QsIGdldFNpbmdsZVBvc3QpO1xucm91dGVyLnBvc3QoXCIvYWRkXCIsIHByb3RlY3QsIGNyZWF0ZVBvc3QpO1xucm91dGVyLnBhdGNoKFwiL3VwZGF0ZS86cG9zdElkXCIsIHByb3RlY3QsIHVwZGF0ZVBvc3QpO1xucm91dGVyLmRlbGV0ZShcIi86cG9zdElkXCIsIHByb3RlY3QsIGRlbGV0ZVBvc3QpO1xuLy8gLi4uLi4uLi4uLi4uLi4uLmNvbW1lbnRzIC4uLi4uLi4uLi4uLi4uLi4uLi5cbnJvdXRlci5wb3N0KFwiL2NvbW1lbnQvOnBvc3RJZFwiLCBwcm90ZWN0LCBjb21tZW50aW5nT25Qb3N0KTtcblxucm91dGVyLnBvc3QoXCIvOnBvc3RJZC9yZXBseS86Y29tbWVudElkXCIsIHByb3RlY3QsIHJlcGx5aW5nVG9Db21tZW50KTtcblxuLy8uLi4uLi4uLi4uLi4uLi4uLi5saWtlcy4uLi4uLi4uLi4uLi4uLi4uLi4uLlxucm91dGVyLnBvc3QoXCIvbGlrZS86cG9zdElkXCIsIHByb3RlY3QsIGxpa2VQb3N0KTtcblxuZXhwb3J0IGRlZmF1bHQgcm91dGVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsUUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsYUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsZUFBQSxHQUFBRixPQUFBO0FBYUEsSUFBTUcsTUFBTSxHQUFHQyxtQkFBTyxDQUFDQyxNQUFNLENBQUMsQ0FBQztBQUUvQkYsTUFBTSxDQUFDRyxHQUFHLENBQUMsR0FBRyxFQUFFQyx3QkFBTyxFQUFFQywyQkFBVyxDQUFDO0FBQ3JDTCxNQUFNLENBQUNHLEdBQUcsQ0FBQyxXQUFXLEVBQUVDLHdCQUFPLEVBQUVFLDBCQUFVLENBQUM7QUFDNUNOLE1BQU0sQ0FBQ0csR0FBRyxDQUFDLGdCQUFnQixFQUFFQyx3QkFBTyxFQUFFRywrQkFBZSxDQUFDO0FBQ3REUCxNQUFNLENBQUNHLEdBQUcsQ0FBQyxVQUFVLEVBQUVDLHdCQUFPLEVBQUVJLDZCQUFhLENBQUM7QUFDOUNSLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDLE1BQU0sRUFBRUwsd0JBQU8sRUFBRU0sMEJBQVUsQ0FBQztBQUN4Q1YsTUFBTSxDQUFDVyxLQUFLLENBQUMsaUJBQWlCLEVBQUVQLHdCQUFPLEVBQUVRLDBCQUFVLENBQUM7QUFDcERaLE1BQU0sVUFBTyxDQUFDLFVBQVUsRUFBRUksd0JBQU8sRUFBRVMsMEJBQVUsQ0FBQztBQUM5QztBQUNBYixNQUFNLENBQUNTLElBQUksQ0FBQyxrQkFBa0IsRUFBRUwsd0JBQU8sRUFBRVUsZ0NBQWdCLENBQUM7QUFFMURkLE1BQU0sQ0FBQ1MsSUFBSSxDQUFDLDJCQUEyQixFQUFFTCx3QkFBTyxFQUFFVyxpQ0FBaUIsQ0FBQzs7QUFFcEU7QUFDQWYsTUFBTSxDQUFDUyxJQUFJLENBQUMsZUFBZSxFQUFFTCx3QkFBTyxFQUFFWSx3QkFBUSxDQUFDO0FBQUMsSUFBQUMsUUFBQSxHQUVqQ2pCLE1BQU07QUFBQWtCLE9BQUEsY0FBQUQsUUFBQSJ9