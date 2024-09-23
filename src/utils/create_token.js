import jwt from "jsonwebtoken";
import crypto from "crypto";
const create_token = (id, role_id, userAgent, ipAddress) => {
  const { privateKey: private_key_token, publicKey: public_key_token } =
    crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
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
    modulusLength: 2048,
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
  return { token, refresh_token, public_key_token, public_key_refresh_token };
};
export default create_token;
