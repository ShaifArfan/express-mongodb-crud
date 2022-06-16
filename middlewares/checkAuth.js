import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token){
    return res.status(401).json('No token found');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if(err){
      return res.status(403).json('Invalid Token');
    }
    req.user = {
      id: payload.id
    }
    next();
  })
}