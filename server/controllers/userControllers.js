import pool from "../db/db.js"

export const getUsers = async (req,res,next)=>{

  try{
    const { rows } = await pool.query("SELECT * FROM users");
    
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
  }catch(error){

    next(error);

  }
}

// Without Returning * postgreSQL return INSERT 0 1 which means 1 row affected but we donot want to show this as an output to user so we use this PostgreSQL feture which return the data of table that is inserted
// export const createUser = async(req,res) => {

//   try{
//     const {name,email,password,role} = req.body;

//     const { rows } = await pool.query(
//       `
//       INSERT INTO users(name,email,password,role) 
//       VALUES($1,$2,$3,$4)
//       RETURNING *
//       `,[name,email,password,role] 
//     )

//     res.status(201).json({
//       success : true,
//       message : "User Create successfully",
//       data : rows[0]
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
      return res.status(404).json({
        success : false,
        message : "User not found"
      })
    }

    res.status(200).json({
      success : true,
      message : "User updated successfully",
      data : rows[0]
    })
  }catch(error){

    next(error);

  }
}

export const deleteUser = async (req,res,next)=>{
  try{

    const { id } = req.params;

    const { rows } = await pool.query(
      `
        DELETE FROM users
        WHERE id = $1
        RETURNING * 
      `,[id]
    )
    
    if(rows.length == 0){
      return res.status(404).json({
        success: false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success : true,
      message : "User deleted successfully",
      data : rows[0]
    })
    
  }catch(error){

    next(error);

  }
}