import getProducts from "../services/getProduct.js";
import connection from "../database/database.js";

// Products
const handleGetAllProducts = async (req, res) => {
  let allProducts = await getProducts();
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    res.status(404).json("error");
  }
};

const handleSearchProducts = async (req, res) => {
  try {
    let value_search = String(req.query.name).replaceAll("-", " ");

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
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export { handleGetAllProducts, handleSearchProducts };
