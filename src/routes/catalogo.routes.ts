import { Router, Request, Response } from 'express';
import { catalogoRepository } from '../repositories/catalogo.repository';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Catálogo
 *   description: Exercícios disponíveis para montagem de treinos
 */

/**
 * @swagger
 * /api/catalogo:
 *   get:
 *     summary: Lista todos os exercícios do catálogo
 *     tags: [Catálogo]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra por nome do exercício
 *         example: Supino
 *       - in: query
 *         name: Busca todos com filtro opcional
 *         schema:
 *           type: string
 *         description: Busca todos com filtro opcional
 *         example: Peitoral
 *       - in: query
 *         name: equipamento
 *         schema:
 *           type: string
 *         description: Filtra por equipamento
 *         example: Barra
 *     responses:
 *       200:
 *         description: Lista de exercícios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExercicioCatalogo'
 */

/**
 * @swagger
 * /api/catalogo/musculo/{musculo}:
 *   get:
 *     summary: Lista exercícios por músculo (primário ou secundário)
 *     tags: [Catálogo]
 *     description: Útil para sugerir substituições quando um equipamento está ocupado
 *     parameters:
 *       - in: path
 *         name: musculo
 *         required: true
 *         schema:
 *           type: string
 *         example: Peitoral
 *     responses:
 *       200:
 *         description: Exercícios que trabalham o músculo informado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExercicioCatalogo'
 */

/**
 * @swagger
 * /api/catalogo/{id}:
 *   get:
 *     summary: Busca exercício por ID
 *     tags: [Catálogo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dados do exercício
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/ExercicioCatalogo'
 *       404:
 *         description: Exercício não encontrado
 *
 *   patch:
 *     summary: Atualiza um exercício do catálogo
 *     tags: [Catálogo]
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
 *             $ref: '#/components/schemas/ExercicioCatalogoDTO'
 *     responses:
 *       200:
 *         description: Exercício atualizado
 *       404:
 *         description: Exercício não encontrado
 *
 *   delete:
 *     summary: Remove um exercício do catálogo
 *     tags: [Catálogo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercício removido
 *       404:
 *         description: Exercício não encontrado
 */

/**
 * @swagger
 * /api/catalogo:
 *   post:
 *     summary: Adiciona exercício ao catálogo
 *     tags: [Catálogo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExercicioCatalogoDTO'
 *     responses:
 *       201:
 *         description: Exercício criado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/ExercicioCatalogo'
 */

// Lista com filtros opcionais: ?musculoPrimario=Peitoral&equipamento=Barra
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const { name, musculoPrimario, equipamento } = req.query as Record<string, string>;
  const lista = await catalogoRepository.findAll({ name, musculoPrimario, equipamento });
  res.json({ success: true, data: lista });
});

// Busca por músculo (para sugerir substituições)
router.get('/musculo/:musculo', authMiddleware, async (req: Request, res: Response) => {
  const lista = await catalogoRepository.findByMusculo(
    decodeURIComponent(req.params.musculo)
  );
  res.json({ success: true, data: lista });
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await catalogoRepository.findById(id);

  if (!item) {
    res.status(404).json({ success: false, message: 'Exercício não encontrado.' });
    return;
  }

  res.json({ success: true, data: item });
});

// CRUD — futuramente pode proteger com role admin
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { name, desc, musculoPrimario, musculosSecund, equipamento, tag } = req.body;

  if (!name || !desc || !musculoPrimario || !equipamento || !tag) {
    res.status(400).json({ success: false, message: 'Campos obrigatórios faltando.' });
    return;
  }

  const item = await catalogoRepository.create({
    name, desc, musculoPrimario,
    musculosSecund: musculosSecund ?? [],
    equipamento, tag,
  });

  res.status(201).json({ success: true, data: item });
});

router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await catalogoRepository.findById(id);

  if (!item) {
    res.status(404).json({ success: false, message: 'Exercício não encontrado.' });
    return;
  }

  const atualizado = await catalogoRepository.update(id, req.body);
  res.json({ success: true, data: atualizado });
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = await catalogoRepository.findById(id);

  if (!item) {
    res.status(404).json({ success: false, message: 'Exercício não encontrado.' });
    return;
  }

  await catalogoRepository.delete(id);
  res.json({ success: true, message: 'Exercício removido do catálogo.' });
});

export default router;