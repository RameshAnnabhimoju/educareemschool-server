import express from "express";
import homeRouter from "./src/routes/home.router.js";
import userRouter from "./src/routes/user.router.js";
import authRouter from "./src/routes/auth.router.js";
import publicRouter from "./src/routes/public.router.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import auth from "./src/middlewares/auth,js";
configDotenv();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB successfuly");
    app.listen(PORT, (error) => {
      if (!error) {
        return console.log("Server is running at PORT " + PORT);
      }
      console.log("Error occered while starting the server " + error);
    });
  })
  .catch((error) => {
    console.log("error connectiong to DB ", error);
  });
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/home", auth, homeRouter);
app.use("/user", auth, userRouter);
app.use("/public", publicRouter);
app.use("/auth", authRouter);
