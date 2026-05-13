import express from "express";
import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import cors from "cors";
import pool from "./db/db.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
  res.send("Api connected");
})

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

// GET /users
app.get("/users",async (req,res)=>{

  try{
    const { rows } = await pool.query("SELECT * FROM users");
    
    res.status(200).json({
      success : true,
      message : "Data retreve",
      data : rows
    });

  }catch(err){
    res.status(500).json({
      success : false,
      message : "Data can't retreve",
    });
  }
  
})

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
