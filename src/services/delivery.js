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
    await connection.execute(
      `insert into goodsReceived(dateReceived,companyReceived,noteReceived) value (?,?,?)`,
      [dateReceived, companyReceived, noteReceived]
    );
    let [idBill, another] = await connection.query(
      `SELECT id FROM goodsReceived ORDER BY id DESC LIMIT 1;`
    );

    products.forEach(async (product) => {
      await connection.execute(
        `insert into goodsReceivedDetails(idReceived,idProduct,price,quantity) value (?,?,?,?)`,
        [idBill[0].id, product.id, product.price, product.quantity]
      );
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { getCompany, insertCompany, deleteCompany, createGoodsReceived };
