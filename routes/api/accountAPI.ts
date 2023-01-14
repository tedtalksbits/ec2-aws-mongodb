import express from 'express';
import { verifyAuth } from '../../controllers/view-controllers/verifyAuth';
import {
    deleteBill,
    editBill,
    updateBillCompanyImg,
} from '../../controllers/api-controllers/account';

const router = express.Router();

router.put('/bills/edit', verifyAuth, editBill);
router.post('/bills/delete/:id', verifyAuth, deleteBill);

router.post('/bill/uploadCompanyLogo', verifyAuth, updateBillCompanyImg);

export default router;
