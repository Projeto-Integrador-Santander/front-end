export interface Aluno {
  id: number;
  login: AlunoLogin;
  materias: AlunoMateria[];
  perfil: AlunoPerfil;
}

export interface AlunoLogin {
  id: number;
  email: string;
  senha: string;
}

export interface AlunoPerfil {
  nome: string;
  sobrenome: string;
  cpf: string;
  numero_whatsapp: string;
}

export interface AlunoMateria {
  id: number;
}

