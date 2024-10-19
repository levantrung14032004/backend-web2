import connection from "../database/database.js";

const registerEmployee = async (
  role_id,
  fullname,
  email,
  password,
  phone,
  address
) => {
  try {
    const [result, otther] = await connection.execute(
      "insert into employee(role_id, fullname, email,password,phone_number,address,status) value (?,?,?,?,?,?,?)",
      [role_id, fullname, email, password, phone, address, 1]
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const findEmployeeByEmail = async (email) => {
  try {
    const [result, otther] = await connection.execute(
      "select id,role_id, email, password from employee where email = ?",
      [email]
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getRefreshTokenById = async (id) => {
  try {
    const [result, otther] = await connection.execute(
      "select refresh_token from employee where id = ?",
      [id]
    );
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateRefreshToken = async (id, refreshToken) => {
  try {
    await connection.execute(
      "update employee set refresh_token = ? where id = ?",
      [refreshToken, id]
    );
  } catch (error) {
    console.log(error);
  }
};

const deleteRefreshToken = async (id) => {
  try {
    await connection.execute(
      "update employee set refresh_token = null where id = ?",
      [id]
    );
  } catch (error) {
    console.log(error);
  }
};

export {
  registerEmployee,
  findEmployeeByEmail,
  getRefreshTokenById,
  updateRefreshToken,
  deleteRefreshToken,
};
