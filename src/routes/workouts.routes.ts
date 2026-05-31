import { Router, Request, Response } from 'express';
import weeklySchedule from '../data/workouts';
import { DiasTreino, ApiResponse } from '../types/workout.types';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Workouts
 *   description: Endpoints para gerenciar treinos semanais
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Retorna a programação de treinos de toda a semana
 *     description: Retorna um array com todos os dias da semana contendo informações dos treinos
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Sucesso - Lista completa de treinos da semana
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
 *                     type: object
 *                     properties:
 *                       abbr:
 *                         type: string
 *                         example: "SEG"
 *                       num:
 *                         type: number
 *                         example: 1
 *                       fullName:
 *                         type: string
 *                         example: "Segunda-feira"
 *                       isRest:
 *                         type: boolean
 *                         example: false
 *                       title:
 *                         type: string
 *                         example: "Peito"
 *                       treino:
 *                         type: object
 *                         nullable: true
 */
router.get('/', (req: Request, res: Response<ApiResponse<DiasTreino[]>>) => {
  res.json({ success: true, data: weeklySchedule });
});

/**
 * @swagger
 * /api/workouts/today:
 *   get:
 *     summary: Retorna o treino do dia atual
 *     description: Identifica o dia de hoje e retorna os treinos correspondentes
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: Sucesso - Treino do dia de hoje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     abbr:
 *                       type: string
 *                       example: "SEG"
 *                     num:
 *                       type: number
 *                       example: 1
 *                     fullName:
 *                       type: string
 *                     title:
 *                       type: string
 *                     isRest:
 *                       type: boolean
 *                     treino:
 *                       type: object
 *                       nullable: true
 *       404:
 *         description: Erro - Dia não encontrado
 */
router.get('/today', (req: Request, res: Response<ApiResponse<DiasTreino>>) => {
  const todayIndex = new Date().getDay();
  const today = weeklySchedule.find(d => d.num === (todayIndex === 0 ? 7 : todayIndex));

  if (!today) {
    return res.status(404).json({ success: false, message: 'Dia não encontrado.' });
  }

  res.json({ success: true, data: today });
});

/**
 * @swagger
 * /api/workouts/{day}:
 *   get:
 *     summary: Retorna o treino de um dia específico da semana
 *     description: Busca o treino pelo nome do dia (segunda, terça, quarta, quinta, sexta, sábado, domingo)
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: string
 *           enum: [seg, ter, qua, qui, sex, sab, dom]
 *         description: Nome do dia da semana em português
 *         example: seg
 *     responses:
 *       200:
 *         description: Sucesso - Treino encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     abbr:
 *                       type: string
 *                     num:
 *                       type: number
 *                     fullName:
 *                       type: string
 *                     title:
 *                       type: string
 *                     isRest:
 *                       type: boolean
 *                     treino:
 *                       type: object
 *                       nullable: true
 *       404:
 *         description: Erro - Dia não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 available:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/:day', (req: Request, res: Response<ApiResponse<DiasTreino>>) => {
  const { day } = req.params;
  const dayMap: { [key: string]: number } = {
    'seg': 1,
    'ter': 2,
    'qua': 3,
    'qui': 4,
    'sex': 5,
    'sab': 6,
    'dom': 7
  };

  const dayNum = dayMap[day.toLowerCase()];
  const found = weeklySchedule.find(d => d.num === dayNum);

  if (!found) {
    return res.status(404).json({
      success: false,
      message: `Nenhum treino encontrado para "${day}".`,
      available: ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'],
    });
  }

  res.json({ success: true, data: found });
});

export default router;