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
