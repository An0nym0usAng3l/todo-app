This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
1. npm install

2. npm run dev
# or
1. yarn install

2. yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the App.

API routes

```bash
# Fetching all tasks
GET - http://localhost:3000/api/tasks

# Creating a task
POST - http://localhost:3000/api/tasks
body: {
    title: "Sample title"
}

# Updating a task's status
PATCH - http://localhost:3000/api/tasks/:TASK_TITLE
body: {
    status: true
}

# Creating a Subtask
POST - http://localhost:3000/api/subtasks
body: {
    todo_id: "Parent Task Title",
    title: "Subtask Title"
}

# Updating a Subtask status
PATCH - http://localhost:3000/api/subtasks/:TASK_TITLE
body: {
    subtask_title: "Sample Subtask",
    status: true
}

```
