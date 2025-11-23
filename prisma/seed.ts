import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Populando banco de dados...');

  // Criar métricas de exemplo
  await prisma.metric.createMany({
    data: [
      { label: 'Vendas Janeiro', value: 15000, category: 'vendas' },
      { label: 'Vendas Fevereiro', value: 18000, category: 'vendas' },
      { label: 'Vendas Março', value: 22000, category: 'vendas' },
      { label: 'Vendas Abril', value: 25000, category: 'vendas' },
      { label: 'Usuários Ativos', value: 350, category: 'usuarios' },
      { label: 'Novos Cadastros', value: 89, category: 'usuarios' },
      { label: 'Taxa de Conversão', value: 12.5, category: 'conversao' },
    ],
  });

  console.log('✅ 7 métricas criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });