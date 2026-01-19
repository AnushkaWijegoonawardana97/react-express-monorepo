import app from './app';
import { connectDatabase } from './config/database';
import { setupCronJobs } from './config/cron';
import config from './config/env';

const startServer = async (): Promise<void> => {
  try {
    connectDatabase().catch(() => {
      console.log('📝 Note: API will run in demo mode without database');
    });
    
    setupCronJobs();

    app.listen(config.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${config.PORT}`);
      console.log(`📚 API Documentation: http://localhost:${config.PORT}/api-docs`);
      console.log(`🏥 Health Check: http://localhost:${config.PORT}/health`);
      console.log('💡 This is a boilerplate project - database connection is optional');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
