import { Pool, QueryResult, QueryResultRow } from 'pg';

export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'hospital_db',
  password: process.env.DB_PASSWORD || 'sp8799',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, 
  idleTimeoutMillis: 30000, 
  connectionTimeoutMillis: 2000,
});

export const testConnection = async (): Promise<boolean> => {
  try {
    const client = await pool.connect();
    console.log(' Conectado ao PostgreSQL com sucesso!');
    client.release();
    return true;
  } catch (error) {
    console.error(' Erro ao conectar com PostgreSQL:', error);
    return false;
  }
};

export const query = async <T extends QueryResultRow>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> => {
  const start = Date.now();
  try {
    const result = await pool.query<T>(text, params);
    const duration = Date.now() - start;
    console.log(` Query executada em ${duration}ms:`, text.substring(0, 100));
    return result;
  } catch (error) {
    console.error(' Erro na query:', { text, params, error });
    throw error;
  }
};

export const queryOne = async <T extends QueryResultRow>(
  text: string,
  params?: any[]
): Promise<T | null> => {
  const result = await query<T>(text, params);
  return result.rows[0] || null;
};

export const transaction = async <T>(
  callback: (client: any) => Promise<T>
): Promise<T> => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const closePool = async (): Promise<void> => {
  await pool.end();
  console.log(' Pool de conexões PostgreSQL fechado');
};

export default {
  pool,
  testConnection,
  query,
  queryOne,
  transaction,
  closePool,
};