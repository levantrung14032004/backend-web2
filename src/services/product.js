import connection from "../database/database.js";

export const getProduct = async () => {
  const [result, fields] = await connection.query("select * from product");

  return result;
};

export const addProduct = (
  category_id,
  author_id,
  title,
  price,
  url_img,
  description,
  quantity
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.query(
        "INSERT INTO product(category_id, author_id, title, price, thumbnail, description,created_at,update_at, status, quantity) VALUES (?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP, 1, ?)",
        [category_id, author_id, title, price, url_img, description, quantity]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message: result.affectedRows === 0 ? "error" : "success",
        id: result.insertId,
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });
