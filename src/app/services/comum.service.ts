import { Base } from './../model/base';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComumService {

  constructor(private http: HttpClient) { }

  listarMateria(): Observable<Base[]> {

    const lista = [] as Base[];
    lista.push(
      { id: 1, nome: 'Artes', },
      { id: 2, nome: 'Biologia', },
      { id: 3, nome: 'Educação física', },
      { id: 4, nome: 'Física', },
      { id: 5, nome: 'Geografia', },
      { id: 6, nome: 'História', },
      { id: 7, nome: 'Matemática', },
      { id: 8, nome: 'Português', },
      { id: 9, nome: 'Química', },
    );

    return of(lista);
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
}
