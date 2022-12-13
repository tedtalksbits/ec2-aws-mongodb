import jwt from 'jsonwebtoken';
import { fsLogger } from '../logger/index';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.token;
    //check for token cookie
    if (!token) {
        fsLogger(req, res);
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    jwt.verify(
        token,
        process.env.SECRET_KEY || '',
        (err: any, _decoded: any) => {
            if (err) {
                fsLogger(req, res);
                console.log(err);
                return res.status(401).json({
                    error: true,
                    status: 401,
                    errorMsg: 'Unauthorized',
                });
            }
            // check if token is expired

            fsLogger(req, res);
            // req.user = decoded;
            next();
        }
    );
};
