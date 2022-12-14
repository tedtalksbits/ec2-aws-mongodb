import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);
    console.log('verifyAuth');
    //check for token cookie
    if (!token) {
        // redirect to login page
        req.session = null;
        return res.status(401).redirect('/login');
    }

    jwt.verify(
        token,
        process.env.SECRET_KEY as string,
        (err: any, _decoded: any) => {
            if (err) {
                console.log(err);
                req.session = null;
                return res.status(401).redirect('/login');
            }
            console.log('verified');
            next();
        }
    );
};
