import express from "express";
import "dotenv/config";
import router from "./src/routes/web.js";
import routerAPI from "./src/routes/api.js";
import cors from "cors";
var app = express();
var port = process.env.SERVER_PORT || 3006;

app.use("/static", express.static("public"));
app.use(express.json()); // for json
app.use(cors()); // for cors
app.use(express.urlencoded({ extended: true }));
app.use("/", router);
app.use("/api", routerAPI);

// simple query

app.listen(port);
