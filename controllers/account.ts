import Account from '../model/Account';
import Bill from '../model/Bill';
import { Response } from 'express';
import { ExtendedRequest } from '../types/restResponse';

export const getAccount = async (req: ExtendedRequest, res: Response) => {
    // get all accounts
    const userId = req.session?.user?.data?._id;

    if (!userId) {
        console.log('*********** /bills GET ************');
        console.log('userID', userId);
        console.log('*********** /bills GET ************');
        return res.redirect('/login');
    }

    console.log('*********** /bills GET ************');

    console.log('session', req.session);

    const account = await Account.find({
        userId,
    }).exec();

    if (!account) {
        console.log('*********** /bills GET ************');
        console.log('account not found');
        console.log('*********** /bills GET ************');
        return res.redirect('/login');
    }

    console.log('*********** /bills GET ************');

    console.log('account found', account);

    return res.status(200).render('bills', {
        title: 'Bills',
        data: req.session?.user?.data,
        bills: account[0].bills,
        layout: './layouts/app',
        erorr: false,
        errorMsg: '',
    });
};

export const addBillToAccount = async (req: ExtendedRequest, res: Response) => {
    const userId = req.session?.user?.data?._id;
    const { billName, billAmount, billDueDate, billFrequency, billCategory } =
        req.body;

    let isAutoPay = req.body.isAutoPay === 'on' ? true : false;

    if (!userId) {
        return res.redirect('/login');
    }

    if (
        !billName ||
        !billAmount ||
        !billDueDate ||
        !billFrequency ||
        !billCategory
    ) {
        return res.status(400).render('bills', {
            title: 'Bills',
            data: req.session?.user?.data,
            bills: [],
            layout: './layouts/app',
            erorr: true,
            errorMsg: 'Please fill all required fields',
        });
    }

    // const account = await Account.find({
    //     userId,
    // }).exec();

    // if (!account) {
    //     return res.redirect('/login');
    // }

    const bill = new Bill({
        billName,
        billAmount,
        billDueDate,
        billFrequency,
        billCategory,
        isAutoPay,
    });
    const account = await Account.findOne({
        userId,
    }).exec();
    if (!account) {
        return res.redirect('/login');
    }

    const updatedAccount = (await Account.findOneAndUpdate(
        { userId },
        { $push: { bills: bill } },
        { new: true }
    ).exec()) as any;

    if (!updatedAccount) {
        return res.status(500).render('bills', {
            title: 'Bills',
            data: req.session?.user?.data,
            bills: account.bills,
            layout: './layouts/app',
            erorr: true,
            errorMsg: 'Something went wrong',
        });
    }

    // return res.status(200).render('bills', {
    //     title: 'Bills',
    //     data: req.session?.user?.data,
    //     bills: updatedAccount.bills,
    //     layout: './layouts/app',
    //     erorr: false,
    //     errorMsg: '',
    // });

    return res.redirect('/bills');
};
