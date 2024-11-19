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
// const getAllOrder = async (userId) => {
//   try {
//     const [result, fields] = await connection.execute(
//       `select o.id, p.title, od.num, od.price, o.total_money,o.order_date, o.status, os.name
//           from ${process.env.DATABASE_NAME}.order o
//           join ${process.env.DATABASE_NAME}.order_detail od on o.id = od.order_id
//           join ${process.env.DATABASE_NAME}.product p on p.id = od.product_id
//           join ${process.env.DATABASE_NAME}.orderstatus os on os.id = o.status
//           where o.user_id = ?;`,
//       [userId]
//     );

//     let orders = {};
//     result.map((order) => {
//       const order_id = order.id;
//       if (!orders.order_id) {
//         orders.order_id = {
//           orderId: order_id,
//           products: [],
//           total: order.total_money,
//           orderDate: order.order_date,
//           status: order.status,
//           statusName: order.name,
//         };
//       }

//       orders.order_id.products.push({
//         productName: order.title,
//         quantity: order.num,
//         unitPrice: order.price,
//       });
//     });
//     if (orders.order_id) {
//       return orders.order_id;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

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

const addOrder = (
  user_id,
  fullname,
  phoneNumber,
  address,
  email,
  note,
  id_coupon,
  products
) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      //check total price
      const ids = [];
      const placeholders_listProduct = products
        .map((product) => {
          ids.push(product.id);
          return "?";
        })
        .join(",");
      const [listProduct] = await client.query(
        `select id, thumbnail, quantity, price from product where id in (${placeholders_listProduct})`,
        [...ids]
      );
      if (listProduct.length !== products.length) {
        resolve({
          error: 1,
          message: "Có sản phẩm không tồn tại",
        });
        return;
      }
      const insufficientStock = listProduct.some((product) => {
        const stock = products.find((item) => item.id === product.id);
        return stock.quantity > product.quantity;
      });
      if (insufficientStock) {
        resolve({
          error: 1,
          message: "Có sản phẩm không đủ số lượng",
        });
        return;
      }
      listProduct.forEach((product) => {
        const stock = products.find((item) => item.id === product.id);
        product.quantity = stock.quantity;
        product.total_price = stock.quantity * product.price;
      });
      const totalPrice = listProduct.reduce(
        (acc, cur) => acc + cur.total_price,
        0
      );
      let priceDiscount = 0;
      if (id_coupon) {
        const [coupon] = await client.query(
          `SELECT c.discount_value FROM coupon c join coupon_for_user cu on c.id = cu.id_coupon where cu.status = 1 and c.expiration_date > now() and cu.id_user = ? and cu.id_coupon = ? and c.value_apply <= ? and c.max_apply >= ?`,
          [user_id, id_coupon, totalPrice, totalPrice]
        );
        if (coupon.length === 0) {
          resolve({
            error: 1,
            message: "Mã giảm giá không hợp lệ hoặc đã hết hạn",
          });
          return;
        }
        const [useCoupon] = await client.execute(
          `UPDATE coupon_for_user SET status = 0 WHERE id_user = ? and id_coupon = ?`,
          [user_id, id_coupon]
        );
        if (useCoupon.affectedRows === 0) {
          resolve({
            error: 1,
            message: "Đặt hàng thất bại",
          });
          return;
        }
        priceDiscount =
          (totalPrice * parseFloat(coupon[0].discount_value.replace("%", ""))) /
          100.0;
      }
      const shipFee =
        address.split(", ")[3] === "Thành phố Hồ Chí Minh" ? 15000 : 35000;
      const total = totalPrice + shipFee - priceDiscount;
      //add order
      const [addOrder] = await client.execute(
        `INSERT INTO ${process.env.DATABASE_NAME}.order (user_id, employee_id, fullname, phone_number, email, address, note, shipFee, id_coupon, total_money, order_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,? ,?, NOW(),1)`,
        [
          user_id,
          null,
          fullname,
          phoneNumber,
          email,
          address,
          note,
          shipFee,
          id_coupon,
          total,
        ]
      );
      if (addOrder.affectedRows === 0) {
        resolve({
          error: 1,
          message: "Đặt hàng thất bại",
        });
        return;
      }
      const values = [];
      const placeholders_add_order_details = listProduct
        .map((product) => {
          values.push(
            addOrder.insertId,
            product.id,
            product.price,
            product.quantity,
            product.total_price,
            product.thumbnail
          );
          return "(?, ?, ?, ?, ?, ?, 1)";
        })
        .join(", ");
      const sql_addOrderDetail = `
        INSERT INTO order_detail (order_id, product_id, price, num, total_money, thumbnail, status)
        VALUES ${placeholders_add_order_details}
      `;
      const [addOrderDetail] = await client.execute(sql_addOrderDetail, values);
      if (addOrderDetail.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Đặt hàng thất bại",
        });
        return;
      }
      const sql_updateProduct = `UPDATE product SET quantity = CASE ${listProduct
        .map(
          (product) =>
            `WHEN id = ${product.id} THEN quantity - ${product.quantity}`
        )
        .join(" ")} ELSE quantity END WHERE id IN (${products
        .map((product) => `${product.id}`)
        .join(",")});`;
      const [updateProduct] = await client.execute(sql_updateProduct);
      if (updateProduct.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Đặt hàng thất bại",
        });
        return;
      }
      await client.commit();
      resolve({
        error: 0,
        message: "Đặt hàng thành công",
      });
    } catch (error) {
      console.log(error);
      await client.rollback();
      reject({
        error: 1,
        message: "Đặt hàng thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });

export { getUsers, getInfoById, editInfo, addOrder };

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
      await client.rollback();
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
      const [list_address] = await client.query(
        "select * from addressDetail where id_user = ? ",
        [id_user]
      );
      if (list_address.length === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Chọn địa chỉ thất bại",
        });
        return;
      }
      if (list_address.length > 1) {
        const [result] = await client.execute(
          `update addressDetail set setdefault = '0' where id_user = ? and setdefault = '1'`,
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
      }
      const [result2] = await client.execute(
        `update addressDetail set setdefault = '1' where id = ? and id_user = ? `,
        [id, id_user]
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
      await client.rollback();
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
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [list_address] = await client.query(
        "select * from addressDetail where id_user = ? ",
        [id]
      );
      const sql =
        list_address.length === 0
          ? "insert into addressDetail (id_user, phone_number, email, firstName, lastName, province, district, ward, detail, setdefault) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
          : "insert into addressDetail (id_user, phone_number, email, firstName, lastName, province, district, ward, detail) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const arr =
        list_address.length === 0
          ? [
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
          : [
              id,
              phone_number,
              email,
              firstName,
              lastName,
              province,
              district,
              ward,
              detail,
            ];
      const result = await client.execute(sql, arr);
      if (result[0].affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Thêm địa chỉ thất bại",
        });
        return;
      }
      await client.commit();
      resolve({
        error: 0,
        message: "Thêm địa chỉ thành công",
      });
    } catch (error) {
      console.error(error);
      await client.rollback();
      reject({
        error: 1,
        message: "Thêm địa chỉ thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });

export const deleteAddress = (id, id_user) =>
  new Promise(async (resolve, reject) => {
    let client;
    try {
      client = await connection.getConnection();
      await client.beginTransaction();
      const [address] = await client.query(
        `select * from addressDetail where id = ? and id_user = ?`,
        [id, id_user]
      );
      if (address.length === 0) {
        resolve({
          error: 1,
          message: "Xóa địa chỉ thất bại",
        });
        return;
      }
      const [result] = await client.execute(
        `DELETE FROM addressDetail WHERE id = ? and id_user= ?`,
        [id, id_user]
      );
      if (result.affectedRows === 0) {
        await client.rollback();
        resolve({
          error: 1,
          message: "Xóa địa chỉ thất bại",
        });
        return;
      }
      if (address[0].setdefault === "1") {
        const [count] = await client.query(
          `select count(*) as count from addressDetail where id_user = ?`,
          [id_user]
        );
        if (count[0].count > 0) {
          const [setdefault] = await client.execute(
            `update addressDetail set setdefault = 1 where id_user = ? order by id limit 1`,
            [id_user]
          );
          if (setdefault.affectedRows === 0) {
            await client.rollback();
            resolve({
              error: 1,
              message: "Xóa địa chỉ thất bại",
            });
            return;
          }
        }
      }
      await client.commit();
      resolve({
        error: 0,
        message: "Xóa địa chỉ thành công",
      });
    } catch (error) {
      console.error(error);
      await client.rollback();
      reject({
        error: 1,
        message: "Xóa địa chỉ thất bại",
      });
    } finally {
      if (client) client.release();
    }
  });
export const editAddress = (
  id,
  id_user,
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
        `UPDATE addressDetail SET phone_number = ?, email = ?, firstName = ?, lastName = ?, province = ?, district = ?, ward = ?, detail = ? WHERE id = ? and id_user = ? `,
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
          id_user,
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
        `select c.coupon_code, c.discount_value, c.created_date, c.expiration_date, c.value_apply, c.max_apply
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

export const checkValidCoupon = (id, coupon, value_apply) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.execute(
        `select c.discount_value, c.id from coupon_for_user cf join coupon c on cf.id_coupon = c.id
where cf.id_user = ? and c.coupon_code = ? and cf.status = 1 and c.expiration_date > NOW() and c.value_apply <= ? and c.max_apply >= ?`,
        [id, coupon, value_apply, value_apply]
      );
      resolve({
        error: result.length === 0 ? 1 : 0,
        message:
          result.length === 0
            ? "Mã giảm giá đã hết hạn hoặc chưa đạt đến hạn mức áp dụng. Vui lòng kiểm tra lại!!!"
            : "Áp dụng mã giảm giá thành công",
        discount_value: result.length === 0 ? null : result[0].discount_value,
        id: result.length === 0 ? null : result[0].id,
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: "Áp dụng mã giảm giá thất bại",
        discount_value: null,
        id: null,
      });
    }
  });

export const changeStatusUser = async (id, status) => {
  try {
    const [result] = await connection.execute(
      `update user set status = ? where id = ?`,
      [status, id]
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const get_publicKey_refreshTokenByRefreshToken = (refresh_token) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result] = await connection.query(
        `SELECT publicKey_RefreshToken FROM user WHERE RefreshToken = ?`,
        [refresh_token]
      );
      const publicKey_RefreshToken = result[0].publicKey_RefreshToken;
      resolve({
        error: publicKey_RefreshToken ? 0 : 1,
        publicKey_RefreshToken: publicKey_RefreshToken || null,
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        publicKey_RefreshToken: null,
      });
    }
  });
