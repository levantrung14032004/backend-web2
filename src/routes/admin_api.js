import {
  handleDeleteProduct,
  handleSortLowToHigh,
  handleSortHighToLow,
  handleGetProductWithCategory,
  handleGetAllProductsForAdmin,
} from "../controllers/product.js";

import { handleCreateProductTemp } from "../controllers/tempProduct.js";

import {
  handleGetInfoById,
  handleEditInfoById,
  handleAddOrder,
  handleGetAllUsers,
  handleChangeStatusUser,
  handleSearchUser,
} from "../controllers/user.js";

import {
  handleGetCompany,
  handleInsertCompany,
  handleDeleteCompany,
  handleCreateReceived,
  handelUpdateCompany,
  handleSearchCompany,
  handleGetCompanyRunning,
} from "../controllers/company.js";

import {
  handleGetCurentEmployee,
  handleGetEmployee,
  handleDeleteEmployee,
  handleEditEmployee,
  handleSearchEmployee,
} from "../controllers/employee.js";

import {
  handleGetDetailGoodsReceived,
  handleGetGoodsReceived,
  handleSearchReceived,
} from "../controllers/received.js";

import {
  handleGetActionView,
  handleGetAllPermission,
  handleGetCurrentAction,
  handleGetPermissions,
  handleGetRole,
  handleSetPermission,
} from "../controllers/permission.js";

import {
  handleGetAuthors,
  handleAddAuthor,
  handleUpdateAuthor,
  handleDeleteAuthor,
  handleSearchAuthor,
} from "../controllers/author.js";
import express from "express";
import * as products from "../controllers/product.js";
import * as category from "../controllers/category.js";
import upload from "../middleware/multer.js";
import {
  handleGetDashDtoD,
  handleGetOrderByAdmin,
  handleGetOrderByAdminWithStatus,
  handleGetOrderStatus,
  handleGetTopSelling,
  handleGetTotal1D,
  handleGetTotal3D,
  handleGetTotal7D,
  handleGetTotalWithDate,
  handleSearchOrder,
  handleUpdateOrderStatus,
} from "../controllers/order.js";
import {
  handleRegisterEmployee,
  handleLoginEmployee,
  handleLogOut,
} from "../controllers/adminAuth.js";

import { verifyToken } from "../middleware/jwt_admin.js";
import {
  handleDeleteDiscount,
  handleDropDiscount,
  handleGetAllUserWithAmount,
  handleGetDiscounts,
  handleGetUserAmountMinMax,
  handleInsertDiscount,
  handleSearchDiscount,
  handleUpdateDiscount,
} from "../controllers/discount.js";

import checkPermission from "../middleware/checkPermisson.js";
const routeAPI = express.Router();
// Auth
routeAPI.post("/auth/register", handleRegisterEmployee);
routeAPI.post("/auth/login", handleLoginEmployee);
routeAPI.post("/auth/logout", verifyToken, handleLogOut);

// Employee
routeAPI.get("/employee", verifyToken, handleGetEmployee);
routeAPI.get("/employee-current", verifyToken, handleGetCurentEmployee);
routeAPI.post("/edit-employee", verifyToken, handleEditEmployee);
routeAPI.put("/employee", verifyToken, handleDeleteEmployee);

// Permission
routeAPI.get("/role", handleGetRole);
routeAPI.get("/permissions", handleGetPermissions);
routeAPI.get("/all-permissions", handleGetAllPermission);
routeAPI.put("/role-change", verifyToken, handleSetPermission);
routeAPI.get("/action-view", verifyToken, handleGetActionView);
routeAPI.get("/current-action", verifyToken, handleGetCurrentAction);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get(
  "/product",
  verifyToken,
  checkPermission,
  handleGetAllProductsForAdmin
);
routeAPI.put("/product", verifyToken, checkPermission, handleDeleteProduct);
routeAPI.post(
  "/product/add-product",
  verifyToken,
  checkPermission,
  upload.array("product", 5),
  products.add_product
);
routeAPI.put(
  "/product/update-product",
  verifyToken,
  checkPermission,
  upload.array("product", 2),
  products.handleUpdateProduct
);

//Category
routeAPI.get("/category", category.handleGetAllCategory);
routeAPI.get("/all-category", category.handleGetAllCategory);
routeAPI.post("/category", verifyToken, category.handleInsertCategory);
routeAPI.put("/category/update", verifyToken, category.handleUpdateCategory);
routeAPI.put("/category/delete", verifyToken, category.handleDeleteCategory);
//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

// User
routeAPI.get("/user", verifyToken, handleGetAllUsers);
routeAPI.get("/user/info", verifyToken, handleGetInfoById);
routeAPI.put("/user/info", verifyToken, handleEditInfoById);
routeAPI.put("/user/change-status", verifyToken, handleChangeStatusUser);

routeAPI.post("/user/add_order", handleAddOrder);

// Admin Order
routeAPI.post("/order/totalDate", verifyToken, handleGetTotalWithDate);
routeAPI.get("/order/top-selling", verifyToken, handleGetTopSelling);
routeAPI.post("/order/date-to-date", verifyToken, handleGetDashDtoD);
routeAPI.get("/order/get-all-order-admin", verifyToken, handleGetOrderByAdmin);
routeAPI.get("/order/get-order-status", verifyToken, handleGetOrderStatus);
routeAPI.put(
  "/order/update-order-status",
  verifyToken,
  handleUpdateOrderStatus
);
routeAPI.post(
  "/order/get-order-by-status",
  verifyToken,
  handleGetOrderByAdminWithStatus
);
routeAPI.get("/order/get-total-1d", verifyToken, handleGetTotal1D);
routeAPI.get("/order/get-total-3d", verifyToken, handleGetTotal3D);
routeAPI.get("/order/get-total-7d", verifyToken, handleGetTotal7D);

// Goods
routeAPI.post("/create-received", verifyToken, handleCreateReceived);

// Company
routeAPI.get("/company", verifyToken, handleGetCompany);
routeAPI.get("/company-running", verifyToken, handleGetCompanyRunning);
routeAPI.post("/company", verifyToken, handleInsertCompany);
routeAPI.put("/company-update", verifyToken, handelUpdateCompany);
routeAPI.put("/company-delete", verifyToken, handleDeleteCompany);

// Authors

routeAPI.get("/author", verifyToken, handleGetAuthors);
routeAPI.post("/author/add", upload.single("author"), handleAddAuthor);
routeAPI.put("/author/update", upload.single("author"), handleUpdateAuthor);
routeAPI.put("/author/delete", verifyToken, handleDeleteAuthor);

// received
routeAPI.get("/received", handleGetGoodsReceived);
routeAPI.get("/received-detail", handleGetDetailGoodsReceived);

// Discount
routeAPI.get("/discount", handleGetDiscounts);
routeAPI.post("/discount", verifyToken, handleInsertDiscount);
routeAPI.put("/discount", verifyToken, handleUpdateDiscount);
routeAPI.get(
  "/discount-all-user-amount",
  verifyToken,
  handleGetAllUserWithAmount
);
routeAPI.post("/discount-max-min", verifyToken, handleGetUserAmountMinMax);
routeAPI.post("/drop-discount", verifyToken, handleDropDiscount);
routeAPI.put("/discount/delete", verifyToken, handleDeleteDiscount);

// Search
routeAPI.get("/discount-search", handleSearchDiscount);
routeAPI.get("/company-search", handleSearchCompany);
routeAPI.get("/category-search", category.handleSearchCategory);
routeAPI.get("/author-search", handleSearchAuthor);
routeAPI.get("/product-search", products.handleSearchProduct);
routeAPI.get("/user-search", handleSearchUser);
routeAPI.get("/employee-search", handleSearchEmployee);
routeAPI.get("/received-search", handleSearchReceived);
routeAPI.get("/order-search", handleSearchOrder);
export default routeAPI;
