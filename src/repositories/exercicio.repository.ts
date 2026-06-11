import { prisma } from '../lib/prisma';

export const exercicioRepository = {

  async findById(id: number) {
    return prisma.exercicioCatalogo.findUnique({
      where: { id }
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
    return prisma.exercicioCatalogo.update({
      where: { id },
      data,
    });
  },
};