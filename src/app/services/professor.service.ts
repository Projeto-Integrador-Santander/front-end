import { Observable, of } from 'rxjs';
import { Professor, ProfessorAgenda } from './../model/professor';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  listaProfessores = [{
    id: 1,
    biografia: 'teste',
    email: 'r@r.com',
    senha: '123',
    nome: 'Rafael',
    whatsapp: '11976235899',
    avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQHW7qGNFKMz5g/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=hMNr6VS3xpub82bepomzV-BovIeCeP2yFIN252UylXI'
  },
  {
    id: 2,
    biografia: 'teste',
    email: 't@t.com',
    senha: '123',
    nome: 'Thayani',
    whatsapp: '11976235899',
    avatar: 'https://media-exp1.licdn.com/dms/image/C4D03AQG4GI7O42ajKw/profile-displayphoto-shrink_400_400/0?e=1605744000&v=beta&t=QRWgwvax25kvS1ht-kW2lhk5aH1y86rlLddIC11Gyms'
  }] as Professor[];

  listaAgenda = [{
    id: 1,
    valor: 10,
    horarioFim: '12:00',
    horarioInicio: '11:00',
    idMateria: 1,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  },
  {
    id: 2,
    valor: 10,
    horarioFim: '11:00',
    horarioInicio: '10:00',
    idMateria: 3,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  },
  {
    id: 3,
    valor: 10,
    horarioFim: '9:00',
    horarioInicio: '8:00',
    idMateria: 2,
    idProfessor: 1,
    diaSemana: 1,
    indVoluntario: false,
  },
  {
    id: 3,
    valor: 10,
    horarioFim: '9:00',
    horarioInicio: '8:00',
    idMateria: 1,
    idProfessor: 2,
    diaSemana: 1,
    indVoluntario: false,
  }] as ProfessorAgenda[];

  constructor() { }

  incluir(professor: Professor): Observable<Professor> {
    professor.id = this.listaProfessores.length + 1;
    this.listaProfessores.push(professor);
    return of(professor);
  }

  alterar(professor: Professor): Observable<Professor> {
    const professorIndex = this.listaProfessores.findIndex(x => x.id === professor.id);
    this.listaProfessores[professorIndex] = { ...professor };
    return of(professor);
  }

  obter(parametro: { id: number }): Observable<Professor> {

    if (!parametro.id) {
      return of({} as Professor);
    }

    const professor = this.listaProfessores.find(x => x.id === parametro.id);
    return of(professor);
  }

  login(parametros: { email: string, senha: string }): Observable<Professor> {
    const professor = this.listaProfessores.find(x => x.email === parametros.email && x.senha === parametros.senha);
    return of(professor);
  }

  listarAgenda(parametro: { idProfessor: number, diaSemana: number }): Observable<ProfessorAgenda[]> {
    const listaAgenda = this.listaAgenda.filter(x => x.idProfessor === parametro.idProfessor && x.diaSemana === parametro.diaSemana);
    return of(listaAgenda);
  }

  incluirAgenda(professorAgenda: ProfessorAgenda): Observable<ProfessorAgenda> {

    const ProfessorAgendaAgenda = { ...professorAgenda };
    ProfessorAgendaAgenda.id = this.listaAgenda.length + 1;
    this.listaAgenda.push(ProfessorAgendaAgenda);
    return of(ProfessorAgendaAgenda);
  }

  excluirAgenda(parametro: { id: number }): Observable<void> {

    const lista = this.listaAgenda.filter(x => x.id !== parametro.id);

    if (lista ?.length > 0) {
      this.listaAgenda = [...lista];
    } else {
      this.listaAgenda = [];
    }

    return of();
  }

  listarProfessorAgenda(parametro: { idsMateria: number[], diaSemana: number }): Observable<Professor[]> {
    const agendasFiltro = this.listaAgenda.filter(ag => parametro.idsMateria.findIndex(id => id === ag.idMateria) >= 0 && ag.diaSemana === (parametro.diaSemana || ag.diaSemana));

    // Obtendo os professores com agenda
    const professores = this.listaProfessores.filter(prof => agendasFiltro.findIndex(ag => ag.idProfessor === prof.id) >= 0);

    // Associar as agendas ao professor

    const lista = professores.map((professor) => {
      professor.agendas = agendasFiltro.filter(ag => ag.idProfessor === professor.id);
      return professor;
    });

    if (lista ?.length > 0) {
      return of([...lista]);
    } else {
      return of([]);
    }


  }
}
