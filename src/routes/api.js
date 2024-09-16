import { handleGetAllProducts } from "../handleControl/handleControllerProduct.js";

import express from "express";
const routeAPI = express.Router();

routeAPI.get("/product", handleGetAllProducts);

export default routeAPI;
