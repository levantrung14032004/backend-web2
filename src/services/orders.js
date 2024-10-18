import connection from "../database/database.js";
import dot from "dotenv";
dot.config();
export const getOrderByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        `select o.id, o.order_date, o.status, o.total_money, GROUP_CONCAT(distinct JSON_OBJECT('id',od.id,'name',p.title, 'thumbnail', od.thumbnail,'unitPrice',od.price,'quantity',od.num)) AS order_detail FROM ${process.env.DATABASE_NAME}.order o join ${process.env.DATABASE_NAME}.order_detail od on o.id = od.order_id join product p on od.product_id = p.id where o.user_id = ? and od.status = 1 GROUP BY o.id ORDER BY o.order_date DESC`,
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

export const getTopSelling = async () => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT p.title,p.thumbnail, SUM(od.num) AS total_sales
FROM product p
JOIN order_detail od ON p.id = od.product_id
LEFT JOIN gallery g ON p.id = g.product_id
LEFT JOIN author a ON p.author_id = a.id
GROUP BY p.id
ORDER BY total_sales DESC
LIMIT 6`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getDashDtoD = async (startDate, endDate) => {
  try {
    const [totalValues, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM myweb.order WHERE DATE(order_date) BETWEEN ? AND ?`,
      [startDate, endDate]
    );

    const [totalOrders, fields2] = await connection.execute(
      `SELECT COUNT(*) AS total_orders FROM myweb.order WHERE DATE(order_date) BETWEEN ? AND ?`,
      [startDate, endDate]
    );
    if (totalValues && totalOrders) {
      return {
        total_revenue: totalValues[0].total_revenue,
        total_orders: totalOrders[0].total_orders,
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
