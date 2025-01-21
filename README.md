# Todo App Backend

This is the backend part of the Todo App, built with Express.js and Prisma.

## Features

- Create, read, update, and delete tasks
- Connects to a MySQL database using Prisma

## Prerequisites

- Node.js (v14 or higher)
- npm
- MySQL

## Database Setup

Before running Prisma migrations, ensure that you have a MySQL database set up. Follow the steps below to create and configure your database.

### 1. Install MySQL

If you haven't installed MySQL yet, you can install it using Homebrew on macOS:

```bash
brew install mysql
brew services start mysql
```

### 2. Secure MySQL Installation

Run the secure installation script to set up your root password and secure your MySQL server:

```bash
mysql_secure_installation
```

Follow the prompts to set a strong root password and configure security settings.

### 3. Create the Database

Log into the MySQL shell and create the `todoapp` database:

```bash
mysql -u root -p
```

Enter your root password when prompted.

```sql
CREATE DATABASE todoapp;
EXIT;
```

### 4. Configure Environment Variables

Ensure your `.env` file has the correct `DATABASE_URL` with URL-encoded special characters:

```plaintext
DATABASE_URL="mysql://root:your_password3@localhost:3306/todoapp"
PORT=5001
```

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/TLokeshGit/Todo-List-Backend.git
   cd Todo-List-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run Prisma Migrations:**

   After setting up the database, run the following commands to generate and apply Prisma migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start the server:**

   ```bash
   npm run dev
   ```

5. **The server will be running on:**

   ```
   http://localhost:5001
   ```

## Verify the Setup

1. **Check the Database:**

   Log into MySQL and verify that the `Task` table has been created:

   ```bash
   mysql -u root -p
   ```

   ```sql
   USE todoapp;
   SHOW TABLES;
   DESCRIBE Task;
   EXIT;
   ```

2. **Start the Backend Server:**

   ```bash
   npm run dev
   ```

   The server should be running on `http://localhost:5001`.

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
