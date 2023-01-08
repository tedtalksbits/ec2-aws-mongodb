import express from 'express';
import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
import {
    deleteBill,
    editBill,
} from '../../controllers/api-controllers/account';

const router = express.Router();

router.put('/bills/edit', verifyAuth, editBill);
router.post('/bills/delete/:id', verifyAuth, deleteBill);

export default router;
