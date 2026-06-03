import { prisma } from '../lib/prisma';
import { RegisterDTO } from '../types/auth.types';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const usuarioRepository = {

  async findByUsuario(usuario: string) {
    return prisma.usuario.findUnique({
      where: { usuario },
    });
  },

  async findByEmail(email: string) {
    return prisma.usuario.findUnique({
      where: { email },
    });
  },

  async findById(id: number) {
    return prisma.usuario.findUnique({
      where: { id },
      select: {
        id:        true,
        nome:      true,
        usuario:   true,
        email:     true,
        celular:   true,
        altura:    true,
        peso:      true,
        createdAt: true,
        updatedAt: true,
        // senha nunca é retornada
      },
    });
  },

  async create(data: RegisterDTO) {
    const senhaHash = await bcrypt.hash(data.senha, SALT_ROUNDS);

    return prisma.usuario.create({
      data: {
        nome:    data.nome,
        usuario: data.usuario,
        email:   data.email,
        senha:   senhaHash,
        celular: data.celular,
        altura:  data.altura,
        peso:    data.peso,
      },
      select: {
        id:        true,
        nome:      true,
        usuario:   true,
        email:     true,
        celular:   true,
        altura:    true,
        peso:      true,
        createdAt: true,
      },
    });
  },

  async update(id: number, data: Partial<Omit<RegisterDTO, 'senha'>>) {
    return prisma.usuario.update({
      where: { id },
      data,
      select: {
        id:        true,
        nome:      true,
        usuario:   true,
        email:     true,
        celular:   true,
        altura:    true,
        peso:      true,
        updatedAt: true,
      },
    });
  },

  async verificarSenha(senhaPlana: string, senhaHash: string): Promise<boolean> {
    console.log('Senha encriptada:', bcrypt.hash(senhaPlana, SALT_ROUNDS));
    return bcrypt.compare(senhaPlana, senhaHash);
  },
};