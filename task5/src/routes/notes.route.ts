import { Router } from "express";
import { uploadNotes, updateNote, render, checkGrammar, getNotes, addNote } from "../controllers/notes.controller";
import upload from "../middlewares/multer.middleware";

const router=Router();

router.post('/upload', upload.single('file'), uploadNotes)
router.put('/update/:id', updateNote)
router.post('/add', addNote)
router.post('/check', checkGrammar)
router.get('/render/:id', render)
router.get('/:id', getNotes)
router.get("/", getNotes)

export default router