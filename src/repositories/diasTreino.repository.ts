import { prisma } from '../lib/prisma';

export const diasTreinoRepository = {

  async findAll() {
    return prisma.diasTreino.findMany({
      include: { treino: { include: { exercises: true } } },
      orderBy: { num: 'asc' },
    });
  },

  async findById(id: number) {
    return prisma.diasTreino.findUnique({
      where: { id },
      include: { treino: { include: { exercises: true } } },
    });
  },

  // Busca pelo dia da semana (ex: 'SEG', 'TER')
  async findByAbbr(abbr: string) {
    return prisma.diasTreino.findFirst({
      where: { abbr: abbr.toUpperCase() },
      include: { treino: { include: { exercises: true } } },
    });
  },

  // Busca o dia de hoje pelo num (dia do mês)
  async findToday() {
    const today = new Date();
    const num   = today.getDate();

    return prisma.diasTreino.findFirst({
      where: { num },
      include: { treino: { include: { exercises: true } } },
    });
  },

  async create(data: {
    abbr:     string;
    fullName: string;
    num:      number;
    isRest:   boolean;
    title:    string;
    treinoId?: number;
  }) {
    return prisma.diasTreino.create({
      data,
      include: { treino: { include: { exercises: true } } },
    });
  },

  // Vincula ou desvincula um treino de um dia
  async updateTreino(id: number, treinoId: number | null) {
    return prisma.diasTreino.update({
      where: { id },
      data:  { treinoId },
      include: { treino: { include: { exercises: true } } },
    });
  },

  async delete(id: number) {
    return prisma.diasTreino.delete({ where: { id } });
  },
};