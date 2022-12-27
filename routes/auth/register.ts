import express, { Response } from 'express';

import { userRegister } from '../../controllers/authRegister';
import { ExtendedRequest } from '../../types/restResponse';

const router = express.Router();

router.use('/', async (req: ExtendedRequest, res: Response) => {
    console.log('*********** /register ************');
    let error = false;
    let errorMsg = '';
    let status = 0;
    let data = {};
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

        error = response.error;
        errorMsg = response.errorMsg as string;
        status = response.status;
        data = response.data;

        if (!error) {
            console.log('*********** /register POST ************');
            console.log('response', response);
            console.log('*********** /register POST ************');
            req.session = null;
            res.clearCookie('token');
            console.log('session', req.session);
            // save local variable to session
            req.session.state = {
                setShowAlert: true,
            };

            return res.redirect('/login');
        }
    }

    console.log('*********** /register ************');

    console.log('method', req.method);

    res.render('auth/register', {
        title: 'Register',
        error,
        errorMsg,
        status,
        username,
        email,
        firstName,
        lastName,
        middleName,
        avatar,
    });
});

export default router;
