import express from "express";
import * as auth from "../controllers/auth.js";
const auth_route = express.Router();

auth_route.post("/login", auth.login);
export default auth_route;