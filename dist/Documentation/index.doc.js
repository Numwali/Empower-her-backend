"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _express = require("express");
var _swaggerUiExpress = require("swagger-ui-express");
var _paths;
var docrouter = (0, _express.Router)();
var local = process.env.LOCAL_HOST;
var heroku = process.env.DB_CONNECT;
var options = {
  openapi: "3.0.1",
  info: {
    title: "Empower Her",
    version: "1.0.0",
    description: "This is the backend api for my Empower Her project."
  },
  host: process.env === "production" ? heroku : local,
  basePath: "/api",
  security: [{
    bearerAuth: []
  }],
  tags: [{
    name: "Users",
    description: "Users"
  }, {
    name: "Post",
    description: "Post"
  }, {
    name: "Conversation",
    description: "Conversation"
  }, {
    name: "Message",
    description: "Messages"
  }, {
    name: "Community",
    description: "Community"
  }],
  paths: (_paths = {
    "/api/v1/user/register": {
      post: {
        tags: ["Users"],
        description: "User register",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              },
              example: {
                firstname: "Ntwali",
                lastname: "Eric",
                username: "Eric",
                gender: "M",
                age: "23",
                email: "ntwali@gmail.com",
                address: "kigali",
                phone: "0780987761",
                role: "user",
                password: "test",
                confirm_password: "test"
              }
            }
          },
          required: true
        },
        responses: {
          201: {
            description: "New User was created successfully"
          },
          400: {
            description: "Bad Request"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    },
    "/api/v1/user/verify": {
      put: {
        tags: ["Users"],
        description: "User verify",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              },
              example: {
                token: "45678900dghfjhkkkj5678"
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: "successfully"
          },
          400: {
            description: "Invalid token"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    },
    "/api/v1/user/login": {
      post: {
        tags: ["Users"],
        description: "User login",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User"
              },
              example: {
                email: "admin@gmail.com",
                password: "123456"
              }
            }
          },
          required: true
        },
        responses: {
          200: {
            description: "successfully"
          },
          400: {
            description: "Invalid credation"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    },
    "/api/v1/user/profile": {
      get: {
        tags: ["Users"],
        description: "Get user profile",
        parameters: [],
        responses: {
          200: {
            description: "successfully"
          },
          400: {
            description: "Invalid credation"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    },
    "/api/v1/user/therapists": {
      get: {
        tags: ["Users"],
        description: "Get user therapists",
        parameters: [],
        responses: {
          200: {
            description: "successfully"
          },
          400: {
            description: "Invalid credation"
          },
          500: {
            description: "Internal Server Error"
          }
        }
      }
    }
  }, (0, _defineProperty2["default"])(_paths, "/api/v1/user/profile", {
    put: {
      tags: ["Users"],
      description: "Update user profile",
      parameters: [],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/User"
            }
          }
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        400: {
          description: "Invalid credation"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/", {
    get: {
      tags: ["Post"],
      description: "Get All Posts",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/my-posts", {
    get: {
      tags: ["Post"],
      description: "Get my posts",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/my-like-posts", {
    get: {
      tags: ["Post"],
      description: "Get my liked posts",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/{postId}", {
    get: {
      tags: ["Post"],
      description: "Get One post by id",
      parameters: [{
        "in": "path",
        name: "postId",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/add", {
    post: {
      tags: ["Post"],
      description: "Create new post",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/update/{postId}", {
    patch: {
      tags: ["Post"],
      description: "Update post",
      parameters: [{
        "in": "path",
        name: "postId",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Blog"
            },
            example: {
              content: "testing post content update"
            }
          },
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        404: {
          description: "Article doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/{id}", {
    "delete": {
      tags: ["Post"],
      description: "Delete post",
      parameters: [{
        "in": "path",
        name: "id",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        404: {
          description: "post doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/like/{id}", {
    post: {
      tags: ["Post"],
      description: "Like post",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Post Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {}
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Article doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/comment/{id}", {
    post: {
      tags: ["Post"],
      description: "Comment on post",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Post Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Post"
            },
            example: {
              comment: "testing post comment"
            }
          }
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Article doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/post/{postId}/reply/{commentId}", {
    post: {
      tags: ["Post"],
      description: "Reply on post comment",
      parameters: [{
        "in": "path",
        name: "postId",
        description: "Post Id",
        required: true
      }, {
        "in": "path",
        name: "commentId",
        description: "Comment Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Post"
            },
            example: {
              reply: "testing post reply"
            }
          }
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Article doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/conversations", {
    get: {
      tags: ["Conversation"],
      description: "Get All Conversations",
      parameters: [],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/conversations/{userId}", {
    get: {
      tags: ["Conversation"],
      description: "Get All Conversations",
      parameters: [{
        "in": "path",
        name: "userId",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/conversations/add", {
    post: {
      tags: ["Conversation"],
      description: "Create new conversation",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Conversation"
            },
            example: {
              members: ["60f3b3b3b3b3b3b3b3b3b3b3", "60f3b3b3b3b3b3b3b3b3b3b3"]
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/messages/{conversationId}", {
    get: {
      tags: ["Message"],
      description: "Get All Messages",
      parameters: [{
        "in": "path",
        name: "conversationId",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/messages/add", {
    post: {
      tags: ["Message"],
      description: "Create new message",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Message"
            },
            example: {
              conversationId: "60f3b3b3b3b3b3b3b3b3b3b3",
              sender: "60f3b3b3b3b3b3b3b3b3b3b3",
              text: "testing message"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/", {
    get: {
      tags: ["Community"],
      description: "Get All Communities",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    },
    post: {
      tags: ["Community"],
      description: "Create new community",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Community"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/my-communities", {
    get: {
      tags: ["Community"],
      description: "Get All My Communities",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/created-by-me", {
    get: {
      tags: ["Community"],
      description: "Get All Communities created by me",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/joined-by-me", {
    get: {
      tags: ["Community"],
      description: "Get All Communities joined by me",
      parameters: [{
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}", {
    get: {
      tags: ["Community"],
      description: "Get One community by id",
      parameters: [{
        "in": "path",
        name: "id",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    },
    put: {
      tags: ["Community"],
      description: "Update community",
      parameters: [{
        "in": "path",
        name: "id",
        required: true
      }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Community"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        404: {
          description: "Article doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    },
    "delete": {
      tags: ["Community"],
      description: "Delete community",
      parameters: [{
        "in": "path",
        name: "id",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "User Not Authorized"
        },
        404: {
          description: "post doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/join/{id}", {
    post: {
      tags: ["Community"],
      description: "Join community",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {}
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/leave/{id}", {
    put: {
      tags: ["Community"],
      description: "Leave community",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {}
        }
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/post", {
    post: {
      tags: ["Community"],
      description: "Create new post",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Post"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/posts", {
    get: {
      tags: ["Community"],
      description: "Get community posts",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }, {
        "in": "query",
        name: "page",
        description: "page number",
        required: false
      }, {
        "in": "query",
        name: "limit",
        description: "limit number",
        required: false
      }],
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/add-member", {
    put: {
      tags: ["Community"],
      description: "Add community member",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Community"
            },
            example: {
              userId: "60f3b3b3b3b3b3b3b3b3b3b3"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/pending-members", {
    get: {
      tags: ["Community"],
      description: "Get community pending members",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/approve-member", {
    put: {
      tags: ["Community"],
      description: "Approve community member",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Community"
            },
            example: {
              userId: "60f3b3b3b3b3b3b3b3b3b3b3"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/community/{id}/reject-member", {
    put: {
      tags: ["Community"],
      description: "Reject community member",
      parameters: [{
        "in": "path",
        name: "id",
        description: "Community Id",
        required: true
      }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Community"
            },
            example: {
              userId: "60f3b3b3b3b3b3b3b3b3b3b3"
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: "successfully"
        },
        401: {
          description: "Not Authorized"
        },
        404: {
          description: "Community doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), (0, _defineProperty2["default"])(_paths, "/api/v1/notification/", {
    get: {
      tags: ["Notification"],
      description: "Get All Notifications",
      parameters: [],
      responses: {
        200: {
          description: "successfully"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    },
    "delete": {
      tags: ["Notification"],
      description: "Delete notification",
      parameters: [{
        "in": "path",
        name: "id",
        required: true
      }],
      responses: {
        200: {
          description: "successfully"
        },
        404: {
          description: "Notification doesn't exist!"
        },
        500: {
          description: "Internal Server Error"
        }
      }
    }
  }), _paths),
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The auto-generated id of the user"
          },
          firstname: {
            type: "string",
            description: "User's firstname"
          },
          lastname: {
            type: "string",
            description: "User's lastname"
          },
          username: {
            type: "string",
            description: "User's names"
          },
          gender: {
            type: "string",
            description: "User's gender"
          },
          dob: {
            type: "string",
            description: "User's date of birth"
          },
          address: {
            type: "string",
            description: "User's address"
          },
          phone: {
            type: "string",
            description: "User's phone number"
          },
          image: {
            type: "string",
            description: "User's profile image",
            format: "binary"
          },
          email: {
            type: "string",
            description: "User's email"
          }
        }
      },
      Post: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "post content"
          },
          image: {
            type: "string",
            description: "post image url",
            format: "binary"
          },
          video: {
            type: "string",
            description: "post video",
            format: "binary"
          }
        }
      },
      Message: {
        type: "object",
        properties: {
          conversationId: {
            type: "string",
            description: "conversation id"
          },
          sender: {
            type: "string",
            description: "sender id"
          },
          text: {
            type: "string",
            description: "message text"
          }
        }
      },
      Conversation: {
        type: "object",
        properties: {
          members: {
            type: "array",
            description: "members of conversation"
          }
        }
      },
      Community: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "community name"
          },
          description: {
            type: "string",
            description: "community description"
          },
          privacy: {
            type: "string",
            description: "community privacy"
          },
          members: {
            type: "array",
            description: "community members"
          },
          image: {
            type: "string",
            description: "community image url",
            format: "binary"
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};
docrouter.use("/", _swaggerUiExpress.serve, (0, _swaggerUiExpress.setup)(options));
var _default = docrouter;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXhwcmVzcyIsInJlcXVpcmUiLCJfc3dhZ2dlclVpRXhwcmVzcyIsIl9wYXRocyIsImRvY3JvdXRlciIsIlJvdXRlciIsImxvY2FsIiwicHJvY2VzcyIsImVudiIsIkxPQ0FMX0hPU1QiLCJoZXJva3UiLCJEQl9DT05ORUNUIiwib3B0aW9ucyIsIm9wZW5hcGkiLCJpbmZvIiwidGl0bGUiLCJ2ZXJzaW9uIiwiZGVzY3JpcHRpb24iLCJob3N0IiwiYmFzZVBhdGgiLCJzZWN1cml0eSIsImJlYXJlckF1dGgiLCJ0YWdzIiwibmFtZSIsInBhdGhzIiwicG9zdCIsInBhcmFtZXRlcnMiLCJyZXF1ZXN0Qm9keSIsImNvbnRlbnQiLCJzY2hlbWEiLCIkcmVmIiwiZXhhbXBsZSIsImZpcnN0bmFtZSIsImxhc3RuYW1lIiwidXNlcm5hbWUiLCJnZW5kZXIiLCJhZ2UiLCJlbWFpbCIsImFkZHJlc3MiLCJwaG9uZSIsInJvbGUiLCJwYXNzd29yZCIsImNvbmZpcm1fcGFzc3dvcmQiLCJyZXF1aXJlZCIsInJlc3BvbnNlcyIsInB1dCIsInRva2VuIiwiZ2V0IiwiX2RlZmluZVByb3BlcnR5MiIsInBhdGNoIiwiY29tbWVudCIsInJlcGx5IiwibWVtYmVycyIsImNvbnZlcnNhdGlvbklkIiwic2VuZGVyIiwidGV4dCIsInVzZXJJZCIsImNvbXBvbmVudHMiLCJzY2hlbWFzIiwiVXNlciIsInR5cGUiLCJwcm9wZXJ0aWVzIiwiaWQiLCJkb2IiLCJpbWFnZSIsImZvcm1hdCIsIlBvc3QiLCJ2aWRlbyIsIk1lc3NhZ2UiLCJDb252ZXJzYXRpb24iLCJDb21tdW5pdHkiLCJwcml2YWN5Iiwic2VjdXJpdHlTY2hlbWVzIiwic2NoZW1lIiwiYmVhcmVyRm9ybWF0IiwidXNlIiwic2VydmUiLCJzZXR1cCIsIl9kZWZhdWx0IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Eb2N1bWVudGF0aW9uL2luZGV4LmRvYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiZXhwcmVzc1wiO1xuaW1wb3J0IHsgc2VydmUsIHNldHVwIH0gZnJvbSBcInN3YWdnZXItdWktZXhwcmVzc1wiO1xuXG5jb25zdCBkb2Nyb3V0ZXIgPSBSb3V0ZXIoKTtcblxuY29uc3QgbG9jYWwgPSBwcm9jZXNzLmVudi5MT0NBTF9IT1NUO1xuY29uc3QgaGVyb2t1ID0gcHJvY2Vzcy5lbnYuREJfQ09OTkVDVDtcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgb3BlbmFwaTogXCIzLjAuMVwiLFxuICBpbmZvOiB7XG4gICAgdGl0bGU6IFwiRW1wb3dlciBIZXJcIixcbiAgICB2ZXJzaW9uOiBcIjEuMC4wXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVGhpcyBpcyB0aGUgYmFja2VuZCBhcGkgZm9yIG15IEVtcG93ZXIgSGVyIHByb2plY3QuXCIsXG4gIH0sXG4gIGhvc3Q6IHByb2Nlc3MuZW52ID09PSBcInByb2R1Y3Rpb25cIiA/IGhlcm9rdSA6IGxvY2FsLFxuICBiYXNlUGF0aDogXCIvYXBpXCIsXG4gIHNlY3VyaXR5OiBbXG4gICAge1xuICAgICAgYmVhcmVyQXV0aDogW10sXG4gICAgfSxcbiAgXSxcbiAgdGFnczogW1xuICAgIHsgbmFtZTogXCJVc2Vyc1wiLCBkZXNjcmlwdGlvbjogXCJVc2Vyc1wiIH0sXG4gICAgeyBuYW1lOiBcIlBvc3RcIiwgZGVzY3JpcHRpb246IFwiUG9zdFwiIH0sXG4gICAgeyBuYW1lOiBcIkNvbnZlcnNhdGlvblwiLCBkZXNjcmlwdGlvbjogXCJDb252ZXJzYXRpb25cIiB9LFxuICAgIHsgbmFtZTogXCJNZXNzYWdlXCIsIGRlc2NyaXB0aW9uOiBcIk1lc3NhZ2VzXCIgfSxcbiAgICB7IG5hbWU6IFwiQ29tbXVuaXR5XCIsIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eVwiIH0sXG4gIF0sXG4gIHBhdGhzOiB7XG4gICAgXCIvYXBpL3YxL3VzZXIvcmVnaXN0ZXJcIjoge1xuICAgICAgcG9zdDoge1xuICAgICAgICB0YWdzOiBbXCJVc2Vyc1wiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciByZWdpc3RlclwiLFxuICAgICAgICBzZWN1cml0eTogW10sXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdLFxuICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvVXNlclwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgZmlyc3RuYW1lOiBcIk50d2FsaVwiLFxuICAgICAgICAgICAgICAgIGxhc3RuYW1lOiBcIkVyaWNcIixcbiAgICAgICAgICAgICAgICB1c2VybmFtZTogXCJFcmljXCIsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiBcIk1cIixcbiAgICAgICAgICAgICAgICBhZ2U6IFwiMjNcIixcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJudHdhbGlAZ21haWwuY29tXCIsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogXCJraWdhbGlcIixcbiAgICAgICAgICAgICAgICBwaG9uZTogXCIwNzgwOTg3NzYxXCIsXG4gICAgICAgICAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwidGVzdFwiLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1fcGFzc3dvcmQ6IFwidGVzdFwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5ldyBVc2VyIHdhcyBjcmVhdGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJCYWQgUmVxdWVzdFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS91c2VyL3ZlcmlmeVwiOiB7XG4gICAgICBwdXQ6IHtcbiAgICAgICAgdGFnczogW1wiVXNlcnNcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIgdmVyaWZ5XCIsXG4gICAgICAgIHNlY3VyaXR5OiBbXSxcbiAgICAgICAgcGFyYW1ldGVyczogW10sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Vc2VyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCI0NTY3ODkwMGRnaGZqaGtra2o1Njc4XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludmFsaWQgdG9rZW5cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvdXNlci9sb2dpblwiOiB7XG4gICAgICBwb3N0OiB7XG4gICAgICAgIHRhZ3M6IFtcIlVzZXJzXCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyIGxvZ2luXCIsXG4gICAgICAgIHNlY3VyaXR5OiBbXSxcbiAgICAgICAgcGFyYW1ldGVyczogW10sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Vc2VyXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJhZG1pbkBnbWFpbC5jb21cIixcbiAgICAgICAgICAgICAgICBwYXNzd29yZDogXCIxMjM0NTZcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW52YWxpZCBjcmVkYXRpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvdXNlci9wcm9maWxlXCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJVc2Vyc1wiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IHVzZXIgcHJvZmlsZVwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW52YWxpZCBjcmVkYXRpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvdXNlci90aGVyYXBpc3RzXCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJVc2Vyc1wiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IHVzZXIgdGhlcmFwaXN0c1wiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW52YWxpZCBjcmVkYXRpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvdXNlci9wcm9maWxlXCI6IHtcbiAgICAgIHB1dDoge1xuICAgICAgICB0YWdzOiBbXCJVc2Vyc1wiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVXBkYXRlIHVzZXIgcHJvZmlsZVwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXSxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjoge1xuICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAkcmVmOiBcIiMvY29tcG9uZW50cy9zY2hlbWFzL1VzZXJcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW52YWxpZCBjcmVkYXRpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvcG9zdC9cIjoge1xuICAgICAgZ2V0OiB7XG4gICAgICAgIHRhZ3M6IFtcIlBvc3RcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBBbGwgUG9zdHNcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgICBuYW1lOiBcInBhZ2VcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBhZ2UgbnVtYmVyXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJsaW1pdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibGltaXQgbnVtYmVyXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvcG9zdC9teS1wb3N0c1wiOiB7XG4gICAgICBnZXQ6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IG15IHBvc3RzXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJwYWdlXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwYWdlIG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwibGltaXRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImxpbWl0IG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL3Bvc3QvbXktbGlrZS1wb3N0c1wiOiB7XG4gICAgICBnZXQ6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IG15IGxpa2VkIHBvc3RzXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJwYWdlXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwYWdlIG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwibGltaXRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImxpbWl0IG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL3Bvc3Qve3Bvc3RJZH1cIjoge1xuICAgICAgZ2V0OiB7XG4gICAgICAgIHRhZ3M6IFtcIlBvc3RcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBPbmUgcG9zdCBieSBpZFwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJwb3N0SWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL3Bvc3QvYWRkXCI6IHtcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIG5ldyBwb3N0XCIsXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Qb3N0XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIgTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvcG9zdC91cGRhdGUve3Bvc3RJZH1cIjoge1xuICAgICAgcGF0Y2g6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiVXBkYXRlIHBvc3RcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInBhdGhcIixcbiAgICAgICAgICAgIG5hbWU6IFwicG9zdElkXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvQmxvZ1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBleGFtcGxlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogXCJ0ZXN0aW5nIHBvc3QgY29udGVudCB1cGRhdGVcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjoge1xuICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAkcmVmOiBcIiMvY29tcG9uZW50cy9zY2hlbWFzL1Bvc3RcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciBOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBcnRpY2xlIGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL3Bvc3Qve2lkfVwiOiB7XG4gICAgICBkZWxldGU6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVsZXRlIHBvc3RcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInBhdGhcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIgTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicG9zdCBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9wb3N0L2xpa2Uve2lkfVwiOiB7XG4gICAgICBwb3N0OiB7XG4gICAgICAgIHRhZ3M6IFtcIlBvc3RcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkxpa2UgcG9zdFwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG9zdCBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge30sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJ0aWNsZSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9wb3N0L2NvbW1lbnQve2lkfVwiOiB7XG4gICAgICBwb3N0OiB7XG4gICAgICAgIHRhZ3M6IFtcIlBvc3RcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW1lbnQgb24gcG9zdFwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG9zdCBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAkcmVmOiBcIiMvY29tcG9uZW50cy9zY2hlbWFzL1Bvc3RcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgICAgICAgIGNvbW1lbnQ6IFwidGVzdGluZyBwb3N0IGNvbW1lbnRcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQXJ0aWNsZSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9wb3N0L3twb3N0SWR9L3JlcGx5L3tjb21tZW50SWR9XCI6IHtcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgdGFnczogW1wiUG9zdFwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiUmVwbHkgb24gcG9zdCBjb21tZW50XCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcInBvc3RJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiUG9zdCBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImNvbW1lbnRJZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29tbWVudCBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge1xuICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAkcmVmOiBcIiMvY29tcG9uZW50cy9zY2hlbWFzL1Bvc3RcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgICAgICAgIHJlcGx5OiBcInRlc3RpbmcgcG9zdCByZXBseVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBcnRpY2xlIGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbnZlcnNhdGlvbnNcIjoge1xuICAgICAgZ2V0OiB7XG4gICAgICAgIHRhZ3M6IFtcIkNvbnZlcnNhdGlvblwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IEFsbCBDb252ZXJzYXRpb25zXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdLFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb252ZXJzYXRpb25zL3t1c2VySWR9XCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJDb252ZXJzYXRpb25cIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBBbGwgQ29udmVyc2F0aW9uc1wiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJ1c2VySWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbnZlcnNhdGlvbnMvYWRkXCI6IHtcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgdGFnczogW1wiQ29udmVyc2F0aW9uXCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJDcmVhdGUgbmV3IGNvbnZlcnNhdGlvblwiLFxuICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvQ29udmVyc2F0aW9uXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICBtZW1iZXJzOiBbXG4gICAgICAgICAgICAgICAgICBcIjYwZjNiM2IzYjNiM2IzYjNiM2IzYjNiM1wiLFxuICAgICAgICAgICAgICAgICAgXCI2MGYzYjNiM2IzYjNiM2IzYjNiM2IzYjNcIixcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyIE5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBcIi9hcGkvdjEvbWVzc2FnZXMve2NvbnZlcnNhdGlvbklkfVwiOiB7XG4gICAgICBnZXQ6IHtcbiAgICAgICAgdGFnczogW1wiTWVzc2FnZVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IEFsbCBNZXNzYWdlc1wiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJjb252ZXJzYXRpb25JZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvbWVzc2FnZXMvYWRkXCI6IHtcbiAgICAgIHBvc3Q6IHtcbiAgICAgICAgdGFnczogW1wiTWVzc2FnZVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIG5ldyBtZXNzYWdlXCIsXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9NZXNzYWdlXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogXCI2MGYzYjNiM2IzYjNiM2IzYjNiM2IzYjNcIixcbiAgICAgICAgICAgICAgICBzZW5kZXI6IFwiNjBmM2IzYjNiM2IzYjNiM2IzYjNiM2IzXCIsXG4gICAgICAgICAgICAgICAgdGV4dDogXCJ0ZXN0aW5nIG1lc3NhZ2VcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciBOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkvXCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBBbGwgQ29tbXVuaXRpZXNcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgICBuYW1lOiBcInBhZ2VcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBhZ2UgbnVtYmVyXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJsaW1pdFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibGltaXQgbnVtYmVyXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBwb3N0OiB7XG4gICAgICAgIHRhZ3M6IFtcIkNvbW11bml0eVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIG5ldyBjb21tdW5pdHlcIixcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjoge1xuICAgICAgICAgICAgICBzY2hlbWE6IHtcbiAgICAgICAgICAgICAgICAkcmVmOiBcIiMvY29tcG9uZW50cy9zY2hlbWFzL0NvbW11bml0eVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyIE5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbW11bml0eS9teS1jb21tdW5pdGllc1wiOiB7XG4gICAgICBnZXQ6IHtcbiAgICAgICAgdGFnczogW1wiQ29tbXVuaXR5XCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJHZXQgQWxsIE15IENvbW11bml0aWVzXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJwYWdlXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwYWdlIG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwibGltaXRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImxpbWl0IG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbW11bml0eS9jcmVhdGVkLWJ5LW1lXCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBBbGwgQ29tbXVuaXRpZXMgY3JlYXRlZCBieSBtZVwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwicGFnZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicGFnZSBudW1iZXJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgICBuYW1lOiBcImxpbWl0XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJsaW1pdCBudW1iZXJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkvam9pbmVkLWJ5LW1lXCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBBbGwgQ29tbXVuaXRpZXMgam9pbmVkIGJ5IG1lXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJxdWVyeVwiLFxuICAgICAgICAgICAgbmFtZTogXCJwYWdlXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwYWdlIG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwibGltaXRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcImxpbWl0IG51bWJlclwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbW11bml0eS97aWR9XCI6IHtcbiAgICAgIGdldDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkdldCBPbmUgY29tbXVuaXR5IGJ5IGlkXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHB1dDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlVwZGF0ZSBjb21tdW5pdHlcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInBhdGhcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Db21tdW5pdHlcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciBOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBcnRpY2xlIGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZGVsZXRlOiB7XG4gICAgICAgIHRhZ3M6IFtcIkNvbW11bml0eVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVsZXRlIGNvbW11bml0eVwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlciBOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3N0IGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbW11bml0eS9qb2luL3tpZH1cIjoge1xuICAgICAgcG9zdDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkpvaW4gY29tbXVuaXR5XCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgSWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHt9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkvbGVhdmUve2lkfVwiOiB7XG4gICAgICBwdXQ6IHtcbiAgICAgICAgdGFnczogW1wiQ29tbXVuaXR5XCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJMZWF2ZSBjb21tdW5pdHlcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInBhdGhcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVxdWVzdEJvZHk6IHtcbiAgICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICBcImFwcGxpY2F0aW9uL2pzb25cIjoge30sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcblxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgZG9lc24ndCBleGlzdCFcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvY29tbXVuaXR5L3tpZH0vcG9zdFwiOiB7XG4gICAgICBwb3N0OiB7XG4gICAgICAgIHRhZ3M6IFtcIkNvbW11bml0eVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiQ3JlYXRlIG5ldyBwb3N0XCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgSWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Qb3N0XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkve2lkfS9wb3N0c1wiOiB7XG4gICAgICBnZXQ6IHtcbiAgICAgICAgdGFnczogW1wiQ29tbXVuaXR5XCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJHZXQgY29tbXVuaXR5IHBvc3RzXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgSWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicXVlcnlcIixcbiAgICAgICAgICAgIG5hbWU6IFwicGFnZVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwicGFnZSBudW1iZXJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInF1ZXJ5XCIsXG4gICAgICAgICAgICBuYW1lOiBcImxpbWl0XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJsaW1pdCBudW1iZXJcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDAxOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJOb3QgQXV0aG9yaXplZFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDA0OiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgZG9lc24ndCBleGlzdCFcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDUwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiSW50ZXJuYWwgU2VydmVyIEVycm9yXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBcIi9hcGkvdjEvY29tbXVuaXR5L3tpZH0vYWRkLW1lbWJlclwiOiB7XG4gICAgICBwdXQ6IHtcbiAgICAgICAgdGFnczogW1wiQ29tbXVuaXR5XCJdLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJBZGQgY29tbXVuaXR5IG1lbWJlclwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29tbXVuaXR5IElkXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvQ29tbXVuaXR5XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IFwiNjBmM2IzYjNiM2IzYjNiM2IzYjNiM2IzXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkve2lkfS9wZW5kaW5nLW1lbWJlcnNcIjoge1xuICAgICAgZ2V0OiB7XG4gICAgICAgIHRhZ3M6IFtcIkNvbW11bml0eVwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IGNvbW11bml0eSBwZW5kaW5nIG1lbWJlcnNcIixcbiAgICAgICAgcGFyYW1ldGVyczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGluOiBcInBhdGhcIixcbiAgICAgICAgICAgIG5hbWU6IFwiaWRcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBJZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29tbXVuaXR5IGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL2NvbW11bml0eS97aWR9L2FwcHJvdmUtbWVtYmVyXCI6IHtcbiAgICAgIHB1dDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIkFwcHJvdmUgY29tbXVuaXR5IG1lbWJlclwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29tbXVuaXR5IElkXCIsXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgIFwiYXBwbGljYXRpb24vanNvblwiOiB7XG4gICAgICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgICAgICRyZWY6IFwiIy9jb21wb25lbnRzL3NjaGVtYXMvQ29tbXVuaXR5XCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGV4YW1wbGU6IHtcbiAgICAgICAgICAgICAgICB1c2VySWQ6IFwiNjBmM2IzYjNiM2IzYjNiM2IzYjNiM2IzXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlczoge1xuICAgICAgICAgIDIwMDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwic3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDE6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIk5vdCBBdXRob3JpemVkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA0MDQ6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkNvbW11bml0eSBkb2Vzbid0IGV4aXN0IVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIFwiL2FwaS92MS9jb21tdW5pdHkve2lkfS9yZWplY3QtbWVtYmVyXCI6IHtcbiAgICAgIHB1dDoge1xuICAgICAgICB0YWdzOiBbXCJDb21tdW5pdHlcIl0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBcIlJlamVjdCBjb21tdW5pdHkgbWVtYmVyXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbjogXCJwYXRoXCIsXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJDb21tdW5pdHkgSWRcIixcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJlcXVlc3RCb2R5OiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgXCJhcHBsaWNhdGlvbi9qc29uXCI6IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgJHJlZjogXCIjL2NvbXBvbmVudHMvc2NoZW1hcy9Db21tdW5pdHlcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZXhhbXBsZToge1xuICAgICAgICAgICAgICAgIHVzZXJJZDogXCI2MGYzYjNiM2IzYjNiM2IzYjNiM2IzYjNcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwMToge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90IEF1dGhvcml6ZWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQ29tbXVuaXR5IGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgXCIvYXBpL3YxL25vdGlmaWNhdGlvbi9cIjoge1xuICAgICAgZ2V0OiB7XG4gICAgICAgIHRhZ3M6IFtcIk5vdGlmaWNhdGlvblwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiR2V0IEFsbCBOb3RpZmljYXRpb25zXCIsXG4gICAgICAgIHBhcmFtZXRlcnM6IFtdLFxuICAgICAgICByZXNwb25zZXM6IHtcbiAgICAgICAgICAyMDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgNTAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcblxuICAgICAgZGVsZXRlOiB7XG4gICAgICAgIHRhZ3M6IFtcIk5vdGlmaWNhdGlvblwiXSxcbiAgICAgICAgZGVzY3JpcHRpb246IFwiRGVsZXRlIG5vdGlmaWNhdGlvblwiLFxuICAgICAgICBwYXJhbWV0ZXJzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW46IFwicGF0aFwiLFxuICAgICAgICAgICAgbmFtZTogXCJpZFwiLFxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcmVzcG9uc2VzOiB7XG4gICAgICAgICAgMjAwOiB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIDQwNDoge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiTm90aWZpY2F0aW9uIGRvZXNuJ3QgZXhpc3QhXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICA1MDA6IHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGNvbXBvbmVudHM6IHtcbiAgICBzY2hlbWFzOiB7XG4gICAgICBVc2VyOiB7XG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG5cbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGlkOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVGhlIGF1dG8tZ2VuZXJhdGVkIGlkIG9mIHRoZSB1c2VyXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmaXJzdG5hbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyJ3MgZmlyc3RuYW1lXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBsYXN0bmFtZToge1xuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIncyBsYXN0bmFtZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyJ3MgbmFtZXNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdlbmRlcjoge1xuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIncyBnZW5kZXJcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRvYjoge1xuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIlVzZXIncyBkYXRlIG9mIGJpcnRoXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZGRyZXNzOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlcidzIGFkZHJlc3NcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHBob25lOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiVXNlcidzIHBob25lIG51bWJlclwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyJ3MgcHJvZmlsZSBpbWFnZVwiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImJpbmFyeVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyJ3MgZW1haWxcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFBvc3Q6IHtcbiAgICAgICAgdHlwZTogXCJvYmplY3RcIixcblxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgY29udGVudDoge1xuICAgICAgICAgICAgdHlwZTogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcInBvc3QgY29udGVudFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3N0IGltYWdlIHVybFwiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImJpbmFyeVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJwb3N0IHZpZGVvXCIsXG4gICAgICAgICAgICBmb3JtYXQ6IFwiYmluYXJ5XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBNZXNzYWdlOiB7XG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG5cbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29udmVyc2F0aW9uIGlkXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZW5kZXI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJzZW5kZXIgaWRcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtZXNzYWdlIHRleHRcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIENvbnZlcnNhdGlvbjoge1xuICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxuXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICBtZW1iZXJzOiB7XG4gICAgICAgICAgICB0eXBlOiBcImFycmF5XCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJtZW1iZXJzIG9mIGNvbnZlcnNhdGlvblwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgQ29tbXVuaXR5OiB7XG4gICAgICAgIHR5cGU6IFwib2JqZWN0XCIsXG5cbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb21tdW5pdHkgbmFtZVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb21tdW5pdHkgZGVzY3JpcHRpb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByaXZhY3k6IHtcbiAgICAgICAgICAgIHR5cGU6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJjb21tdW5pdHkgcHJpdmFjeVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWVtYmVyczoge1xuICAgICAgICAgICAgdHlwZTogXCJhcnJheVwiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29tbXVuaXR5IG1lbWJlcnNcIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiY29tbXVuaXR5IGltYWdlIHVybFwiLFxuICAgICAgICAgICAgZm9ybWF0OiBcImJpbmFyeVwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICBzZWN1cml0eVNjaGVtZXM6IHtcbiAgICAgIGJlYXJlckF1dGg6IHtcbiAgICAgICAgdHlwZTogXCJodHRwXCIsXG4gICAgICAgIHNjaGVtZTogXCJiZWFyZXJcIixcbiAgICAgICAgYmVhcmVyRm9ybWF0OiBcIkpXVFwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuZG9jcm91dGVyLnVzZShcIi9cIiwgc2VydmUsIHNldHVwKG9wdGlvbnMpKTtcblxuZXhwb3J0IGRlZmF1bHQgZG9jcm91dGVyO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUFBLFFBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLGlCQUFBLEdBQUFELE9BQUE7QUFBa0QsSUFBQUUsTUFBQTtBQUVsRCxJQUFNQyxTQUFTLEdBQUcsSUFBQUMsZUFBTSxFQUFDLENBQUM7QUFFMUIsSUFBTUMsS0FBSyxHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsVUFBVTtBQUNwQyxJQUFNQyxNQUFNLEdBQUdILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxVQUFVO0FBRXJDLElBQU1DLE9BQU8sR0FBRztFQUNkQyxPQUFPLEVBQUUsT0FBTztFQUNoQkMsSUFBSSxFQUFFO0lBQ0pDLEtBQUssRUFBRSxhQUFhO0lBQ3BCQyxPQUFPLEVBQUUsT0FBTztJQUNoQkMsV0FBVyxFQUFFO0VBQ2YsQ0FBQztFQUNEQyxJQUFJLEVBQUVYLE9BQU8sQ0FBQ0MsR0FBRyxLQUFLLFlBQVksR0FBR0UsTUFBTSxHQUFHSixLQUFLO0VBQ25EYSxRQUFRLEVBQUUsTUFBTTtFQUNoQkMsUUFBUSxFQUFFLENBQ1I7SUFDRUMsVUFBVSxFQUFFO0VBQ2QsQ0FBQyxDQUNGO0VBQ0RDLElBQUksRUFBRSxDQUNKO0lBQUVDLElBQUksRUFBRSxPQUFPO0lBQUVOLFdBQVcsRUFBRTtFQUFRLENBQUMsRUFDdkM7SUFBRU0sSUFBSSxFQUFFLE1BQU07SUFBRU4sV0FBVyxFQUFFO0VBQU8sQ0FBQyxFQUNyQztJQUFFTSxJQUFJLEVBQUUsY0FBYztJQUFFTixXQUFXLEVBQUU7RUFBZSxDQUFD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