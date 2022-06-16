import User from "../models/User.js";
import { createError } from "../utils/errors.js";


// create a user
export const createUser =  async (req, res, next) => {
  const newUser = new User(req.body);
  try{
    const savedUser = await newUser.save().select('firstName lastName email');
    res.status(201).json(savedUser);
  }catch(err){
    next(err);
  };
};

// get all user
export const getAllUsers =  async (req, res, next) => {
  try{
    const users = await User.find({}).select('firstName lastName email');
    res.status(200).json(users);
  }catch(err){
    next(err);
  }
};

// get own profile
export const getOwnProfile =  async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id ).select('firstName lastName email');
    res.status(200).json(user);
  }catch(err){
    next(err);
  }
};

// get a user by id
export const getUser =  async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId).select('firstName lastName email');
    res.status(200).json(user);
  }catch(err){
    next(err);
  }
};

// update a user by id
export const updatedUser =  async (req, res, next) => {
  try{
    if(req.params.userId !== req.user.id){
      return next(createError({message: 'You are not authorized to update this user', status: 403}));
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    }).select('firstName lastName email');
    res.status(200).json(updatedUser);
  }catch(err){
    next(err);
  }
};

// delete a user by id
export const deleteUser = async (req, res, next) => {
  try{
    if(req.params.userId !== req.user.id){
      return next(createError({message: 'You are not authorized to delete this user', status: 403}));
    }
    const deletedUser = await User.findByIdAndDelete(req.params.userId).select('firstName lastName email');
    res.status(200).json(deletedUser);
  }catch(err){
    next(err);
  }
};
