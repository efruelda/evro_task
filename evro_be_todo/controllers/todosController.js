const Task = require("../models/todosModel");

// Fetch all tasks
exports.getTodos = async (req, res) => {
  try {
    const { type } = req.query; // Get the 'type' query parameter
    const tasks = await Task.getAllTasks(type); // Pass 'type' to the model
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// Fetch a single task by ID
exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.getTaskById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json(task);
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// Add a new task
exports.addTodo = async (req, res) => {
  try {
    const { description, type } = req.body;
    if (!description) return res.status(400).json({ error: "Description is required" });
    if (!type) return res.status(400).json({ error: "Type is required" });

    const newTask = await Task.addTask(description,type);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Failed to add task" });
  }
};

// Update task (mark as completed or update description)
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed, description } = req.body;

    const updatedTask = await Task.updateTask(id, completed, description);
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

// Delete a task
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.deleteTask(id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

// Delete completed task
exports.clearCompletedTodos = async (req, res) => {
  try {
    const { type } = req.params;
    const { completedTaskIds } = req.body; // Extract completedTaskIds from the body

    if (!Array.isArray(completedTaskIds)) {
      return res.status(400).json({ error: "completedTaskIds must be an array" });
    }

    await Task.clearCompletedTasks(type, completedTaskIds);
    res.json({ message: "Completed tasks cleared successfully" });
  } catch (error) {
    console.error("Error clearing completed tasks:", error);
    res.status(500).json({ error: "Failed to clear completed tasks" });
  }
};