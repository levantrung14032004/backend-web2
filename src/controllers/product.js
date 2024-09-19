import {
  getProduct,
  searchProductByName,
  deleteProduct,
  sortProductWithTitle,
  sortDateLowToHigh,
  sortDateHightoLow,
} from "../services/getProduct.js";

// Products
const handleGetAllProducts = async (req, res) => {
  let allProducts = await getProduct();
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    res.status(404).json("error");
  }
};

const handleSearchProducts = async (req, res) => {
  try {
    let value_search = String(req.query.name).replaceAll("-", " ");

    const result = await searchProductByName(value_search);
    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    let result = await deleteProduct(req.body.productId);
    if (result) {
      res.status(200).json("Xóa sản phẩm thành công");
    } else {
      res.status(500).json("Sản phẩm chưa được xóa");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const handleSortTitle = async (req, res) => {
  try {
    let result = await sortProductWithTitle();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleSortLowToHigh = async (req, res) => {
  try {
    let result = await sortDateLowToHigh();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

const handleSortHighToLow = async (req, res) => {
  try {
    let result = await sortDateHightoLow();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

export {
  handleGetAllProducts,
  handleSearchProducts,
  handleDeleteProduct,
  handleSortTitle,
  handleSortLowToHigh,
  handleSortHighToLow,
};
