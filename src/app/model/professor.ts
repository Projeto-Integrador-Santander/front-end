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
  idProfessor: number;
  idMateria: number;
  diaSemana: number;
  nomeMateria: string;
  indVoluntario: boolean;
  valor: number;
  horarioInicio: string;
  horarioFim: string;
}

