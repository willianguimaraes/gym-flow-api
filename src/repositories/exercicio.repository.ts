import { prisma } from '../lib/prisma';

export const exercicioRepository = {

  async findById(id: number) {
    return prisma.exercicio.findUnique({
      where: { id },
      include: { treino: true },
    });
  },

  async findByTreino(treinoId: number) {
    return prisma.exercicio.findMany({
      where: { treinoId },
      orderBy: { id: 'asc' },
    });
  },

  async update(id: number, data: Partial<{
    name:   string;
    desc:   string;
    sets:   number;
    reps:   number;
    rest:   number;
    weight: string;
    tag:    string;
  }>) {
    return prisma.exercicio.update({
      where: { id },
      data,
    });
  },
};