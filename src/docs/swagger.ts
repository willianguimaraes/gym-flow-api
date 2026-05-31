import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GymFlow API',
      version: '1.0.0',
      description: 'API para gerenciamento de treinos semanais',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/docs/schemas.ts'], // onde o swagger vai ler as anotações
};

export const swaggerSpec = swaggerJsdoc(options);