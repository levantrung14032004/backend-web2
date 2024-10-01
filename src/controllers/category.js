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
