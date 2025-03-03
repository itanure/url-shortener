import mongoose from 'mongoose';
import { config } from '../../config/env';

const { dbName, dbUser, dbPass, dbHost, dbPort } = config;

export const connectDB = async () => {
    const mongoUri = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};
