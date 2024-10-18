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

export const handleGetTopSelling = async (req, res) => {
  try {
    const topSelling = await orderService.getTopSelling();
    if (topSelling) {
      res.status(200).json(topSelling);
    } else {
      res.status(404).json({
        error: 1,
        message: "No data found",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleGetDashDtoD = async (req, res) => {
  try {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    if (!startDate || !endDate || Date.parse(endDate) < Date.parse(startDate)) {
      res.status(200).json({
        error: 1,
        message: "Thời gian xác định không đúng",
      });
    } else {
      const totalValues = await orderService.getDashDtoD(startDate, endDate);
      res.status(200).json(totalValues);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
