import connection from "../database/database.js";
import bcrypt from "bcrypt";
import dot from "dotenv";
dot.config();
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
      `select first_name, last_name, fullname, email, address, phone_number from user where id = ?`,
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

const editInfo = (firstName, lastName, fullName, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        `UPDATE user SET first_name = ?, last_name = ?, fullname = ? WHERE id = ?`,
        [firstName, lastName, fullName, id]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message:
          result.affectedRows === 0
            ? "Update info failed"
            : "Update info successfully",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

const addOrder = async (
  user_id,
  fullname,
  phoneNumber,
  address,
  email,
  note,
  shipFee,
  discount,
  total,
  employeeId,
  products
) => {
  try {
    await connection.execute(
      `INSERT INTO ${process.env.DATABASE_NAME}.order (user_id, employee_id,fullname, phone_number, email, address, note, shipFee,discount, total_money, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,? ?, NOW(),2)`,
      [
        user_id,
        employeeId,
        fullname,
        phoneNumber,
        email,
        address,
        note,
        shipFee,
        discount,
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
      const [result, fields] = await connection.query(
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
      const [user, fields] = await connection.query(
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
            ? "Đổi mật khẩu thành công"
            : "Đổi mật khẩu thất bại",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
export const changeInfo = (
  id,
  firstName,
  lastName,
  fullName,
  password,
  new_password
) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [names] = await client.execute(
        "update user set first_name = ?, last_name = ?, fullname = ? where id = ?",
        [firstName, lastName, fullName, id]
      );
      if (names.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Cập nhật thông tin thất bại",
        });
        return;
      }
      if (password && new_password) {
        const [password_DB] = await client.query(
          "select password from user where id = ?",
          [id]
        );
        if (password_DB.length === 0) {
          await client.rollback();
          resolve({
            error: 1,
            message: "Cập nhật thông tin thất bại",
          });
          return;
        }
        const password_current = password_DB[0].password;
        const checkPassword =
          password_current && bcrypt.compareSync(password, password_current);
        if (!checkPassword) {
          await client.rollback();
          resolve({
            error: 1,
            message: "Mật khẩu không đúng",
          });
          return;
        }
        const hash_new_password = bcrypt.hashSync(new_password, 10);
        const result = await client.execute(
          "update user set password = ? where id = ?",
          [hash_new_password, id]
        );
        if (result[0].affectedRows === 0) {
          await client.rollback();
          resolve({
            error: 1,
            message: "Cập nhật thông tin thất bại",
          });
          return;
        }
      }
      await client.commit();
      resolve({
        error: 0,
        message: "Cập nhật thông tin thành công",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    } finally {
      if (client) client.release();
    }
  });
export const getAddressById = async (id) => {
  try {
    const [result, other] = await connection.execute(
      `select * from addressDetail where id_user = ?`,
      [id]
    );
    if (result) {
      const addressFormat = result.reduce((acc, cur) => {
        const existId = acc.find((item) => item.id === cur.id_user);
        if (existId) {
          existId.addressList.push({
            id: cur.id,
            firstName: cur.firstName,
            lastName: cur.lastName,
            phoneNumber: cur.phone_number,
            email: cur.email,
            province: cur.province,
            district: cur.district,
            ward: cur.ward,
            detail: cur.detail,
            default: cur.setdefault,
          });
        } else {
          acc.push({
            id: cur.id_user,
            addressList: [
              {
                id: cur.id,
                firstName: cur.firstName,
                lastName: cur.lastName,
                phoneNumber: cur.phone_number,
                email: cur.email,
                province: cur.province,
                district: cur.district,
                ward: cur.ward,
                detail: cur.detail,
                default: cur.setdefault,
              },
            ],
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
export const selectAddress = (id_user, id) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [result] = await client.execute(
        `update addressDetail set setdefault = 0 where id_user = ?`,
        [id_user]
      );
      if (result.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Chọn địa chỉ mặc định thất bại",
        });
        return;
      }
      const [result2] = await client.execute(
        `update addressDetail set setdefault = 1 where id = ?`,
        [id]
      );
      if (result2.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Chọn địa chỉ mặc định thất bại",
        });
        return;
      }
      await client.commit();

      resolve({
        error: 0,
        message: "Chọn địa chỉ mặc định thành công",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "Chọn địa chỉ mặc định thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });
export const addAddress = (
  id,
  phone_number,
  email,
  firstName,
  lastName,
  province,
  district,
  ward,
  detail
) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.execute(
        "INSERT INTO addressDetail (id_user, phone_number, email, firstName, lastName, province, district, ward, detail, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          id,
          phone_number,
          email,
          firstName,
          lastName,
          province,
          district,
          ward,
          detail,
          1,
        ]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Thêm địa chỉ thành công"
            : "Thêm địa chỉ thất bại",
      });
    } catch (error) {
      console.error(error);
      reject({
        error: 1,
        message: "Thêm địa chỉ thất bại",
      });
    }
  });

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
export const editAddress = (
  id,
  phone_number,
  email,
  firstName,
  lastName,
  province,
  district,
  ward,
  detail
) =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await connection.execute(
        `UPDATE addressDetail SET phone_number = ?, email = ?, firstName = ?, lastName = ?, province = ?, district = ?, ward = ?, detail = ? WHERE id = ?`,
        [
          phone_number,
          email,
          firstName,
          lastName,
          province,
          district,
          ward,
          detail,
          id,
        ]
      );
      resolve({
        error: result[0].affectedRows === 1 ? 0 : 1,
        message:
          result[0].affectedRows === 1
            ? "Cập nhật địa chỉ thành công"
            : "Cập nhật địa chỉ thất bại",
      });
    } catch (error) {
      console.error(error);
      reject({
        error: 1,
        message: "Cập nhật địa chỉ thất bại",
      });
    }
  });
export const getCouponUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const [coupon_for_user] = await connection.query(
        `select c.coupon_code, c.discount_value, c.created_date, c.expiration_date, c.value_apply
      from coupon_for_user cf 
      join coupon c on c.id = cf.id_coupon 
      where id_user = ? and status = 1 and c.expiration_date > NOW()`,
        [id]
      );
      if (coupon_for_user.length > 0) {
        resolve({
          id: coupon_for_user[0].id,
          coupons: coupon_for_user,
        });
      } else {
        resolve(null);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const checkValidCoupon = async (id, coupon, value_apply) => {
  try {
    const [result] =
      await connection.execute(`select c.discount_value from coupon_for_user cf join coupon c on cf.id_coupon = c.id
where cf.id_user = ${id} and c.coupon_code = "${coupon}" and cf.status = 1 and c.expiration_date > NOW() and c.value_apply <= ${value_apply}`);

    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
