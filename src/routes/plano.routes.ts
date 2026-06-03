import { Router, Request, Response } from 'express';
import { planoRepository } from '../repositories/plano.repository';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: Planos semanais de treino com vigência e histórico
 */

/**
 * @swagger
 * /api/planos/hoje:
 *   get:
 *     summary: Retorna o treino do dia atual baseado no plano ativo
 *     tags: [Planos]
 *     description: Verifica e ativa automaticamente planos agendados antes de retornar
 *     responses:
 *       200:
 *         description: Treino do dia com informações do plano
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TreinoDoDia'
 */

/**
 * @swagger
 * /api/planos/ativo:
 *   get:
 *     summary: Retorna o plano ativo completo com todos os dias da semana
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Plano ativo com dias e treinos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PlanoTreino'
 */

/**
 * @swagger
 * /api/planos/dia/{diaSemana}:
 *   get:
 *     summary: Retorna o treino de um dia específico da semana
 *     tags: [Planos]
 *     description: "Dias: 0=Domingo, 1=Segunda, 2=Terça, 3=Quarta, 4=Quinta, 5=Sexta, 6=Sábado"
 *     parameters:
 *       - in: path
 *         name: diaSemana
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 6
 *           example: 1
 *     responses:
 *       200:
 *         description: Treino do dia solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/TreinoDoDia'
 *       400:
 *         description: Dia da semana inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/planos:
 *   get:
 *     summary: Lista o histórico de todos os planos do usuário
 *     tags: [Planos]
 *     responses:
 *       200:
 *         description: Histórico de planos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PlanoTreino'
 *
 *   post:
 *     summary: Cria um novo plano de treino
 *     tags: [Planos]
 *     description: O plano é ativado automaticamente na data informada em inicioEm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanoDTO'
 *     responses:
 *       201:
 *         description: Plano criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PlanoTreino'
 */

/**
 * @swagger
 * /api/planos/{id}:
 *   get:
 *     summary: Busca plano por ID
 *     tags: [Planos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Plano encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/PlanoTreino'
 *       404:
 *         description: Plano não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   patch:
 *     summary: Atualiza nome, descrição ou data de início do plano
 *     tags: [Planos]
 *     description: Só é possível editar planos que ainda não estão ativos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "Hipertrofia - Fase 2 Revisado"
 *               descricao:
 *                 type: string
 *                 example: "Ajuste no volume"
 *               inicioEm:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-07-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Plano atualizado
 *       400:
 *         description: Não é possível editar um plano ativo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Plano não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

// Treino do dia atual
router.get('/hoje', authMiddleware, async (req: Request, res: Response) => {
  await planoRepository.ativarSeNecessario(req.usuario!.id);
  const resultado = await planoRepository.treinoDoDia(req.usuario!.id);
  res.json({ success: true, data: resultado });
});

// Plano ativo
router.get('/ativo', authMiddleware, async (req: Request, res: Response) => {
  await planoRepository.ativarSeNecessario(req.usuario!.id);
  const plano = await planoRepository.findAtivo(req.usuario!.id);
  res.json({ success: true, data: plano });
});

// Treino do dia desejado
router.get('/dia/:diaSemana', authMiddleware, async (req: Request, res: Response) => {
  const diaSemana = Number(req.params.diaSemana);

  if (Number.isNaN(diaSemana) || diaSemana < 0 || diaSemana > 6) {
    res.status(400).json({ success: false, message: 'Dia da semana inválido. Deve ser um número entre 0 e 6.' });
    return;
  }

  await planoRepository.ativarSeNecessario(req.usuario!.id);
  const resultado = await planoRepository.treinoDoDiaSelecionado(req.usuario!.id, diaSemana);
  res.json({ success: true, data: resultado });
});

// Histórico de planos
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  const planos = await planoRepository.findAll(req.usuario!.id);
  res.json({ success: true, data: planos });
});

// Busca plano por ID
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || Number.isNaN(id)) {
    res.status(400).json({ success: false, message: 'ID inválido.' });
    return;
  }

  const plano = await planoRepository.findById(id);

  if (!plano || plano.usuarioId !== req.usuario!.id) {
    res.status(404).json({ success: false, message: 'Plano não encontrado.' });
    return;
  }

  res.json({ success: true, data: plano });
});

// Criar plano
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  const { nome, descricao, inicioEm, dias } = req.body;

  if (!nome || !inicioEm || !dias?.length) {
    res.status(400).json({ success: false, message: 'nome, inicioEm e dias são obrigatórios.' });
    return;
  }

  const plano = await planoRepository.create({
    usuarioId: req.usuario!.id,
    nome,
    descricao,
    inicioEm:  new Date(inicioEm),
    dias,
  });

  res.status(201).json({ success: true, data: plano });
});

// Atualizar plano (só nome, descrição e data de início — desde que não ativo)
router.patch('/:id', authMiddleware, async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id || Number.isNaN(id)) {
    res.status(400).json({ success: false, message: 'ID inválido.' });
    return;
  }

  const plano = await planoRepository.findById(id);

  if (!plano || plano.usuarioId !== req.usuario!.id) {
    res.status(404).json({ success: false, message: 'Plano não encontrado.' });
    return;
  }

  if (plano.ativo) {
    res.status(400).json({ success: false, message: 'Não é possível editar um plano ativo.' });
    return;
  }

  const { nome, descricao, inicioEm } = req.body;
  const atualizado = await planoRepository.update(id, {
    nome,
    descricao,
    inicioEm: inicioEm ? new Date(inicioEm) : undefined,
  });

  res.json({ success: true, data: atualizado });
});

export default router;