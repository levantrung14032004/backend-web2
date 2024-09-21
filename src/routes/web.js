import * as product from "../controllers/product.js";
import upload from "../middleware/multer.js";
import express from "express";
const route = express.Router();


route.get("/api/product", product.handleGetAllProducts);
route.post("/add-product", upload.array("product", 5), product.add_product);

export default route;
