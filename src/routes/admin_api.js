import {
  handleGetAllProducts,
  handleDeleteProduct,
  handleSortTitle,
  handleSortLowToHigh,
  handleSortHighToLow,
  handleGetProductWithCategory,
} from "../controllers/product.js";

import { handleCreateProductTemp } from "../controllers/tempProduct.js";

import {
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
  handleGetActionById,
  handleGetActionView,
  handleGetPermissions,
  handleGetRole,
  handleSetPermission,
} from "../controllers/permission.js";

import { handleGetAuthors, handleAddAuthor } from "../controllers/author.js";
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
  handleLogOut,
} from "../controllers/adminAuth.js";

import { verifyToken } from "../middleware/jwt_admin.js";
import { getActionById } from "../services/permission.js";
const routeAPI = express.Router();
// Auth
routeAPI.post("/auth/register", handleRegisterEmployee);
routeAPI.post("/auth/login", handleLoginEmployee);
routeAPI.post("/auth/logout", verifyToken, handleLogOut);

// Employee
routeAPI.get("/employee", verifyToken, handleGetEmployee);
routeAPI.post("/employee", verifyToken, handleCreateEmployee);
routeAPI.get("/employee-current", handleGetCurentEmployee);
routeAPI.put("/employee", verifyToken, handleDeleteEmployee);

// Permission
routeAPI.get("/permissions", verifyToken, handleGetPermissions);
routeAPI.get("/role", handleGetRole);
routeAPI.put("/role-change", verifyToken, handleSetPermission);
routeAPI.get("/role-by-id", verifyToken, handleGetActionById);
routeAPI.get("/action-view", verifyToken, handleGetActionView);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.put("/product", verifyToken, handleDeleteProduct);
routeAPI.post(
  "/product/add-product",
  verifyToken,
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
routeAPI.get("/user", verifyToken, handleGetAllUsers);
routeAPI.get("/user/info", verifyToken, handleGetInfoById);
routeAPI.put("/user/info", verifyToken, handleEditInfoById);

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
routeAPI.post("/author/add", upload.single("author"), handleAddAuthor);

// received
routeAPI.get("/received", handleGetGoodsReceived);

export default routeAPI;
