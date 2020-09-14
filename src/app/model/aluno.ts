export interface Aluno {
  id: number;
  nome: string;
  email: string;
  senha: string;
  whatsapp: string;
  materias: AlunoMateria[];
}

export interface AlunoMateria {
  idAluno: number;
  idMateria: number;
}

