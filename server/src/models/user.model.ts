export interface User {
  id: number;
  email: string;
  password_hash: string;
  tipo: string;
  data_criacao: Date;
}
