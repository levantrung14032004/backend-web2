import connection from "../database/database.js";

const getAllPermission = async () => {
  const [values, field] = await connection.execute("select * from permissions");
  if (values) return values;
  return null;
};
const checkAndInsertPermission = async (role_id, permission_id) => {
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM role_permissions WHERE role_id = ? AND permission_id = ?`,
      [role_id, permission_id]
    );

    if (rows.length === 0) {
      await connection.execute(
        `INSERT INTO role_permissions (role_id, permission_id) VALUES (?, ?)`,
        [role_id, permission_id]
      );
    } else {
      await connection.execute(
        `DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?`,
        [role_id, permission_id]
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const setPermision = async (id, code, value) => {
  try {
    await connection.execute(
      `update role_detail set check_action = ${
        value ? 1 : 0
      } where role_id = ${id} and action_code = ${code}`
    );
  } catch (error) {
    console.log(error);
  }
};

const getRole = async () => {
  const [values, field] = await connection.execute(
    "select * from role where id=2 or id=3 or id=4 or id=7"
  );
  if (values) return values;
  return null;
};

const getActionById = async (id) => {
  const [values, field] = await connection.execute(
    `select action_code, check_action from role_detail where role_id = ${id}`
  );
  if (values) {
    return values;
  }
  return null;
};

const getActionView = async (id) => {
  const [values, field] = await connection.execute(
    `select rp.role_id, p.entity,p.action from role_permissions rp join permissions p 
    on rp.permission_id = p.id where rp.role_id = ${id} 
    and 
    p.action like "view"
`
  );
  if (values) {
    return values;
  }
  return null;
};

const getPermissions = async () => {
  const [values, field] = await connection.execute(
    `SELECT rp.role_id,role.name,rp.permission_id, p.entity, p.action
      FROM role_permissions rp
      JOIN permissions p ON rp.permission_id = p.id
      join role on rp.role_id = role.id`
  );
  if (values) return values;
  return null;
};

const currentAction = async (role_id) => {
  const [values, field] = await connection.execute(
    `select p.entity, p.action from role_permissions rp join permissions p on rp.permission_id = p.id where rp.role_id = ${role_id} `
  );
  if (values) return values;
  return null;
};

export {
  getPermissions,
  getAllPermission,
  setPermision,
  getActionById,
  getActionView,
  getRole,
  checkAndInsertPermission,
  currentAction,
};
