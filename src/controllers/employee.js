import { error } from "console";
import {
  getEmployee,
  getCurrentEmployee,
  deleteCurrentEmployee,
  editCurrentEmployee,
} from "../services/employee.js";
import { handleRegisterEmployee } from "./adminAuth.js";

const handleGetEmployee = async (req, res) => {
  try {
    const result = await getEmployee();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(504).error("Co loi khi lay len tat ca nhan vien");
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const handleGetCurentEmployee = async (req, res) => {
  try {
    const value = req.query.id;
    const result = await getCurrentEmployee(value);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(504).error("Co loi khi tao nhan vien");
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const handleDeleteEmployee = async (req, res) => {
  try {
    const value = req.query.id;
    const result = await deleteCurrentEmployee(value);
    if (result) {
      res.status(200).json({ code: 1, message: "Xoa thanh cong" });
    } else {
      res.status(504).error("Co loi khi tao nhan vien");
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

const handleEditEmployee = async (req, res) => {
  try {
    const value = req.body.value;
    const result = await editCurrentEmployee(value);
    if (result) {
      res.status(200).json({ code: 1, message: "Đã lưu thay đổi" });
    } else {
      res.status(200).json({ code: 0, message: "Không thể lưu thay đổi" });
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};
export const handleSearchEmployee = async (req, res) => {
  try {
    const search = req.query.search;
    if (!search) {
      return res.status(400).json({ error: 1, message: "Missing search" });
    }
    const value = String(search).toLowerCase();
    const result = await getEmployee();
    const result_search = result.filter((employee) =>
      Object.entries(employee).some((entry) => {
        if (entry[0] === "password") return false;
        return String(entry[1]).toLowerCase().includes(value);
      })
    );
    return res.status(200).json(result_search);
  } catch {
    return res.status(500).json(error);
  }
};
export {
  handleGetEmployee,
  handleGetCurentEmployee,
  handleDeleteEmployee,
  handleEditEmployee,
};
