import express from "express";
const route = express.Router();

route.get("/cron-job", (req, res) => {
  console.log("Cron job is running");
  return res.status(200).json({ message: "Cron job is running" });
});

export default route;
