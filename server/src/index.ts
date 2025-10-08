import express, { Request, Response } from 'express';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/test', (req: Request, res: Response) => {
  console.log('Recebida requisição em /api/test');
  res.json({ message: 'Olá do servidor! A conexão com o Expo vai funcionar!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});