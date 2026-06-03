import { prisma } from '../lib/prisma';

export const planoRepository = {

  async findAtivo(usuarioId: number) {
    return prisma.planoTreino.findFirst({
      where: { usuarioId, ativo: true },
      include: {
        dias: {
          include: {
            treino: { include: { exercises: true } },
          },
          orderBy: { diaSemana: 'asc' },
        },
      },
    });
  },

  async findAll(usuarioId: number) {
    return prisma.planoTreino.findMany({
      where: { usuarioId },
      include: {
        dias: {
          include: { treino: true },
          orderBy: { diaSemana: 'asc' },
        },
      },
      orderBy: { inicioEm: 'desc' },
    });
  },

  async findById(id: number) {
    return prisma.planoTreino.findUnique({
      where: { id },
      include: {
        dias: {
          include: {
            treino: { include: { exercises: true } },
          },
          orderBy: { diaSemana: 'asc' },
        },
      },
    });
  },

  async create(data: {
    usuarioId: number;
    nome:      string;
    descricao?: string;
    inicioEm:  Date;
    dias: {
      diaSemana: number;
      isRest:    boolean;
      treinoId?: number;
    }[];
  }) {
    return prisma.planoTreino.create({
      data: {
        usuarioId: data.usuarioId,
        nome:      data.nome,
        descricao: data.descricao,
        inicioEm:  data.inicioEm,
        ativo:     false,
        dias: {
          create: data.dias,
        },
      },
      include: {
        dias: { include: { treino: true } },
      },
    });
  },

  async update(id: number, data: Partial<{
    nome:      string;
    descricao: string;
    inicioEm:  Date;
  }>) {
    return prisma.planoTreino.update({
      where: { id },
      data,
      include: { dias: { include: { treino: true } } },
    });
  },

  // Ativa o plano e desativa o anterior — chamado no login e no /me
  async ativarSeNecessario(usuarioId: number, dia = new Date()) {

    const planoParaAtivar = await prisma.planoTreino.findFirst({
      where: {
        usuarioId,
        ativo:    false,
        inicioEm: { lte: dia },
      },
      orderBy: { inicioEm: 'desc' },
    });

    if (!planoParaAtivar) return null;

    // Fecha o plano atual
    await prisma.planoTreino.updateMany({
      where: { usuarioId, ativo: true },
      data:  { ativo: false, fimEm: dia },
    });

    // Ativa o novo
    return prisma.planoTreino.update({
      where: { id: planoParaAtivar.id },
      data:  { ativo: true },
    });
  },

  // Busca o treino do dia atual dentro do plano ativo
  async treinoDoDia(usuarioId: number) {
    const diaSemana = new Date().getDay();

    return this.buscarTreinoDoDia(usuarioId, diaSemana);
  },

  // Busca o treino do dia atual dentro do plano ativo
  async treinoDoDiaSelecionado(usuarioId: number, diaSemana: number) {
    return this.buscarTreinoDoDia(usuarioId, diaSemana);
  },

  async buscarTreinoDoDia(usuarioId: number, diaSemana: number) {
    const plano = await prisma.planoTreino.findFirst({
      where: { usuarioId, ativo: true },
      include: {
        dias: {
          where: { diaSemana },
          include: {
            treino: {
              include: {
                exercises: {
                  include: {
                    exercicio: true  // ← ExercicioCatalogo dentro de cada TreinoExercicio
                  },
                  orderBy: { ordem: 'asc' }
                }
              }
            }
          },
        },
      },
    });

    if (!plano) return null;

    return {
      plano,
      dia: plano.dias[0] ?? null,
    };
  },

  async deleteDias(planoId: number) {
    return prisma.planoTreinoDia.deleteMany({ where: { planoId } });
  },
};