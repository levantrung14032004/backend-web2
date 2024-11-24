import connection from "../database/database.js";
import dot from "dotenv";
import { sendOrderStatusInfo } from "../utils/sendmail.js";

dot.config();
export const getOrderByUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [rows, fields] = await connection.query(
        `SELECT 
    o.id, 
    o.order_date, 
    o.status, 
    s.name, 
    o.total_money, 
    o.shipFee, 
    c.discount_value AS discount, 
    GROUP_CONCAT(
        DISTINCT JSON_OBJECT(
            'id', od.id,
            'name', p.title, 
            'thumbnail', od.thumbnail,
            'unitPrice', od.price,
            'quantity', od.num
        )
    ) AS order_detail 
FROM 
    ${process.env.DATABASE_NAME}.order o 
JOIN 
    ${process.env.DATABASE_NAME}.order_detail od ON o.id = od.order_id 
JOIN 
    product p ON od.product_id = p.id 
JOIN 
    orderstatus s ON o.status = s.id 
LEFT JOIN 
    coupon c ON o.id_coupon = c.id AND o.id_coupon IS NOT NULL 
WHERE 
    o.user_id = ? 
    AND od.status = 1 
GROUP BY 
    o.id 
ORDER BY 
    o.order_date DESC`,
        [id]
      );
      const orders = rows.map((order) => {
        return {
          ...order,
          discount: order.discount
            ? (order.total_money - order.shipFee) /
                ((100.0 - parseFloat(order.discount.replace("%", ""))) / 100) -
              (order.total_money - order.shipFee)
            : 0,
          order_detail: JSON.parse(`[${order.order_detail}]`),
        };
      });
      resolve(orders);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getOrderByAdmin = async () => {
  try {
    const [values, fields] =
      await connection.execute(`SELECT o.id,o.address, o.phone_number, o.fullname, p.title, od.num, od.price, o.total_money, o.order_date, o.status, o.employee_id, p.thumbnail, o.shipFee, o.note
        FROM ${process.env.DATABASE_NAME}.order o
        JOIN ${process.env.DATABASE_NAME}.order_detail od ON o.id = od.order_id
        JOIN ${process.env.DATABASE_NAME}.product p ON p.id = od.product_id
        
        order by o.order_date desc`);
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getOrderByAdminWithStatus = async (status) => {
  try {
    const [values, fields] = await connection.execute(
      `SELECT o.id, p.title, od.num, od.price, o.total_money, o.order_date, o.status, o.employee_id, p.thumbnail, o.shipFee, o.note
        FROM ${process.env.DATABASE_NAME}.order o
        JOIN ${process.env.DATABASE_NAME}.order_detail od ON o.id = od.order_id
        JOIN ${process.env.DATABASE_NAME}.product p ON p.id = od.product_id
        WHERE o.status = ?`,
      [status]
    );
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTotalWithDate = async (date) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM ${process.env.DATABASE_NAME}.order WHERE DATE(order_date) = ?`,
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
      `SELECT SUM(total_money) AS total_revenue FROM ${process.env.DATABASE_NAME}.order WHERE DATE(order_date) BETWEEN ? AND ?`,
      [startDate, endDate]
    );

    const [totalOrders, fields2] = await connection.execute(
      `SELECT COUNT(*) AS total_orders FROM ${process.env.DATABASE_NAME}.order WHERE DATE(order_date) BETWEEN ? AND ?`,
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

export const getOrderStatus = async () => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT id, name FROM ${process.env.DATABASE_NAME}.orderstatus`
    );
    return rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateOrderStatus = (id, employee_id, id_status) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [rows, fields] = await client.execute(
        `UPDATE ${process.env.DATABASE_NAME}.order SET status = ?, employee_id = ? WHERE id = ?`,
        [id_status, employee_id, id]
      );
      if (rows.affectedRows === 0) {
        resolve({
          success: false,
          message: "Cập nhật trạng thái đơn hàng thất bại",
        });
        await client.rollback();
        return;
      }
      const [updateStatus] = await client.execute(
        `insert into ordertracking (id_order, id_status, time, update_by) values (?, ?, now(), ?)`,
        [id, id_status, employee_id]
      );
      if (updateStatus.affectedRows === 0) {
        resolve({
          success: false,
          message: "Cập nhật trạng thái đơn hàng thất bại",
        });
        await client.rollback();
        return;
      }
      await client.commit();
      resolve({
        success: true,
        message: "Cập nhật trạng thái đơn hàng thành công",
      });
      const [email] = await client.query(
        `SELECT email FROM ${process.env.DATABASE_NAME}.order WHERE id = ?`,
        [id]
      );
      const [nameStatus] = await client.query(
        `SELECT name FROM ${process.env.DATABASE_NAME}.orderstatus WHERE id = ?`,
        [id_status]
      );
      if (email.length !== 0 && nameStatus.length !== 0) {
        const sendMail = await sendOrderStatusInfo(
          email[0].email,
          nameStatus[0].name,
          new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
          id
        );
        console.log(sendMail);
      }
    } catch (error) {
      console.log(error);
      await client.rollback();
      reject({
        success: false,
        message: "Cập nhật trạng thái đơn hàng thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });

export const getRevenueAndOrderOne = async () => {
  try {
    const [revenue, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM ${process.env.DATABASE_NAME}.order WHERE DATE(order_date) = CURDATE()`
    );
    const [order, fields2] = await connection.execute(
      `SELECT COUNT(*) AS total_orders FROM ${process.env.DATABASE_NAME}.order WHERE DATE(order_date) = CURDATE()`
    );
    return {
      success: true,
      total_revenue: revenue[0].total_revenue,
      total_orders: order[0].total_orders,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRevenueAndOrderThree = async () => {
  try {
    const [revenue, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM ${process.env.DATABASE_NAME}.order WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)`
    );
    const [order, fields2] = await connection.execute(
      `SELECT COUNT(*) AS total_orders FROM ${process.env.DATABASE_NAME}.order WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 3 DAY)`
    );
    return {
      success: true,
      total_revenue: revenue[0].total_revenue,
      total_orders: order[0].total_orders,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getRevenueAndOrderSeven = async () => {
  try {
    const [revenue, fields] = await connection.execute(
      `SELECT SUM(total_money) AS total_revenue FROM ${process.env.DATABASE_NAME}.order WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
    );
    const [order, fields2] = await connection.execute(
      `SELECT COUNT(*) AS total_orders FROM ${process.env.DATABASE_NAME}.order WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)`
    );
    return {
      success: true,
      total_revenue: revenue[0].total_revenue,
      total_orders: order[0].total_orders,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const cancelOrder = (id, userId) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [rows, fields] = await client.execute(
        `UPDATE ${process.env.DATABASE_NAME}.order SET status = 8 WHERE id = ? and status = 1 and user_id = ?`,
        [id, userId]
      );
      if (rows.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Hủy đơn hàng thất bại",
        });
        await client.rollback();
        return;
      }
      const [updateStatus] = await client.execute(
        `insert into ordertracking (id_order, id_status, time) values (?, 8, now())`,
        [id]
      );
      if (updateStatus.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Hủy đơn hàng thất bại",
        });
        await client.rollback();
        return;
      }
      const [email] = await client.query(
        `SELECT email FROM ${process.env.DATABASE_NAME}.order WHERE id = ?`,
        [id]
      );
      if (email.length === 0) {
        resolve({
          error: 1,
          message: "Hủy đơn hàng thất bại",
        });
        await client.rollback();
        return;
      }
      const sendMail = await sendOrderStatusInfo(
        email[0].email,
        "Đã hủy, do người dùng hủy",
        new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
        id
      );
      console.log(sendMail);
      resolve({
        error: 0,
        message: "Hủy đơn hàng thành công",
      });
      await client.commit();
    } catch (error) {
      console.log(error);
      await client.rollback();
      reject({
        error: 1,
        message: "Hủy đơn hàng thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });

export const getTrackingOrder = async (id) => {
  try {
    const [result] =
      await connection.execute(`select ot.*, os.name, e.fullname as name_employee, o.fullname as name_user, o.phone_number, o.address 
                                from ordertracking ot 
                                join orderstatus os 
                                on os.id = ot.id_status  
                                left join employee e
                                on e.id = ot.update_by
                                join ${process.env.DATABASE_NAME}.order o
                                on o.id = ot.id_order
                                where id_order = ${id} 
                                order by time desc`);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
