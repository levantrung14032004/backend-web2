import {
  getUsers,
  getAllOrder,
  getInfoById,
  editInfo,
  addOrder,
} from "../services/user.js";
import * as userService from "../services/user.js";

const handleGetAllUsers = async (req, res) => {
  try {
    const result = await getUsers();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).json("Co loi getuser");
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error.message);
  }
};

const handleGetAllOrder = async (req, res) => {
  try {
    let user_id = req.body.user_id;
    const result = await getAllOrder(user_id);
    if (result != null) {
      res.status(200).json(result);
    } else {
      res.status(500).json("Nguoi dung khong ton tai");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const handleGetInfoById = async (req, res) => {
  try {
    let user_id = req.data.id;
    if (!user_id)
      return res.status(400).json({ error: 1, message: "Missing user_id" });
    const result = await getInfoById(user_id);
    if (result != null) {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};

const handleEditInfoById = async (req, res) => {
  try {
    let user_id = req.body.user_id;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let fullName = req.body.fullname;
    const result = await editInfo(firstName, lastName, fullName, user_id);
    if (result != null) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).error(error);
  }
};

const handleAddOrder = async (req, res) => {
  try {
    let user_id = req.data.id;
    let fullname = req.body.fullname;
    let phoneNumber = req.body.phoneNumber;
    let address = req.body.address;
    let email = req.body.email;
    let note = req.body.note;
    let shipFee = req.body.shipFee;
    let total = req.body.total;
    let employeeId = req.body.employeeId;
    let products = req.body.products;

    const result = await addOrder(
      user_id,
      fullname,
      phoneNumber,
      address,
      email,
      note,
      shipFee,
      total,
      employeeId,
      products
    );

    if (result) {
      res.status(200).json({
        status: true,
        message: "Đơn hàng đã được thêm thành công",
      });
    } else {
      res
        .status(500)
        .json({ status: false, message: "Đơn hàng thêm thất bại" });
    }
  } catch (error) {}
};

export {
  handleGetAllOrder,
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
  handleGetAllUsers,
};
export const changePassword = async (req, res) => {
  try {
    const new_password = req.body.new_password;
    const current_password = req.body.current_password;

    if (!new_password || !current_password)
      return res.status(400).json({
        error: 1,
        message: "missing information",
      });
    let rgPw = /^(?=.*[A-Z])(?=(?:.*\d){8,}).*$/;
    if (!rgPw.test(new_password)) {
      return res.status(400).json({
        error: 1,
        message:
          "Password must start with an uppercase letter and contain at least 8 digits.",
      });
    }
    const user_id = req.data.id;
    const response = await userService.changePassword(
      user_id,
      current_password,
      new_password
    );

    return res.status(response.error === 0 ? 200 : 401).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const handleGetAddressById = async (req, res) => {
  try {
    const id = req.data.id;
    const result = await userService.getAddressById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(501).json("Khong lay duoc dia chi cua user nay");
    }
  } catch (error) {
    console.log(error);
    res.status(402).error(error);
  }
};

export const handleAddAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const address = req.body.address;
    const setdefault = req.body.setdefault;
    const result = await userService.addAddress(id, address, setdefault);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(501).json("Khong them duoc dia chi");
    }
  } catch (error) {
    console.log(error);
    res.status(402).error(error);
  }
};

export const handleDeleteAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const address = req.body.address;
    const result = await userService.deleteAddress(id, address);
    if (result) {
      res.status(200).json("Xoa dia chi thanh cong");
    } else {
      res.status(501).json("Xoa dia chi that bai");
    }
  } catch (error) {
    console.log(error);
    res.status(402).error(error);
  }
};

export const handleGetCouponUser = async (req, res) => {
  try {
    const id = req.data.id;
    const result = await userService.getCouponUser(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(501).json("Khong lay duoc coupon");
    }
  } catch (error) {
    console.log(error);
    res.status(402).error(error);
  }
};
