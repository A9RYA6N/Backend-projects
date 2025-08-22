import express from "express"
import cookieParser from 'cookie-parser'
import expRoutes from './src/routes/expRoutes'
import authRoutes from './src/routes/authRoutes'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expRoutes);

export default app;