export interface Profile {
  id: number;
  usuario_id: number;
  nome: string;
  cpf?: string;
  telefone?: string;
  data_nascimento?: Date;
}