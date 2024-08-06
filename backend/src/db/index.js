import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import 'dotenv/config';
const DATABASE = process.env.DATABASE;

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(`${DATABASE}/${DB_NAME}`);
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectInstance.connection.host}`,
    );
  } catch (error) {
    console.log('MONGODB connection error', error);
    process.exit(1);
  }
};

export default connectDB;
