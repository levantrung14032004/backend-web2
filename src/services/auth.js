import database from "../database/database.js";
import bcrypt from "bcrypt";
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
    try {
      const [result, fields] = await database.execute(
        "INSERT into user (role_id,email,password,status) SELECT 1, ?, ?, 1 WHERE not EXISTS( SELECT * FROM user WHERE email = ? )",
        [email, hashPassword(password), email]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message:
          result.affectedRows === 0
            ? "Email is already taken"
            : "Register successfully",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
