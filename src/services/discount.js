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
        INSERT INTO coupon (code, discount, expiration_date, value_apply)
        VALUES (?, ?, ?, ?);
    `,
      [
        discount.code,
        discount.discount,
        discount.expiration_date,
        discount.value_apply,
      ]
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};
