const express = require("express");
const {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
  clearCompletedTodos
} = require("../controllers/todosController");

const router = express.Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", addTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.post("/completed/:type", clearCompletedTodos);

module.exports = router;
