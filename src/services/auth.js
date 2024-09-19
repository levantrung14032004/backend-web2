import database from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
const hashPassword = (password) => {
  return bcrypt.hash(password, saltRounds);
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
        error: 0,
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
