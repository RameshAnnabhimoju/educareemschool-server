import express from "express";
import homeRouter from "./src/routes/home.router.js";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
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
const PORT = 8080;

// app.get("/", (request, response, next) => {
//   response.status(400).send("Welcome to educare em school");
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/home", homeRouter);
