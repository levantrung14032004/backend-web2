import * as product from "../services/product.js";
import * as gallery from "../services/gallery.js";
import uploadIMG_service from "../services/uploadIMG.js";
// Products
export const handleGetAllProducts = async (req, res) => {
  let { products, category } = await product.getProduct();
  const cateDetail = category.reduce((acc, cur) => {
    const exist = acc.find((item) => item.id === cur.id_Product);
    if (exist) {
      exist.cate.push({ cate_id: cur.id_Category });
    } else {
      acc.push({
        id: cur.id_Product,
        cate: [{ cate_id: cur.id_Category }],
      });
    }
    return acc;
  }, []);

  const result = products.reduce((acc, cur) => {
    const exist = acc.find((item) => item.id === cur.id);
    let catevalue;
    if (exist) {
      catevalue = cateDetail.find((item) => item.id === exist.id_Product);
      console.log(catevalue);
      exist.category_id = catevalue.cate;
    } else {
      catevalue = cateDetail.find((item) => item.id === cur.id);
      console.log(catevalue);
      acc.push({
        ...cur,
        category_id: catevalue ? catevalue.cate : [],
      });
    }
    return acc;
  }, []);
  if (result.length > 0) {
    res.status(200).json(result);
  } else {
    res.status(404).json("error");
  }
};

export const handleSearchProducts = async (req, res) => {
  try {
    let value_search = String(req.query.name).replaceAll("-", " ");

    const result = await product.searchProductByName(value_search);
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
    let result = await product.deleteProduct(req.body.productId);
    if (result) {
      res.status(200).json("Xóa sản phẩm thành công");
    } else {
      res.status(500).json("Sản phẩm chưa được xóa");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const handleSortTitle = async (req, res) => {
  try {
    let result = await product.sortProductWithTitle();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleSortLowToHigh = async (req, res) => {
  try {
    let result = await product.sortDateLowToHigh();
    result != null
      ? res.status(200).json(result)
      : res.status(500).json("have error");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleSortHighToLow = async (req, res) => {
  try {
    let result = await product.sortDateHightoLow();
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
    const category_id = req.body.category;
    const author_id = req.body.author || null;
    const title = req.body.name;
    const url_img = url_images[0].URL;
    const description = req.body.description;
    if (!category_id || !title || !url_img || !description) {
      return res.status(400).json("Missing information");
    }
    const add_product_response = await product.addProduct(
      category_id,
      author_id,
      title,
      url_img,
      description
    );
    //add thumbnail
    const add_thumbnail = url_images.map((url_image) =>
      gallery.add_thumbnail(add_product_response.id, url_image.URL)
    );
    const add_thumbnail_response = await Promise.all(add_thumbnail);

    res.status(200).json(add_product_response);
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
    res.status(500).error(error.message);
  }
};
