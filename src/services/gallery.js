import connection from "../database/database.js";
export const add_thumbnail = (product_id, url_image) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.query(
        "INSERT INTO gallery(product_id, thumbnail,status) VALUES (?, ?,1)",
        [product_id, url_image]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message: result.affectedRows === 0 ? "error" : "success",
      });
    } catch (error) {
      reject({
        error: 1,
        message: error,
      });
    }
  });
