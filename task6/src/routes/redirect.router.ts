import { Router } from "express";
import { redirectUrl } from "../controllers/redirect.controller";

const router=Router();

router.get('/:id', redirectUrl)

export default router;