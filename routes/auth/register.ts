import express, { Request, Response } from 'express';

import { userRegister } from '../../controllers/authRegister';
import { ExtendedRequest } from '../../types/restResponse';

const router = express.Router();

router.use('/', async (req: ExtendedRequest, res: Response) => {
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

    if (req.method === 'POST') {
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
            req.session.user = {};
            // save local variable to session
            req.session.state = {
                setShowAlert: true,
            };

            return res.redirect('/login');
        }
    }

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
