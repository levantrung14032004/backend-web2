import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export const sendCode = async (toEmail, code) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: '"Comicola"<' + process.env.EMAIL + ">",
      to: toEmail,
      subject: "Thư được gửi từ cửa hàng sách Comicola",
      text: `Hello ${toEmail},
Đây là mail xác nhận mã xác minh khi đăng ký tài khoản tại Comicola:
      
Mã xác minh của bạn là: ${code}

Bạn vui lòng nhập vào ô xác nhận để tiếp tục việc đăng ký tài khoản.

Have a nice day !!!!`,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
};

export const sendNewPassword = async (toEmail, newPassword) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: '"Comicola"<' + process.env.EMAIL + ">",
      to: toEmail,
      subject: "Thư được gửi từ cửa hàng sách Comicola",
      text: `Hello ${toEmail},

Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại Comicola.

Mật khẩu mới của bạn là: ${newPassword}

Vui lòng đăng nhập bằng mật khẩu mới này và thay đổi mật khẩu của bạn ngay sau khi đăng nhập để đảm bảo an toàn cho tài khoản của bạn.

Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng liên hệ với chúng tôi ngay lập tức để bảo vệ tài khoản của bạn.

Chúc bạn một ngày tốt lành!

Trân trọng,
Đội ngũ hỗ trợ Comicola`,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    return null;
  }
};
