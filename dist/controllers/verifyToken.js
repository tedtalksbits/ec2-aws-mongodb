"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../logger/index");
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        (0, index_1.fsLogger)(req, res);
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, _decoded) => {
        if (err) {
            (0, index_1.fsLogger)(req, res);
            return res.status(401).json({
                error: true,
                status: 401,
                errorMsg: 'Unauthorized',
            });
        }
        (0, index_1.fsLogger)(req, res);
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map