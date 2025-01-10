import 'reflect-metadata';
import { DataSource } from 'typeorm';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/models/postgresql/*.ts'], // Ensure paths are correct
    synchronize: true,
})


// PostgreSQL Connection
export const connectPostgres = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Connected to postgreSQL");
    } catch (error) {
        console.log("Failed to connect to postgreSQL: ", error);
        throw error;
    }
}

// MongoDB Connection
export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};
