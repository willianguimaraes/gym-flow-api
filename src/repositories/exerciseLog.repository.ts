import { prisma } from '../lib/prisma';
import { UpsertLogDTO, AddSetDTO } from '../types/log.types';

export const exerciseLogRepository = {

  async upsert(data: UpsertLogDTO) {
    return prisma.exerciseLog.upsert({
      where: {
        sessionId_treinoExercicioId: {
          sessionId:         data.sessionId,
          treinoExercicioId: data.treinoExercicioId,
        },
      },
      update: {
        setsDone:        data.setsDone,
        completed:       data.completed,
        weightUsed:      data.weightUsed,
        substituidoPorId: data.substituidoPorId,
      },
      create: data,
      include: { sets: true, substituidoPor: true },
    });
  },

  async addSet(data: AddSetDTO) {
    return prisma.exercicioSet.upsert({
      where: {
        logId_setNum: {
          logId:  data.logId,
          setNum: data.setNum,
        },
      },
      update: { reps: data.reps, weightUsed: data.weightUsed },
      create: data,
    });
  },

  async findBySession(sessionId: number) {
    return prisma.exerciseLog.findMany({
      where:   { sessionId },
      include: {
        treinoExercicio: { include: { exercicio: true } },
        substituidoPor:  true,
        sets:            { orderBy: { setNum: 'asc' } },
      },
    });
  },

  async findByTreinoExercicio(treinoExercicioId: number) {
    return prisma.exerciseLog.findMany({
      where:   { treinoExercicioId },
      include: {
        session:        { select: { trainedAt: true } },
        substituidoPor: true,
        sets:           { orderBy: { setNum: 'asc' } },
      },
      orderBy: { createdAt: 'asc' },
    });
  },

  // Para o dashboard — evolução por músculo
  async findByMusculo(musculo: string) {
    return prisma.exerciseLog.findMany({
      where: {
        treinoExercicio: {
          exercicio: {
            OR: [
              { musculoPrimario: { contains: musculo, mode: 'insensitive' } },
              { musculosSecund:  { has: musculo } },
            ],
          },
        },
      },
      include: {
        treinoExercicio: { include: { exercicio: true } },
        session:         { select: { trainedAt: true, usuarioId: true } },
        sets:            { orderBy: { setNum: 'asc' } },
      },
      orderBy: { createdAt: 'asc' },
    });
  },
};