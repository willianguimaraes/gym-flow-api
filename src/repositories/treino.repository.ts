import { prisma } from '../lib/prisma';

export const treinoRepository = {

  async findAll(usuarioId: number) {
  return prisma.treino.findMany({
    where:   { usuarioId },
    include: {
      exercises: {
        include: {
          exercicio: true  // ← ExercicioCatalogo
        },
        orderBy: { ordem: 'asc' }
      }
    },
    orderBy: { createdAt: 'asc' },
  });
},

  async findById(id: number, usuarioId: number) {
    return prisma.treino.findFirst({
      where:   { id, usuarioId },
      include: {
        exercises: {
          include: {
            exercicio: true  // ← ExercicioCatalogo
          },
          orderBy: { ordem: 'asc' }
        }
      },
    });
  },

  async create(data: {
    usuarioId:    number;
    name:         string;
    category:     string;
    color:        string;
    duration:     number;
    kcal:         number;
    difficulty:   number;
    description?: string;
    muscles:      string[];
    exercises: {
      exercicioId: number;
      ordem:       number;
      sets:        number;
      reps:        number;
      rest:        number;
      weight:      number;
      observacao?: string;
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
        exercises: {
          create: data.exercises.map(ex => ({
            exercicioId: ex.exercicioId,  // ← só o ID, não o objeto
            ordem:       ex.ordem,
            sets:        ex.sets,
            reps:        ex.reps,
            rest:        ex.rest,
            weight:      ex.weight,
            observacao:  ex.observacao ?? '',
          })),
        },
      },
      include: {
        exercises: {
          include: { exercicio: true },
          orderBy: { ordem: 'asc' },
        },
      },
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