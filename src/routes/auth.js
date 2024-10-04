import express from "express";
import * as auth from "../controllers/auth.js";
const auth_route = express.Router();

auth_route.post("/login", auth.login);
auth_route.post("/register", auth.register);
auth_route.post("/refreshToken", auth.refresh_token);
auth_route.post("/checkLogin", auth.check_status);
export default auth_route;
