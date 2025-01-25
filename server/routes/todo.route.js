import express from "express";
import {
  CreateTodo,
  DeleteTodo,
  GetAllTodo,
  UpdateTodo,
} from "../controllers/todo.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, CreateTodo).get(GetAllTodo);
router
  .route("/:todoId")
  .put(isAuthenticated, UpdateTodo)
  .delete(isAuthenticated, DeleteTodo);

export default router;
