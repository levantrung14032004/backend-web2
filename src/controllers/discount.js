import { getDiscounts, insertDiscount } from "../services/discount.js";

export const handleGetDiscounts = async (req, res) => {
  try {
    const result = await getDiscounts();
    if (result) {
      res
        .status(200)
        .json({ code: 1, message: "Lấy dữ liệu thành công", data: result });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: -1, message: "Lỗi server" });
  }
};

export const handleInsertDiscount = async (req, res) => {
  try {
    const discount = req.body;
    const result = await insertDiscount(discount);
    if (result) {
      res.status(200).json({
        code: 1,
        message: "Thêm mã giảm giá thành công",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
