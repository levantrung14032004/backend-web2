import express from "express";
import "dotenv/config";
import router from "./routes/web.js";
import routerAPI from "./routes/api.js";
import routerAdmin from "./routes/admin_api.js";
import routerAuth from "./routes/auth.js";
import cors from "cors";
import session from "express-session";
import create_secret_key from "./utils/create_secret_key.js";
import cookieParser from "cookie-parser";
var app = express();
var port = process.env.SERVER_PORT || 8080;
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
  })
);
app.use(
  session({
    secret: create_secret_key(),
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);
app.use("/static", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/", router);
app.use("/api/v2", routerAdmin);
app.use("/api", routerAPI);
app.use("/auth", routerAuth);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
