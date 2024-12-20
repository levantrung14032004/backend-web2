import express from "express";
import * as auth from "../controllers/auth.js";
const auth_route = express.Router();

auth_route.post("/login", auth.login);
auth_route.post("/register", auth.register);
auth_route.post("/refreshToken", auth.refresh_token);
auth_route.post("/checkLogin", auth.check_status);
auth_route.post("/logout", auth.logout);
auth_route.post("/sendCode", auth.send_Code_Register);
auth_route.post("/verifyCode", auth.verify_Code_Register);
auth_route.put("/forgot-password", auth.forgotPassword);

export default auth_route;
