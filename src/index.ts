import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './config/db.js';
import { APP_ORIGIN, PORT } from './constants/env.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import catchErrors from './utils/catchErrors.js';
import { OK } from './constants/http.js';
import authrouter from './routes/auth.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: APP_ORIGIN,
    credentials: true,
}));

app.use(cookieParser());

app.get('/', (req, res, next) => {
    return res.status(OK).json({
        status: 'success',
    });
})

// app.get('/', catchErrors(async (req, res, next) => {
//     throw new Error("This is a test error");
//     return res.status(200).json({
//         status: 'success',
//     });
// })
// );

app.use('/auth', authrouter)

app.use(errorHandler)

app.listen(PORT, async () => {
    console.log(`running on http://localhost:${PORT}`);
    await connectToDatabase()
})

