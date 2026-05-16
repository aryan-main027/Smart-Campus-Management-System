import jwt from "jsonwebtoken"
import pool from "../db/db.js"
import bcrypt from "bcrypt"

export const registerUser = async (req,res,next)=>{
  try{
    const {name , email , password , role} = req.body;

    // Check if user already exists
    
    const userExists = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,[email]
    )

    if(userExists.rows.length > 0 ){
      return res.status(400).json({
        success : false,
        message : "User already exists"
      });
    }


    const hashPassword = await bcrypt.hash(password,10);

    const { rows } = await pool.query(
      `
      INSERT INTO users(name, email, password, role)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,[name , email , hashPassword , role]
    ) 

    res.status(201).json({
      success : true,
      message : "User Created",
      data : rows[0]
    })
  }catch(error){

    next(error);

  }
}

export const loginUser = async (req,res,next) => {

  try{
    const {email,password} = req.body;

    const userExists = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email]
    );

    if (userExists.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const user = userExists.rows[0];

    // Compare password

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if(!isMatch){
      return res.status(401).json({
        success : false,
        message : "Invalid Credentials"
      })
    };

    // Generate jwt token
    
    const token = jwt.sign(
      {
        id : user.id,
        role : user.role
      },
      process.env.JWT_KEY,
      {
        expiresIn : "1d"
      }
    )
    res
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful"
    });


  }catch(error){

    next(error);

  }
}

export const logoutUser = async (req,res,next) => {

  try{

    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict"
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
    
  }catch(error){

    next(error);

  }
}