import {
  handleGetAllProducts,
  handleSearchProducts,
  handleDeleteProduct,
  handleSortTitle,
  handleSortLowToHigh,
  handleSortHighToLow,
  handleGetProductWithCategory,
} from "../controllers/product.js";

import {
  handleGetAllOrder,
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
} from "../controllers/user.js";

import {
  handleGetCompany,
  handleInsertCompany,
  handleDeleteCompany,
  handleCreateReceived,
} from "../controllers/company.js";

import { handleGetGoodsReceived } from "../controllers/delivery.js";

import { handleGetPermissions } from "../controllers/permission.js";

import { handleGetAuthors } from "../controllers/author.js";
import { authenticateToken } from "../middleware/JWT_action.js";
import * as userController from "../controllers/user.js";
import express from "express";
import * as products from "../controllers/product.js";
import * as category from "../controllers/category.js";
import route from "./web.js";
const routeAPI = express.Router();

// Permission
routeAPI.get("/permissions", handleGetPermissions);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);
routeAPI.put("/product", handleDeleteProduct); // route này phải để ở admin phải có xác thực mới được xóa sửa lại đi nha
routeAPI.get("/product/mainpage", products.get_products_at_home);
routeAPI.get("/product/detail", products.get_product_by_id);
routeAPI.get("/product/limit",products.getProductlimit);
routeAPI.get("/product/category", products.getProductByCategory);

//Category
routeAPI.get("/category", category.getAllCategory);
//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);
routeAPI.get("/product/filter/title", handleSortTitle);

routeAPI.use(authenticateToken);
// User
routeAPI.post("/user/orders", handleGetAllOrder);
routeAPI.get("/user/info", handleGetInfoById);
routeAPI.put("/user/info", handleEditInfoById);
routeAPI.post("/user/changePassword", userController.changePassword);

routeAPI.post("/user/add_order", handleAddOrder);

// Goods
routeAPI.post("/create-received", handleCreateReceived);
routeAPI.get("/received", handleGetGoodsReceived);

// Company
routeAPI.get("/company", handleGetCompany);
routeAPI.post("/company", handleInsertCompany);
routeAPI.put("/company", handleDeleteCompany);

// Authors

routeAPI.get("/author", handleGetAuthors);

export default routeAPI;
