# User Registration and Login System

This is a simple Node.js project that allows users to register and log in.

## Features

- User registration with username, email and password
- User login with username and password
- Secure password storage using bcrypt
- Basic session handling or JWT-based authentication

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/) (MongoDB as the database)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:MandarParekh007/UserAuthProject.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=your_port_number
   DATABASE_URL=mongodb://localhost:27017/your-database-name
   JWT_SECRET=your_secret_key
   ```

4. Start the application:
   ```bash
   npm start
   ```

   The server will start at `http://localhost:<your_port_number>`.

## Endpoints

### 1. User Registration
**POST** `/api/v1/user`

**Request Body:**
```json
{
  "username": "XYZ",
  "email": "example@example.com",
  "password": "password123"
}
```


### 2. User Login
**POST** `/api/v1/login`

**Request Body:**
```json
{
  "username": "username",
  "password": "password123"
}
```

**Response:**
- `200 OK` on success (returns token)
- `401 Unauthorized` if credentials are invalid

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: Database (or any database of your choice)
- **bcrypt**: Password hashing
- **JWT**: Token-based authentication (optional)


