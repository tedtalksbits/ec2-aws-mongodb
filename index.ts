import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import registerRoute from './routes/auth/register';
import mongoose from 'mongoose';
import { getAppConfig } from './config/appConfig';
import cors from 'cors';
import expressLayouts from 'express-ejs-layouts';
import { verifyAuth } from './controllers/view-controllers/verifyAuth';
import { userLogin } from './controllers/authLogin';

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
app.use('/login', async (req, res) => {
    let error = false;
    let errorMsg = '';
    let status = 0;
    let token = '';

    if (req.method === 'POST') {
        // handle login
        const username = req.body.username;
        const password = req.body.password;

        // check if user exists
        const response = await userLogin(username, password);

        token = response.token as string;
        error = response.error;
        errorMsg = response.errorMsg as string;
        status = response.status;

        if (!error && token) {
            res.cookie('token', token, { httpOnly: true });
            res.header('cookie', token);
            return res.redirect('/dashboard');
        }

        // if user exists, create a token and send it to the client
        // if user does not exist, send an error message
    }

    res.render('auth/login', { title: 'Login', error, errorMsg, status });
});

app.use('/register', registerRoute);

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
