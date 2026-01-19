import express, { type Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import config from './config/env';

const app: Express = express();

app.use(cors({
  origin: config.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Express API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      apiDocs: '/api-docs',
      api: '/api',
    },
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
