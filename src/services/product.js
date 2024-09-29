import connection from "../database/database.js";

export const getProduct = async () => {
  const [category, another] = await connection.query(
    `select * from product_category`
  );
  const [products, fields] = await connection.query("select * from product");

  return { products, category };
};

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
