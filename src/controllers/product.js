import {
  getProduct,
  searchProductByName,
  deleteProduct,
  sortProductWithTitle,
  sortDateLowToHigh,
  sortDateHightoLow,
} from "../services/product.js";

import * as product from "../services/product.js";
import * as gallery from "../services/gallery.js";
import uploadIMG_service from "../services/uploadIMG.js";
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
