import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, updatedUser } from "../controllers/user.js";

const router = express.Router();

// create a user
router.post("/", createUser);

// get all user
router.get("/", getAllUsers);

// get a user by id
router.get("/:userId", getUser);

// update a user by id
router.patch("/:userId", updatedUser);

// delete a user by id
router.delete("/:userId", deleteUser);

export default router;