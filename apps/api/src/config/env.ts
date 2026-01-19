import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  MONGODB_URI: z.string().min(1, 'MongoDB URI is required'),
  JWT_SECRET: z.string().min(1, 'JWT secret is required'),
  JWT_EXPIRY: z.string().default('24h'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('❌ Invalid environment variables:');
    error.errors.forEach((err) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    process.exit(1);
  }
  throw error;
}

const config = {
  NODE_ENV: env.NODE_ENV,
  PORT: parseInt(env.PORT, 10),
  MONGODB_URI: env.MONGODB_URI,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRY: env.JWT_EXPIRY,
  CORS_ORIGIN: env.CORS_ORIGIN,
};

export default config;
