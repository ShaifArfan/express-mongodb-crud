import jwt from 'jsonwebtoken';
import { createError } from "./errors.js";

export const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token){
    return next(createError({status: 401, message: 'No Token Found'}));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err){
      return next(createError({status: 403, message: "Invalid Token"}));
    }
    req.user = user;
    next();
  })
}