import jwt from 'jsonwebtoken';
import User from '../model/User';
import CryptoJS from 'crypto-js';

export const loginValidator = async (
    username: string,
    password: string
): Promise<{
    error: boolean;
    status: number;
    errorMsg: string;
    token?: string;
}> => {
    if (!username || !password) {
        return {
            error: true,
            status: 400,
            errorMsg: 'Please fill all required fields',
        };
    }

    const user = await User.findOne({
        username: username.toLowerCase(),
    }).exec();

    if (!user) {
        return {
            error: true,
            status: 400,
            errorMsg: 'User not found',
        };
    }

    const decryptedPw = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_KEY || ''
    ).toString(CryptoJS.enc.Utf8);

    if (decryptedPw !== password) {
        return {
            error: true,
            status: 401,
            errorMsg: 'Incorrect credentials',
        };
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

    return {
        error: false,
        status: 200,
        errorMsg: 'Login successful',
        token,
    };
};
