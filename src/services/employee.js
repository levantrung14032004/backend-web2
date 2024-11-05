import connection from "../database/database.js";

const getEmployee = async () => {
  try {
    const [result, other] = await connection.execute(
      `SELECT employee.id,employee.fullname,employee.email,employee.password, employee.phone_number, employee.address, employee.status, role.name as role_name FROM employee join role on employee.role_id = role.id`
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const createEmployee = async (value) => {
  try {
    const [result, other] = await connection.execute(
      `insert into employee(role_id, fullname, email, password,phone_number,address,status) value(?,?,?,?,?,?,?)`,
      [
        parseInt(value.role),
        value.fullname,
        value.email,
        value.password,
        value.phone_number,
        value.address,
        1,
      ]
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const getCurrentEmployee = async (id) => {
  try {
    const [result, other] = await connection.execute(
      `select * from employee where id = ${id}`
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteCurrentEmployee = async (id) => {
  try {
    const [result, other] = await connection.execute(
      `update employee set status =0 where id = ${id}`
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

const editCurrentEmployee = async (value) => {
  try {
    const [result, other] = await connection.execute(
      `update employee set role_id = ?, fullname = ?, password = ?, phone_number = ?, address = ? where id = ?`,
      [
        parseInt(value.role),
        value.fullname,
        value.password,
        "0" + value.phone_number,
        value.address,
        value.id,
      ]
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getEmployee,
  createEmployee,
  getCurrentEmployee,
  deleteCurrentEmployee,
  editCurrentEmployee,
};
