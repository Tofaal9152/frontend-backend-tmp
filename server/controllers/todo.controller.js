import { Todo } from "../models/todo.model.js";
import { ResponseUtils } from "../utils/response.utils.js";

export const CreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return ResponseUtils(res, 400, false, "All fields are required");
    }
    const newTodo = await Todo.create({
      title,
      description,
    });
    return ResponseUtils(res, 201, true, "Todo created successfully", {
      id: newTodo._id,
      title: newTodo.title,
      description: newTodo.description,
    });
  } catch (error) {
    console.log("Error during creating todo:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
export const GetAllTodo = async (req, res) => {
  try {
    const todo = await Todo.find();
    if (!todo || todo.length === 0) {
      return ResponseUtils(res, 200, true, "No todos found", []);
    }
    return ResponseUtils(res, 200, true, "All todos found successfully", todo);
  } catch (error) {
    console.log("Error during find get all todo:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
export const UpdateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return ResponseUtils(res, 400, false, "Todo id is required");
    }
    const { title, description } = req.body;
    if (!title && !description) {
      return ResponseUtils(
        res,
        400,
        false,
        "At least one field (title or description) is required"
      );
    }
    const updateTodo = await Todo.findByIdAndUpdate(
      todoId,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!updateTodo) {
      return ResponseUtils(res, 404, false, "Todo not found");
    }
    return ResponseUtils(
      res,
      200,
      true,
      "Todo updated successfully",
      updateTodo
    );
  } catch (error) {
    console.log("Error during Updating todo:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
export const DeleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      return ResponseUtils(res, 400, false, "Todo id is required");
    }
    const deleteTodo = await Todo.findByIdAndDelete(todoId);
    if (!deleteTodo) {
      return ResponseUtils(res, 404, false, "Todo not found");
    }
    return ResponseUtils(res, 200, true, "Todo deleted successfully");
  } catch (error) {
    console.log("Error during find get all todo:", error);
    return ResponseUtils(res, 500, false, "Internal Server Error");
  }
};
