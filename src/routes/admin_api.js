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

import {
  handleCreateEmployee,
  handleGetCurentEmployee,
  handleGetEmployee,
  handleDeleteEmployee,
} from "../controllers/employee.js";

import { handleGetGoodsReceived } from "../controllers/received.js";

import {
  handleGetPermissions,
  handleGetRole,
  handleSetPermission,
} from "../controllers/permission.js";

import { handleGetAuthors } from "../controllers/author.js";
import * as userController from "../controllers/user.js";
import express from "express";
import * as products from "../controllers/product.js";
import * as category from "../controllers/category.js";
import upload from "../middleware/multer.js";
import {
  handleGetDashDtoD,
  handleGetTopSelling,
  handleGetTotalWithDate,
} from "../controllers/order.js";
import {
  handleRegisterEmployee,
  handleLoginEmployee,
} from "../controllers/adminAuth.js";
const routeAPI = express.Router();
// Auth
routeAPI.post("/auth/register", handleRegisterEmployee);
routeAPI.post("/auth/login", handleLoginEmployee);

// Employee
routeAPI.get("/employee", handleGetEmployee);
routeAPI.post("/employee", handleCreateEmployee);
routeAPI.get("/employee-current", handleGetCurentEmployee);
routeAPI.put("/employee", handleDeleteEmployee);

// Permission
routeAPI.get("/permissions", handleGetPermissions);
routeAPI.get("/role", handleGetRole);
routeAPI.put("/role-change", handleSetPermission);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);
routeAPI.put("/product", handleDeleteProduct); // route này phải để ở admin phải có xác thực mới được xóa sửa lại đi nha
routeAPI.get("/product/mainpage", products.get_products_at_home);
routeAPI.get("/product/detail", products.get_product_by_id);
routeAPI.get("/product/limit", products.getProductlimit);
routeAPI.get("/product/category", products.getProductByCategory);
routeAPI.post(
  "/product/add-product",
  upload.array("product", 5),
  products.add_product
);

//Category
routeAPI.get("/category", category.getAllCategory);
// routeAPI.get("/category", category.getCategoryById);
routeAPI.get("/all-category", category.getAllCategory);
//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);
routeAPI.get("/product/filter/title", handleSortTitle);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

// User
routeAPI.get("/user", handleGetAllUsers);
routeAPI.post("/user/orders", handleGetAllOrder);
routeAPI.get("/user/info", handleGetInfoById);
routeAPI.put("/user/info", handleEditInfoById);
routeAPI.post("/user/changePassword", userController.changePassword);

routeAPI.post("/user/add_order", handleAddOrder);

// Admin Order
routeAPI.post("/order/totalDate", handleGetTotalWithDate);
routeAPI.get("/order/top-selling", handleGetTopSelling);
routeAPI.post("/order/date-to-date", handleGetDashDtoD);

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

export default routeAPI;
