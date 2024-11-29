import connection from "../database/database.js";

const check = async (query) => {
  const [rows] = await connection.execute(query);
  if (rows.length === 0) {
    return false;
  }

  return rows;
};

const checkPermission = (req, res, next) => {
  try {
    const role_id = req.employee.role_id;
    const action = req.body.action || req.query.action;
    const entity = req.query.entity || req.body.entity;

    const query = `select * from role_permissions rp join permissions p
                    on rp.permission_id = p.id
                    where rp.role_id= ${role_id} and  p.entity = '${entity}' and p.action = '${action}'`;

    if (check(query)) {
      next();
    } else {
      res
        .status(403)
        .json("You do not have permission to access this resource");
    }
  } catch (error) {
    console.log(error);
  }
};

export default checkPermission;
