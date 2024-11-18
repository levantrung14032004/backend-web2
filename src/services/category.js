import connection from "../database/database.js";

const getDetailCategory = async () => {
  try {
    const [values, fields] = await connection.execute(
      `select * from product_category`
    );
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
};

export { getDetailCategory };

export const getCategorybyProduct = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        "SELECT id,name from product_category join category c where id_Product = ? and c.id = id_Category and status = 1",
        [id]
      );
      resolve({
        error: result.length === 0 ? 1 : 0,
        category: result || null,
      });
    } catch (error) {
      reject({
        error: 1,
        message: error,
      });
    }
  });

export const getCategoryById = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        "SELECT * from category where id = ? and status = 1",
        [id]
      );
      resolve(rows[0] || null);
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });
export const getAllCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        "SELECT name as label, id as value, status from category where status = 1"
      );
      resolve(rows);
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });

export const insertCategory = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        "INSERT INTO category (name, status) VALUES (?,1)",
        [name]
      );
      resolve(rows);
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });
};

export const deleteCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        "UPDATE category SET status = 0 WHERE id = ?",
        [id]
      );
      resolve(rows);
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });
};

export const updateCategory = (id, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        "UPDATE category SET name = ? WHERE id = ?",
        [name, id]
      );
      resolve(rows);
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });
};
