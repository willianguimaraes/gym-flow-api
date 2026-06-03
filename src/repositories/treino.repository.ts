import { prisma } from '../lib/prisma';

export const treinoRepository = {

  async findAll(usuarioId: number) {
    return prisma.treino.findMany({
      where:   { usuarioId },
      include: { exercises: true },
      orderBy: { createdAt: 'asc' },
    });
  },

  async findById(id: number, usuarioId: number) {
    return prisma.treino.findFirst({
      where:   { id, usuarioId },
      include: { exercises: true },
    });
  },

  async create(data: {
    usuarioId:   number;
    name:        string;
    category:    string;
    color:       string;
    duration:    number;
    kcal:        number;
    difficulty:  number;
    description?: string;
    muscles:     string[];
    exercises: {
      name:   string;
      desc:   string;
      sets:   number;
      reps:   number;
      rest:   number;
      weight: number;
      tag:    string;
    }[];
  }) {
    return prisma.treino.create({
      data: {
        usuarioId:   data.usuarioId,
        name:        data.name,
        category:    data.category,
        color:       data.color,
        duration:    data.duration,
        kcal:        data.kcal,
        difficulty:  data.difficulty,
        description: data.description,
        muscles:     data.muscles,
        exercises: { create: data.exercises },
      },
      include: { exercises: true },
    });
  },

  async update(id: number, usuarioId: number, data: Partial<{
    name:        string;
    category:    string;
    color:       string;
    duration:    number;
    kcal:        number;
    difficulty:  number;
    description: string;
    muscles:     string[];
  }>) {
    return prisma.treino.update({
      where: { id, usuarioId },
      data,
      include: { exercises: true },
    });
  },

  async delete(id: number, usuarioId: number) {
    return prisma.treino.delete({ where: { id, usuarioId } });
  },
};