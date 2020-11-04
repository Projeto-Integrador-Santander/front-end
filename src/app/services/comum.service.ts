import { Base } from './../model/base';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Email } from './../model/email';

@Injectable({
  providedIn: 'root'
})
export class ComumService {

  constructor(private http: HttpClient) { }

  listarMateria(): Observable<Base[]> {

    return this.http.get<any[]>(`${environment.urlApi}materia/v1`)
    .pipe(
      map((lista) => {
        return lista.map((materia) => {
          return {
            id: materia.id,
            nome: materia.materia
          } as Base;
        });
      })
    );
  }

  listarSemana(): Observable<Base[]> {

    const lista = [] as Base[];
    lista.push(
      { id: 1, nome: 'Segunda-feira', },
      { id: 2, nome: 'Terça-feira', },
      { id: 3, nome: 'Quarta-feira', },
      { id: 4, nome: 'Quinta-feira', },
      { id: 5, nome: 'Sexta-feira', },
      { id: 6, nome: 'Sabádo', },
      { id: 7, nome: 'Domingo', },
    );

    return of(lista);
  }

  esqueciSenha(email : Email): Observable<Email> {
    return this.http.post<Email>(`${environment.urlApi}login/v1/esqueci-senha`, email);
  }

  atualizaSenha(email : Email, idRequisicao: any): Observable<Email> {
    return this.http.post<Email>(`${environment.urlApi}login/v1/atualiza-senha/` + idRequisicao, email);
  }
}
