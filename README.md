# Task Manager API

A RESTful CRUD (Create, Read, Update, Delete) application built with Node.js and Express.js for managing tasks and users. This application implements JWT-based authentication, file uploads, email notifications, and secure password hashing.

## Features

### Authentication & Security
- **JWT (JSON Web Token) Authentication**: Secure token-based authentication system
- **Password Hashing**: Passwords are hashed using bcrypt before storage
- **Multi-device Token Management**: Users can have multiple active tokens and logout from specific devices or all devices
- **Protected Routes**: Middleware-based route protection for authenticated endpoints

### User Management
- User registration and login
- User profile management (update name, email, password, age)
- User avatar upload with image processing (resize to 250x250px using Sharp)
- User avatar deletion
- User account deletion with automatic task cleanup
- Email notifications on user registration and account cancellation (via SendGrid)

### Task Management (CRUD Operations)
- **Create**: Create new tasks associated with authenticated users
- **Read**: 
  - Fetch all tasks for the authenticated user
  - Fetch a specific task by ID
  - Filter tasks by completion status
  - Sort tasks by various fields (ascending/descending)
  - Pagination support (limit and skip)
- **Update**: Update task description and completion status
- **Delete**: Delete tasks (only tasks owned by the authenticated user)

### Additional Features
- **File Upload**: Image upload functionality with Multer (supports JPG, JPEG, PNG)
- **Image Processing**: Automatic image resizing and optimization using Sharp
- **Email Integration**: SendGrid integration for welcome and cancellation emails
- **Data Validation**: Input validation using Validator.js
- **MongoDB Integration**: Mongoose ODM for database operations
- **Virtual Relationships**: User-Task relationship via Mongoose virtuals

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (jsonwebtoken)
- **Password Security**: bcrypt
- **File Upload**: Multer
- **Image Processing**: Sharp
- **Email Service**: SendGrid (@sendgrid/mail)
- **Validation**: Validator.js
- **Development**: Nodemon, env-cmd

## API Endpoints

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Register a new user | No |
| POST | `/users/login` | Login user and get JWT token | No |
| GET | `/users/me` | Get current user profile | Yes |
| PATCH | `/users/me` | Update user profile | Yes |
| DELETE | `/users/me` | Delete user account | Yes |
| GET | `/users/logout` | Logout from current device | Yes |
| GET | `/users/logoutAll` | Logout from all devices | Yes |
| POST | `/users/me/avatar` | Upload user avatar | Yes |
| DELETE | `/users/me/avatar` | Delete user avatar | Yes |
| GET | `/users/:id/avatar` | Get user avatar by ID | No |

### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create a new task | Yes |
| GET | `/tasks` | Get all tasks (with filtering, sorting, pagination) | Yes |
| GET | `/tasks/:id` | Get a specific task by ID | Yes |
| PATCH | `/tasks/:id` | Update a task | Yes |
| DELETE | `/tasks/:id` | Delete a task | Yes |

### Query Parameters for GET `/tasks`
- `completed`: Filter by completion status (`true` or `false`)
- `sortBy`: Sort field and direction (e.g., `createdAt:desc`, `completed:asc`)
- `limit`: Number of tasks to return
- `skip`: Number of tasks to skip (for pagination)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string)
- SendGrid API key (for email functionality)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `config/dev.env` and update with your values:
   ```env
   PORT=3000
   SENDGRID_API_KEY=your_sendgrid_api_key
   JWT_SECRET=your_jwt_secret_key
   MONGODB_URL=mongodb://127.0.0.1:27017/task-app-api
   ```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the application:
   - Development mode (with auto-reload):
   ```bash
   npm run dev
   ```
   - Production mode:
   ```bash
   npm start
   ```

The server will start on the port specified in your environment variables (default: 3000).

## Authentication

To access protected endpoints, include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

The token is returned when you:
- Register a new user (`POST /users`)
- Login (`POST /users/login`)

Tokens expire after 7 days.

## Data Models

### User Model
- `name` (String, required)
- `email` (String, required, unique, validated)
- `password` (String, required, min 7 characters, hashed)
- `age` (Number, default: 0)
- `tokens` (Array of token objects)
- `avatar` (Buffer - image data)
- `timestamps` (createdAt, updatedAt)

### Task Model
- `description` (String, required)
- `completed` (Boolean, default: false)
- `owner` (ObjectId, reference to User)
- `timestamps` (createdAt, updatedAt)

## Project Structure

```
task-manager/
├── config/
│   └── dev.env              # Environment variables
├── src/
│   ├── db/
│   │   ├── models/
│   │   │   ├── user.js      # User model
│   │   │   └── task.js      # Task model
│   │   └── mongoose.js      # MongoDB connection
│   ├── emails/
│   │   └── account.js       # Email service functions
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── routers/
│   │   ├── user.js          # User routes
│   │   └── task.js          # Task routes
│   └── index.js             # Application entry point
├── images/                  # Upload directory
├── playground/              # Development/testing files
├── package.json
└── README.md
```

## Security Features

- Passwords are never returned in API responses
- JWT tokens stored securely in database
- Input validation and sanitization
- File upload size limits (1MB)
- File type validation for uploads
- Automatic cleanup of related data on user deletion