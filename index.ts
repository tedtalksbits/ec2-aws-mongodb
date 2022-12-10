import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import mongoose from 'mongoose';
import { getAppConfig } from './config/appConfig';
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
console.log(process.env.MONGO_URI);
const appConfig = getAppConfig();
console.log(appConfig.dbUri);

mongoose.connect(appConfig.dbUri || '', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Connected to MongoDB');
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
