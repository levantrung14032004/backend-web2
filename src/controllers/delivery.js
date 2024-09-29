import { getGoodsReceived } from "../services/delivery.js";

const handleGetGoodsReceived = async (req, res) => {
  try {
    const response = await getGoodsReceived();
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(401).json("Co loi khi lay phieu nhap");
    }
  } catch (error) {
    res.status(401).error(error.message);
  }
};

export { handleGetGoodsReceived };
