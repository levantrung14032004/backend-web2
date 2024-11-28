import express from "express";
const route = express.Router();

route.get("/cron-job", () => {
  console.log("Cron job is running");
});

export default route;
