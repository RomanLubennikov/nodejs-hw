import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { errors } from 'celebrate';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';
import authRouter from './routes/authRoutes.js';
dotenv.config();

const app = express();
app.use(logger);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(authRouter);
app.use(notesRouter);
const PORT = process.env.PORT || 3000;
app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
