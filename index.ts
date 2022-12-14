import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import connectDB from './config/dbConfig';
import authRoutes from './routes/auth/auth';
import accountRoutes from './routes/account/account';
import registerRoute from './routes/auth/register';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { getAppConfig } from './config/appConfig';
import expressLayouts from 'express-ejs-layouts';
import { verifyAuth } from './controllers/view-controllers/verifyAuth';
import { userLogin } from './controllers/authLogin';
import jwt from 'jsonwebtoken';
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
app.use('/login', async (req: ExtendedRequest, res) => {
    const shouldShowAlert = req.session?.state?.setShowAlert;
    let error = false;
    let errorMsg = '';
    let status = 0;
    let token = '';
    let data = {};
    let showAlert = false;

    if (req.session?.user) {
        data = req.session.user.data;
        error = req.session.user.error;
        errorMsg = req.session.user.errorMsg;
        status = req.session.user.status;
        console.log('*********** session found ************');
        console.log('session data', data);
        console.log('session error', error);
        console.log('session errorMsg', errorMsg);
        console.log('session status', status);
        console.log('*********** session found ************');
    } else {
        console.log('*********** no session found ************');
        console.log('session data', data);
        // destroy session
        req.session = null;
        console.log('*********** no session found ************');
    }

    if (req.method === 'POST') {
        console.log('*********** /login POST ************');
        // handle login
        const username = req.body.username;
        const password = req.body.password;

        // check if user exists
        const response = await userLogin(username, password);

        token = response.token as string;
        error = response.error;
        errorMsg = response.errorMsg as string;
        status = response.status;
        data = response.data;

        console.log('data from userLogin controller', data);

        console.log('*********** /login POST ************');

        if (!error && token) {
            console.log('No error from controller, setting session data');
            req.session = {
                user: {
                    data,
                    error,
                    errorMsg,
                    status,
                },
            };
            console.log('session', req.session);
            console.log(
                '*********** /login POST setting token, then redirect to /dashboard ************'
            );
            res.cookie('token', token, { httpOnly: true });
            res.header('cookie', token);
            return res.redirect('/dashboard');
        } else {
            console.log(
                '*********** /login POST destroying session, userLogin failed ************'
            );
            req.session = null;
        }
    }

    console.log('*********** /login GET ************');
    console.log('session data', data);
    console.log('session error', error);
    console.log('session errorMsg', errorMsg);
    console.log('session status', status);

    if (req.cookies.token) {
        // verify token
        jwt.verify(
            req.cookies.token,
            process.env.SECRET_KEY as string,
            (err: any, _decoded: any) => {
                if (err) {
                    console.log('error, bad token while /login GET');
                    console.log(
                        '*********** /login GET destroying session, bad token ************'
                    );
                    req.session = null;
                    return res.render('auth/login', {
                        title: 'Login',
                        error,
                        errorMsg,
                        status,
                        data,
                        showAlert,
                    });
                }
                console.log('token verified while /login GET');
                return res.redirect('/dashboard');
            }
        );
    } else {
        if (shouldShowAlert) {
            console.log(
                '*********** /login GET rendering auth/login with alert ************'
            );
            console.log('session data', data);
            console.log('session error', error);
            console.log('session errorMsg', errorMsg);
            console.log('session status', status);
            req.session.state = {
                setShowAlert: false,
            };
            return res.render('auth/login', {
                title: 'Login',
                error: false,
                errorMsg: '',
                status: 0,
                data: {},
                showAlert: true,
            });
        }

        console.log('*********** /login GET rendering auth/login ************');
        console.log('session data', data);
        console.log('session error', error);
        console.log('session errorMsg', errorMsg);
        console.log('session status', status);

        res.render('auth/login', {
            title: 'Login',
            error,
            errorMsg,
            status,
            data,
            showAlert,
        });
    }
});
app.get('/logout', (req, res) => {
    console.log('*********** /logout GET ************');
    console.log('session', req.session);
    console.log('*********** /logout GET destroying session ************');
    req.session = null;
    res.clearCookie('token');
    res.redirect('/login');
});
app.use('/register', registerRoute);
// PROTECTED ROUTES
app.get('/dashboard', verifyAuth, (req: ExtendedRequest, res) => {
    let data = {};

    if (req.session.user) {
        data = req.session.user.data;
    }

    res.render('dashboard', { title: 'Dashboard', data });
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
