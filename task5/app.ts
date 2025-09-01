import express from "express"
import notesRouter from './src/routes/notes.route'

const app=express();

app.use(express.json());
// app.use(express.static())

app.use("/api/notes", notesRouter)

export default app;