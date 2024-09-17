import connection from "../database/database.js";

const getProduct = async () => {
  const [result, fields] = await connection.query("select * from product");

  return result;
};

export default getProduct;
