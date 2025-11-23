import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './modules/auth/auth.routes';
import metricsRoutes from './modules/metrics/metrics.routes';
import { setupSwagger } from './docs/swagger';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
setupSwagger(app);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/metrics', metricsRoutes);

export default app;