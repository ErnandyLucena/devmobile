import 'dotenv/config';
import express, { Request, Response } from 'express';
import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(express.json());

app.get('/api/test', (req: Request, res: Response) => {
  res.json({ message: 'Olá do servidor! A conexão com o Expo vai funcionar!' });
});

app.use('/api', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});

export default app;
