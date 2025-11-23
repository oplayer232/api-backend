import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { MetricsService } from './metrics.service';

const metricsService = new MetricsService();

export class MetricsController {
  /**
   * @swagger
   * /metrics:
   *   get:
   *     summary: Obter todas as métricas
   *     tags: [Metrics]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de métricas
   */
  async getAll(req: AuthRequest, res: Response) {
    try {
      const metrics = await metricsService.getAllMetrics();
      return res.json(metrics);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * @swagger
   * /metrics/{category}:
   *   get:
   *     summary: Obter métricas por categoria
   *     tags: [Metrics]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: category
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Métricas da categoria
   */
  async getByCategory(req: AuthRequest, res: Response) {
    try {
      const { category } = req.params;
      const metrics = await metricsService.getMetricsByCategory(category);
      return res.json(metrics);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}