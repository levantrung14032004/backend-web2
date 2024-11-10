import { getUsers, getInfoById, editInfo, addOrder } from "../services/user.js";
import * as userService from "../services/user.js";
import * as regex from "../utils/regex.js";
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
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).error({ error: 1, message: "Edit thong tin that bai" });
  }
};
export const changeInfo = async (req, res) => {
  try {
    let user_id = req.data.id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let fullName = req.body.fullName;
    let password = req.body.password;
    let newPassword = req.body.newPassword;
    let repeatPassword = req.body.repeatPassword;
    if (!firstName || !lastName || !fullName) {
      return res.status(400).json({
        error: 1,
        message: "First name, last name, display name là bắt buộc",
      });
    }
    let rgName =
      /^(?!\s*$)[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
    if (
      !rgName.test(fullName) ||
      !rgName.test(firstName) ||
      !rgName.test(lastName)
    ) {
      return res.status(400).json({
        error: 1,
        message:
          "First name, last name, display name không được có kí tự đặc biệt",
      });
    }
    if (password || newPassword || repeatPassword) {
      if (!password || !newPassword || !repeatPassword) {
        return res
          .status(400)
          .json({ error: 1, message: "Mật khẩu không được để trống" });
      }
      let rgPass = /^(?=.*[A-Z]).{8,}$/;
      if (!rgPass.test(newPassword)) {
        return res.status(400).json({
          error: 1,
          message:
            "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết hoa",
        });
      }
      if (newPassword !== repeatPassword) {
        return res
          .status(400)
          .json({ error: 1, message: "Mật khẩu không trùng khớp" });
      }
    }
    const result = await userService.changeInfo(
      user_id,
      firstName,
      lastName,
      fullName,
      password,
      newPassword
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: 1, message: "Cập nhật thông tin thất bại" });
  }
};
const handleAddOrder = async (req, res) => {
  try {
    const user_id = req.data.id;
    const {
      employeeId,
      fullname,
      phoneNumber,
      email,
      address,
      products,
      note,
      id_coupon,
      shipFee,
      total,
    } = req.body;
    if (
      !fullname ||
      !phoneNumber ||
      !email ||
      !address ||
      products.length === 0 ||
      shipFee === null ||
      total === null
    ) {
      return res.status(400).json({
        error: 1,
        message: "Thiếu thông tin",
      });
    }
    const result = await addOrder(
      user_id,
      fullname,
      phoneNumber,
      address,
      email,
      note,
      shipFee,
      id_coupon,
      total,
      employeeId,
      products
    );
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export {
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
  handleGetAllUsers,
};
export const changePassword = async (req, res) => {
  try {
    const new_password = req.body.new_password;
    const current_password = req.body.current_password;
    const repeat_password = req.body.repeat_password;

    if (!new_password || !current_password || !repeat_password)
      return res.status(400).json({
        error: 1,
        message: "missing information",
      });
    if (new_password !== repeat_password) {
      return res.status(400).json({
        error: 1,
        message: "Nhập lại mật khẩu không đúng",
      });
    }
    let rgPw = /^(?=.*[A-Z]).{8,}$/;
    if (!rgPw.test(new_password)) {
      return res.status(400).json({
        error: 1,
        message:
          "Mật khẩu phải có ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự viết hoa",
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
    return res.status(500).json({ error: 1, message: "Đổi mật khẩu thất bại" });
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
export const handleSelectAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const id_address = req.body.id_address;
    if (!id_address)
      return res.status(400).json({ error: 1, message: "Missing id_address" });
    const result = await userService.selectAddress(id, id_address);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).error(error);
  }
};
export const handleAddAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const {
      phone_number,
      email,
      firstName,
      lastName,
      province,
      district,
      ward,
      detail,
    } = req.body;
    if (
      !id ||
      !phone_number ||
      !email ||
      !firstName ||
      !lastName ||
      !province ||
      !district ||
      !ward ||
      !detail
    ) {
      return res.status(400).json({
        error: 1,
        message: "Missing information",
      });
    }
    const result = await userService.addAddress(
      id,
      phone_number,
      email,
      firstName,
      lastName,
      province,
      district,
      ward,
      detail
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};
export const handleEditAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const {
      id_address,
      phone_number,
      email,
      firstName,
      lastName,
      province,
      district,
      ward,
      detail,
    } = req.body;
    if (
      !id_address ||
      !phone_number ||
      !email ||
      !firstName ||
      !lastName ||
      !province ||
      !district ||
      !ward ||
      !detail
    ) {
      return res.status(400).json({
        error: 1,
        message: "Thiếu thông tin",
      });
    }
    if (!regex.rgPhone.test(phone_number)) {
      return res.status(400).json({
        error: 1,
        message: "Số điện thoại không hợp lệ",
      });
    }
    if (!regex.rgEmail.test(email)) {
      return res.status(400).json({
        error: 1,
        message: "Email không hợp lệ",
      });
    }
    if (!regex.rgName.test(firstName) || !regex.rgName.test(lastName)) {
      return res.status(400).json({
        error: 1,
        message: "Tên không hợp lệ",
      });
    }
    if (!regex.rgAddress.test(detail)) {
      return res.status(400).json({
        error: 1,
        message: "Địa chỉ không hợp lệ",
      });
    }
    const result = await userService.editAddress(
      id_address,
      id,
      phone_number,
      email,
      firstName,
      lastName,
      province,
      district,
      ward,
      detail
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};
export const handleDeleteAddress = async (req, res) => {
  try {
    const id = req.data.id;
    const id_address = req.params.id_address;
    if (!id || !id_address)
      return res.status(400).json({ error: 1, message: "Thiếu thông tin" });
    const response = await userService.deleteAddress(parseInt(id_address), id);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const handleGetCouponUser = async (req, res) => {
  try {
    const id = req.data.id;
    const result = await userService.getCouponUser(id);
    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(501).json("Khong lay duoc coupon");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).error(error);
  }
};

export const handleCheckCoupon = async (req, res) => {
  try {
    const id = req.data.id;
    const coupon = req.body.coupon;
    const value_apply = req.body.value_apply;
    if (!coupon || !value_apply)
      return res.status(400).json({ error: 1, message: "Thiếu thông tin" });
    const result = await userService.checkValidCoupon(id, coupon, value_apply);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};

export const handleChangeStatusUser = async (req, res) => {
  try {
    const id = req.body.id;
    const status = req.body.status;
    const result = await userService.changeStatusUser(id, status);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(501).json("Khong the thay doi trang thai");
    }
  } catch (error) {
    console.log(error);
    res.status(500).error(error);
  }
};
