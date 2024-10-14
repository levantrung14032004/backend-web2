import connection from "../database/database.js";
import client from "../utils/redis.js";
export const getCart = (id_user) =>
  new Promise(async (resolve, reject) => {
    const cartKey = `cart:${id_user}`;
    try {
      const cartRD = await client.hGetAll(cartKey);
      if (Object.keys(cartRD).length > 0) {
        console.log("Cart loaded from Redis:", cartRD);
        return resolve(cartRD);
      }
      const [rows, fields] = await connection.query(
        "SELECT * FROM cart WHERE id_user = ?",
        [id_user]
      );
      if (rows.length === 0) {
        console.log("Cart not found in DB");
        return resolve(null);
      }
      const cartFromDB = {};
      rows.forEach((row) => {
        cartFromDB[`product:${row.id_product}`] = JSON.stringify({
          id: row.id_product,
          quantity: row.quantity,
          price: parseInt(row.price),
          total_price: parseInt(row.total_price),
          name: row.product_title,
          thumbnail: row.product_thumbnail,
        });
      });
      await client.hSet(cartKey, cartFromDB);
      console.log("Cart loaded from DB and cached in Redis:", cartFromDB);
      return resolve(cartFromDB);
    } catch (error) {
      console.log(error);
      console.log("Cart not found in DB");
      return resolve(null);
    }
  });
export const addToCart = (
  id_user,
  id_product,
  quantity,
  price,
  total_price,
  product_title,
  product_thumbnail
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "INSERT INTO cart (id_user, id_product, quantity, price,total_price,product_title,product_thumbnail) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE quantity = quantity + ?, total_price =  quantity * ?",
        [
          id_user,
          id_product,
          quantity,
          price,
          total_price,
          product_title,
          product_thumbnail,
          quantity,
          price,
        ]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message:
          result.affectedRows === 0
            ? "Thêm sản phẩm vào giỏ hàng thất bại"
            : "Thêm sản phẩm vào giỏ hàng thành công",
      });
      const cartKey = `cart:${id_user}`;
      const existingProduct = await client.hGet(
        cartKey,
        `product:${id_product}`
      );
      await client.hSet(
        cartKey,
        `product:${id_product}`,
        JSON.stringify({
          id: id_product,
          quantity: existingProduct
            ? JSON.parse(existingProduct).quantity + parseInt(quantity)
            : parseInt(quantity),
          price: parseInt(price),
          total_price: existingProduct
            ? (JSON.parse(existingProduct).quantity + parseInt(quantity)) *
              parseInt(total_price)
            : parseInt(total_price),
          name: product_title,
          thumbnail: product_thumbnail,
        })
      );
    } catch (error) {
      console.log(error);
      reject({ error: 1, message: "Thêm sản phẩm vào giỏ hàng thất bại" });
    }
  });
export const removeFromCart = (id_user, id_product) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        "DELETE FROM cart WHERE id_user = ? AND id_product = ?",
        [id_user, id_product]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message:
          result.affectedRows === 0
            ? "Xóa sản phẩm khỏi giỏ hàng thất bại"
            : "Xóa sản phẩm khỏi giỏ hàng thành công",
      });
      const cartKey = `cart:${id_user}`;
      await client.hDel(cartKey, `product:${id_product}`);
    } catch (error) {
      console.log(error);
      reject({ error: 1, message: "Xóa sản phẩm khỏi giỏ hàng thất bại" });
    }
  });
