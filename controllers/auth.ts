// auth controller

import User from '../model/User';
import { usernameChecker } from '../util/usernameChecker';
import { pwCheck } from '../util/pwChecker';
import CryptoJS from 'crypto-js';
import { fsLogger } from '../logger/index';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import Account from '../model/Account';

export const register = async (req: Request, res: Response) => {
    const {
        username,
        email,
        password,
        avatar,
        firstName,
        lastName,
        middleName,
    } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
        fsLogger(req, res);

        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: `Please fill all required fields: ${
                !username ? 'username' : ''
            } ${!email ? 'email' : ''}  ${!password ? 'password' : ''} ${
                !firstName ? 'firstName' : ''
            } ${!lastName ? 'lastName' : ''}`,
        });
    }

    const emailExist = await User.findOne({ email }).exec();
    if (emailExist) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Email is taken',
        });
    }

    const usernameExist = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (usernameExist) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Username is taken',
        });
    }
    // validation
    const { error: usernameErr, message: usernameErrMsg } =
        usernameChecker(username);
    if (usernameErr) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: usernameErrMsg,
        });
    }
    const { error: pwErr, message: pwErrMsg } = pwCheck(password);
    if (pwErr) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: pwErrMsg,
        });
    }

    // register
    const reqUser = {
        username: username.toLowerCase(),
        password: CryptoJS.AES.encrypt(
            password,
            process.env.SECRET_KEY || ''
        ).toString(),
        email,
        avatar,
        firstName,
        lastName,
        middleName,
    };

    const newUser = new User(reqUser);

    try {
        await newUser.save();
    } catch (error) {
        fsLogger(req, res);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: error.message,
        });
    }
    fsLogger(req, res);
    // destructure password and ssn from newUser
    // eslint-disable-next-line no-unused-vars
    // ts ignore next line
    // @ts-ignore
    const { password: pw, ...user } = newUser._doc;

    console.log('user', user);

    try {
        const account = new Account({
            userId: user._id,
        });
        await account.save();
    } catch (error) {
        fsLogger(req, res);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: error.message,
        });
    }
    return res.status(201).json({
        ok: true,
        status: 201,
        data: user,
    });
};

// login

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Please fill all required fields',
        });
    }

    const user = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (!user) {
        fsLogger(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'User not found',
        });
    }

    const decryptedPw = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY || ''
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPw !== password) {
        fsLogger(req, res);
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Incorrect credentials',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.SECRET_KEY || '',
        { expiresIn: '1hr' }
    );

    //const { password: pw, ssn, ...userWithoutPw } = user._doc;
    fsLogger(req, res);
    // return res.status(200).json({
    //     ok: true,
    //     status: 200,
    //     data: userWithoutPw,
    // });
    // return res
    //     .writeHead(200, {
    //         'Set-Cookie': `token=${token}; HttpOnly;`,
    //         'Access-Control-Allow-Credentials': true,
    //     })
    //     .send();

    return res
        .cookie('token', token, { httpOnly: true })
        .header('cookie', token)
        .json({
            ok: true,
            status: 200,
        })
        .send();
};
