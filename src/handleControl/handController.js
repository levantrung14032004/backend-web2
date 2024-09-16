import connection from "../database/database.js";
import { getUsers } from "../database/getUsers.js";
import getProducts from "../database/getProduct.js";

import express from "express";
const app = express();

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

// Products
const handleGetAllProducts = async (req, res) => {
  let allProducts = await getProducts();
  if (allProducts) {
    res.status(200).json(allProducts);
  } else {
    res.status(404).json("error");
  }
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
  handleGetAllProducts,
};
