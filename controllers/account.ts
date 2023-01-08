import Account from '../model/Account';
import { Response, Request } from 'express';

export const getAccountById = async (req: Request, res: Response) => {
    if (!req.session) {
        return res.redirect('/login');
    }
    const userId = req.session.user.data._id;

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

    if (req.session.state?.setShowAlert) {
        const { alertMsg, isAlertError, setShowAlert } = req.session.state;
        req.session.state = {
            setShowAlert: false,
            alertMsg: '',
            isAlertError: false,
        };

        return res.status(200).render('bills', {
            title: 'Bills',
            data: req.session?.user?.data,
            bills: account[0].bills,
            layout: './layouts/app',
            showAlert: setShowAlert,
            alertMsg: alertMsg,
            isAlertError: isAlertError,
        });
    }

    return res.status(200).render('bills', {
        title: 'Bills',
        data: req.session?.user?.data,
        bills: account[0].bills,
        layout: './layouts/app',
        showAlert: false,
        alertMsg: '',
        isAlertError: false,
    });
};

export const addBill = async (req: Request, res: Response) => {
    console.log('*********** /bills/new POST ************');

    if (!req.session) {
        return res.redirect('/login');
    }

    const userId = req.session.user.data._id;

    if (!userId) {
        return res.redirect('/login');
    }

    const { billName, billAmount, billDueDate, billFrequency, billCategory } =
        req.body;

    let isAutoPay = req.body.isAutoPay === 'on' ? true : false;

    const account = await Account.findOne({
        userId,
    }).exec();

    if (!account) {
        return res.redirect('/login');
    }

    if (
        !billName ||
        !billAmount ||
        !billDueDate ||
        !billFrequency ||
        !billCategory
    ) {
        req.session.state = {
            setShowAlert: true,
            alertMsg: 'Please fill out all fields',
            isAlertError: true,
        };

        return res.redirect('/bills');
    }

    // const account = await Account.find({
    //     userId,
    // }).exec();

    // if (!account) {
    //     return res.redirect('/login');
    // }

    const bill = {
        billName,
        billAmount,
        billDueDate,
        billFrequency,
        billCategory,
        isAutoPay,
    };

    // if (!account) {
    //     return res.redirect('/login');
    // }

    const updatedAccount = (await Account.findOneAndUpdate(
        { userId },
        { $push: { bills: bill } },
        { new: true }
    ).exec()) as any;

    if (!updatedAccount) {
        req.session.state = {
            setShowAlert: true,
            alertMsg: 'Something went wrong',
            isAlertError: true,
        };

        return res.redirect('/bills');
    }

    // return res.status(200).render('bills', {
    //     title: 'Bills',
    //     data: req.session?.user?.data,
    //     bills: updatedAccount.bills,
    //     layout: './layouts/app',
    //     erorr: false,
    //     errorMsg: '',
    // });
    req.session.state = {
        setShowAlert: true,
        alertMsg: 'Bill added successfully',
        isAlertError: false,
    };
    return res.redirect('/bills');
};

export const deleteBill = async (req: Request, res: Response) => {
    if (!req.session) {
        return res.redirect('/login');
    }
    console.log('*********** /bills DELETE ************');
    const userId = req.session.user.data._id;
    const billId = req.params.id;

    console.log('userId', userId);
    console.log('billId', billId);
    console.log(req.params);

    if (!userId) {
        return res.redirect('/login');
    }

    if (!billId) {
        req.session.state = {
            setShowAlert: true,
            alertMsg: 'Something went wrong. Error: Bill ID not found',
            isAlertError: true,
        };
        return res.redirect('/bills');
    }

    const account = await Account.findOne({
        userId,
    }).exec();
    if (!account) {
        return res.redirect('/login');
    }

    const updatedAccount = await Account.findOneAndUpdate(
        { userId },
        { $pull: { bills: { _id: billId } } }
    ).exec();

    if (!updatedAccount) {
        req.session.state = {
            setShowAlert: true,
            alertMsg: 'Something went wrong',
            isAlertError: true,
        };

        return res.redirect('/bills');
    }

    console.log('*********** /bills DELETE ************');
    console.log('updatedAccount', updatedAccount);

    console.log('*********** /bills DELETE ************');
    // refresh the page after deleting the bill
    req.session.state = {
        setShowAlert: true,
        alertMsg: 'Bill deleted successfully',
        isAlertError: false,
    };
    return res.redirect('/bills');
};

export const viewBill = async (req: Request, res: Response) => {
    // if (!req.session) {
    //     return res.redirect('/login');
    // }
    // console.log('*********** /bills/view GET ************');
    // const userId = req.session.user.data._id;
    // const billId = req.params.id;

    // console.log('userId', userId);
    // console.log('billId', billId);
    // console.log(req.params);

    // if (!userId) {
    //     return res.redirect('/login');
    // }

    // if (!billId) {
    //     req.session.state = {
    //         setShowAlert: true,
    //         alertMsg: 'Something went wrong. Error: Bill ID not found',
    //         isAlertError: true,
    //     };
    //     return res.redirect('/bills');
    // }

    // const account = await Account.findOne({
    //     userId,
    // }).exec();

    // if (!account) {
    //     return res.redirect('/login');
    // }

    // // const bill = account.bills.find({ _id: new mongoose.Types.ObjectId(billId)});

    // const bill = Account.findOne({ userId, 'bills._id': billId }).exec();

    // if (!bill) {
    //     req.session.state = {
    //         setShowAlert: true,
    //         alertMsg: 'Something went wrong. Error: Bill not found',
    //         isAlertError: true,
    //     };
    //     return res.redirect('/bills');
    // }
    return res.status(200).render('viewbill', {
        title: 'Bill',
        data: req.session?.user?.data,
        bill: [
            {
                billName: 'test',
                billAmount: 100,
                billDueDate: '2021-01-01',
                billFrequency: 'monthly',
                id: req.params.id,
            },
        ],
        layout: './layouts/app',
        showAlert: false,
        alertMsg: '',
        isAlertError: false,
    });
};
