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
import http from "http";
import { Server as SocketIOServer } from "socket.io";

var app = express();
var server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173"], // Thay đổi theo môi trường thực tế
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(cors({ credentials: true, origin: true }));
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

let users = [];

// Socket.io
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  socket.on("error", (err) => {
    console.error(`Socket error from ${socket.id}:`, err);
  });

  socket.on("userMessage", (message) => {
    try {
      console.log("Received message from user:", message);
      io.emit("userResponse", { id: socket.id, message, fromAdmin: false });
    } catch (err) {
      console.error("Error handling userMessage event:", err);
      socket.emit("error", "An error occurred while processing your message.");
    }
  });

  socket.on("admin_connected", () => {
    console.log("Admin connected", `Id ${socket.id}`);
  });

  socket.on("adminReply", (data) => {
    console.log("Received reply from admin:", data);

    io.to(data.id).emit("adminResponse", data);
  });

  socket.on("newUser", (data) => {
    users.find((user) => user.socketId === data.socketId)
      ? (users = users)
      : users.push(data);

    console.log(users);
    io.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    users = users.filter((user) => user.socketId !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

var port = process.env.SERVER_PORT || 8080;

app.use("/static", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use("/", router);
app.use("/api/v2", routerAdmin);
app.use("/api", routerAPI);
app.use("/auth", routerAuth);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
