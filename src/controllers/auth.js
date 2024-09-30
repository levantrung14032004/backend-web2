import * as authService from "../services/auth.js";
import * as userService from "../services/user.js";
import create_token from "../utils/create_token.js";
import jwt from "jsonwebtoken";
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

    const { token, refresh_token, public_key_token, public_key_refresh_token } =
      create_token(result.id, result.role_id, userAgent, ipAddress);

    const updateToken = await userService.update_token_user(
      public_key_token,
      public_key_refresh_token,
      refresh_token,
      result.id
    );

    if (updateToken.error === 1) {
      return res.status(200).json(updateToken);
    }
    req.session.user_id = result.id;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .cookie("refresh_token", refresh_token, {
        expires: new Date(Date.now() + +process.env.expiresIn_RefreshToken),
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({
        error: 0,
        message: result.message,
      });
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const register = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(400).json({
        error: 1,
        message: "Missing email or password",
      });
    }
    let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!rgEmail.test(email)) {
      return res.status(400).json({
        error: 1,
        message: "Email is invalid",
      });
    }
    let rgPw = /^(?=.*[A-Z]).{8,}$/;
    if (!rgPw.test(password)) {
      return res.status(400).json({
        error: 1,
        message:
          "Password must contain an uppercase letter and at least 8 digits.",
      });
    }
    const result = await authService.register(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const refresh_token = async (req, res) => {
  try {
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      return res.status(400).json({
        error: 1,
        message: "Missing refresh token",
      });
    }

    const public_key_refresh_token =
      await userService.get_publicKey_refreshToken(req.session.user_id);
    if (public_key_refresh_token.error === 1) {
      return res.status(401).json(public_key_refresh_token);
    }

    jwt.verify(
      refresh_token,
      public_key_refresh_token.publicKey_RefreshToken,
      async (err, data) => {
        if (err) {
          return res.status(401).json({
            error: 1,
            message: "Refresh token is invalid",
          });
        }
        const userAgent = req.headers["user-agent"];
        const ipAddress =
          req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        if (data.userAgent !== userAgent || data.ipAddress !== ipAddress) {
          return res.status(401).json({
            error: 1,
            message: "Refresh token is invalid",
          });
        }
        const {
          token,
          refresh_token,
          public_key_token,
          public_key_refresh_token,
        } = create_token(data.id, data.role_id, userAgent, ipAddress);

        const updateToken = await userService.update_token_user(
          public_key_token,
          public_key_refresh_token,
          refresh_token,
          data.id
        );
        if (updateToken.error === 1) {
          return res.status(200).json(updateToken);
        }
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .cookie("refresh_token", refresh_token, {
            expires: new Date(Date.now() + +process.env.expiresIn_RefreshToken),
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .status(200)
          .json({
            error: 0,
            message: "Refresh token successfully",
          });
      }
    );
  } catch (err) {
    return res.status(500).json(err);
  }
};
export const check_status = async (req, res) => {
  return res.status(200).json({
    error: req.session.user_id ? 0 : 1,
  });
};
