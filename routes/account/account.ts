import express from 'express';
import { addBillToAccount, getAccount } from '../../controllers/account.js';

import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
const router = express.Router();

router.get('/bills', verifyAuth, getAccount);
// router.get('/bills/:id', verifyAuth, account);
// router.post('/bills/:id/delete', verifyAuth, account);
router.post('/bills/new', verifyAuth, addBillToAccount);
// router.post('/bills/:id/edit', verifyAuth, account);

export default router;
