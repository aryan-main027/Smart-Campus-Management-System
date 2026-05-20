import prisma from "../config/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req,res,next)=>{

  try{

    const rows = await prisma.user.findMany();
    
    res.status(200).json({
      success : true,
      message : "Data retreve",
      data : rows
    });

  }catch(error){

    next(error);

  }
  
}

export const getUserByID = async (req,res,next) => {

  const { id } = req.params;

  try{

    const rows = await prisma.user.findUnique({
      where : {
        id : Number(id)
      }
    })

    if(!rows){
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }

    res.status(200).json({
      success : true,
      message : `Data for id = ${id}`,
      data : rows
    })

  }catch(error){

    next(error);

  }
}

// Without Returning * postgreSQL return INSERT 0 1 which means 1 row affected but we donot want to show this as an output to user so we use this PostgreSQL feture which return the data of table that is inserted
// export const createUser = async(req,res) => {

//   try{
//     const {name,email,password,role} = req.body;

//     const hashPassword = await bcrypt.hash(password,10);

//     const rows = await prisma.user.create({
//       data : {
//         name,
//         email,
//         password : hashPassword,
//         role
//       }
//     })

//     res.status(201).json({
//       success : true,
//       message : "User Create successfully",
//       data : rows
//     })
//   }catch(err){
//     res.status(500).json({
//       success : false,
//       message : "Unable to create user"
//     })
//   }
// }

export const updateUser = async (req,res,next)=>{
  
  try{

    const { name , email , password , role } = req.body;
    const { id } = req.params;

    const userExists = await prisma.user.findUnique({
      where : {
        id : Number(id)
      }
    })

    if(!userExists){
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const rows = await prisma.user.update({
      where : {
        id : Number(id)
      },
      data : {
        name,
        email,
        password : hashPassword,
        role
      }
    });
  
    res.status(200).json({
      success : true,
      message : "User updated successfully",
      data : rows
    })

  }catch(error){

    next(error);

  }
}

export const deleteUser = async (req,res,next)=>{

  try{

    const { id } = req.params;

    const userExists = await prisma.user.findUnique({
      where : {
        id : Number(id)
      }
    })

    if(!userExists){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    const rows = await prisma.user.delete({
      where : {
        id : Number(id)
      }
    })
    
    res.status(200).json({
      success : true,
      message : "User deleted successfully",
      data : rows
    })
    
  }catch(error){

    next(error);

  }
}