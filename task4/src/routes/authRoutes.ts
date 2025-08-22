import { Router } from "express";
import { getUser, login, logout, signup } from "../controllers/authController";
import verifyJWT from "../middlewares/authMiddleware";

const router = Router();

router.get('/', verifyJWT, getUser)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

export default router