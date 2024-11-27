import jwt from "jsonwebtoken";
import { get_publicKey_accessToken } from "../services/user.js";
export const authenticateToken = async (req, res, next) => {
  try {
    const access_token = req.cookies["access_token"];
    if (access_token == null) {
      console.log("Token is missing");
      return res.status(401).json({ code: 2, message: "Token is missing" });
    }
    console.log(req.session.user_id);
    if (!req.session.user_id) {
      console.log("Token is invalid");
      return res.status(401).json({ code: 2, message: "Token is invalid" });
    }
    const getPublicKey = await get_publicKey_accessToken(req.session.user_id);
    if (getPublicKey.error === 1) {
      console.log("Token is invalid(1)");
      return res.status(401).json({ code: 2, message: "Token is invalid" });
    }
    jwt.verify(access_token, getPublicKey.publicKey_Token, (err, data) => {
      if (err && err.name === "TokenExpiredError") {
        return res.status(401).json({ code: 1, message: "Token is expired" });
      }
      if (err) {
        console.log("Token is invalid(3)");
        return res.status(401).json({ code: 2, message: "Token is invalid" });
      }
      const userAgent = req.headers["user-agent"];
      const ipAddress = req.connection.remoteAddress;
      if (data.userAgent !== userAgent || data.ipAddress !== ipAddress) {
        console.log("Token is invalid(4)");
        return res.status(401).json({ code: 2, message: "Token is invalid" });
      }
      req.data = data;
      next();
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ code: 2, message: "Token is invalid" });
  }
};
