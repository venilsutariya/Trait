import mongoose, { ConnectOptions } from 'mongoose';

const MONGO_URI: string | undefined = process.env.MONGO_URL;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

const connectDB = async (): Promise<void> => {
  try {

    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
