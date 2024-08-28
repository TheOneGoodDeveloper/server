import express from "express";
import connectDatabase from "./Model/db.js";
import userRoute from "./Routes/User_Route.js";
import adminRoute from "./Routes/Admin_Route.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", userRoute);

app.use("/admin", adminRoute);

connectDatabase();

app.listen(3000, () => {
  console.log(`server running successfully ${port}`);
});
