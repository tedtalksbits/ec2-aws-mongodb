import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import registerRoute from './routes/auth/register';
import loginRoute from './routes/auth/login';

import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { getAppConfig } from './config/appConfig';
import expressLayouts from 'express-ejs-layouts';
import { verifyAuth } from './controllers/view-controllers/verifyAuth';

import { ExtendedRequest } from './types/restResponse';

const app = express();
dotenv.config();
const appConfig = getAppConfig();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
// this is needed for cookie-session to work behind a proxy
app.set('trust proxy', 1);
app.use(
    cookieSession({
        name: 'session',
        secret: process.env.COOKIE_SECRET as string,
    })
);
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
app.use('/login', loginRoute);
app.get('/logout', (req, res) => {
    console.log('*********** /logout GET ************');
    console.log('session', req.session);
    console.log('*********** /logout GET destroying session ************');
    req.session = null;
    res.clearCookie('token');
    console.log('session', req.session);
    res.redirect('/login');
});
app.use('/register', registerRoute);

app.get('/dashboard', verifyAuth, (req: Request, res: Response) => {
    let data = {};
    if (!req.session) {
        return res.redirect('/login');
    }

    if (req.session.user) {
        data = req.session.user.data;

        console.log('data from session', data);
    }

    res.render('dashboard', {
        title: 'Dashboard',
        data,
        layout: './layouts/app',
    });
});

app.get('/profile', verifyAuth, (req: Request, res: Response) => {
    let data = {};
    if (!req.session) {
        return res.redirect('/login');
    }
    if (req.session.user) {
        data = req.session.user.data;
    }
    res.render('profile', {
        title: 'Profile',
        data,
        layout: './layouts/app',
    });
});
app.use('', accountRoutes);

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
    console.log('*********** ERROR HANDLER ************');
    console.log(err);
    console.log('*********** ERROR HANDLER ************');
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
