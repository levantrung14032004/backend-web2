import connection from "../database/database.js";

export const getOrderByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        `select o.id, o.order_date, o.status, o.total_money, GROUP_CONCAT(distinct JSON_OBJECT('id',od.id,'name',p.title, 'thumbnail', od.thumbnail,'unitPrice',od.price,'quantity',od.num)) AS order_detail FROM myweb.order o join myweb.order_detail od on o.id = od.order_id join product p on od.product_id = p.id where o.user_id = ? and od.status = 1 GROUP BY o.id ORDER BY o.order_date DESC`,
        [id]
      );
      const orders = rows.map((order) => {
        return {
          ...order,
          order_detail: JSON.parse(`[${order.order_detail}]`),
        };
      });
      resolve(orders);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getTotalWithDate = async (date) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM myweb.order WHERE DATE(order_date) = ?`,
      [date]
    );
    return rows[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};
