import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import workoutsRouter from './routes/workouts.routes';

const app: Application = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:9000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: '💪 GymFlow API rodando!', version: '1.0.0' });
});

app.use('/api/workouts', workoutsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

export default app;