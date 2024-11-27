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
        message: "Không được bỏ trống email hoặc mật khẩu",
      });
    }
    const result = await authService.login(email, password);
    if (result.error === 1) return res.status(200).json(result);

    const userAgent = req.headers["user-agent"];
    const ipAddress = req.connection.remoteAddress;

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
        message: "Không được bỏ trống email hoặc mật khẩu",
      });
    }
    let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!rgEmail.test(email)) {
      return res.status(400).json({
        error: 1,
        message: "Email không hợp lệ",
      });
    }
    let rgPw = /^(?=.*[A-Z]).{8,}$/;
    if (!rgPw.test(password)) {
      return res.status(400).json({
        error: 1,
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết hoa",
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
        const ipAddress = req.connection.remoteAddress;
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
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const check_status = async (req, res) => {
  try {
    const id = req.session.user_id;
    console.log(id);
    if (id) {
      return res.status(200).json({
        error: 0,
      });
    }
    const refresh_token = req.cookies["refresh_token"];
    if (!refresh_token) {
      return res.status(200).json({
        error: 1,
      });
    }
    const public_key_refresh_token =
      await userService.get_publicKey_refreshTokenByRefreshToken(refresh_token);
    if (public_key_refresh_token.error === 1) {
      return res.status(200).json({
        error: 1,
      });
    }
    jwt.verify(
      refresh_token,
      public_key_refresh_token.publicKey_RefreshToken,
      async (err, data) => {
        if (err) {
          return res.status(200).json({
            error: 1,
          });
        }
        const userAgent = req.headers["user-agent"];
        const ipAddress = req.connection.remoteAddress;
        if (data.userAgent !== userAgent || data.ipAddress !== ipAddress) {
          return res.status(401).json({
            error: 1,
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
          return res.status(200).json({
            error: 1,
          });
        }
        req.session.user_id = data.id;
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
          });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 1 });
  }
};
export const logout = async (req, res) => {
  try {
    const id = req.session.user_id;
    if (!id) {
      return res.status(400).json({
        error: 1,
        message: "Missing user id",
      });
    }
    const result = await authService.logout(id);
    if (result.error === 1) return res.status(200).json(result);
    req.session.destroy();
    return res
      .clearCookie("access_token")
      .clearCookie("refresh_token")
      .status(200)
      .json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const send_Code_Register = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        error: 1,
        message: "Không được bỏ trống email",
      });
    }
    let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!rgEmail.test(email)) {
      return res.status(400).json({
        error: 1,
        message: "Email không hợp lệ",
      });
    }
    const result = await authService.send_Code_Register(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const verify_Code_Register = async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  if (!email || !code) {
    return res.status(400).json({
      error: 1,
      message: "Không được bỏ trống email hoặc mã xác nhận",
    });
  }
  let rgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!rgEmail.test(email)) {
    return res.status(400).json({
      error: 1,
      message: "Email không hợp lệ",
    });
  }
  const result = authService.verify_Code_Register(email, code);
  return res.status(result.error === 0 ? 200 : 401).json(result);
};
export const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({
        error: 1,
        message: "Không được bỏ trống email",
      });
    }
    const result = await authService.forgotPassword(email);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
