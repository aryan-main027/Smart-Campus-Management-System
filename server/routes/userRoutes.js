import { Router } from "express"
import { authMiddleware } from "../middlewares/authMiddlewares.js"
import { roleMiddleware } from "../middlewares/roleMiddlewares.js"
import {
  getUsers, 
  getUserByID,
  updateUser, 
  deleteUser} 
from "../controllers/userControllers.js"

const router = Router();

// GET /users
router.get("/",authMiddleware,getUsers);

// GET users/:id
router.get("/:id" ,authMiddleware, getUserByID)

// // POST users
// router.post("/" , createUser)

// PUT users/;id
router.put("/:id" ,authMiddleware, updateUser)

// DELETE users/:id
router.delete("/:id" ,authMiddleware, roleMiddleware("admin") , deleteUser)

export default router;