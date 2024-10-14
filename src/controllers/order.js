import * as orderService from "../services/orders.js";
export const getOrderByUser = async (req, res) => {
  try {
    const id = req.data.id;
    if (!id) {
      return res.status(400).json({
        error: 1,
        message: "Missing user id",
      });
    }
    const orders = await orderService.getOrderByUser(id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleCreateOrder = (req, res) => {
  const values = req.body;
  console.log(values);
};

export const handleGetTotalWithDate = async (req, res) => {
  try {
    const date = req.body.date;
    const total = await orderService.getTotalWithDate(date);
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json(error);
  }
};
