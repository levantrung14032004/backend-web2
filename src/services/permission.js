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

export { getPermissions, getRole };
