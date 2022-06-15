import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import privateRoutes from './routes/private.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/private', privateRoutes);

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("mongodb connected");
  }catch(err){
    console.log(err);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log("App is running at port "+ PORT);
})
