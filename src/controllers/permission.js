import {
  getPermissions,
  getAllPermission,
  getActionView,
  getRole,
  checkAndInsertPermission,
  currentAction,
} from "../services/permission.js";

const handleGetAllPermission = async (req, res) => {
  try {
    const response = await getAllPermission();
    const role = await getRole();
    if (response != null) {
      const result = response.reduce((acc, cur) => {
        let existing = acc.find((item) => item.entity == cur.entity);
        if (existing) {
          existing.listAction.push({
            permission_id: cur.id,
            action: cur.action,
          });
        } else {
          acc.push({
            entity: cur.entity,
            listAction: [{ permission_id: cur.id, action: cur.action }],
          });
        }
        return acc;
      }, []);
      const value = role.map((item) => {
        return {
          role_name: item.name,
          role_id: item.id,
          list: result,
        };
      });
      res.status(200).json(value);
    } else {
      res.status(401).json("Lay quyen that bai! Loi server");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

const handleSetPermission = async (req, res) => {
  if (req.employee.role_id !== 2) {
    res
      .status(401)
      .json(
        "Bạn không có quyền thực hiện chức năng này, chỉ tài khoản admin mới có thể thực hiện chức năng này"
      );
    return;
  }
  try {
    const change = JSON.parse(req.body.change);
    if (change.length === 0) {
      res.status(200).json("Không có gì thay đổi");
      return;
    }
    change.forEach((item) => {
      checkAndInsertPermission(item.employeeId, item.permission_id);
    });
    res.status(200).json("Thay đổi thành công");
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
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
    res.status(401).json(error);
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
    res.status(401).json(error);
  }
};

const handleGetPermissions = async (req, res) => {
  try {
    const response = await getPermissions();
    if (response != null) {
      const result = response.reduce((acc, cur) => {
        let existing = acc.find((item) => item.role_id == cur.role_id);
        if (existing) {
          existing.listAction.push({
            permission_id: cur.permission_id,
            action: cur.action,
          });
        } else {
          acc.push({
            role_id: cur.role_id,
            name: cur.name,
            listAction: [
              { permission_id: cur.permission_id, action: cur.action },
            ],
          });
        }
        return acc;
      }, []);
      res.status(200).json(result);
    } else {
      res.status(401).json("Lay quyen that bai! Loi server");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const handleGetRole = async (req, res) => {
  try {
    const response = await getRole();
    if (response != null) {
      res.status(200).json(response);
    } else {
      res.status(401).json("Lay quyen that bai! Loi server");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
};

const handleGetCurrentAction = async (req, res) => {
  try {
    const role_id = req.employee.role_id;
    const result = await currentAction(role_id);
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

export {
  handleGetPermissions,
  handleSetPermission,
  handleGetAllPermission,
  handleGetActionById,
  handleGetActionView,
  handleGetRole,
  handleGetCurrentAction,
};
