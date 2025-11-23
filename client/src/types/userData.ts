export interface UserData {
 // Campos comuns
  nomeCompleto?: string;
  nomeAbreviado?: string;
  email: string;
  cpf?: string;
  tel?: string;
  situacao?: boolean;
  dataCriacao?: any;
  
  codigoConselho?: string;
  especialidade?: string;
  tipo?: boolean;

  cargo?: string;
  setor?: string;
  dataAdmissao?: any;
}