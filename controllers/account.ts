import Account from '../model/Account';

import { Request, Response } from 'express';

export const account = async (_req: Request, res: Response) => {
    // get all accounts

    const accounts = await Account.find({}).exec();

    console.log(accounts);

    return res.status(200).json({
        error: false,
        status: 200,
        data: accounts,
    });
};
