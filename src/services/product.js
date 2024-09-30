import connection from "../database/database.js";

export const getProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const new_products = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 order by update_at DESC"
      );
      const price = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 order by price"
      );
      const price_desc = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 order by price DESC"
      );
      resolve({
        new_products: new_products[0],
        price: price[0],
        price_desc: price_desc[0],
      });
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });

export const addProduct = (
  category_id,
  author_id,
  title,
  url_img,
  description
) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.query(
        "INSERT INTO product(category_id, author_id, title, thumbnail, description,created_at,update_at, status) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)",
        [category_id, author_id, title, url_img, description]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message: result.affectedRows === 0 ? "error" : "success",
        id: result.insertId,
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });

export const searchProductByName = async (value_search) => {
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

export const sortDateHightoLow = async () => {
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

export const sortDateLowToHigh = async () => {
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

export const deleteProduct = async (idProduct) => {
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

export const sortProductWithTitle = async () => {
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

export const getProductWithCategory = async (id) => {
  try {
    const [result, fields] = await connection.execute(
      `SELECT p.*, a.name AS author_name, c.name AS category_name,
                        GROUP_CONCAT(g.thumbnail SEPARATOR ',') AS gallery_images
                  FROM product p
                  LEFT JOIN gallery g ON p.id = g.product_id
                  LEFT JOIN author a ON p.author_id = a.id
                  LEFT JOIN category c ON p.category_id = c.id
                  WHERE p.category_id = ? 
                  GROUP BY p.id
                  ORDER BY p.id`,
      [id]
    );
    if (!result) {
      return null;
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const get_products_at_home = (category_id1, category_id2) =>
  new Promise(async (resolve, reject) => {
    try {
      const new_products = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 order by update_at DESC limit 8"
      );
      const by_category1 = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 and category_id = ? order by update_at DESC limit 8",
        [category_id1]
      );
      const by_category2 = await connection.query(
        "SELECT id,title,price,thumbnail FROM product where status = 1 and category_id = ? order by update_at DESC limit 8",
        [category_id2]
      );
      resolve({
        new_products: new_products[0],
        by_category1: by_category1[0],
        by_category2: by_category2[0],
      });
    } catch (error) {
      console.log(error);
      reject(null);
    }
  });
