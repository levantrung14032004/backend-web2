import {
  handleGetAllProducts,
  handleSearchProducts,
  handleDeleteProduct,
  handleSortTitle,
  handleSortLowToHigh,
  handleSortHighToLow,
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
import { authenticateToken } from "../middleware/JWT_action.js";
import express from "express";
import route from "./web.js";
const routeAPI = express.Router();

// routeAPI.use(authenticateToken);
// Product
routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);
routeAPI.put("/product", handleDeleteProduct);

//Product.Filter
routeAPI.get("/product/filter/low_to_high", handleSortLowToHigh);
routeAPI.get("/product/filter/high_to_low", handleSortHighToLow);
routeAPI.get("/product/filter/title", handleSortTitle);

// User
routeAPI.post("/user/orders", handleGetAllOrder);
routeAPI.get("/user/info", handleGetInfoById);
routeAPI.put("/user/info", handleEditInfoById);
routeAPI.post("/user/add_order", handleAddOrder);

// Goods
routeAPI.post("/create-received", handleCreateReceived);

// Company
routeAPI.get("/company", handleGetCompany);
routeAPI.post("/company", handleInsertCompany);
routeAPI.put("/company", handleDeleteCompany);

export default routeAPI;
