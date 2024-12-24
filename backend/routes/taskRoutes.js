const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Task routes with authentication middleware
router.post("/", authMiddleware, createTask); // Create task
router.get("/", authMiddleware, getTasks); // Get all tasks
router.put("/:id", authMiddleware, updateTask); // Update task
// router.put('/:id', authMiddleware, addSubTask); // Update task
router.delete("/:id", authMiddleware, deleteTask); // Delete task

module.exports = router;
