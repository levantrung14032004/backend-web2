import { getDetailCategory } from "../services/category";

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
