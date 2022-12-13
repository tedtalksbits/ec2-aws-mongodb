import User from '../model/User';
import { usernameChecker } from '../util/usernameChecker';
import { pwCheck } from '../util/pwChecker';
import CryptoJS from 'crypto-js';

import Account from '../model/Account';
import { RestResponse } from '../types/restResponse';

export const userRegister = async (
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName?: string,
    avatar?: string
): Promise<RestResponse> => {
    if (!username || !email || !password || !firstName || !lastName) {
        return {
            error: true,
            status: 400,
            errorMsg: `Please fill all required fields: ${
                !username ? 'username' : ''
            } ${!email ? 'email' : ''}  ${!password ? 'password' : ''} ${
                !firstName ? 'firstName' : ''
            } ${!lastName ? 'lastName' : ''}`,
        };
    }

    const emailExist = await User.findOne({ email }).exec();
    if (emailExist) {
        return {
            error: true,
            status: 400,
            errorMsg: 'Email is taken',
        };
    }

    const usernameExist = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (usernameExist) {
        return {
            error: true,
            status: 400,
            errorMsg: 'Username is taken',
        };
    }
    // validation
    const { error: usernameErr, message: usernameErrMsg } =
        usernameChecker(username);
    if (usernameErr) {
        return {
            error: true,
            status: 400,
            errorMsg: usernameErrMsg,
        };
    }
    const { error: pwErr, message: pwErrMsg } = pwCheck(password);
    if (pwErr) {
        return {
            error: true,
            status: 400,
            errorMsg: pwErrMsg,
        };
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
        return {
            error: true,
            status: 500,
            errorMsg: error.message,
        };
    }

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
        return {
            error: true,
            status: 500,
            errorMsg: error.message,
        };
    }
    return {
        error: false,
        status: 201,
        data: user,
    };
};
