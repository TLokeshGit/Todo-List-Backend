import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Check if there are any tasks in the database on startup and reset auto-increment if needed
const checkAndResetAutoIncrement = async () => {
  try {
    const taskCount = await prisma.task.count();
    if (taskCount === 0) {
      console.log(
        "No tasks found in the database. Resetting auto-increment counter..."
      );
      await prisma.$executeRaw`ALTER TABLE Task AUTO_INCREMENT = 1`;
    }
  } catch (error) {
    console.error("Failed to check task count or reset auto-increment:", error);
  }
};

// Run the check and reset function on startup
checkAndResetAutoIncrement().catch((error) => {
  console.error("Error during database check and reset:", error);
});

// Get all tasks
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Fetch a single task by ID
app.get("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// Create a new task
app.post("/tasks", async (req: Request, res: Response) => {
  const { title, color } = req.body;
  try {
    const task = await prisma.task.create({
      data: { title, color },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, color, completed },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
