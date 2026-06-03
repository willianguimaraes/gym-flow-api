import { prisma } from '../lib/prisma';

export const catalogoRepository = {

  async findAll(filtros?: { name?: string;  musculoPrimario?: string; equipamento?: string }) {
    return prisma.exercicioCatalogo.findMany({
      where: {
        name: filtros?.name
          ? { contains: filtros.name, mode: 'insensitive' }
          : undefined,
        musculoPrimario: filtros?.musculoPrimario
          ? { contains: filtros.musculoPrimario, mode: 'insensitive' }
          : undefined,
        equipamento: filtros?.equipamento
          ? { contains: filtros.equipamento, mode: 'insensitive' }
          : undefined,
      },
      orderBy: [
        { musculoPrimario: 'asc' },
        { name: 'asc' },
      ],
    });
  },

  async findById(id: number) {
    return prisma.exercicioCatalogo.findUnique({ where: { id } });
  },

  async findByMusculo(musculo: string) {
    return prisma.exercicioCatalogo.findMany({
      where: {
        OR: [
          { musculoPrimario: { contains: musculo, mode: 'insensitive' } },
          { musculosSecund:  { has: musculo } },
        ],
      },
      orderBy: { name: 'asc' },
    });
  },

  async create(data: {
    name:            string;
    desc:            string;
    musculoPrimario: string;
    musculosSecund:  string[];
    equipamento:     string;
    tag:             string;
  }) {
    return prisma.exercicioCatalogo.create({ data });
  },

  async update(id: number, data: Partial<{
    name:            string;
    desc:            string;
    musculoPrimario: string;
    musculosSecund:  string[];
    equipamento:     string;
    tag:             string;
  }>) {
    return prisma.exercicioCatalogo.update({ where: { id }, data });
  },

  async delete(id: number) {
    return prisma.exercicioCatalogo.delete({ where: { id } });
  },
};