import { Observable, of } from 'rxjs';
import { Aluno, AlunoMateria } from './../model/aluno';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  listaAlunos = [{
    id: 1,
    email: 'r@r.com',
    senha: '123',
    nome: 'Rafael',
    whatsapp: '11976235899',
    materias: [{
      idMateria: 1,
      idAluno: 1,
    },
    {
      idMateria: 2,
      idAluno: 1,
    }]
  },
  {
    id: 2,
    email: 't@t.com',
    senha: '123',
    nome: 'Thayani',
    whatsapp: '11976235899',
    materias: []
  }] as Aluno[];

  constructor() { }

  incluir(aluno: Aluno): Observable<Aluno> {
    aluno.id = this.listaAlunos.length + 1;

    aluno.materias = aluno.materias.map((materia) => {
      return {
        idMateria: +materia.idMateria,
        idAluno: aluno.id
      } as AlunoMateria;
    });

    this.listaAlunos.push(aluno);
    return of(aluno);
  }

  alterar(aluno: Aluno): Observable<Aluno> {

    aluno.materias = aluno.materias.map((materia) => {
      return {
        idMateria: +materia.idMateria,
        idAluno: aluno.id
      } as AlunoMateria;
    });

    const alunoIndex = this.listaAlunos.findIndex(x => x.id === aluno.id);
    this.listaAlunos[alunoIndex] = { ...aluno };
    return of(aluno);
  }

  obter(parametro: { id: number }): Observable<Aluno> {

    if (!parametro.id) {
      return of({} as Aluno);
    }

    const aluno = this.listaAlunos.find(x => x.id === parametro.id);
    return of(aluno);
  }

  login(parametros: { email: string, senha: string }): Observable<Aluno> {
    const aluno = this.listaAlunos.find(x => x.email === parametros.email && x.senha === parametros.senha);
    return of(aluno);
  }
}
