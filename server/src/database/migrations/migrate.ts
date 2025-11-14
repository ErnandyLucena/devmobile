import { query, testConnection } from '../../config/db';
import fs from 'fs';
import path from 'path';

export const runMigrations = async (): Promise<void> => {
  console.log('Iniciando migrações...');
  
  const isConnected = await testConnection();
  if (!isConnected) {
    throw new Error('Não conectou ao PostgreSQL');
  }

  try {
    const sqlPath = path.join(__dirname, '001-schema-simples.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    await query(sql);
    
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error(' Erro nas migrações:', error);
    throw error;
  }
};

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log(' Migração concluída!');
      process.exit(0);
    })
    .catch((error) => {
      console.error(' Erro:', error);
      process.exit(1);
    });
}