import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";

import cors from "cors";
import mongoConnect from "./config/db.config.js";
import router from "./routers/index.js";
import fileUploader from "express-fileupload";
import googleRoute from "./routers/googleAuth.js";

dotenv.config();
const app = express();
mongoConnect();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUploader({ useTempFiles: true }));

app.use(
  session({
    secret: "anywantedkeyyyy",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "let's get started ",
    status: 200,
  });
});

app.use("/api/v1", router);
app.use(googleRoute)

app.use((req, res) => {
  res.status(404).json({
    message: "endpoint not found",
    status: 404,
  });
});

export default app;
