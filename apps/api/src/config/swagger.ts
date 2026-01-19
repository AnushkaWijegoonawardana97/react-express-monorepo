import swaggerJsdoc from 'swagger-jsdoc';
import type { SwaggerDefinition } from 'swagger-jsdoc';
import config from './env';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API Documentation',
    version: '1.0.0',
    description: 'API documentation for Express.js backend',
    contact: {
      name: 'API Support',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.PORT}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
