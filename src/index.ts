import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/db.js';
import { APP_ORIGIN } from './constants/env.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}))

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(4045, async () => {
    console.log(`running on http://localhost:4045`);
    await connectToDatabase()
})

