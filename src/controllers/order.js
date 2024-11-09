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
export const cancelOrder = async (req, res) => {
  try {
    const id = req.data.id;
    const id_order = req.body.id_order;
    if (!id || !id_order) {
      return res.status(400).json({
        error: 1,
        message: "Thiếu thông tin",
      });
    }
    const result = await orderService.cancelOrder(id_order, id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export const handleGetOrderByAdmin = async (req, res) => {
  try {
    const orders = await orderService.getOrderByAdmin();
    if (orders) {
      const result = orders.reduce((acc, order) => {
        const found = acc.find((item) => item.orderId === order.id);
        if (!found) {
          acc.push({
            orderId: order.id,
            orderDate: order.order_date,
            status: order.status,
            total: order.total_money,
            employeeId: order.employee_id,
            shipFee: order.shipFee,
            note: order.note,
            products: [
              {
                productName: order.title,
                thumbnail: order.thumbnail,
                unitPrice: order.price,
                quantity: order.num,
              },
            ],
          });
        } else {
          found.products.push({
            productName: order.title,
            thumbnail: order.thumbnail,
            unitPrice: order.price,
            quantity: order.num,
          });
        }
        return acc;
      }, []);
      res.status(200).json(result);
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

export const handleGetOrderStatus = async (req, res) => {
  try {
    const status = await orderService.getOrderStatus();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleUpdateOrderStatus = async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const employeeId = req.employee.id;
    const status = req.body.status;
    if (!orderId || !status) {
      res.status(400).json({
        error: 1,
        message: "Missing orderId or status",
      });
    } else {
      const result = await orderService.updateOrderStatus(
        orderId,
        employeeId,
        status
      );
      if (result) {
        res.status(200).json({
          success: true,
          message: "Đã lưu thay đổi",
        });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleGetTotal1D = async (req, res) => {
  try {
    const total = await orderService.getRevenueAndOrderOne();
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleGetTotal3D = async (req, res) => {
  try {
    const total = await orderService.getRevenueAndOrderThree();
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const handleGetTotal7D = async (req, res) => {
  try {
    const total = await orderService.getRevenueAndOrderSeven();
    res.status(200).json(total);
  } catch (error) {
    res.status(500).json(error);
  }
};
