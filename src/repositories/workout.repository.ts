import { prisma } from '../lib/prisma';
import { Treino } from '@prisma/client';

export const workoutRepository = {

  async findAll(): Promise<Treino[]> {
    return prisma.treino.findMany({
      include: { exercises: true },
      orderBy: { id: 'asc' },
    });
  },

  async findById(id: number) {
    return prisma.treino.findUnique({
      where: { id },
      include: { exercises: true },
    });
  },

  async create(data: {
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
      weight: string;
      tag:    string;
    }[];
  }) {
    return prisma.treino.create({
      data: {
        name:        data.name,
        category:    data.category,
        color:       data.color,
        duration:    data.duration,
        kcal:        data.kcal,
        difficulty:  data.difficulty,
        description: data.description,
        muscles:     data.muscles,
        exercises: {
          create: data.exercises,
        },
      },
      include: { exercises: true },
    });
  },

  async update(id: number, data: Partial<{
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
      where: { id },
      data,
      include: { exercises: true },
    });
  },

  async delete(id: number) {
    return prisma.treino.delete({ where: { id } });
  },
};