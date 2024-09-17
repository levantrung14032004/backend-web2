import {
  handleGetAllProducts,
  handleSearchProducts,
} from "../handleControl/handleControllerProduct.js";

import express from "express";
const routeAPI = express.Router();

routeAPI.get("/product", handleGetAllProducts);
routeAPI.get("/search", handleSearchProducts);

export default routeAPI;
