/**
 * @swagger
 * components:
 *   schemas:
 *
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: peito_1
 *         name:
 *           type: string
 *           example: Supino Reto com Barra
 *         sets:
 *           type: integer
 *           example: 4
 *         reps:
 *           type: integer
 *           example: 10
 *         rest:
 *           type: integer
 *           description: Tempo de descanso em segundos
 *           example: 90
 *         weight:
 *           type: string
 *           example: 80kg
 *
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: peito
 *         name:
 *           type: string
 *           example: Peito
 *         category:
 *           type: string
 *           example: Musculação
 *         duration:
 *           type: integer
 *           description: Duração em minutos
 *           example: 55
 *         kcal:
 *           type: integer
 *           example: 420
 *         difficulty:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 3
 *         muscles:
 *           type: array
 *           items:
 *             type: string
 *           example: ['Peitoral', 'Tríceps']
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 *
 *     DaySchedule:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *           example: segunda
 *         dayIndex:
 *           type: integer
 *           description: Índice JS do dia (0 = domingo, 1 = segunda...)
 *           example: 1
 *         title:
 *           type: string
 *           example: Peito + Cardio
 *         isRest:
 *           type: boolean
 *           example: false
 *         workouts:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Workout'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Nenhum treino encontrado para "xpto".
 *         available:
 *           type: array
 *           items:
 *             type: string
 *           example: [segunda, terca, quarta]
 */

// Este arquivo existe apenas para hospedar os schemas do Swagger.
export {};