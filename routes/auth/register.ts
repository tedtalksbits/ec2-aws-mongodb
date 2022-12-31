import express, { Response, Request } from 'express';
import { userRegister } from '../../controllers/authRegister';

const router = express.Router();

router.use('/', async (req: Request, res: Response) => {
    console.log('*********** /register ************');
    let error = false;
    let errorMsg = '';
    let data;
    let state;
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        middleName,
        avatar,
    } = req.body;

    console.log('*********** /register ************');
    console.log('req.body', req.body);
    console.log('*********** /register ************');

    if (req.method === 'POST') {
        console.log('*********** /register POST ************');
        const response = await userRegister(
            username,
            email,
            password,
            firstName,
            lastName,
            middleName,
            avatar
        );

        console.log('response', response);

        error = response.error;
        errorMsg = response.errorMsg as string;

        if (response.data) {
            data = response.data;
        }

        if (!error) {
            // clear session if registration is successful
            console.log('*********** /register POST ************');
            console.log('response', response);
            console.log('*********** /register POST ************');
            // req.session = null;
            res.clearCookie('token');
            console.log('session', req.session);
            // save local variable to session

            req.session = {
                user: {
                    data: {
                        _id: '',
                        username: '',
                        email: '',
                        firstName: '',
                        lastName: '',
                        middleName: '',
                        avatar: '',
                    },
                },
                state: {
                    setShowAlert: true,
                    alertMsg: 'Registration successful',
                    isAlertError: false,
                },
                token: '',
            };
            return res.redirect('/login');
        }

        req.session = {
            user: {
                data: {
                    _id: '',
                    username: username,
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    middleName: middleName,
                    avatar: avatar,
                },
            },
            state: {
                setShowAlert: true,
                alertMsg: errorMsg,
                isAlertError: true,
            },
            token: '',
        };

        return res.redirect('/register');
    }

    if (req.method === 'GET') {
        console.log('*********** /register GET ************');
        console.log('session', req.session);
        console.log('*********** /register GET ************');

        if (req.session?.state?.setShowAlert) {
            console.log('*********** /register GET ************');
            console.log('session', req.session);
            console.log(
                'there is a session state setShowAlert: ',
                req.session?.state?.setShowAlert
            );
            console.log('*********** /register GET ************');
            const { alertMsg, isAlertError, setShowAlert } = req.session.state;
            req.session.state = {
                setShowAlert: false,
                alertMsg: '',
                isAlertError: false,
            };

            return res.status(200).render('auth/register', {
                title: 'Register',
                data: req.session?.user?.data,
                layout: './layouts/app',
                showAlert: setShowAlert,
                alertMsg: alertMsg,
                isAlertError: isAlertError,
            });
        }

        return res.status(200).render('auth/register', {
            title: 'Register',
            data: {
                _id: '',
                username: '',
                email: '',
                firstName: '',
                lastName: '',
                middleName: '',
                avatar: '',
            },
            layout: './layouts/app',
            showAlert: false,
            alertMsg: '',
            isAlertError: false,
        });
    }
});

export default router;
