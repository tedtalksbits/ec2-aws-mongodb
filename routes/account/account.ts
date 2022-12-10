import express from 'express';
import { account } from '../../controllers/account.js';
// import { verifyToken } from '../../controllers/verifyToken.js';
const router = express.Router();

router.get('/account', account);

export default router;
