export interface AgendaSemana {
  idDiaSemana: number;
  descricaoDiaSemana: string;
  horarios: AgendaSemanaHorario[];
}

export interface AgendaSemanaHorario {
  inicio: string;
  fim: string;
  valor: number;
  nomeMateria: string;
}