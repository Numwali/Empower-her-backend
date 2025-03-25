import { Router } from "express";
import { serve, setup } from "swagger-ui-express";

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const options = {
  openapi: "3.0.1",
  info: {
    title: "Empower Her",
    version: "1.0.0",
    description: "This is the backend api for my Empower Her project.",
  },
  host: process.env === "production" ? heroku : local,
  basePath: "/api",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Users", description: "Users" },
    { name: "Post", description: "Post" },
    { name: "Conversation", description: "Conversation" },
    { name: "Message", description: "Messages" },
    { name: "Community", description: "Community" },
  ],
  paths: {
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
                $ref: "#/components/schemas/User",
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
                confirm_password: "test",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New User was created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
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
                $ref: "#/components/schemas/User",
              },
              example: {
                token: "45678900dghfjhkkkj5678",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid token",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
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
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "admin@gmail.com",
                password: "123456",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/profile": {
      get: {
        tags: ["Users"],
        description: "Get user profile",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/therapists": {
      get: {
        tags: ["Users"],
        description: "Get user therapists",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/user/profile": {
      put: {
        tags: ["Users"],
        description: "Update user profile",
        parameters: [],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/": {
      get: {
        tags: ["Post"],
        description: "Get All Posts",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/my-posts": {
      get: {
        tags: ["Post"],
        description: "Get my posts",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/my-like-posts": {
      get: {
        tags: ["Post"],
        description: "Get my liked posts",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/{postId}": {
      get: {
        tags: ["Post"],
        description: "Get One post by id",
        parameters: [
          {
            in: "path",
            name: "postId",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/add": {
      post: {
        tags: ["Post"],
        description: "Create new post",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/update/{postId}": {
      patch: {
        tags: ["Post"],
        description: "Update post",
        parameters: [
          {
            in: "path",
            name: "postId",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
              example: {
                content: "testing post content update",
              },
            },
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/{id}": {
      delete: {
        tags: ["Post"],
        description: "Delete post",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "post doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/like/{id}": {
      post: {
        tags: ["Post"],
        description: "Like post",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Post Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {},
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/comment/{id}": {
      post: {
        tags: ["Post"],
        description: "Comment on post",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Post Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
              example: {
                comment: "testing post comment",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/post/{postId}/reply/{commentId}": {
      post: {
        tags: ["Post"],
        description: "Reply on post comment",
        parameters: [
          {
            in: "path",
            name: "postId",
            description: "Post Id",
            required: true,
          },
          {
            in: "path",
            name: "commentId",
            description: "Comment Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
              example: {
                reply: "testing post reply",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/conversations": {
      get: {
        tags: ["Conversation"],
        description: "Get All Conversations",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/conversations/{userId}": {
      get: {
        tags: ["Conversation"],
        description: "Get All Conversations",
        parameters: [
          {
            in: "path",
            name: "userId",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/conversations/add": {
      post: {
        tags: ["Conversation"],
        description: "Create new conversation",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Conversation",
              },
              example: {
                members: [
                  "60f3b3b3b3b3b3b3b3b3b3b3",
                  "60f3b3b3b3b3b3b3b3b3b3b3",
                ],
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    "/api/v1/messages/{conversationId}": {
      get: {
        tags: ["Message"],
        description: "Get All Messages",
        parameters: [
          {
            in: "path",
            name: "conversationId",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/messages/add": {
      post: {
        tags: ["Message"],
        description: "Create new message",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Message",
              },
              example: {
                conversationId: "60f3b3b3b3b3b3b3b3b3b3b3",
                sender: "60f3b3b3b3b3b3b3b3b3b3b3",
                text: "testing message",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/": {
      get: {
        tags: ["Community"],
        description: "Get All Communities",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      post: {
        tags: ["Community"],
        description: "Create new community",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Community",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/my-communities": {
      get: {
        tags: ["Community"],
        description: "Get All My Communities",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/created-by-me": {
      get: {
        tags: ["Community"],
        description: "Get All Communities created by me",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/joined-by-me": {
      get: {
        tags: ["Community"],
        description: "Get All Communities joined by me",
        parameters: [
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}": {
      get: {
        tags: ["Community"],
        description: "Get One community by id",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      put: {
        tags: ["Community"],
        description: "Update community",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Community",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
      delete: {
        tags: ["Community"],
        description: "Delete community",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "post doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/join/{id}": {
      post: {
        tags: ["Community"],
        description: "Join community",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {},
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/leave/{id}": {
      put: {
        tags: ["Community"],
        description: "Leave community",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {},
          },
        },

        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/post": {
      post: {
        tags: ["Community"],
        description: "Create new post",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: {
                $ref: "#/components/schemas/Post",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/posts": {
      get: {
        tags: ["Community"],
        description: "Get community posts",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
          {
            in: "query",
            name: "page",
            description: "page number",
            required: false,
          },
          {
            in: "query",
            name: "limit",
            description: "limit number",
            required: false,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/add-member": {
      put: {
        tags: ["Community"],
        description: "Add community member",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Community",
              },
              example: {
                userId: "60f3b3b3b3b3b3b3b3b3b3b3",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/pending-members": {
      get: {
        tags: ["Community"],
        description: "Get community pending members",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/approve-member": {
      put: {
        tags: ["Community"],
        description: "Approve community member",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Community",
              },
              example: {
                userId: "60f3b3b3b3b3b3b3b3b3b3b3",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/community/{id}/reject-member": {
      put: {
        tags: ["Community"],
        description: "Reject community member",
        parameters: [
          {
            in: "path",
            name: "id",
            description: "Community Id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Community",
              },
              example: {
                userId: "60f3b3b3b3b3b3b3b3b3b3b3",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Community doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/v1/notification/": {
      get: {
        tags: ["Notification"],
        description: "Get All Notifications",
        parameters: [],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },

      delete: {
        tags: ["Notification"],
        description: "Delete notification",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          404: {
            description: "Notification doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",

        properties: {
          id: {
            type: "string",
            description: "The auto-generated id of the user",
          },
          firstname: {
            type: "string",
            description: "User's firstname",
          },
          lastname: {
            type: "string",
            description: "User's lastname",
          },
          username: {
            type: "string",
            description: "User's names",
          },
          gender: {
            type: "string",
            description: "User's gender",
          },
          dob: {
            type: "string",
            description: "User's date of birth",
          },
          address: {
            type: "string",
            description: "User's address",
          },
          phone: {
            type: "string",
            description: "User's phone number",
          },
          image: {
            type: "string",
            description: "User's profile image",
            format: "binary",
          },
          email: {
            type: "string",
            description: "User's email",
          },
        },
      },
      Post: {
        type: "object",

        properties: {
          content: {
            type: "string",
            description: "post content",
          },
          image: {
            type: "string",
            description: "post image url",
            format: "binary",
          },
          video: {
            type: "string",
            description: "post video",
            format: "binary",
          },
        },
      },
      Message: {
        type: "object",

        properties: {
          conversationId: {
            type: "string",
            description: "conversation id",
          },
          sender: {
            type: "string",
            description: "sender id",
          },
          text: {
            type: "string",
            description: "message text",
          },
        },
      },
      Conversation: {
        type: "object",

        properties: {
          members: {
            type: "array",
            description: "members of conversation",
          },
        },
      },
      Community: {
        type: "object",

        properties: {
          name: {
            type: "string",
            description: "community name",
          },
          description: {
            type: "string",
            description: "community description",
          },
          privacy: {
            type: "string",
            description: "community privacy",
          },
          members: {
            type: "array",
            description: "community members",
          },
          image: {
            type: "string",
            description: "community image url",
            format: "binary",
          },
        },
      },
    },

    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

docrouter.use("/", serve, setup(options));

export default docrouter;
