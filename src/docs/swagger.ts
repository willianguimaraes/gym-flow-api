import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GymFlow API',
      version: '2.0.0',
      description: `
## GymFlow — API de Gerenciamento de Treinos

API completa para gerenciamento de treinos, planos semanais, evolução de carga e acompanhamento corporal.

### Autenticação
Todos os endpoints (exceto \`/api/auth/register\` e \`/api/auth/login\`) exigem um token JWT.

Após o login, inclua o token no header:
\`\`\`
Authorization: Bearer <seu_token>
\`\`\`

### Módulos disponíveis
- **Auth** — Cadastro, login e perfil do usuário
- **Catálogo** — Exercícios globais disponíveis para montagem de treinos
- **Treinos** — Treinos personalizados do usuário
- **Planos** — Planos semanais com vigência e histórico
- **Sessões** — Registro de treinos realizados
- **Logs** — Séries, repetições e cargas por exercício
      `,
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desenvolvimento' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // ── AUTH ──────────────────────────────────────────────
        RegisterDTO: {
          type: 'object',
          required: ['nome', 'usuario', 'email', 'senha'],
          properties: {
            nome:    { type: 'string', example: 'Willian Guimarães' },
            usuario: { type: 'string', example: 'willian' },
            email:   { type: 'string', example: 'willian@email.com' },
            senha:   { type: 'string', example: '123456' },
            celular: { type: 'string', example: '41999999999' },
            altura:  { type: 'number', example: 1.78 },
            peso:    { type: 'number', example: 80.5 },
          },
        },
        LoginDTO: {
          type: 'object',
          required: ['usuario', 'senha'],
          properties: {
            usuario: { type: 'string', example: 'admin' },
            senha:   { type: 'string', example: '123456' },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'object',
              properties: {
                token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                usuario: {
                  type: 'object',
                  properties: {
                    id:      { type: 'integer', example: 1 },
                    nome:    { type: 'string',  example: 'Willian Guimarães' },
                    usuario: { type: 'string',  example: 'willian' },
                    email:   { type: 'string',  example: 'willian@email.com' },
                  },
                },
              },
            },
          },
        },
        Usuario: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            nome:      { type: 'string',  example: 'Willian Guimarães' },
            usuario:   { type: 'string',  example: 'willian' },
            email:     { type: 'string',  example: 'willian@email.com' },
            celular:   { type: 'string',  example: '41999999999' },
            altura:    { type: 'number',  example: 1.78 },
            peso:      { type: 'number',  example: 80.5 },
            createdAt: { type: 'string',  format: 'date-time' },
            updatedAt: { type: 'string',  format: 'date-time' },
          },
        },

        // ── CATALOGO ──────────────────────────────────────────
        ExercicioCatalogo: {
          type: 'object',
          properties: {
            id:              { type: 'integer', example: 1 },
            name:            { type: 'string',  example: 'Supino Reto com Barra' },
            desc:            { type: 'string',  example: 'Movimento base para o peitoral maior.' },
            musculoPrimario: { type: 'string',  example: 'Peitoral' },
            musculosSecund:  { type: 'array', items: { type: 'string' }, example: ['Tríceps', 'Deltóide Ant.'] },
            equipamento:     { type: 'string',  example: 'Barra' },
            tag:             { type: 'string',  example: 'Base' },
            createdAt:       { type: 'string',  format: 'date-time' },
          },
        },
        ExercicioCatalogoDTO: {
          type: 'object',
          required: ['name', 'desc', 'musculoPrimario', 'equipamento', 'tag'],
          properties: {
            name:            { type: 'string',  example: 'Supino Reto com Barra' },
            desc:            { type: 'string',  example: 'Movimento base para o peitoral maior.' },
            musculoPrimario: { type: 'string',  example: 'Peitoral' },
            musculosSecund:  { type: 'array', items: { type: 'string' }, example: ['Tríceps'] },
            equipamento:     { type: 'string',  example: 'Barra' },
            tag:             { type: 'string',  example: 'Base' },
          },
        },

        // ── TREINO ────────────────────────────────────────────
        TreinoExercicio: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            treinoId:    { type: 'integer', example: 1 },
            exercicioId: { type: 'integer', example: 1 },
            exercicio:   { $ref: '#/components/schemas/ExercicioCatalogo' },
            ordem:       { type: 'integer', example: 1 },
            sets:        { type: 'integer', example: 4 },
            reps:        { type: 'integer', example: 10 },
            rest:        { type: 'integer', example: 90, description: 'Descanso em segundos' },
            weight:      { type: 'number',  example: 80, description: '0 = peso corporal' },
          },
        },
        Treino: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            usuarioId:   { type: 'integer', example: 1 },
            name:        { type: 'string',  example: 'peito' },
            category:    { type: 'string',  example: 'Musculação' },
            color:       { type: 'string',  example: '#E85D04' },
            duration:    { type: 'integer', example: 55, description: 'Duração em minutos' },
            kcal:        { type: 'integer', example: 420 },
            difficulty:  { type: 'integer', minimum: 1, maximum: 5, example: 3 },
            description: { type: 'string',  example: 'Treino focado em peitoral.' },
            muscles:     { type: 'array', items: { type: 'string' }, example: ['Peitoral', 'Tríceps'] },
            exercises:   { type: 'array', items: { $ref: '#/components/schemas/TreinoExercicio' } },
            createdAt:   { type: 'string', format: 'date-time' },
          },
        },
        TreinoDTO: {
          type: 'object',
          required: ['name', 'category', 'color', 'duration', 'kcal', 'difficulty', 'muscles', 'exercises'],
          properties: {
            name:        { type: 'string',  example: 'peito' },
            category:    { type: 'string',  example: 'Musculação' },
            color:       { type: 'string',  example: '#E85D04' },
            duration:    { type: 'integer', example: 55 },
            kcal:        { type: 'integer', example: 420 },
            difficulty:  { type: 'integer', minimum: 1, maximum: 5, example: 3 },
            description: { type: 'string',  example: 'Treino focado em peitoral.' },
            muscles:     { type: 'array', items: { type: 'string' }, example: ['Peitoral', 'Tríceps'] },
            exercises: {
              type: 'array',
              items: {
                type: 'object',
                required: ['exercicioId', 'ordem', 'sets', 'reps', 'rest', 'weight'],
                properties: {
                  exercicioId: { type: 'integer', example: 1 },
                  ordem:       { type: 'integer', example: 1 },
                  sets:        { type: 'integer', example: 4 },
                  reps:        { type: 'integer', example: 10 },
                  rest:        { type: 'integer', example: 90 },
                  weight:      { type: 'number',  example: 80 },
                },
              },
            },
          },
        },

        // ── PLANO ─────────────────────────────────────────────
        PlanoTreinoDia: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            planoId:   { type: 'integer', example: 1 },
            diaSemana: { type: 'integer', example: 1, description: '0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab' },
            isRest:    { type: 'boolean', example: false },
            treinoId:  { type: 'integer', example: 1, nullable: true },
            treino:    { $ref: '#/components/schemas/Treino', nullable: true },
          },
        },
        PlanoTreino: {
          type: 'object',
          properties: {
            id:        { type: 'integer', example: 1 },
            usuarioId: { type: 'integer', example: 1 },
            nome:      { type: 'string',  example: 'Plano Hipertrofia - Fase 1' },
            descricao: { type: 'string',  example: 'Foco em volume e progressão de carga.' },
            inicioEm:  { type: 'string',  format: 'date-time' },
            fimEm:     { type: 'string',  format: 'date-time', nullable: true },
            ativo:     { type: 'boolean', example: true },
            dias:      { type: 'array', items: { $ref: '#/components/schemas/PlanoTreinoDia' } },
            createdAt: { type: 'string',  format: 'date-time' },
          },
        },
        PlanoDTO: {
          type: 'object',
          required: ['nome', 'inicioEm', 'dias'],
          properties: {
            nome:      { type: 'string',  example: 'Plano Hipertrofia - Fase 1' },
            descricao: { type: 'string',  example: 'Foco em volume e progressão de carga.' },
            inicioEm:  { type: 'string',  format: 'date-time', example: '2025-06-01T00:00:00.000Z' },
            dias: {
              type: 'array',
              items: {
                type: 'object',
                required: ['diaSemana', 'isRest'],
                properties: {
                  diaSemana: { type: 'integer', example: 1 },
                  isRest:    { type: 'boolean', example: false },
                  treinoId:  { type: 'integer', example: 1, nullable: true },
                },
              },
            },
          },
        },
        TreinoDoDia: {
          type: 'object',
          properties: {
            plano: { $ref: '#/components/schemas/PlanoTreino' },
            dia:   { $ref: '#/components/schemas/PlanoTreinoDia', nullable: true },
          },
        },

        // ── SESSAO ────────────────────────────────────────────
        WorkoutSession: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            usuarioId:   { type: 'integer', example: 1 },
            treinoId:    { type: 'integer', example: 1 },
            planoId:     { type: 'integer', example: 1, nullable: true },
            trainedAt:   { type: 'string',  format: 'date-time' },
            durationMin: { type: 'integer', example: 52, nullable: true },
            notes:       { type: 'string',  example: 'Boa sessão, aumentei carga no supino.', nullable: true },
            logs:        { type: 'array', items: { $ref: '#/components/schemas/ExerciseLog' } },
          },
        },
        SessaoDTO: {
          type: 'object',
          required: ['treinoId'],
          properties: {
            treinoId: { type: 'integer', example: 1 },
            planoId:  { type: 'integer', example: 1, nullable: true },
            notes:    { type: 'string',  example: 'Dia pesado, mas completei tudo.' },
          },
        },

        // ── LOG ───────────────────────────────────────────────
        ExercicioSet: {
          type: 'object',
          properties: {
            id:         { type: 'integer', example: 1 },
            logId:      { type: 'integer', example: 1 },
            setNum:     { type: 'integer', example: 1 },
            reps:       { type: 'integer', example: 10 },
            weightUsed: { type: 'number',  example: 82.5, description: '0 = peso corporal' },
            createdAt:  { type: 'string',  format: 'date-time' },
          },
        },
        ExerciseLog: {
          type: 'object',
          properties: {
            id:                { type: 'integer', example: 1 },
            sessionId:         { type: 'integer', example: 1 },
            treinoExercicioId: { type: 'integer', example: 1 },
            substituidoPorId:  { type: 'integer', example: 5, nullable: true, description: 'ID do ExercicioCatalogo usado no lugar' },
            substituidoPor:    { $ref: '#/components/schemas/ExercicioCatalogo', nullable: true },
            setsDone:          { type: 'integer', example: 4 },
            completed:         { type: 'boolean', example: true },
            weightUsed:        { type: 'number',  example: 80, nullable: true },
            sets:              { type: 'array', items: { $ref: '#/components/schemas/ExercicioSet' } },
            createdAt:         { type: 'string',  format: 'date-time' },
          },
        },
        LogDTO: {
          type: 'object',
          required: ['sessionId', 'treinoExercicioId', 'setsDone', 'completed'],
          properties: {
            sessionId:         { type: 'integer', example: 1 },
            treinoExercicioId: { type: 'integer', example: 1 },
            setsDone:          { type: 'integer', example: 4 },
            completed:         { type: 'boolean', example: true },
            weightUsed:        { type: 'number',  example: 80, nullable: true },
            substituidoPorId:  { type: 'integer', example: 5, nullable: true },
          },
        },
        SetDTO: {
          type: 'object',
          required: ['setNum', 'reps', 'weightUsed'],
          properties: {
            setNum:     { type: 'integer', example: 1 },
            reps:       { type: 'integer', example: 10 },
            weightUsed: { type: 'number',  example: 82.5 },
          },
        },

        // ── RESPONSES ─────────────────────────────────────────
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string',  example: 'Recurso não encontrado.' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string',  example: 'Operação realizada com sucesso.' },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);