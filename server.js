import express from "express";
import "dotenv/config";
import router from "./src/routes/web.js";
import cors from "cors";
var app = express();
var port = process.env.SERVER_PORT || 8080;

app.use("/static", express.static("public"));
app.use(express.json()); // for json
app.use(cors()); // for cors
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// simple query

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
