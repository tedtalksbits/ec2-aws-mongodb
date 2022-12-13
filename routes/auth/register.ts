import express from 'express';
import { userRegister } from '../../controllers/authRegister';

const router = express.Router();

router.use('/', async (req, res) => {
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
            return res.render('auth/login', { title: 'Login', data });
        }
    }

    // if theres an error, render the register page again with the error message and filds filled except for password

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
