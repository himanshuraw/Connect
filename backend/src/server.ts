import express, { Application } from "express";
import cors from 'cors';
import morgan from 'morgan';
import helmet from "helmet";

import dotenv from "dotenv";
import { connectMongoDB, connectPostgres } from "./config/db";
import userRoutes from './routes/user.route';
import postRoutes from './routes/post.route';

dotenv.config();

const app: Application = express();

app.use(helmet());

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

// Database connections
(async () => {
    try {
        await connectPostgres();
        await connectMongoDB();
        console.log('Database connected successfully');
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit(1);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
})