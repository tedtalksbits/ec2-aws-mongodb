"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
const Account_1 = __importDefault(require("../model/Account"));
const account = async (_req, res) => {
    const accounts = await Account_1.default.find({}).exec();
    console.log(accounts);
    return res.status(200).json({
        error: false,
        status: 200,
        data: accounts,
    });
};
exports.account = account;
//# sourceMappingURL=account.js.map