
import express from 'express' ;
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes.js'
import taskRoutes from './routes/task.route.js'

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();

app.use(express.json());
app.use(cookieParser());



app.use('/api/user',userRoutes)
app.use('/api/task',taskRoutes)

app.listen(3000,()=>{
    console.log(`server running fine`)
})


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });