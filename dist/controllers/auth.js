"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../model/User"));
const usernameChecker_1 = require("../util/usernameChecker");
const pwChecker_1 = require("../util/pwChecker");
const crypto_js_1 = __importDefault(require("crypto-js"));
const index_1 = require("../logger/index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Account_1 = __importDefault(require("../model/Account"));
const register = async (req, res) => {
    const { username, email, password, avatar, firstName, lastName, middleName, } = req.body;
    if (!username || !email || !password || !firstName || !lastName) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: `Please fill all required fields: ${!username ? 'username' : ''} ${!email ? 'email' : ''}  ${!password ? 'password' : ''} ${!firstName ? 'firstName' : ''} ${!lastName ? 'lastName' : ''}`,
        });
    }
    const emailExist = await User_1.default.findOne({ email }).exec();
    if (emailExist) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Email is taken',
        });
    }
    const usernameExist = await User_1.default.findOne({
        username: username.toLowerCase(),
    }).exec();
    if (usernameExist) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Username is taken',
        });
    }
    const { error: usernameErr, message: usernameErrMsg } = (0, usernameChecker_1.usernameChecker)(username);
    if (usernameErr) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: usernameErrMsg,
        });
    }
    const { error: pwErr, message: pwErrMsg } = (0, pwChecker_1.pwCheck)(password);
    if (pwErr) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: pwErrMsg,
        });
    }
    const reqUser = {
        username: username.toLowerCase(),
        password: crypto_js_1.default.AES.encrypt(password, process.env.SECRET_KEY || '').toString(),
        email,
        avatar,
        firstName,
        lastName,
        middleName,
    };
    const newUser = new User_1.default(reqUser);
    try {
        await newUser.save();
    }
    catch (error) {
        (0, index_1.fsLogger)(req, res);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: error.message,
        });
    }
    (0, index_1.fsLogger)(req, res);
    const _a = newUser._doc, { password: pw } = _a, user = __rest(_a, ["password"]);
    console.log(user);
    try {
        const account = new Account_1.default({
            userId: user._id,
        });
        await account.save();
    }
    catch (error) {
        (0, index_1.fsLogger)(req, res);
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
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Please fill all required fields',
        });
    }
    const user = await User_1.default.findOne({
        username: username.toLowerCase(),
    }).exec();
    if (!user) {
        (0, index_1.fsLogger)(req, res);
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'User not found',
        });
    }
    const decryptedPw = crypto_js_1.default.AES.decrypt(user.password, process.env.SECRET_KEY || '').toString(crypto_js_1.default.enc.Utf8);
    if (decryptedPw !== password) {
        (0, index_1.fsLogger)(req, res);
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Incorrect credentials',
        });
    }
    const token = jsonwebtoken_1.default.sign({
        id: user._id,
        username: user.username,
    }, process.env.SECRET_KEY || '', { expiresIn: '1hr' });
    (0, index_1.fsLogger)(req, res);
    return res.cookie('token', token, { httpOnly: true }).send();
};
exports.login = login;
//# sourceMappingURL=auth.js.map