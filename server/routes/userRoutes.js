import { Router } from "express"
import {
  getUsers, 
  getUserByID, 
  createUser, 
  updateUser, 
  deleteUser} 
from "../controllers/userControllers.js"

const router = Router();

// GET /users
router.get("/",getUsers);

// GET users/:id
router.get("/:id" , getUserByID)

// POST users
router.post("/" , createUser)

// PUT users/;id
router.put("/:id" , updateUser)

// DELETE users/:id
router.delete("/:id" , deleteUser)

export default router;