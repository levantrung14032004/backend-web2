import {
  getDiscounts,
  insertDiscount,
  getAllUserWithAmount,
  getUserAmountMinMax,
  dropDiscount,
  updateDiscount,
  finishDrpoDiscount,
} from "../services/discount.js";

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

export const handleGetAllUserWithAmount = async (req, res) => {
  try {
    const result = await getAllUserWithAmount();
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

export const handleGetUserAmountMinMax = async (req, res) => {
  try {
    const { min, max } = req.body;
    const result = await getUserAmountMinMax(min, max);
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

export const handleDropDiscount = async (req, res) => {
  try {
    const { id_user, id_discount } = req.body;
    if (id_user.length > 0) {
      id_user.forEach(async (user_id) => {
        await dropDiscount(user_id, id_discount);
      });
      await finishDrpoDiscount(id_discount);
      res.status(200).json({
        code: 1,
        message: "Thêm mã giảm giá thành công",
      });
    } else {
      res.status(200).json({
        code: -1,
        message: "Thiếu thông tin",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: -1, message: "Lỗi server" });
  }
};

export const handleUpdateDiscount = async (req, res) => {
  try {
    const discount = req.body;
    const result = await updateDiscount(discount);
    if (result) {
      res.status(200).json({
        code: 1,
        message: "Cập nhật mã giảm giá thành công",
      });
    } else {
      res.status(200).json({
        code: -1,
        message: "Thiếu thông tin",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleSearchDiscount = async (req, res) => {
  try {
    const allDiscount = await getDiscounts();
    const { search } = req.query;
    const value = String(search).toLowerCase();
    const resultSearch = allDiscount.filter((o) =>
      Object.entries(o).some((entry) =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
    if (resultSearch) {
      res
        .status(200)
        .json({ code: 1, message: "Tìm kiếm thành công", data: resultSearch });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: -1, message: "Lỗi server" });
  }
};
