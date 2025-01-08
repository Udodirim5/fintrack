import express from 'express';
import { addRows, getRows, updateRows, deleteRows } from '../controllers/sheetController.js';

const router = express.Router();

router.post('/add', addRows);
router.get('/get', getRows);
router.put('/update', updateRows);
router.delete('/delete', deleteRows);

export default router;
