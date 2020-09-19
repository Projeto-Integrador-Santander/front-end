export interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  senha: string;
  whatsapp: string;
  materias: AlunoMateria[];
}

export interface AlunoMateria {
  idAluno: number;
  idMateria: number;
}

