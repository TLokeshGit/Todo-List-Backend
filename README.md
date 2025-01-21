# Todo App Backend

This is the backend part of the Todo App, built with Express.js and Prisma.

## Features

- Create, read, update, and delete tasks
- Connects to a MySQL database using Prisma

## Prerequisites

- Node.js (v14 or higher)
- npm
- MySQL

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/Todo-List-Backend.git
   cd Todo-List-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   - Create a MySQL database
   - Create a `.env` file with the following content (replace user and password):
     ```
     DATABASE_URL="mysql://user:password@localhost:3306/todo_app"
     PORT=5001
     ```

4. **Initialize the database using Prisma:**

   - Generate Prisma client:
     ```bash
     npx prisma generate
     ```
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev --name init
     ```

5. **Start the server:**

   ```bash
   npm run dev
   ```

6. **The server will be running on:**

   ```
   http://localhost:5001
   ```

## API Endpoints

- **GET /tasks**: Fetch all tasks
- **GET /tasks/:id**: Fetch a single task by ID
- **POST /tasks**: Create a new task
- **PUT /tasks/:id**: Update a task
- **DELETE /tasks/:id**: Delete a task

## Project Structure

- `prisma/`: Contains Prisma schema and migrations
- `src/`: Contains the Express.js server code

## Available Scripts

- `npm run dev`: Runs the development server
- `npm run build`: Builds the application for production
- `npm start`: Runs the built application
