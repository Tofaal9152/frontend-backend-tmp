import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.route.js";
import todoRouter from "./routes/todo.route.js";
import cookieParser from "cookie-parser";

export const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);
