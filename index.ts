import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import mongoose from 'mongoose';
import { getAppConfig } from './config/appConfig';
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import { verifyAuth } from './controllers/view-controllers/verifyAuth';

const app = express();
dotenv.config();
const appConfig = getAppConfig();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// API ROUTES
app.use('/api/v1', authRoutes);
app.use('/api/v1', accountRoutes);

// CONFIGURE EJS TEMPLATE ENGINE && LAYOUTS
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', './views');

// STATIC FILES
app.use(express.static('public'));

// APP ROUTES
app.get('/', (_req, res) => {
    res.render('index', { title: 'Home' });
});
app.get('/about', (_req, res) => {
    res.render('about', { title: 'About' });
});
app.get('/contact', (_req, res) => {
    res.render('contact', { title: 'Contact' });
});
app.get('/login', (_req, res) => {
    res.render('auth/login', { title: 'Login' });
});

app.get('/register', (_req, res) => {
    res.render('auth/register', { title: 'Register' });
});

// PROTECTED ROUTES
app.get('/dashboard', verifyAuth, (_req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});
// PROTECTED ROUTES

/*
    ========================================
    Error Handling
    ========================================
*/
// 404 PAGE
app.use((_req, res) => {
    res.status(404).render('404', { title: '404' });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    if (err.message.includes('Failed to lookup view')) {
        console.log(err);
        return res.status(404).render('404', { title: '404' });
    }
    return res.status(500).render('500', { title: '500' });
});

// CONNECT TO DATABASE
mongoose.connect(appConfig.dbUri || '', (err) => {
    if (err) {
        console.log(err);
    }
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
