import { Router } from "express"

import { registerUser , loginUser , logoutUser } from "../controllers/authControllers.js"

import { validateRegister , handlevalidateErrors } from "../middlewares/validationMiddlewares.js"

const router = Router();

// Register User 
router.post("/register" , validateRegister , handlevalidateErrors , registerUser);

// Login 
// Why use POST method for login even it not creating anything? reason=> Login caary sensitive data like email , password and in get request data travel in url like (GET /login?email=abc@gmail.com&password=123456) which is unsafe
router.post("/login",loginUser);

// Logout
// This API have lot of in future modification like access+refresh token concept , redis etc
router.post("/logout",logoutUser);

export default router;