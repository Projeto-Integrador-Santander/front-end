export interface Professor {
  id: number;
  login: ProfessorLogin;
  materia: ProfessorMateria[];
  perfil: ProfessorPerfil;
}

export interface ProfessorLogin {
  id: number;
  email: string;
  senha: string;
}

export interface ProfessorPerfil {
  nome: string;
  sobrenome: string;
  cpf: string;
  numero_whatsapp: string;
  url_foto: string;
  sobre: string;
}

export interface ProfessorMateria {
  id: number;
}

export interface ProfessorAgenda {
  id: number;
  pessoaId: number;
  materiaId: number;
  diaSemana: number;
  nomeMateria: string;
  voluntario: boolean;
  valor: number;
  inicio: string;
  fim: string;
}

