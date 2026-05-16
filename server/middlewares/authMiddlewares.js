import jwt from "jsonwebtoken"

export const authMiddleware = async (req,res,next) => {
  try{

    // get token from cookies

    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({
        success: false,
        message: "Access denied. No token"
      });
    }

    // Verification 

    const decode = await jwt.verify(
      token,
      process.env.JWT_KEY,
    );

    // Attach user so that we can verify in next procces 

    req.user = decode;

    next();

  }catch(error){

    res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }
};
