import express from 'express';
import { ExtendedRequest } from '../../types/restResponse';
import { userLogin } from '../../controllers/authLogin';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.use('/', async (req: ExtendedRequest, res) => {
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

export default router;
