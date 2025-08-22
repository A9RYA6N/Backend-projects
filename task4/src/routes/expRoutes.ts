import { Router } from "express";
import { getExps, addExp, delExp, updateExp } from "../controllers/expController";
import verifyJWT from "../middlewares/authMiddleware";

const router = Router();

router.get('/', verifyJWT, getExps)
router.post('/add', verifyJWT, addExp)
router.delete('/delete', verifyJWT, delExp)
router.patch('/update', verifyJWT, updateExp)

export default router