import express from 'express';
import {
    addBill,
    deleteBill,
    getAccountById,
} from '../../controllers/account.js';

import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
const router = express.Router();

router.get('/bills', verifyAuth, getAccountById);
// router.get('/bills/:id', verifyAuth, account);
router.post('/bills/delete/:id', verifyAuth, deleteBill);
router.post('/bills/new', verifyAuth, addBill);
// router.post('/bills/:id/edit', verifyAuth, account);

export default router;
