import {
  getPermissions,
  getRole,
  setPermision,
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

export { handleGetPermissions, handleGetRole, handleSetPermission };
