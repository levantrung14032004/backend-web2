import connection from "../database/database.js";

const getPermissions = async () => {
  const [values, field] = await connection.execute(
    "select r.id, r.name, rd.action_code, rd.check_action from role as r join role_detail as rd on r.id = rd.role_id"
  );
  if (values) return values;
  return null;
};

const getRole = async () => {
  const [values, field] = await connection.execute(
    "select * from role where role.id = 3 or role.id = 4 or role.id = 7"
  );
  if (values) return values;
  return null;
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

export { getPermissions, getRole, setPermision, getActionById, getActionView };
