import express from 'express';
import {
    addBill,
    deleteBill,
    getAccountById,
    viewBill,
} from '../../controllers/account.js';

import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';

const router = express.Router();

router.get('/bills', verifyAuth, getAccountById);
router.get('/bill/:id', verifyAuth, viewBill);

router.post('/bills/delete/:id', verifyAuth, deleteBill);
router.post('/bills/new', verifyAuth, addBill);

export default router;
