import User from "../models/User.js";


// create a user
export const createUser =  async (req, res) => {
  const newUser = new User(req.body);
  try{
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  }catch(err){
    res.json({error: err});
  };
};

// get all user
export const getAllUsers =  async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json(users);
  }catch(err){
    res.json({ error: err });
  }
};

// get a user by id
export const getUser =  async (req, res) => {
  try{
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  }catch(err){
    res.json({ error: err });
  }
};

// update a user by id
export const updatedUser =  async (req, res) => {
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true
    });
    res.status(200).json(updatedUser);
  }catch(err){
    res.json({ error: err });
  }
};

// delete a user by id
export const deleteUser = async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json(deletedUser);
  }catch(err){
    res.json({ error: err });
  }
};
