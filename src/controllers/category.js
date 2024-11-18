import { getDetailCategory } from "../services/category.js";
import * as categoryService from "../services/category.js";
const handleGetDetailCategory = async (req, res) => {
  try {
    const values = await getDetailCategory();
    if (values) {
      const result = values.reduce((acc, value) => {
        const product = acc.find((item) => item.id === value.id_Product);
        if (product) {
          product.categorys.push({ id_category: value.id_Category });
        } else {
          acc.push({
            id_product: value.id_Product,
            categorys: [{ id_category: value.id_Category }],
          });
        }
        return acc;
      }, []);
      return res.status(200).json(result);
    } else {
      return res.status(401).json("Co loi tu server");
    }
  } catch (err) {
    console.log(err);
    res.status(500).error(err.message);
  }
};

export { handleGetDetailCategory };

export const getCategoryById = async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      return res.status(400).json("Missing required parameter: id");
    }
    const result = await categoryService.getCategoryById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const result = await categoryService.getAllCategory();
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error" });
  }
};

export const handleInsertCategory = async (req, res) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json("Missing required parameter: name");
    }
    const result = await categoryService.insertCategory(name);
    return res
      .status(200)
      .json({ code: 1, message: "Insert category success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const handleDeleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json("Missing required parameter: id");
    }
    const result = await categoryService.deleteCategory(id);
    return res
      .status(200)
      .json({ code: 1, message: "Delete category success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const handleUpdateCategory = async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!id) {
      return res.status(400).json("Missing required parameter: id");
    }
    if (!name) {
      return res.status(400).json("Missing required parameter: name");
    }
    const result = await categoryService.updateCategory(id, name);
    return res
      .status(200)
      .json({ code: 1, message: "Update category success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
