# 🚀 User Management Backend API

A modern backend REST API built with
�

* ⚡ �Express.js
* 🐘 �PostgreSQL
* 🌐 �Node.js
* 🔀 �Modular Routing
* 🧠 �Controller Architecture

This project demonstrates complete CRUD operations with a clean and scalable backend structure.

---

# ✨ Features

✅ Create User
✅ Get All Users
✅ Get User By ID
✅ Update User
✅ Delete User
✅ PostgreSQL Integration
✅ REST API Architecture
✅ Modular Route Structure
✅ Controller Separation
✅ Error Handling
✅ Environment Variables Support

---

# 🛠️ Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Runtime Environment   |
| Express.js | Backend Framework     |
| PostgreSQL | Database              |
| pg         | PostgreSQL Driver     |
| dotenv     | Environment Variables |
| cors       | Cross-Origin Requests |

---

# 📁 Project Structure

```bash
backend/
│
├── server.js
│
├── db/
│   └── db.js
│
├── routes/
│   └── userRoutes.js
│
├── controllers/
│   └── userControllers.js
│
├── .env
├── package.json
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
cd backend
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_password
DB_PORT=5432
```

---

# 🐘 PostgreSQL Table Setup

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

# ▶️ Run Server

```bash
npm run dev
```

or

```bash
node server.js
```

---

# 📡 API Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | `/users`     | Create User     |
| GET    | `/users`     | Get All Users   |
| GET    | `/users/:id` | Get Single User |
| PUT    | `/users/:id` | Update User     |
| DELETE | `/users/:id` | Delete User     |

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

# 📚 Concepts Learned

* REST APIs
* CRUD Operations
* Express Routing
* Route Parameters
* PostgreSQL Queries
* Modular Backend Structure
* Controller Architecture
* Error Handling
* Environment Variables
* HTTP Status Codes

---

# 🚧 Future Improvements

* 🔐 JWT Authentication
* 🔑 Password Hashing using bcrypt
* ✅ Input Validation
* 🛡️ Middleware-based Error Handling
* 📦 MVC Architecture
* 🧪 Unit Testing
* 📘 Swagger Documentation
* ☁️ Deployment

---

# 👨‍💻 Author

Built with ❤️ by Aryan Shashwat

---

# ⭐ If You Like This Project

Give this repository a star ⭐ and keep building amazing backend projects 🚀
