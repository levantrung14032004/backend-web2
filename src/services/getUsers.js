import connection from "../database/database.js";

const getUsers = async () => {
  const [result, fields] = await connection.query("SELECT * FROM user");
  return result;
};

export { getUsers };
