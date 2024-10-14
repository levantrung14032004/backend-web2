import {
  getEmployee,
  createEmployee,
  getCurrentEmployee,
  deleteCurrentEmployee,
} from "../services/employee.js";

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

const handleCreateEmployee = async (req, res) => {
  try {
    const value = req.body.value;
    const result = await createEmployee(value);
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
      res.status(200).json(result);
    } else {
      res.status(504).error("Co loi khi tao nhan vien");
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

export {
  handleGetEmployee,
  handleCreateEmployee,
  handleGetCurentEmployee,
  handleDeleteEmployee,
};
