import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/users.js';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cookieParser())
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// error handling
app.use((err, req, res, next) => {
  const message = err.message || 'Internal server error';
  const status = err.status || 500;
  return res.status(status).json({
    status,
    message,
    stack: err.stack
  })
}) 



// connect to the database
const connectDB = async () => {
  try{
    mongoose.connect(process.env.DB_CONNECTION);
    // await mongoose.connection.dropDatabase();
    console.log('MongoDB connected');
  } catch(err) {
    console.error(err.message);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Example app listening on port ${PORT}`)
})
