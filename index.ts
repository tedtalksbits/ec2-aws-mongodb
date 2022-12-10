import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import mongoose from 'mongoose';
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookies middleware
app.use(cookieParser());

app.use('/api/v1', authRoutes);
app.use('/api/v1', accountRoutes);

// serve static page in public folder
app.use(express.static('public'));

// connect to db
// connectDB();
//  connect to localhost db name test
mongoose.connect(
    'mongodb+srv://bla6003:bla6003@cluster0.nb2va.mongodb.net/billify?retryWrites=true&w=majority',
    () => {
        console.log('Connected to MongoDB');
    }
);

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
