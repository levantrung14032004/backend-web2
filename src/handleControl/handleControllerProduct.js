import getProducts from "../database/getProduct.js";
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

export { handleGetAllProducts };
