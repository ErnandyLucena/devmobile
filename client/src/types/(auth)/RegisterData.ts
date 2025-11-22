export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  tipo: "funcionario" | "medico";
  [key: string]: any; 
};
