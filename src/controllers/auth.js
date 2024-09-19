import e from "express";
import * as authService from "../services/auth.js";
import * as userService from "../services/user.js";
export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        error: 1,
        message: "Missing email or password",
      });
    }
    const result = await authService.login(email, password);
    if (result.error === 1) return res.status(200).json(result);

    const userAgent = req.headers["user-agent"];
    const ipAddress =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const updateToken = await userService.update_token_user(
      result.id,
      result.role_id,
      userAgent,
      ipAddress
    );
    if (updateToken.error === 1) {
      return res.status(200).json(updateToken);
    }
    req.session.user_id = result.id;
    return res
      .cookie("token", updateToken.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refresh_token", updateToken.refresh_token, {
        expires: new Date(Date.now() + +process.env.expiresIn_RefreshToken),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        error: 0,
        message: result.message,
        fullname: result.fullname,
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};
