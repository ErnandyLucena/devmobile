import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import routes from './routes';
import { errorMiddleware } from './middleware/error.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';
import { testConnection } from './config/db';
// import { runMigrations } from './database/migrations/migrate'; // COMENTADO
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(helmet());
app.use(cors());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));

app.use(express.json());
app.use(loggingMiddleware);

setupSwagger(app);

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à API Hospitalar',
    timestamp: new Date().toISOString(),
    docs: 'http://localhost:3001/api-docs'
  });
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    console.log('🔄 Iniciando servidor...');
    
    const isConnected = await testConnection();
    if (!isConnected) {
      console.log('❌ Não foi possível conectar ao PostgreSQL');
      process.exit(1);
    }

    console.log('✅ Conectado ao PostgreSQL');
    
    // console.log('🔄 Executando migrações...');
    // await runMigrations();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`1-Servidor rodando em http://localhost:${PORT}`);
      console.log(`1-Documentação e testes: http://localhost:${PORT}/api-docs`);
      console.log(`3-API Routes: http://localhost:${PORT}/api`);
      console.log(`4-Health check: http://localhost:${PORT}/`);
      console.log(`5-Para executar migrações: npm run migrate`);
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;