import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import googleAuth from "../controllers/googleAuthController.js";
import "../config/authPassport.js";
import protect from "../middleware/protectRoute.js";
const googleRoute = express.Router();
dotenv.config();
googleRoute.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
googleRoute.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/protected",
    failureRedirect: "/auth/google/failure",
  })
);
googleRoute.get("/auth/google/protected", isLoged, googleAuth);
googleRoute.get("/auth/google/failure", (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login`);
});

function isLoged(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

export default googleRoute;
