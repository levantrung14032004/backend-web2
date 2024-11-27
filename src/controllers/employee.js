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

const handleSearchEmployee = async (req, res) => {
  try {
    const emplloyees = await getEmployee();
    const { search } = req.query;
    const value = String(search).toLowerCase();
    const resultSearch = emplloyees.filter((o) =>
      Object.entries(o).some((entry) =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
    if (resultSearch) {
      res
        .status(200)
        .json({ code: 1, message: "Tìm kiếm thành công", data: resultSearch });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: -1, message: "Lỗi server" });
  }
};

export {
  handleGetEmployee,
  handleGetCurentEmployee,
  handleDeleteEmployee,
  handleEditEmployee,
  handleSearchEmployee,
};
