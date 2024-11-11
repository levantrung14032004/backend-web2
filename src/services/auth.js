import database from "../database/database.js";
import bcrypt from "bcrypt";
import { sendCode, sendNewPassword } from "../utils/sendmail.js";
let verificationCodes = {};
const saltRounds = 10;
const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};
export const login = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await database.execute(
        "SELECT id, role_id, password, status FROM user WHERE email = ?",
        [email]
      );
      const user = rows[0];
      if (user && user.status === 0) {
        resolve({
          error: 1,
          message: "Tài khoản đã bị khóa",
        });
      }
      const match = user && bcrypt.compareSync(password, user.password);
      resolve({
        error: match ? 0 : 1,
        id: match ? user.id : null,
        role_id: match ? user.role_id : null,
        message: match
          ? "Đăng nhập thành công"
          : "Email hoặc mật khẩu không đúng",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
export const register = (email, password) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await database.getConnection();
      await client.beginTransaction();
      const [result, fields] = await client.execute(
        "INSERT into user (role_id,email,password,status) SELECT 1, ?, ?, 1 WHERE not EXISTS( SELECT * FROM user WHERE email = ? )",
        [email, hashPassword(password), email]
      );
      if (result.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Email đã tồn tại",
        });
        await client.rollback();
        return;
      }
      const id_coupon_for_new_user = 4;
      const [addCoupon] = await client.execute(
        "INSERT INTO coupon_for_user (id_user, id_coupon, status) VALUES (?, ?, ?)",
        [result.insertId, id_coupon_for_new_user, 1]
      );
      if (addCoupon.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Thêm coupon thất bại",
        });
        await client.rollback();
        return;
      }
      resolve({
        error: 0,
        message: "Đăng ký thành công",
      });
      await client.commit();
    } catch (err) {
      console.log(err);
      await client.rollback();
      reject({
        error: 1,
        message: "Đăng ký thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });
export const logout = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await database.execute(
        "UPDATE user SET publicKey_Token = NULL, publicKey_RefreshToken = NULL, RefreshToken = NULL WHERE id = ?",
        [id]
      );
      resolve({
        error: result.affectedRows === 1 ? 0 : 1,
        message:
          result.affectedRows === 1 ? "Logout successfully" : "Logout failed",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const send_Code_Register = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await database.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      if (rows.length > 0) {
        resolve({
          error: 1,
          message: "Email đã tồn tại",
        });
      }
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      const result = await sendCode(email, code);
      if (result != null) {
        verificationCodes[email] = code;
      }
      resolve({
        error: result != null ? 0 : 1,
        message:
          result != null
            ? "Code đã được gửi đến email của bạn"
            : "Gửi code thất bại",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const verify_Code_Register = (email, code) => {
  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    return {
      error: 0,
      message: "Code xác nhận đúng",
    };
  }
  return {
    error: 1,
    message: "Code xác nhận không đúng",
  };
};
export const forgotPassword = (email) =>
  new Promise(async (resolve, reject) => {
    try {
      const [findUser] = await database.query(
        "SELECT * FROM user WHERE email = ?",
        [email]
      );
      if (findUser.length === 0) {
        resolve({
          error: 1,
          message: "Email không tồn tại",
        });
        return;
      }
      const newPassword = Math.random().toString(36).substring(2, 8).toUpperCase();
      const [changePassword] = await database.execute(
        "UPDATE user SET password = ? WHERE id = ?",
        [hashPassword(newPassword), findUser[0].id]
      );
      if (changePassword.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Đặt lại mật khẩu thất bại",
        });
        return;
      }
      const result = await sendNewPassword(email, newPassword);
      resolve({
        error: result != null ? 0 : 1,
        message:
          result != null
            ? "Mật khẩu mới đã được gửi đến email của bạn"
            : "Gửi mật khẩu mới thất bại",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "Đặt lại mật khẩu thất bại",
      });
    }
  });
