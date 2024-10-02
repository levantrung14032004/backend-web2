import {
  handleGetAllProducts,
  handleSearchProducts,
  handleDeleteProduct,
  handleSortTitle,
  handleSortLowToHigh,
  handleSortHighToLow,
  handleGetProductWithCategory,
} from "../controllers/product.js";

import { handleCreateProductTemp } from "../controllers/tempProduct.js";

import {
  handleGetAllOrder,
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
  handleGetAllUsers,
} from "../controllers/user.js";

import {
  handleGetCompany,
  handleInsertCompany,
  handleDeleteCompany,
  handleCreateReceived,
} from "../controllers/company.js";

import { handleGetGoodsReceived } from "../controllers/received.js";

import { handleGetPermissions } from "../controllers/permission.js";

import { handleGetAuthors } from "../controllers/author.js";
import { authenticateToken } from "../middleware/JWT_action.js";
import * as userController from "../controllers/user.js";
import express from "express";
const routeAPI = express.Router();

// Permission
routeAPI.get("/permissions", handleGetPermissions);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);
routeAPI.put("/product", handleDeleteProduct);

//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);
routeAPI.get("/product/filter/title", handleSortTitle);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

// User
routeAPI.get("/user", handleGetAllUsers);
routeAPI.post("/user/orders", handleGetAllOrder);
routeAPI.get("/user/info", handleGetInfoById);
routeAPI.put("/user/info", handleEditInfoById);
routeAPI.post("/user/changePassword", userController.changePassword);

routeAPI.post("/user/add_order", handleAddOrder);

// Goods
routeAPI.post("/create-received", handleCreateReceived);

// Company
routeAPI.get("/company", handleGetCompany);
routeAPI.post("/company", handleInsertCompany);
routeAPI.put("/company", handleDeleteCompany);

// Authors

routeAPI.get("/author", handleGetAuthors);

// received
routeAPI.get("/received", handleGetGoodsReceived);
routeAPI.use(authenticateToken);

export default routeAPI;
