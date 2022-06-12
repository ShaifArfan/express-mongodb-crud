import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createError } from '../utils/errors.js';

export const login = async (req, res, next) => {
  try{
    const user = await User.findOne({
      email: req.body.email
    }).select('password email firstName lastName');
    if(!user){
      return next(createError({status: 404, message: "No User Found"}));
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordCorrect){
      return next(createError({status: 400, message: "Wrong Password"}));
    }

    const payload = {
      id: user._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});
    
    res.cookie('access_token', token, {
      httpOnly: true
    }).status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });

  }catch(err) {
    next(err);
  }
}

export const register = async (req, res, next) => {
  try{
    if(req.body.password){
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);
        
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword
      });
      
      await newUser.save();
      res.status(201).json('new user created');
    }else{
      return next(createError({message: 'Please Provide a password ', status: 403}));
    }
  }catch(err){
    next(err);
  }
}