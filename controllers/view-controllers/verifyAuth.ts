import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);
    console.log('verifyAuth');
    //check for token cookie
    if (!token) {
        // redirect to login page
        return res.status(401).redirect('/login');
    }

    jwt.verify(
        token,
        process.env.SECRET_KEY || '',
        (err: any, _decoded: any) => {
            if (err) {
                console.log(err);
                return res.status(401).redirect('/login');
            }
            next();
        }
    );
};
