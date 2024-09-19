import connection from "../database/database.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { type } from "os";
import { format } from "path";

export const getUsers = async () => {
  const [result, fields] = await connection.query("SELECT * FROM user");
  return result;
};

export const update_token_user = (id, role_id, userAgent, ipAddress) =>
  new Promise(async (resolve, reject) => {
    try {
      const { privateKey: private_key_token, publicKey: public_key_token } =
        crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
        });

      const issuedAt = new Date().getTime();
      const token = jwt.sign(
        { id, role_id, userAgent, ipAddress, issuedAt },
        private_key_token,
        {
          algorithm: process.env.algorithm_JWT,
          expiresIn: +process.env.expiresIn_JWT,
        }
      );

      const {
        privateKey: private_key_refresh_token,
        publicKey: public_key_refresh_token,
      } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs1",
          format: "pem",
        },
      });

      const refresh_token = jwt.sign(
        { id, userAgent, ipAddress, issuedAt },
        private_key_refresh_token,
        {
          algorithm: process.env.algorithm_JWT,
          expiresIn: +process.env.expiresIn_RefreshToken,
        }
      );
      const [result, fields] = await connection.execute(
        `UPDATE user SET publicKey_Token = ?, publicKey_RefreshToken = ?, RefreshToken = ? WHERE id = ?`,
        [public_key_token, public_key_refresh_token, refresh_token, id]
      );
      if (result.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Update token failed",
        });
      }
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message: "Update token successfully",
        token,
        refresh_token,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
