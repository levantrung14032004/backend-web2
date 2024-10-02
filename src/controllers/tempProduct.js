import { createProductTemp } from "../services/tempProduct.js";

const handleCreateProductTemp = (req, res) => {
  try {
    const name = req.body.name;
    const author = req.body.author;
    const isCreate = createProductTemp(name, author);
    if (isCreate) {
      res.status(200).json("Tao san pham tam thanh cong");
    } else {
      res.status(400).json("Dang co loi xay ra");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export { handleCreateProductTemp };
