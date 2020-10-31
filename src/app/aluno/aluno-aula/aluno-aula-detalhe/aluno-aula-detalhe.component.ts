import { AgendaSemana, AgendaSemanaHorario } from './../../../model/agendaSemana';
import { Base } from './../../../model/base';
import { Professor } from './../../../model/professor';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aluno-aula-detalhe',
  templateUrl: './aluno-aula-detalhe.component.html',
  styleUrls: ['./aluno-aula-detalhe.component.css']
})
export class AlunoAulaDetalheComponent implements OnInit {

  tabs = [] as AgendaSemana[];
  @Input() listaMaterias: Base[];
  @Input() listaDiaSemana: Base[];
  @Input() professor: Professor;
  constructor() { }

  ngOnInit(): void {
    this.tabs = [] as AgendaSemana[];
    let listaDiaSemana = this.professor.agenda.map((agenda) => agenda.diaSemana);
    listaDiaSemana = listaDiaSemana.sort((a, b) => a - b);

    // Dias Semanas
    for (const diaSemana of listaDiaSemana) {
      if (this.tabs.findIndex(x => x.idDiaSemana === diaSemana) < 0) {
        this.tabs.push({
          idDiaSemana: diaSemana,
          descricaoDiaSemana: this.listaDiaSemana.find(x => x.id === diaSemana).nome,
          horarios: []
        });
      }
    }

    for (const diaSemana of this.tabs) {
      const listaAgendaDia = this.professor.agenda.filter(x => x.diaSemana === diaSemana.idDiaSemana);

      diaSemana.horarios = listaAgendaDia.map((agenda) => {
        return {
          inicio: agenda.inicio,
          fim: agenda.fim,
          nomeMateria: this.listaMaterias.find(x => x.id === agenda.materiaId).nome,
          valor: agenda.valor
        } as AgendaSemanaHorario;
      });
    }
    
  }

  obterHorarioDiaSemana(index: any): void {
    const a = index;
  }

}
