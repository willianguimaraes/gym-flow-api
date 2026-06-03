import { prisma } from '../lib/prisma';

export const sessionRepository = {

  async create(treinoId: number, notes?: string) {
    return prisma.workoutSession.create({
      data: { treinoId, notes },
      include: { treino: true },
    });
  },

  async finish(sessionId: number, durationMin: number) {
    return prisma.workoutSession.update({
      where: { id: sessionId },
      data:  { durationMin },
    });
  },

  async findAll() {
    return prisma.workoutSession.findMany({
      include: {
        treino: true,
        logs:   { include: { exercicio: true } },
      },
      orderBy: { trainedAt: 'desc' },
    });
  },

  async findByTreino(treinoId: number) {
    return prisma.workoutSession.findMany({
      where: { treinoId },
      include: {
        logs: { include: { exercicio: true } },
      },
      orderBy: { trainedAt: 'desc' },
    });
  },

  async findByDateRange(from: Date, to: Date) {
    return prisma.workoutSession.findMany({
      where: {
        trainedAt: { gte: from, lte: to },
      },
      include: {
        treino: true,
        logs:   true,
      },
      orderBy: { trainedAt: 'desc' },
    });
  },
};