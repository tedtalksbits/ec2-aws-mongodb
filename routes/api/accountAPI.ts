import express from 'express';
import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
import { editBill } from '../../controllers/api-controllers/account';

const router = express.Router();

router.put('/bills/edit', verifyAuth, editBill);

export default router;
