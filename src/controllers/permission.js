import { getPermissions, getRole } from "../services/permission.js";

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

export { handleGetPermissions, handleGetRole };
