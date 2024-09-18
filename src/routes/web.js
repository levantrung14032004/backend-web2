import {
  handleHomepage,
  handController,
  handleCreateUser,
  handlePageCreateUser,
  handleUptadeUser,
  handleUptadePage,
  handleRemovePage,
  handleRemoveUser,
} from "../controllers/user.js";
import * as product from "../controllers/product.js";
import upload from "../middleware/multer.js";
import express from "express";
const route = express.Router();

//
route.get("/", handleHomepage);

route.get("/film", handController);

route.get("/create-user", handlePageCreateUser);

route.get("/update/:id", handleUptadePage);

route.get("/remove/:id", handleRemovePage);

route.post("/create-new-user", handleCreateUser);
route.post("/edit-user", handleUptadeUser);
route.post("/remove", handleRemoveUser);
route.get("/api/product", product.handleGetAllProducts);
route.post("/add-product", upload.array("product", 5), product.add_product);
export default route;
