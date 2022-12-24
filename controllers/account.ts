import Account from '../model/Account';
import Bill from '../model/Bill';
import { Response } from 'express';
import { ExtendedRequest } from '../types/restResponse';

export const account = async (req: ExtendedRequest, res: Response) => {
    // get all accounts
    const userId = req.session?.user?.data?._id;

    if (!userId) {
        console.log('*********** /account GET ************');
        console.log('userID', userId);
        console.log('*********** /account GET ************');
        return res.redirect('/login');
    }

    console.log('*********** /account GET ************');

    console.log('session', req.session);

    const account = await Account.find({
        userId,
    }).exec();

    if (!account) {
        console.log('*********** /account GET ************');
        console.log('account not found');
        console.log('*********** /account GET ************');
        return res.redirect('/login');
    }

    console.log('*********** /account GET ************');

    console.log('account found', account);
    console.log(typeof account);

    console.log(account[0].bills);

    return res.status(200).render('bills', {
        title: 'Bills',
        data: req.session?.user?.data,
        bills: account[0].bills,
        layout: './layouts/app',
        erorr: false,
        errorMsg: '',
    });
};

export const addBill = async (req: ExtendedRequest, res: Response) => {
    // get all accounts
    const userId = req.session?.user?.data?._id;

    const {
        billName,
        billAmount,
        billDueDate,
        billFrequency,
        billCategory,
        isAutoPay,
    } = req.body.bill;

    if (!userId) {
        console.log('*********** /addBill GET ************');
        console.log('userID', userId);
        console.log('*********** /addBill GET ************');
        return res.redirect('/login');
    }

    console.log('*********** /addBill GET ************');

    console.log('session', req.session);

    const account = await Account.findOne({
        userId,
    }).exec();

    console.log('*********** /addBill GET ************');

    console.log('account found', account);

    if (account) {
        // create new bill and add to account

        const newBill = await Bill.create({
            billName: billName,
            billAmount: billAmount,
            billCategory: billCategory,
            billDueDay: billDueDate,
            billFrequency: billFrequency,
            isAutoPay: isAutoPay,
        });

        console.log('*********** /addBill GET ************');

        console.log('newBill', newBill);
        // push using mongoose
        account.updateOne(
            { $push: { bills: newBill } },
            (err: any, result: any) => {
                if (err) {
                    console.log('*********** /addBill GET ************');
                    console.log('error', err);
                    console.log('*********** /addBill GET ************');
                    return res.redirect('/login');
                }
                console.log('*********** /addBill GET ************');
                console.log('result', result);
                console.log('*********** /addBill GET ************');
            }
        );
    }

    return res.status(200).render('bills', {
        title: 'Bills',
        data: account,
        layout: './layouts/app',
    });
};
