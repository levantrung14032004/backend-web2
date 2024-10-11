import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
const client = await createClient({
  url: process.env.URL_REDIS,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

client.on("connect", () => console.log("::> Redis Client Connected"));
client.on("error", (err) => console.log("<:: Redis Client Error", err));

export default client;
