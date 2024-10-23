import {
  getPermissions,
  getRole,
  setPermision,
  getActionById,
  getActionView,
} from "../services/permission.js";

const handleGetPermissions = async (req, res) => {
  try {
    const result = await getPermissions();
    if (result != null) {
      res.status(200).json(result);
    } else {
      res.status(401).json("Lay quyen that bai! Loi server");
    }
  } catch (error) {
    console.log(error);
    res.status(401).error(error.message);
  }
};

const handleGetRole = async (req, res) => {
  try {
    const result = await getRole();
    if (result != null) {
      res.status(200).json(result);
    } else {
      res.status(401).json("Lay quyen that bai! Loi server");
    }
  } catch (error) {
    console.log(error);
    res.status(401).error(error.message);
  }
};

const handleSetPermission = async (req, res) => {
  try {
    const change = JSON.parse(req.body.change);
    if (change.length === 0) {
      res.status(200).json("Không có gì thay đổi");
      return;
    }
    change.forEach((item) => {
      setPermision(item.employeeId, item.permission_code, checked);
    });
    res.status(200).json("Thay đổi thành công");
  } catch (error) {
    console.log(error);
    res.status(401).error(error.message);
  }
};

const handleGetActionById = async (req, res) => {
  try {
    const role_id = req.employee.role_id;
    const result = await getActionById(role_id);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(401).error(error.message);
  }
};

const handleGetActionView = async (req, res) => {
  try {
    const role_id = req.employee.role_id;
    const result = await getActionView(role_id);
    const fixed = result.reduce((acc, item) => {
      if (item.action === "view") {
        acc[item.entity] = true;
      }
      return acc;
    }, {});
    if (fixed) {
      res.status(200).json(fixed);
    }
  } catch (error) {
    console.log(error);
    res.status(401).error(error.message);
  }
};

export {
  handleGetPermissions,
  handleGetRole,
  handleSetPermission,
  handleGetActionById,
  handleGetActionView,
};
