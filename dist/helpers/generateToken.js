"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
/* eslint-disable require-jsdoc */
var JwtUtil = /*#__PURE__*/function () {
  function JwtUtil() {
    (0, _classCallCheck2["default"])(this, JwtUtil);
  }
  (0, _createClass2["default"])(JwtUtil, null, [{
    key: "generate",
    value: function generate(data, options) {
      var token = _jsonwebtoken["default"].sign({
        data: data
      }, process.env.JWT_SECRET, options);
      return token;
    }
  }, {
    key: "generateExp",
    value: function generateExp(data, min) {
      var token = _jsonwebtoken["default"].sign({
        data: data
      }, process.env.JWT_SECRET, {
        expiresIn: min
      });
      return token;
    }
  }, {
    key: "verify",
    value: function verify(token) {
      var obj = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET);
      return obj;
    }
  }]);
  return JwtUtil;
}();
var _default = JwtUtil;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfanNvbndlYnRva2VuIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJKd3RVdGlsIiwiX2NsYXNzQ2FsbENoZWNrMiIsIl9jcmVhdGVDbGFzczIiLCJrZXkiLCJ2YWx1ZSIsImdlbmVyYXRlIiwiZGF0YSIsIm9wdGlvbnMiLCJ0b2tlbiIsIkp3dCIsInNpZ24iLCJwcm9jZXNzIiwiZW52IiwiSldUX1NFQ1JFVCIsImdlbmVyYXRlRXhwIiwibWluIiwiZXhwaXJlc0luIiwidmVyaWZ5Iiwib2JqIiwiX2RlZmF1bHQiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvZ2VuZXJhdGVUb2tlbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSByZXF1aXJlLWpzZG9jICovXG5pbXBvcnQgSnd0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcblxuY2xhc3MgSnd0VXRpbCB7XG4gIHN0YXRpYyBnZW5lcmF0ZShkYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QgdG9rZW4gPSBKd3Quc2lnbih7IGRhdGEgfSwgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG5cbiAgc3RhdGljIGdlbmVyYXRlRXhwKGRhdGEsIG1pbikge1xuICAgIGNvbnN0IHRva2VuID0gSnd0LnNpZ24oeyBkYXRhIH0sIHByb2Nlc3MuZW52LkpXVF9TRUNSRVQsIHtcbiAgICAgIGV4cGlyZXNJbjogbWluLFxuICAgIH0pO1xuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIHN0YXRpYyB2ZXJpZnkodG9rZW4pIHtcbiAgICBjb25zdCBvYmogPSBKd3QudmVyaWZ5KHRva2VuLCBwcm9jZXNzLmVudi5KV1RfU0VDUkVUKTtcbiAgICByZXR1cm4gb2JqO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEp3dFV0aWw7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLElBQUFBLGFBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQURBO0FBQUEsSUFHTUMsT0FBTztFQUFBLFNBQUFBLFFBQUE7SUFBQSxJQUFBQyxnQkFBQSxtQkFBQUQsT0FBQTtFQUFBO0VBQUEsSUFBQUUsYUFBQSxhQUFBRixPQUFBO0lBQUFHLEdBQUE7SUFBQUMsS0FBQSxFQUNYLFNBQUFDLFNBQWdCQyxJQUFJLEVBQUVDLE9BQU8sRUFBRTtNQUM3QixJQUFNQyxLQUFLLEdBQUdDLHdCQUFHLENBQUNDLElBQUksQ0FBQztRQUFFSixJQUFJLEVBQUpBO01BQUssQ0FBQyxFQUFFSyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsVUFBVSxFQUFFTixPQUFPLENBQUM7TUFDakUsT0FBT0MsS0FBSztJQUNkO0VBQUM7SUFBQUwsR0FBQTtJQUFBQyxLQUFBLEVBRUQsU0FBQVUsWUFBbUJSLElBQUksRUFBRVMsR0FBRyxFQUFFO01BQzVCLElBQU1QLEtBQUssR0FBR0Msd0JBQUcsQ0FBQ0MsSUFBSSxDQUFDO1FBQUVKLElBQUksRUFBSkE7TUFBSyxDQUFDLEVBQUVLLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxVQUFVLEVBQUU7UUFDdkRHLFNBQVMsRUFBRUQ7TUFDYixDQUFDLENBQUM7TUFDRixPQUFPUCxLQUFLO0lBQ2Q7RUFBQztJQUFBTCxHQUFBO0lBQUFDLEtBQUEsRUFFRCxTQUFBYSxPQUFjVCxLQUFLLEVBQUU7TUFDbkIsSUFBTVUsR0FBRyxHQUFHVCx3QkFBRyxDQUFDUSxNQUFNLENBQUNULEtBQUssRUFBRUcsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFVBQVUsQ0FBQztNQUNyRCxPQUFPSyxHQUFHO0lBQ1o7RUFBQztFQUFBLE9BQUFsQixPQUFBO0FBQUE7QUFBQSxJQUFBbUIsUUFBQSxHQUdZbkIsT0FBTztBQUFBb0IsT0FBQSxjQUFBRCxRQUFBIn0=