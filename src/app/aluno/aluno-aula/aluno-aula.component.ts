import { Professor } from './../../model/professor';
import { forkJoin } from 'rxjs';
import { AlunoService } from './../../services/aluno.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { ComumService } from './../../services/comum.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Aluno } from './../../model/aluno';
import { Base } from './../../model/base';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aluno-aula',
  templateUrl: './aluno-aula.component.html',
  styleUrls: ['./aluno-aula.component.css']
})
export class AlunoAulaComponent implements OnInit {

  listaMateria = [] as Base[];
  listaSemana = [] as Base[];
  listaProfessor = [] as Professor[];
  aluno = {} as Aluno;
  form = new FormGroup({});
  loading = false;

  constructor(private fb: FormBuilder, private comumService: ComumService, private alunoService: AlunoService,
    private professorService: ProfessorService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    forkJoin([this.comumService.listarMateria(), this.comumService.listarSemana(), this.alunoService.obter({ id })]).subscribe((resultados) => {
      // this.listaMateria = resultados[0];
      this.listaSemana = resultados[1];
      this.aluno = resultados[2];

      this.listaMateria = resultados[0].filter(mat => this.aluno.materias.findIndex(al => al.idMateria === mat.id) >= 0);

      this.form = this.fb.group({
        id: 0,
        idAluno: this.aluno.id,
        idMateria: 0,
        diaSemana: 0,
        indVoluntario: false,
      });

    },
      (erro) => {
        alert(erro.error);
      },
      () => {
        this.filtrarProfessorAgenda();
      }
    );
  }

  atualizarDados(): void {
    this.router.navigateByUrl(`/aluno/atualizar/${this.aluno.id}`);
  }

  filtrarProfessorAgenda(): void {

    this.loading = true;
    const listaMatriculaAluno = +this.form.controls.idMateria.value ?
      [+this.form.controls.idMateria.value] : this.listaMateria.map((materia) => materia.id);
    this.listaProfessor = [];
    this.professorService.listarProfessorAgenda({
      idsMateria: listaMatriculaAluno,
      diaSemana: +this.form.controls.diaSemana.value,
    }).subscribe((professores) => {

      setTimeout(() => {
        if (professores ?.length > 0) {
          this.listaProfessor = [...professores];
        } else {
          this.listaProfessor = [];
        }
        this.loading = false;
      }, 500);

    });
  }

  obterMateria(professor: Professor): string {
    const materias = [] as string[];
    let materiaExibida = '';


    for (const agenda of professor.agendas) {
      agenda.nomeMateria = this.listaMateria.find(x => x.id === agenda.idMateria).nome;
      if (materias.findIndex(x => x === agenda.nomeMateria) < 0) {
        materias.push(agenda.nomeMateria);
        materiaExibida += `/ ${agenda.nomeMateria}`;
      }
    }

    return materiaExibida.substring(2);
  }
}
