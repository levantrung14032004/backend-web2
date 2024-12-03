import connection from "../database/database.js";

export const getDiscounts = async () => {
  try {
    const [result] = await connection.execute(`
              SELECT * FROM coupon;
          `);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const insertDiscount = async (discount) => {
  try {
    await connection.query(
      `
        INSERT INTO coupon (coupon_code, discount_value,created_date, expiration_date, value_apply, max_apply)
        VALUES (?, ?,NOW(), ?, ?,?);
    `,
      [
        discount.coupon_code,
        discount.discount_value + "%",
        discount.expiration_date,
        discount.value_apply,
        discount.max_apply,
      ]
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscount = async (discount) => {
  try {
    await connection.query(
      `
        UPDATE coupon
        SET coupon_code = ?, discount_value = ?, expiration_date = ?, value_apply = ?, max_apply = ?
        WHERE id = ?;
    `,
      [
        discount.coupon_code,
        discount.discount_value + "%",
        discount.expiration_date,
        discount.value_apply,
        discount.max_apply,
        discount.discount_id,
      ]
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUserWithAmount = async () => {
  try {
    const [result] = await connection.execute(`
              SELECT u.id,u.email, SUM(od.total_money) AS amount
              FROM order_detail od
              JOIN myweb.order o ON o.id = od.order_id
              JOIN user u ON o.user_id = u.id
              GROUP BY u.id
              order by amount desc;
          `);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserAmountMinMax = async (min, max) => {
  try {
    const [result] = await connection.execute(
      `
              SELECT u.id,u.email, SUM(od.total_money) AS amount
              FROM order_detail od
              JOIN myweb.order o ON o.id = od.order_id
              JOIN user u ON o.user_id = u.id
              GROUP BY u.id
              HAVING SUM(od.total_money) > ? and SUM(od.total_money) <= ?;
          `,
      [min, max]
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const dropDiscount = async (user_id, id_discount) => {
  try {
    const [result] = await connection.execute(
      `insert into coupon_for_user values(?,?,1)`,
      [user_id, id_discount]
    );
    if (result) {
      return true;
    }
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const finishDrpoDiscount = async (id_discount) => {
  try {
    await connection.execute(
      `update coupon set droptime = now() where id = ?`,
      [id_discount]
    );

    return true;
  } catch (error) {
    return false;
  }
};

export const deleteDiscount = async (id_discount) => {
  try {
    await connection.execute(
      `update coupon_for_user set status = 0 where id_coupon = ?`,
      [id_discount]
    );
    return true;
  } catch (error) {
    return false;
  }
};
