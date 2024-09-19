import connection from "../database/database.js";

const getProduct = async () => {
  const [result, fields] = await connection.query("select * from product");

  return result;
};

const searchProductByName = async (value_search) => {
  try {
    const [result, fields] = await connection.execute(
      `SELECT p.*, a.name AS author_name, c.name AS category_name,
                GROUP_CONCAT(g.thumbnail SEPARATOR ',') AS gallery_images
                FROM product p
                LEFT JOIN gallery g ON p.id = g.product_id
                LEFT JOIN author a ON p.author_id = a.id
                LEFT JOIN category c ON p.category_id = c.id
                WHERE p.title LIKE CONCAT('%', ?, '%')
                GROUP BY p.id
                ORDER BY p.id`,
      [value_search]
    );
    return result;
  } catch (error) {
    return null;
  }
};

const sortDateHightoLow = async () => {
  try {
    const [result, fields] = await connection.execute(
      `SELECT p.*, a.name AS author_name, c.name AS category_name,
                  GROUP_CONCAT(g.thumbnail SEPARATOR ',') AS gallery_images
                  FROM product p
                  LEFT JOIN gallery g ON p.id = g.product_id
                  LEFT JOIN author a ON p.author_id = a.id
                  LEFT JOIN category c ON p.category_id = c.id
                  GROUP BY p.id
                  ORDER BY p.price DESC`
    );
    return result;
  } catch (error) {
    return null;
  }
};

const sortDateLowToHigh = async () => {
  try {
    const [result, fields] = await connection.execute(
      `SELECT p.*, a.name AS author_name, c.name AS category_name,
                  GROUP_CONCAT(g.thumbnail SEPARATOR ',') AS gallery_images
                  FROM product p
                  LEFT JOIN gallery g ON p.id = g.product_id
                  LEFT JOIN author a ON p.author_id = a.id
                  LEFT JOIN category c ON p.category_id = c.id
                  GROUP BY p.id
                  ORDER BY p.price ASC`
    );
    return result;
  } catch (error) {
    return null;
  }
};

const deleteProduct = async (idProduct) => {
  try {
    let [result, fields] = await connection.execute(
      `Update product set status = 0 where id = ?`,
      [idProduct]
    );

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const sortProductWithTitle = async () => {
  try {
    const [result, fields] =
      await connection.execute(`SELECT p.*, a.name AS author_name, c.name AS category_name, GROUP_CONCAT(g.thumbnail SEPARATOR ',') AS gallery_images
          FROM product p
          LEFT JOIN gallery g ON p.id = g.product_id
          LEFT JOIN author a ON p.author_id = a.id
          LEFT JOIN category c ON p.category_id = c.id
          GROUP BY p.id
          ORDER BY p.title`);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  getProduct,
  searchProductByName,
  sortDateLowToHigh,
  sortDateHightoLow,
  deleteProduct,
  sortProductWithTitle,
};
