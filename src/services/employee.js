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

export { getEmployee };
