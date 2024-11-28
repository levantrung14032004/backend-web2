import * as productService from "../services/product.js";
import * as gallery from "../services/gallery.js";
import * as category from "../services/category.js";
import uploadIMG_service from "../services/uploadIMG.js";
// Products
export const handleGetAllProducts = async (req, res) => {
  try {
    let allProducts = await productService.getProduct();
    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const handleSearchProducts = async (req, res) => {
  try {
    let value_search = String(req.query.name).replaceAll("-", " ");

    const result = await productService.searchProductByName(value_search);
    if (result !== null) {
      res.status(200).json(result);
    } else {
      res.status(200).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};
export const handleDeleteProduct = async (req, res) => {
  try {
    let result = await productService.deleteProduct(req.body.productId);
    if (result) {
      res.status(200).json("Xóa sản phẩm thành công");
    } else {
      res.status(500).json("Sản phẩm chưa được xóa");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleSortLowToHigh = async (req, res) => {
  try {
    let result = await productService.sortDateLowToHigh();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleSortHighToLow = async (req, res) => {
  try {
    let result = await productService.sortDateHightoLow();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const add_product = async (req, res) => {
  try {
    //upload file image
    const files = req.files;
    if (!files) {
      return res.status(400).json("Missing image");
    }
    const uploadPromises = files.map((file) => uploadIMG_service(file));
    const url_images = await Promise.all(uploadPromises);
    //add product
    const categories = req.body.category;
    const author_id = req.body.author || null;
    const title = req.body.name;
    const url_img = url_images[0].URL;
    const description = req.body.description;
    const introduce = req.body.introduce;

    if (!categories || !title || !url_img || !description || !introduce) {
      return res.status(400).json("Missing information");
    }
    const add_product_response = await productService.addProduct(
      JSON.parse(categories),
      author_id,
      title,
      url_img,
      description,
      introduce
    );
    //add thumbnail
    const add_thumbnail = url_images.map((url_image) =>
      gallery.add_thumbnail(add_product_response.id, url_image.URL)
    );
    const add_thumbnail_response = await Promise.all(add_thumbnail);

    res.status(200).json({
      code: 1,
      message: "Add product success",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleGetProductWithCategory = async (req, res) => {
  try {
    const id_category = req.query.category_id;
    const products = await product.getProductWithCategory(id_category);
    if (products != null) {
      res.status(200).json(products);
    } else {
      res.status(400).json("Some error occurred");
    }
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};
export const get_products_at_home = async (req, res) => {
  try {
    const category_id1 = req.query.category_id1;
    const category_id2 = req.query.category_id2;
    const result = await productService.get_products_at_home(
      category_id1,
      category_id2
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const get_product_by_id = async (req, res) => {
  try {
    const id_product = req.query.id_product;
    if (!id_product) {
      return res.status(400).json("Missing id product");
    }
    const res_product = await productService.getProductById(id_product);
    if (res_product.error != 0) {
      return res.status(500).json(res_product);
    }
    const res_category = await category.getCategorybyProduct(id_product);
    const res_gallery = await gallery.get_gallery(id_product);
    return res.status(200).json({
      error: 0,
      product: {
        ...res_product.product,
        category: res_category.category,
        gallery: res_gallery.gallery,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getProductlimit = async (req, res) => {
  try {
    const limit = req.query.limit;
    if (!limit) {
      return res.status(400).json("Missing limit");
    }
    const result = await productService.getProductlimit(limit);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const getProductByCategory = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json("Missing id category");
    }
    const result = await productService.getProductByCategory(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const handleUpdateProduct = async (req, res) => {
  try {
    const files = req.files;
    if (!files) {
      return res.status(400).json("Missing image");
    }
    const uploadPromises = files.map((file) => uploadIMG_service(file));
    const url_images = await Promise.all(uploadPromises);
    //add product
    const categoryAdd = JSON.parse(req.body.categoryAdd);
    const categoryRemove = JSON.parse(req.body.categoryRemove);
    const title = req.body.name;
    const description = req.body.description;
    const introduce = req.body.introduce;
    const imagesDelete = JSON.parse(req.body.imagesDelete);
    const productId = req.body.productId;

    const result = await productService.updateProduct({
      url_images,
      categoryAdd,
      categoryRemove,
      title,
      description,
      introduce,
      imagesDelete,
      productId,
    });
    const add_thumbnail = url_images.map((url_image) =>
      gallery.add_thumbnail(productId, url_image.URL)
    );
    await Promise.all(add_thumbnail);

    if (result) {
      res.status(200).json({ code: 1, message: "Update thanh cong" });
    } else {
      res.status(500).json({ code: 1, message: "LOI KHI UPDATE" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 1, message: "LOI KHI UPDATE" });
  }
};
export const handleSearchProduct = async (req, res) => {
  try {
    const text = req.query.text;
    if (!text) {
      return res.status(400).json("Missing text");
    }
    const value =String(text).toLowerCase();
    const result = await productService.getProduct();
    const result_search = result.filter((product) =>
      Object.entries(product).some((entry) =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
    return res.status(200).json(result_search);
  } catch (error) {
    return res.status(500).json(error);
  }
};
