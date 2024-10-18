import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  registerEmployee,
  findEmployeeByEmail,
  getRefreshTokenById,
  updateRefreshToken,
  deleteRefreshToken,
} from "../services/adminAuth.js";

const generateAccessToken = (employee) => {
  return jwt.sign(employee, process.env.ACCESS_KEY, {
    expiresIn: process.env.expiresIn_JWT,
  });
};

const generateRefreshToken = (employee) => {
  return jwt.sign(employee, process.env.REFRESH_KEY), { expiresIn: "365d" };
};

const handleRegisterEmployee = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    if (req.body.email !== "" && req.body.password !== "" && hashPassword) {
      const email = req.body.email;
      const password = hashPassword;
      const phone = req.body.phone;
      const fullName = req.body.fullname;
      const address = req.body.address;
      const role_id = req.body.role_id;
      const result = await registerEmployee(
        role_id,
        fullName,
        email,
        password,
        phone,
        address
      );
      if (result) {
        res.status(200).json("Đăng ký thành công");
      } else {
        res.status(400).json("Đăng ký thất bại");
      }
    } else {
      res.status(400).json("Không được bỏ trống email hoặc mật khẩu");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleLoginEmployee = async (req, res) => {
  try {
    const employee = await findEmployeeByEmail(req.body.email);
    if (!employee) {
      res.status(401).json("Email không tồn tại");
      return;
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        employee[0].password
      );
      if (!validPassword) {
        res.status(401).json("Mật khẩu không chính xác");
        return;
      }
      if (employee && validPassword) {
        const accessToken = generateAccessToken(employee[0]);
        const refreshToken = generateRefreshToken(employee[0]);
        res.cookie("refreshToken", refreshToken, { httpOnly: true });
        res.status(200).json({ message: "Đăng nhập thành công", accessToken });
      }
    }
  } catch (error) {
    res.status(500).json("Loi " + error);
  }
};

const requestRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json("Token không hợp lệ");
    } else {
      const employeeRefreshToken = await getRefreshTokenById(req.employee.id);
      if (refreshToken !== employeeRefreshToken) {
        res.status(403).json("Token này không phải của bạn");
      } else {
        const accessToken = generateAccessToken();
        const refreshToken = generateRefreshToken();
        updateRefreshToken(req.employee.id, refreshToken);
        res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleLogOut = async (req, res) => {
  res.clearCookie("refreshToken");
  await deleteRefreshToken(req.employee.id);
  res.status(200).json("Đăng xuất thành công");
};

export {
  handleRegisterEmployee,
  handleLoginEmployee,
  requestRefreshToken,
  handleLogOut,
};
