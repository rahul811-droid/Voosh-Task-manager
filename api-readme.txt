# Task Management Application

This is a full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). The application allows users to sign up, sign in, create, update, delete, and manage tasks within different columns, similar to Trello. User authentication and authorization are implemented using JWT and bcrypt.js.

## Features

- **User Authentication:**
  - User Signup
  - User Signin
  - User Signout
  - JWT-based authentication
  - Password hashing with bcrypt.js

- **Task Management:**
  - Create a new task
  - Update an existing task
  - Delete a task
  - Retrieve all tasks
  - Retrieve a single task

- **Error Handling:**
  - Custom error handler for managing and formatting error responses

## Installation

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud instance)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app


 ### .env file
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=<port-number-if-not-3000>

$#### run the server
npm run dev
npm start


####### API end points

    User Authentication :-

       post ---   `/api/user/signup`
       post ---   `/api/user/signin`
       post ---  `/api/user/signout`


#### Task management API 

http://localhost:3000/

create task --  post --             `/api/task/addtask`
delete task -- delete--              `/api/task/delete/:taskId/:userId/`
update task -- put--                  `/api/task/update/:taskId/:userId/`
retrive all task -- get --            `/api/task/getall/` 
retrive one task -- get --             `/api/task/getonetask:taskId/` 



