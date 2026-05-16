import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db/db.js"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"
import errorMiddleware from "./middlewares/errorMiddlewares.js"

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorMiddleware);

app.use("/users",userRoutes)
app.use("/auth",authRoutes);

// Test DB Connection 
app.get("/test-db", async (req, res) => {
  
  try {
    
    const result = await pool.query("SELECT NOW()");
    
    res.status(200).json({
      success: true,
      message: "Database Connected Successfully",
      data: result.rows[0]
    });

  } catch (err) {

    console.log(`Error - ${err}`);

    res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
});


// PORT
const PORT = process.env.PORT || 3000;

// Server starts immediately
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

// Separate DB connection test
pool.connect()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database connection failed");
    console.log(err);
  });
