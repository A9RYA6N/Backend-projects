import express from "express"
import urlRouter from './src/routes/url.route'
import redirectRouter from './src/routes/redirect.router'

const app=express();

app.use(express.json());

app.use('/api/url', urlRouter);
app.use('/', redirectRouter)

export default app;