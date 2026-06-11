import { Router, Request, Response } from 'express';
import { treinoRepository } from '../repositories/treino.repository';
import { exercicioRepository } from '../repositories/exercicio.repository';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Treinos
 *   description: Treinos personalizados do usuário
 */

/**
 * @swagger
 * /api/treinos:
 *   get:
 *     summary: Lista todos os treinos do usuário autenticado
 *     tags: [Treinos]
 *     responses:
 *       200:
 *         description: Lista de treinos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Treino'
 *
 *   post:
 *     summary: Cria um novo treino para o usuário
 *     tags: [Treinos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TreinoDTO'
 *     responses:
 *       201:
 *         description: Treino criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Treino'
 */

/**
 * @swagger
 * /api/treinos/{id}:
 *   get:
 *     summary: Busca treino por ID
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do treino com exercícios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/Treino'
 *       404:
 *         description: Treino não encontrado
 *
 *   patch:
 *     summary: Atualiza dados do treino
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TreinoDTO'
 *     responses:
 *       200:
 *         description: Treino atualizado
 *       404:
 *         description: Treino não encontrado
 *
 *   delete:
 *     summary: Remove o treino
 *     tags: [Treinos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Treino removido
 *       404:
 *         description: Treino não encontrado
 */

/**
 * @swagger
 * /api/treinos/{treinoId}/exercicios/{exercicioId}:
 *   patch:
 *     summary: Atualiza configuração de um exercício dentro do treino
 *     tags: [Treinos]
 *     description: Altera sets, reps, rest e weight do exercício dentro deste treino específico
 *     parameters:
 *       - in: path
 *         name: treinoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: exercicioId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sets:   { type: integer, example: 4 }
 *               reps:   { type: integer, example: 10 }
 *               rest:   { type: integer, example: 90 }
 *               weight: { type: number,  example: 82.5 }
 *               ordem:  { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Exercício atualizado
 *       404:
 *         description: Treino não encontrado
 */

// Lista todos os treinos do usuário
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const treinos = await treinoRepository.findAll(req.usuario!.id);
  res.json({ success: true, data: treinos });
});

// Busca treino por ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const treino = await treinoRepository.findById(id, req.usuario!.id);

  if (!treino) {
    res.status(404).json({ success: false, message: 'Treino não encontrado.' });
    return;
  }

  res.json({ success: true, data: treino });
});

// Criar treino
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { name, category, color, duration, kcal, difficulty, description, muscles, exercises } = req.body;

  if (!name || !category || !color || !muscles?.length || !exercises?.length) {
    res.status(400).json({ success: false, message: 'Campos obrigatórios faltando.' });
    return;
  }

  const treino = await treinoRepository.create({
    usuarioId: req.usuario!.id,
    name, category, color, duration, kcal, difficulty, description, muscles,
    exercises: exercises.map((ex: any) => ({
      exercicioId: ex.exercicioId,
      ordem:       ex.ordem,
      sets:        ex.sets,
      reps:        ex.reps,
      rest:        ex.rest,
      weight:      ex.weight,
      observacao:  ex.observacao ?? '',
    })),
  });

  res.status(201).json({ success: true, data: treino });
});

// Atualizar treino
router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const treino = await treinoRepository.findById(id, req.usuario!.id);

  if (!treino) {
    res.status(404).json({ success: false, message: 'Treino não encontrado.' });
    return;
  }

  const { name, category, color, duration, kcal, difficulty, description, muscles } = req.body;
  const atualizado = await treinoRepository.update(id, req.usuario!.id, {
    name, category, color, duration, kcal, difficulty, description, muscles,
  });

  res.json({ success: true, data: atualizado });
});

// Deletar treino
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const treino = await treinoRepository.findById(id, req.usuario!.id);

  if (!treino) {
    res.status(404).json({ success: false, message: 'Treino não encontrado.' });
    return;
  }

  await treinoRepository.delete(id, req.usuario!.id);
  res.json({ success: true, message: 'Treino removido.' });
});

// Atualizar exercício do treino
router.patch('/:treinoId/exercicios/:exercicioId', authMiddleware, async (req: Request, res: Response) => {
  const treinoId    = Number(req.params.treinoId);
  const exercicioId = Number(req.params.exercicioId);

  const treino = await treinoRepository.findById(treinoId, req.usuario!.id);
  if (!treino) {
    res.status(404).json({ success: false, message: 'Treino não encontrado.' });
    return;
  }

  const { name, desc, sets, reps, rest, weight, tag } = req.body;
  const atualizado = await exercicioRepository.update(exercicioId, { name, desc, sets, reps, rest, weight, tag });

  res.json({ success: true, data: atualizado });
});

export default router;