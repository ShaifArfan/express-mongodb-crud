import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/users.js';
import mongoose from 'mongoose';


const app = express()
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// routes
app.use('/api/users', userRoutes);


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
