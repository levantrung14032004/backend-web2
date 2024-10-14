import connection from "../database/database.js";
import bcrypt from "bcrypt";

const getUsers = async () => {
  const [result, fields] = await connection.query("SELECT * FROM user");
  return result;
};

export const update_token_user = (
  public_key_token,
  public_key_refresh_token,
  refresh_token,
  id
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        `UPDATE user SET publicKey_Token = ?, publicKey_RefreshToken = ?, RefreshToken = ? WHERE id = ?`,
        [public_key_token, public_key_refresh_token, refresh_token, id]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message:
          result.affectedRows === 0
            ? " Update token failed"
            : "Update token successfully",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
const getAllOrder = async (userId) => {
  try {
    const [result, fields] = await connection.execute(
      `select o.id, p.title, od.num, od.price, o.total_money,o.order_date, o.status
          from ${process.env.DATABASE_NAME}.order o
          join ${process.env.DATABASE_NAME}.order_detail od on o.id = od.order_id
          join ${process.env.DATABASE_NAME}.product p on p.id = od.product_id
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
    return result[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

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
      `INSERT INTO ${process.env.DATABASE_NAME}.order (user_id, employee_id,fullname, phone_number, email, address, note, shipFee, total_money, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(),2)`,
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
      `SELECT id FROM ${process.env.DATABASE_NAME}.order ORDER BY id DESC LIMIT 1;`
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

export { getUsers, getAllOrder, getInfoById, editInfo, addOrder };

export const get_publicKey_accessToken = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        `SELECT publicKey_Token FROM user WHERE id = ?`,
        [id]
      );
      const publicKey_Token = result[0].publicKey_Token;
      resolve({
        error: publicKey_Token ? 0 : 1,
        publicKey_Token: publicKey_Token || null,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const get_publicKey_refreshToken = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        `SELECT publicKey_RefreshToken FROM user WHERE id = ?`,
        [id]
      );
      const publicKey_RefreshToken = result[0].publicKey_RefreshToken;
      resolve({
        error: publicKey_RefreshToken ? 0 : 1,
        publicKey_RefreshToken: publicKey_RefreshToken || null,
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const changePassword = (id, password_current_input, new_password) =>
  new Promise(async (resolve, reject) => {
    try {
      const [user, fields] = await connection.execute(
        "select password from user where id = ? ",
        [id]
      );
      const password_current = user[0].password;
      const checkPassword =
        password_current &&
        bcrypt.compareSync(password_current_input, password_current);
      if (!checkPassword) {
        resolve({
          error: 1,
          message: "Password wrong!",
        });
      }
      const hash_new_password = bcrypt.hashSync(new_password, 10);
      const result = await connection.execute(
        "update user set password = ? where id = ?",
        [hash_new_password, id]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "change password success"
            : "change password fail",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getAddressById = async (id) => {
  try {
    const [result, other] = await connection.execute(
      `select * from addressDetail where id_user = ${id}`
    );
    if (result) {
      const addressFormat = result.reduce((acc, cur) => {
        const existId = acc.find((item) => item.id === cur.id_user);
        if (existId) {
          existId.addressList.push({
            address: cur.address,
            default: cur.setdefault,
          });
        } else {
          acc.push({
            id: cur.id_user,
            addressList: [{ address: cur.address, default: cur.setdefault }],
          });
        }
        return acc;
      }, []);
      return addressFormat;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const addAddress = async (id, address, defaultAddress) => {
  try {
    await connection.execute(
      `INSERT INTO addressDetail (id_user, address, setdefault) VALUES (?, ?, ?)`,
      [id, address, defaultAddress]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteAddress = async (id, address) => {
  try {
    await connection.execute(
      `DELETE FROM addressDetail WHERE id = ? and address = ?`,
      [id, address]
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getCouponUser = async (id) => {
  try {
    const [coupon_for_user, by] = await connection.execute(
      `select * from coupon_for_user where id_user = ${id}`
    );
    const [result, other] = await connection.execute(`select * from coupon`);
    if (result) {
      return {
        id: coupon_for_user.id_user,
        coupons: [...result, ...coupon_for_user],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
