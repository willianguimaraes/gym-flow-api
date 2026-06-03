import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './docs/swagger';
import authRouter from './routes/auth.routes';
import logRouter from './routes/log.routes';
import treinoRouter from './routes/treino.routes';
import planoRouter  from './routes/plano.routes';
import catalogoRouter from './routes/catalogo.routes';

const app: Application = express();

app.use(cors({
  origin: (origin, callback) => {
    // Permite requests sem origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    const allowed = [
      process.env.CORS_ORIGIN || 'http://localhost:9000',  // dev padrão
      process.env.CORS_ORIGIN_LOCAL || /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/,           // qualquer IP 192.168.x.x
      /^http:\/\/10\.\d+\.\d+\.\d+(:\d+)?$/,               // qualquer IP 10.x.x.x
      /^http:\/\/172\.(1[6-9]|2\d|3[01])\.\d+\.\d+(:\d+)?$/, // IP 172.16-31.x.x
    ];

    const permitido = allowed.some(item =>
      typeof item === 'string' ? item === origin : item.test(origin)
    );

    if (permitido) {
      callback(null, true);
    } else {
      callback(new Error(`CORS bloqueado para origem: ${origin}`));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
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

app.use('/api/auth',     authRouter);
app.use('/api/treinos',  treinoRouter);
app.use('/api/planos',   planoRouter);
app.use('/api/logs',     logRouter);
app.use('/api/catalogo', catalogoRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Rota não encontrada.' });
});

export default app;