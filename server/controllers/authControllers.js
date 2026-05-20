import jwt from "jsonwebtoken"
import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"

export const registerUser = async (req,res,next)=>{
  try{

    const {name , email , password , role} = req.body;

    // Check if user already exists
    
    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(userExists){
      return res.status(400).json({
        success : false,
        message : "User already exists"
      });
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role
      }
    });

    res.status(201).json({
      success : true,
      message : "User Created",
      data : user
    })

  }catch(error){

    next(error);

  }
}

export const loginUser = async (req,res,next) => {

  try{

    const {email,password} = req.body;

    const userExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const user = userExists;

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