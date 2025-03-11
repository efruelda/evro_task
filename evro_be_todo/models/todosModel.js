const pool = require("../config/db");

// Fetch all tasks
const getAllTasks = async (type) => {
  let query = "SELECT * FROM tasks";
  let params = [];

  if (type) {
    query += " WHERE type = ?";
    params.push(type);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

// Fetch task by ID
const getTaskById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  return rows.length ? rows[0] : null;
};

// Add a new task
const addTask = async (description,type) => {
  const [result] = await pool.query("INSERT INTO tasks (description, type) VALUES (?,?)", [description,type]);
  return { id: result.insertId, description, type, completed: false };
};

// Update a task (optional: update both description and completed status)
const updateTask = async (id, completed) => {
  const [result] = await pool.query(
    "UPDATE tasks SET completed = ? WHERE id = ?",
    [completed, id]
  );
  return result.affectedRows > 0 ? { id, completed } : null;
};

// Delete a task
const deleteTask = async (id) => {
  const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  return result.affectedRows > 0;
};

// Delete all completed data
const clearCompletedTasks = async (type, completedTaskIds) => {
  if (completedTaskIds.length === 0) return; // Nothing to delete

  const placeholders = completedTaskIds.map(() => "?").join(",");
  const query = `DELETE FROM tasks WHERE type = ? AND id IN (${placeholders})`;

  await pool.query(query, [type, ...completedTaskIds]);
};

module.exports = { getAllTasks, getTaskById, addTask, updateTask, deleteTask, clearCompletedTasks };
