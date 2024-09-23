import database from "../database/database.js";
import bcrypt from "bcrypt";
const saltRounds = 10;
const hashPassword = (password) => {
  return bcrypt.hashSync(password, saltRounds);
};
export const login = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await database.query(
        "SELECT id, role_id, password, status FROM user WHERE email = ?",
        [email]
      );
      const user = rows[0];
      if (user && user.status === 0) {
        resolve({
          error: 1,
          message: "Account is blocked",
        });
      }
      const match = user && bcrypt.compare(password, user.password);
      resolve({
        error: match ? 0 : 1,
        id: match ? user.id : null,
        role_id: match ? user.role_id : null,
        message: match
          ? "Login successfully"
          : "Email or password is incorrect",
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
export const register = (email, password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await database.query(
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
