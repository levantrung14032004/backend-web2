import connection from "../database/database.js";

const getUsers = async () => {
  const [result, fields] = await connection.query("SELECT * FROM user");
  return result;
};

const getAllOrder = async (userId) => {
  try {
    const [result, fields] = await connection.execute(
      `select o.id, p.title, od.num, od.price, o.total_money,o.order_date, o.status
          from myweb.order o
          join myweb.order_detail od on o.id = od.order_id
          join myweb.product p on p.id = od.product_id
          where o.user_id = ?;`,
      [userId]
    );

    let orders = {};
    result.map((order) => {
      const order_id = order.id;
      if (!orders.order_id) {
        orders.order_id = {
          orderId: order_id,
          products: [],
          total: order.total_money,
          orderDate: order.order_date,
          status: order.status,
        };
      }

      orders.order_id.products.push({
        productName: order.title,
        quantity: order.num,
        unitPrice: order.price,
      });
    });
    if (orders.order_id) {
      return orders.order_id;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getInfoById = async (id) => {
  try {
    const [result, fields] = await connection.execute(
      `select fullname, email, address, phone_number from user where id = ?`,
      [id]
    );
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const changePassword = async () => {};
const editInfo = async (firstName, lastName, fullName, id) => {
  try {
    const [result, fields] = await connection.execute(
      `UPDATE user SET first_name = ?, last_name = ?, fullname = ? WHERE id = ?`,
      [firstName, lastName, fullName, id]
    );
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const addOrder = async (
  user_id,
  fullname,
  phoneNumber,
  address,
  email,
  note,
  shipFee,
  total,
  employeeId,
  products
) => {
  try {
    await connection.execute(
      `INSERT INTO myweb.order (user_id, employee_id,fullname, phone_number, email, address, note, shipFee, total_money, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),2)`,
      [
        user_id,
        employeeId,
        fullname,
        phoneNumber,
        email,
        address,
        note,
        shipFee,
        total,
      ]
    );
    const [lastId, another] = await connection.query(
      `SELECT id FROM myweb.order ORDER BY id DESC LIMIT 1;`
    );

    const productsInOrder = products;
    productsInOrder.forEach(async (product) => {
      let productId = product.id;
      let productPrice = product.price;
      let productQuantity = product.quantity;
      let productTotal = product.total;
      let productThumbnail = product.thumbnail;

      await connection.execute(
        `INSERT INTO order_detail (order_id, product_id, price, num, total_money, thumbnail, status) VALUES (?, ?, ?, ?, ?, ?, 1)`,
        [
          lastId[0].id,
          productId,
          productPrice,
          productQuantity,
          productTotal,
          productThumbnail,
        ]
      );

      await connection.execute(
        `UPDATE product SET quantity = quantity - ? WHERE id = ?`,
        [productQuantity, productId]
      );
    });

    await connection.execute(
      `update user 
    set fullname = ?, address = ?, phone_number = ? 
    where id = ?`,
      [fullname, address, phoneNumber, user_id]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export {
  getUsers,
  getAllOrder,
  getInfoById,
  changePassword,
  editInfo,
  addOrder,
};
