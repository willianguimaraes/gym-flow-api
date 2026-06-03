import { Router, Request, Response } from 'express';
import { exerciseLogRepository } from '../repositories/exerciseLog.repository';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs
 *   description: Registro de séries e evolução
 */

/**
 * @swagger
 * /api/logs/sessao/{sessionId}:
 *   get:
 *     summary: Retorna todos os logs de uma sessão com as séries
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 */
router.get('/sessao/:sessionId', authMiddleware, async (req: Request, res: Response) => {
  const sessionId = Number(req.params.sessionId);

  if (isNaN(sessionId)) {
    res.status(400).json({ success: false, message: 'ID inválido.' });
    return;
  }

  const logs = await exerciseLogRepository.findBySession(sessionId);
  res.json({ success: true, data: logs });
});

/**
 * @swagger
 * /api/logs/exercicio/{exercicioId}/evolucao:
 *   get:
 *     summary: Retorna a evolução de um exercício ao longo do tempo
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 */
router.get('/exercicio/:exercicioId/evolucao', authMiddleware, async (req: Request, res: Response) => {
  const exercicioId = Number(req.params.exercicioId);

  if (isNaN(exercicioId)) {
    res.status(400).json({ success: false, message: 'ID inválido.' });
    return;
  }

  const evolucao = await exerciseLogRepository.findByExercicio(exercicioId);
  res.json({ success: true, data: evolucao });
});

/**
 * @swagger
 * /api/logs/musculo/{musculo}/evolucao:
 *   get:
 *     summary: Retorna a evolução de todos os exercícios de um músculo
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 */
router.get('/musculo/:musculo/evolucao', authMiddleware, async (req: Request, res: Response) => {
  const { musculo } = req.params;
  const evolucao = await exerciseLogRepository.findByMusculo(decodeURIComponent(musculo));
  res.json({ success: true, data: evolucao });
});

/**
 * @swagger
 * /api/logs:
 *   post:
 *     summary: Registra ou atualiza o log de um exercício na sessão
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { sessionId, exercicioId, setsDone, completed, weightUsed } = req.body;

  if (!sessionId || !exercicioId || setsDone === undefined) {
    res.status(400).json({ success: false, message: 'sessionId, exercicioId e setsDone são obrigatórios.' });
    return;
  }

  const log = await exerciseLogRepository.upsert({ sessionId, exercicioId, setsDone, completed, weightUsed });
  res.json({ success: true, data: log });
});

/**
 * @swagger
 * /api/logs/{logId}/set:
 *   post:
 *     summary: Registra uma série individual dentro de um log
 *     tags: [Logs]
 *     security:
 *       - bearerAuth: []
 */
router.post('/:logId/set', authMiddleware, async (req: Request, res: Response) => {
  const logId = Number(req.params.logId);
  const { setNum, reps, weightUsed } = req.body;

  if (isNaN(logId) || !setNum || !reps || !weightUsed) {
    res.status(400).json({ success: false, message: 'logId, setNum, reps e weightUsed são obrigatórios.' });
    return;
  }

  const set = await exerciseLogRepository.addSet({ logId, setNum, reps, weightUsed });
  res.json({ success: true, data: set });
});

export default router;