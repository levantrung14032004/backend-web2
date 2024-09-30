import connection from "../database/database.js";

const getCompany = async () => {
  const [result, fields] = await connection.execute(
    `select * from company_delivery`
  );

  if (result) {
    return result;
  }
};

const insertCompany = async (name, discount, status, description) => {
  const [result, fields] = await connection.execute(
    `insert into company_delivery(name, discount,status, description) values (?, ?, ?, ? )`,
    [name, discount, status, description]
  );

  if (result != null) {
    return result;
  }
};

const deleteCompany = async (id) => {};

const createGoodsReceived = async (
  dateReceived,
  companyReceived,
  noteReceived,
  products
) => {
  try {
    const total = Math.ceil(
      products.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0)
    );

    await connection.execute(
      `insert into goodsReceived(dateReceived,companyReceived,noteReceived,total_value) value (?,?,?,?)`,
      [dateReceived, companyReceived, noteReceived, total]
    );
    let [idBill, another] = await connection.query(
      `SELECT id FROM goodsReceived ORDER BY id DESC LIMIT 1;`
    );

    products.forEach(async (product) => {
      await connection.execute(
        `insert into goodsReceivedDetails(idReceived,idProduct,price,quantity) value (?,?,?,?)`,
        [idBill[0].id, product.id, product.price, product.quantity]
      );

      // Update value in stock
      const [discount, fields] = await connection.execute(`select discount 
        from company_delivery join goodsreceived 
        on company_delivery.id = ${companyReceived}`);

      let newPrice = Math.round(
        product.price + (product.price * discount[0].discount) / 100
      );

      await connection.execute(`update product 
                                set price = ${newPrice}
                                where product.id = ${product.id}`);
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getGoodsReceived = async function () {
  try {
    const [values, fields] = await connection.execute(
      `select * from goodsreceived`
    );
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  getCompany,
  insertCompany,
  deleteCompany,
  createGoodsReceived,
  getGoodsReceived,
};
