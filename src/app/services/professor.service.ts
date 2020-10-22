import { Login } from './../model/login';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Professor, ProfessorAgenda } from './../model/professor';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient) { }

  incluir(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(`${environment.urlApi}pessoa/v1/PROFESSOR`, professor);
  }

  alterar(professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${environment.urlApi}pessoa/v1/PROFESSOR`, professor);
  }

  obter(parametro: { id: number }): Observable<Professor> {

    if (!parametro.id) {
      return of({
        perfil: {},
        login: {},
        materias: []
      } as Professor);
    }

    return this.http.get<Professor>(`${environment.urlApi}pessoa/v1/login/${parametro.id}`);
  }

  login(parametros: { email: string, senha: string }): Observable<Login> {
    return this.http.get<Login>(`${environment.urlApi}login/v1/${parametros.email}/${parametros.senha}`);
  }

  listarAgenda(parametro: { idProfessor: number, diaSemana: number }): Observable<ProfessorAgenda[]> {
    return of([]);
  }

  incluirAgenda(professorAgenda: ProfessorAgenda): Observable<ProfessorAgenda> {
    return of({} as ProfessorAgenda);
  }

  excluirAgenda(parametro: { id: number }): Observable<void> {
    return of();
  }

  listarProfessorAgenda(parametro: { idsMateria: number[], diaSemana: number }): Observable<Professor[]> {
    return of([]);
  }
}
