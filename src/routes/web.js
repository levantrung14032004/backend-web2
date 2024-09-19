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
import uploadIMG_control from "../controllers/uploadIMG.js";
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
route.post("/uploadIMG", upload.array("file"), uploadIMG_control);
export default route;
