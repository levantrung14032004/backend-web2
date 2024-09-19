import {
  getUsers,
  getAllOrder,
  getInfoById,
  changePassword,
  editInfo,
  addOrder,
} from "../services/user.js";

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
    let user_id = req.body.user_id;
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
    let user_id = req.body.userId;
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
};
