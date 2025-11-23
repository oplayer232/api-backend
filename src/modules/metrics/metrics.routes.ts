import { Router } from 'express';
import { MetricsController } from './metrics.controller';
import { authMiddleware } from '../../middlewares/auth';

const router = Router();
const metricsController = new MetricsController();

router.use(authMiddleware);

router.get('/', (req, res) => metricsController.getAll(req, res));
router.get('/:category', (req, res) => metricsController.getByCategory(req, res));

export default router;