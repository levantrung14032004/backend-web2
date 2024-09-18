import * as product from "../services/product.js";
import * as gallery from "../services/gallery.js";
import connection from "../database/database.js";
import uploadIMG_service from "../services/uploadIMG.js";
// Products
const handleGetAllProducts = async (req, res) => {
  let allProducts = await product.getProduct();
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
export const add_product = async (req, res) => {
  try {
    //upload file image
    console.log(req.body, req.files);
    const files = req.files;
    const uploadPromises = files.map((file) => uploadIMG_service(file));
    const url_images = await Promise.all(uploadPromises);
    //add product
    const category_id = req.body.category;
    const author_id = req.body.author || null;
    const title = req.body.name;
    const price = req.body.price;
    const url_img = url_images[0].URL;
    const description = req.body.description;
    const quantity = req.body.quantity;
    if (
      !category_id ||
      !title ||
      !price ||
      !url_img ||
      !description ||
      !quantity
    ) {
      return res.status(400).json("Missing information");
    }
    const add_product_response = await product.addProduct(
      category_id,
      author_id,
      title,
      price,
      url_img,
      description,
      quantity
    );
    //add thumbnail
    console.log(add_product_response);
    const add_thumbnail = url_images.map((url_image) =>
      gallery.add_thumbnail(add_product_response.id, url_image.URL)
    );
    const add_thumbnail_response = await Promise.all(add_thumbnail);

    res.status(200).json(add_product_response);
  } catch (error) {
    res.status(500).json(error);
  }
};
