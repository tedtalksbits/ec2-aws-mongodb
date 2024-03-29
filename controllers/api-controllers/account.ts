import { Request, Response } from 'express';
import Account from '../../model/Account';

export const editBill = async (req: Request, res: Response) => {
    const { id, property, value } = req.body;

    if (!id || !property || !value) {
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Missing data',
        });
    }

    console.log('*********** /bills/edit PUT ************');
    console.log('checking session');
    if (!req.session) {
        console.log('session not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('session found');
    const userId = req.session.user.data._id;

    console.log('userId: ', userId);

    if (!userId) {
        console.log('userId not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('userId found');

    const account = await Account.findOne({
        userId,
    }).exec();
    if (!account) {
        console.log('account not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Account not found',
        });
    }

    console.log('account found');

    try {
        const updatedAccount = await Account.findOneAndUpdate(
            { userId, 'bills._id': id },
            { $set: { [`bills.$.${property}`]: value } }
        ).exec();

        console.log('updatedAccount: ', updatedAccount);
        if (!updatedAccount) {
            return res.status(500).json({
                error: true,
                status: 500,
                errorMsg: 'Something went wrong',
            });
        }
        return res.status(200).json({
            ok: true,
            status: 200,
            data: updatedAccount,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: 'Something went wrong',
        });
    }
};

export const deleteBill = async (req: Request, res: Response) => {
    const billId = req.params.id;
    console.log('billId: ', billId);

    console.log('*********** /bills DELETE ************');
    console.log('checking session');
    if (!req.session) {
        console.log('session not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('session found');
    const userId = req.session.user.data._id;

    console.log('userId: ', userId);

    if (!userId) {
        console.log('userId not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('userId found');

    if (!billId) {
        console.log('billId not found');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Missing data',
        });
    }

    console.log('billId found');

    const account = await Account.findOne({
        userId,
    }).exec();

    if (!account) {
        console.log('account not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Account not found',
        });
    }

    console.log('account found');

    try {
        const updatedAccount = await Account.findOneAndUpdate(
            { userId },
            { $pull: { bills: { _id: billId } } }
        ).exec();
        console.log('updatedAccount: ', updatedAccount);

        if (!updatedAccount) {
            return res.status(500).json({
                error: true,
                status: 500,
                errorMsg: 'Something went wrong',
            });
        }

        return res.status(200).json({
            ok: true,
            status: 200,
            data: updatedAccount,
        });
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: 'Something went wrong',
        });
    }
};

export const findOneBill = async (req: Request, res: Response) => {
    console.log('*********** /bills/:id GET ************');
    console.log('checking session');
    if (!req.session) {
        console.log('session not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('session found');
    const userId = req.session.user.data._id;

    console.log('userId: ', userId);

    if (!userId) {
        console.log('userId not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('userId found');

    const billId = req.params.id;
    console.log('billId: ', billId);

    if (!billId) {
        console.log('billId not found');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Missing data',
        });
    }

    console.log('billId found');

    // add _id bill array type

    const account = await Account.findOne({
        userId,
    }).exec();

    if (!account) {
        console.log('account not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Account not found',
        });
    }

    console.log('account found');

    const bill = account.bills.find((bill) => bill._id == billId);

    if (!bill) {
        console.log('bill not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Bill not found',
        });
    }

    console.log('bill found');

    return res.status(200).json({
        ok: true,
        status: 200,
        data: bill,
    });
};

export const updateBillCompanyImg = async (req: Request, res: Response) => {
    console.log('*********** /bills/uploadImg PUT ************');
    console.log('checking session');

    if (!req.session) {
        console.log('session not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('session found');

    const userId = req.session.user.data._id;

    console.log('userId: ', userId);

    if (!userId) {
        console.log('userId not found');
        return res.status(401).json({
            error: true,
            status: 401,
            errorMsg: 'Unauthorized',
        });
    }

    console.log('userId found');

    const { billId, img } = req.body;

    console.log('billId: ', billId);

    if (!billId || !img) {
        console.log('billId not found');
        return res.status(400).json({
            error: true,
            status: 400,
            errorMsg: 'Missing data',
        });
    }

    console.log('billId found');
    console.log('billId: ', billId);

    const account = await Account.findOne({
        userId,
    }).exec();

    if (!account) {
        console.log('account not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Account not found',
        });
    }

    console.log('account found');

    const bill = account.bills.find((bill) => bill._id == billId);

    if (!bill) {
        console.log('bill not found');
        return res.status(404).json({
            error: true,
            status: 404,
            errorMsg: 'Bill not found',
        });
    }

    console.log('bill found');

    try {
        const updatedAccount = await Account.findOneAndUpdate(
            { userId, 'bills._id': billId },
            { $set: { 'bills.$.billCompanyImg': img } }
        ).exec();
        if (!updatedAccount) {
            return res.status(500).json({
                error: true,
                status: 500,
                errorMsg: 'Something went wrong',
            });
        }
        account.save();
        return res.status(200).json({
            ok: true,
            status: 200,
            data: account,
        });
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).json({
            error: true,
            status: 500,
            errorMsg: 'Something went wrong',
        });
    }
};
