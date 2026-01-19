import mongoose from 'mongoose';
import config from './env';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.warn('⚠️  MongoDB connection failed (server will continue without database):', error instanceof Error ? error.message : 'Unknown error');
    console.log('💡 This is a boilerplate project - database connection is optional');
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
};

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️  MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('✅ MongoDB reconnected');
});
