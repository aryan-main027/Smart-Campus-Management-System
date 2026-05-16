import { body, validationResult } from "express-validator";

export const validateRegister = [

  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["admin", "student", "faculty"])
    .withMessage("Invalid role"),

];

export const handlevalidateErrors = (req,res,next) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()){
    return res.status(400).json({
      success : false,
      "errors": {
        "email": "Valid email is required",
        "password": "Password must be at least 6 characters"
      }
    })
  };

  next();


}