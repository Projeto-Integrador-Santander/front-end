import { Login } from './../model/login';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from './../model/aluno';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  constructor(private http: HttpClient) { }

  incluir(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(`${environment.urlApi}pessoa/v1/ALUNO`, aluno);
  }

  alterar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${environment.urlApi}pessoa/v1/ALUNO`, aluno);
  }

  obter(parametro: { id: number }): Observable<Aluno> {

    if (!parametro.id) {
      return of({
        perfil: {},
        login: {},
        materias: []
      } as Aluno);
    }

    return this.http.get<Aluno>(`${environment.urlApi}pessoa/v1/login/${parametro.id}`);
  }

  login(parametros: { email: string, senha: string }): Observable<Login> {
    return this.http.get<Login>(`${environment.urlApi}login/v1/${parametros.email}/${parametros.senha}`);
  }
}
