import connection from "../database/database.js";
import {
  getUsers,
  getAllOrder,
  getInfoById,
  changePassword,
  editInfo,
  addOrder,
} from "../services/getUsers.js";

const handleHomepage = async (req, res) => {
  let allUser = await getUsers();
  res.status(200).json(allUser);
};

const handController = (req, res) => {
  res.send("Hello ba con");
};

const handleCreateUser = (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const city = req.body.city;
  connection.query(
    `INSERT INTO Users(email, name, city) VALUES (?, ?, ?)`,
    [email, name, city],
    function (err, results) {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      console.log(results); // Nếu có dữ liệu, sẽ hiển thị thông tin chi tiết về số dòng bị ảnh hưởng
    }
  );
  res.redirect("/");
};

const handlePageCreateUser = (req, res) => {
  res.render("createUser.ejs");
};

const handleUptadeUser = (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const city = req.body.city;
  const id = req.body.userId;
  connection.query(
    `UPDATE Users 
  SET email = ?, name = ?, city = ?
  WHERE id = ?`,
    [email, name, city, id]
  );
  res.send("updated successfully");
};

const handleUptadePage = async (req, res) => {
  try {
    let allUser = await getUsers();
    let userSelected = allUser[parseInt(req.params.id) - 1];
    // res.render("editUser.ejs", { userSelected: userSelected });
    res.status(200).json(userSelected);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const handleRemovePage = async (req, res) => {
  let allUser = await getUsers();
  let idSelected = allUser.findIndex(
    (user) => user.id === parseInt(req.params.id)
  );

  let userSelected = allUser[idSelected];
  res.render("deleteUser.ejs", { userSelected: userSelected });
};

const handleRemoveUser = (req, res) => {
  const id = req.body.userId;
  connection.query(`DELETE FROM Users  WHERE id=?`, [id]);
  res.redirect("/");
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
  handleHomepage,
  handController,
  handleCreateUser,
  handlePageCreateUser,
  handleUptadeUser,
  handleUptadePage,
  handleRemovePage,
  handleRemoveUser,
  handleGetAllOrder,
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
};
