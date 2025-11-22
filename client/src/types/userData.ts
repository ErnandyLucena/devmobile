export interface UserData {
 // Campos comuns
  nomeCompleto?: string;
  nomeAbreviado?: string;
  email: string;
  cpf?: string;
  tel?: string;
  situacao?: string[];
  dataCriacao?: any;
  
  // Campos médicos
  codigoConselho?: string;
  especialidade?: string;
  tipo?: boolean;
  
  // Campos funcionários
  cargo?: string;
  setor?: string;
  dataAdmissao?: any;
}