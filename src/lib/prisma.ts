import { PrismaClient } from '../generated/prisma'; // ← confira esse caminho
import { PrismaPg } from '@prisma/adapter-pg';
import { readFileSync } from 'fs';
import path from 'path';

const envFile = readFileSync(path.join(__dirname, '../../.env'), 'utf-8');
const env: Record<string, string> = {};
envFile.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const [key, ...rest] = trimmed.split('=');
  if (key && rest.length) {
    env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
  }
});

const DATABASE_URL = env['DATABASE_URL'];
const adapter = new PrismaPg({ connectionString: DATABASE_URL });

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ adapter, log: ['query', 'error'] });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}