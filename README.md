
# Task Management Application

This is a simple task management API built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. The application allows users to register, log in, create tasks, and manage task limits. The API also supports role-based access control for different types of users.

## Features

- **User Authentication**: Register, log in, and password reset functionality with JWT tokens.
- **Task Management**: Create, fetch, and manage tasks with features such as filtering, sorting, and task limit enforcement.
- **Role-Based Authorization**: Users and admins can have different levels of access to certain resources.
- **Task Limit**: Users can create a maximum of 10 tasks, and attempts to exceed this limit will be blocked.
- **Data Validation**: Input validation for user registration and task creation.
- **Password Hashing**: Passwords are securely hashed using `bcrypt` before storing them in the database.

## Technology Stack

- **Node.js** for backend server
- **Express** for routing and middleware
- **MongoDB** for data storage
- **JWT (JSON Web Token)** for authentication
- **bcrypt** for password hashing
- **Mongoose** for MongoDB interaction
- **dotenv** for environment variable management
- **Helmet** for security headers

<div style="background-color: black; color: white; padding: 10px; font-family: monospace;">

<b>Project Structure:</b>

├── <b>.git</b>  
├── <b>config</b>  
│   └── <b>db.js</b>  
├── <b>controllers</b>  
│   ├── <b>auth.controller.js</b>  
│   ├── <b>resetPassword.controller.js</b>  
│   └── <b>task.controller.js</b>  
├── <b>middleware</b>  
│   ├── <b>auth_middle.js</b>  
│   └── <b>task_limit_middle.js</b>  
├── <b>models</b>  
│   ├── <b>model.reset.token.js</b>  
│   ├── <b>model.role.js</b>  
│   ├── <b>model.task.js</b>  
│   └── <b>model.user.js</b>  
├── <b>node_modules</b>  
├── <b>routes</b>  
│   ├── <b>auth.route.js</b>  
│   └── <b>task.route.js</b>  
├── <b>tests</b>  
├── <b>utils</b>  
│   └── <b>emailService.js</b>  
├── <b>.env</b>  
├── <b>.gitignore</b>  
├── <b>server.js</b>  

</div>
