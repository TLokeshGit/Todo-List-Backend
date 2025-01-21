import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

const app = express(); // Removed explicit type annotation
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// GET /tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks." });
  }
});

// POST /tasks
app.post("/tasks", async (req, res) => {
  try {
    const { title, color } = req.body;
    if (!title || !color) {
      return res.status(400).json({ error: "Title and color are required." });
    }
    const newTask = await prisma.task.create({
      data: { title, color, completed: false },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task." });
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    if (!title || !color || typeof completed !== "boolean") {
      return res.status(400).json({ error: "Invalid task data." });
    }
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error(`Error updating task with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to update task." });
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(`Error deleting task with id ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to delete task." });
  }
});

const PORT = process.env.PORT || 5001; // Updated default port to 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
