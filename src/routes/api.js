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
  handleGetAddressById,
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
import * as products from "../controllers/product.js";
import * as category from "../controllers/category.js";
import * as order from "../controllers/order.js";
import * as cart from "../controllers/cart.js";
const routeAPI = express.Router();

// Permission
routeAPI.get("/permissions", handleGetPermissions);

routeAPI.get("/product/filter/category", handleGetProductWithCategory);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);
// routeAPI.put("/product", handleDeleteProduct); // route này phải để ở admin phải có xác thực mới được xóa sửa lại đi nha
routeAPI.get("/product/mainpage", products.get_products_at_home);
routeAPI.get("/product/detail", products.get_product_by_id);
routeAPI.get("/product/limit", products.getProductlimit);
routeAPI.get("/product/category", products.getProductByCategory);
// Authors

routeAPI.get("/author", handleGetAuthors);
//Category
routeAPI.get("/category", category.getAllCategory);
//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);
routeAPI.get("/product/filter/title", handleSortTitle);

// Temporary Product
routeAPI.post("/creat-temp-product", handleCreateProductTemp);

routeAPI.use(authenticateToken);
//cart
routeAPI.get("/cart/getCart", cart.getCart);
routeAPI.post("/cart/addToCart", cart.addToCart);
routeAPI.post("/cart/removeFromCart", cart.removeFromCart);
// User
routeAPI.get("/user", handleGetAllUsers);
routeAPI.post("/user/orders", handleGetAllOrder);
routeAPI.get("/user/info", handleGetInfoById);
routeAPI.put("/user/info/edit", userController.changeInfo);
routeAPI.get("/user/order", order.getOrderByUser);
routeAPI.get("/user/address", handleGetAddressById);
routeAPI.put("/user/address/select", userController.handleSelectAddress);
routeAPI.post("/user/address/add", userController.handleAddAddress);
routeAPI.delete("/user/address/delete/:id_address", userController.handleDeleteAddress);
routeAPI.put("/user/address/edit", userController.handleEditAddress);
routeAPI.get("/user/coupon", userController.handleGetCouponUser);
routeAPI.post("/user/check-coupon", userController.handleCheckCoupon);

routeAPI.post("/user/add_order", handleAddOrder);

// Goods
routeAPI.post("/create-received", handleCreateReceived);

// Company
routeAPI.get("/company", handleGetCompany);
routeAPI.post("/company", handleInsertCompany);
routeAPI.put("/company", handleDeleteCompany);

// received
routeAPI.get("/received", handleGetGoodsReceived);

//order
routeAPI.post("/order", order.handleCreateOrder);

export default routeAPI;
