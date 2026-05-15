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

// users/:id

app.get("/users/:id" , async (req,res) => {
  const { id } = req.params;

  try{
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE id = $1",[id]
    )

    if(rows.length === 0){
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }

    res.status(200).json({
      success : true,
      message : `Data for id = ${id}`,
      data : rows[0]
    })
  }catch(err){
    res.status(500).json({
      success : false,
      message : "Unable to retreive data"
    })
  }
})

// POST users
// Without Returning * postgreSQL return INSERT 0 1 which means 1 row affected but we donot want to show this as an output to user so we use this PostgreSQL feture which return the data of table that is inserted

app.post("/users" , async(req,res) => {

  try{
    const {name,email,password,role} = req.body;

    const { rows } = await pool.query(
      `
      INSERT INTO users(name,email,password,role) 
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,[name,email,password,role] 
    )

    res.status(201).json({
      success : true,
      message : "User Create successfully",
      data : rows[0]
    })
  }catch(err){
    res.status(500).json({
      success : false,
      message : "Unable to create user"
    })
  }
})

// PUT users/;id
app.put("/users/:id" , async (req,res)=>{
  
  try{
    const { name , email , password , role } = req.body;
    const { id } = req.params;

    const { rows } = await pool.query(
      `
      UPDATE users
      SET 
        name = $1,
        email = $2,
        password = $3,
        role = $4
      WHERE id = $5
      RETURNING * 
      `,[name,email,password,role,id]
    );
  
    if(rows.length == 0){
      res.status(404).json({
        success : false,
        message : "User not found"
      })
    }

    res.status(201).json({
      success : true,
      message : "User updated successfully",
      data : rows[0]
    })
  }catch(error){

    res.status(500).json({
      success : false,
      message : error.message
    })
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
