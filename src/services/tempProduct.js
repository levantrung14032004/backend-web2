import connection from "../database/database.js";

const createProductTemp = (name, author) => {
  try {
    const [value, othor] = connection.execute(
      `insert into product_temp(name, author) value (?, ?)`,
      [name, author]
    );
    if (value) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
export { createProductTemp };
