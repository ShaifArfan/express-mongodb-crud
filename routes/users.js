import express from "express";
import User from "../models/User.js";

const router = express.Router();

// create a user
router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.json({error: err});
  };
});

// get all user
router.get("/", async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }catch(err){
    res.json({ error: err });
  }
});

// get a user by id
router.get("/:userId", async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  }catch(err){
    res.json({ error: err });
  }
});

// update a user by id
router.patch("/:userId", async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    });
    res.status(200).json(updatedUser);
  }catch(err){
    res.json({ error: err });
  }
});

// delete a user by id
router.delete("/:userId", async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  }catch(err){
    res.json({ error: err });
  }
});

export default router;