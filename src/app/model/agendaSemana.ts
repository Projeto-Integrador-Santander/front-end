export interface AgendaSemana {
  idDiaSemana: number;
  descricaoDiaSemana: string;
  horarios: AgendaSemanaHorario[];
}

export interface AgendaSemanaHorario {
  horarioInicio: string;
  horarioFim: string;
  valor: number;
  nomeMateria: string;
}