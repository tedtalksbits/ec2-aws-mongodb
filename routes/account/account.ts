import express from 'express';
import { account } from '../../controllers/account.js';

import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
const router = express.Router();

router.get('/bills', verifyAuth, account);

export default router;
