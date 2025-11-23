import prisma from '../../prisma';

export class MetricsService {
  async getAllMetrics() {
    return prisma.metric.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMetricsByCategory(category: string) {
    return prisma.metric.findMany({
      where: { category },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createMetric(label: string, value: number, category?: string) {
    return prisma.metric.create({
      data: { label, value, category },
    });
  }
}