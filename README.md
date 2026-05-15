# 🚀 Smart Campus Management System

A modern full-stack Smart Campus Management System built with

- ⚛️ React
- ⚡ Express.js
- 🌐 Node.js
- 🐘 PostgreSQL

This project aims to digitize and simplify campus operations like virtual gate pass management, authentication, user handling, and administrative workflows using a scalable backend architecture.

---

# ✨ Features

## 🔐 Authentication & User Management

✅ User Login System  
✅ Role-Based Access  
✅ Create User  
✅ Get All Users  
✅ Get User By ID  
✅ Update User  
✅ Delete User  

---

## 🏗️ Backend Features

✅ REST API Architecture  
✅ PostgreSQL Integration  
✅ Modular Route Structure  
✅ Controller Separation  
✅ Environment Variables Support  
✅ Clean Folder Structure  
✅ JSON-based API Responses  

---

## 🎫 Smart Campus Features (Upcoming)

🚧 Virtual Gate Pass System  
🚧 Student Dashboard  
🚧 Faculty Dashboard  
🚧 Admin Panel  
🚧 Pass Approval/Rejection System  
🚧 QR Verification System  
🚧 Notification System  
🚧 Analytics Dashboard  

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Node.js | Runtime Environment |
| Express.js | Backend Framework |
| PostgreSQL | Database |
| pg | PostgreSQL Driver |
| dotenv | Environment Variables |
| cors | Cross-Origin Requests |
| axios | API Requests |

---

# 📁 Project Structure

```bash
Smart-Campus-Management-System/
│
├── backend/
│   │
│   ├── server.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── routes/
│   │   └── userRoutes.js
│   │
│   ├── controllers/
│   │   └── userControllers.js
│   │
│   ├── .env
│   └── package.json
│
├── frontend/
│   │
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

---

## 2️⃣ Navigate Into Project

```bash
cd Smart-Campus-Management-System
```

---

# 🔧 Backend Setup

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Create `.env` File

```env
PORT=3000

DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

---

## 🐘 PostgreSQL Table Setup

Run this SQL query inside PostgreSQL:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(50)
);
```

---

## ▶️ Run Backend Server

```bash
npm run dev
```

or

```bash
node server.js
```

---

# 🎨 Frontend Setup

## Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## ▶️ Run Frontend

```bash
npm run dev
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create User |
| GET | `/users` | Get All Users |
| GET | `/users/:id` | Get Single User |
| PUT | `/users/:id` | Update User |
| DELETE | `/users/:id` | Delete User |

---

# 📬 Sample Request Body

```json
{
  "name": "Aryan",
  "email": "aryan@gmail.com",
  "password": "123456",
  "role": "student"
}
```

---

# 🧠 Backend Architecture Flow

```text
Client Request
      ↓
server.js
      ↓
routes/
      ↓
controllers/
      ↓
PostgreSQL Database
      ↓
JSON Response
```

---

# 📚 Concepts Implemented

- REST APIs
- CRUD Operations
- Express Routing
- Route Parameters
- PostgreSQL Queries
- Modular Backend Structure
- Controller Architecture
- HTTP Status Codes
- Environment Variables
- API Testing
- Full-stack Communication

---

# 🚧 Future Improvements

- 🔐 JWT Authentication
- 🔑 Password Hashing using bcrypt
- ✅ Input Validation
- 🛡️ Middleware-based Error Handling
- 📦 MVC Architecture
- 🧪 Unit Testing
- 📘 Swagger Documentation
- ☁️ Deployment
- 📱 Responsive UI
- 🎫 QR-based Gate Pass System
- 🔔 Notification System
- 📊 Admin Dashboard

---

# 👨‍💻 Author

Built with ❤️ by Aryan Shashwat

---

# ⭐ If You Like This Project

Give this repository a star ⭐ and keep building amazing full-stack projects 🚀
