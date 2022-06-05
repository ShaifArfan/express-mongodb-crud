import User from "../models/User.js";
import { createError } from "../utils/errors.js";
import { getUserData } from "../utils/getUserData.js";


// create a user
export const createUser =  async (req, res, next) => {
  const newUser = new User(req.body);
  try{
    const savedUser = await newUser.save();
    const userData = getUserData(savedUser);
    res.status(201).json(userData);
  }catch(err){
    next(err);
  };
};

// get all user
export const getAllUsers =  async (req, res, next) => {
  try{
    const users = await User.find({});
    const usersData = users.map(user => getUserData(user));
    res.status(200).json(usersData);
  }catch(err){
    next(err);
  }
};

// get own profile
export const getOwnProfile =  async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id );
    const userData = getUserData(user);
    res.status(200).json(userData);
  }catch(err){
    next(err);
  }
};

// get a user by id
export const getUser =  async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId);
    const userData = getUserData(user);
    res.status(200).json(userData);
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
    });
    const userData = getUserData(updatedUser);
    res.status(200).json(userData);
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
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    const userData = getUserData(deletedUser);
    res.status(200).json(userData);
  }catch(err){
    next(err);
  }
};
