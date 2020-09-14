export interface Professor {
  id: number;
  nome: string;
  email: string;
  senha: string;
  avatar: string;
  whatsapp: string;
  biografia: string;
  agendas: ProfessorAgenda[];
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
