import { NgxSpinnerService } from 'ngx-spinner';
import { Professor, ProfessorAgenda } from './../../model/professor';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { ComumService } from './../../services/comum.service';
import { Base } from './../../model/base';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-professor-aula',
  templateUrl: './professor-aula.component.html',
  styleUrls: ['./professor-aula.component.css']
})
export class ProfessorAulaComponent implements OnInit {

  listaMateria = [] as Base[];
  listaSemana = [] as Base[];
  professor = {} as Professor;
  listaProfessorAgenda = [] as ProfessorAgenda[];
  form = new FormGroup({});
  nomeColunas: string[] = ['nomeMateria', 'valor', 'inicio', 'fim', 'opcao'];
  diaSemana: number;
  constructor(private fb: FormBuilder, private comumService: ComumService, private professorService: ProfessorService,
    private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      id: 0,
      pessoaId: this.professor.id,
      materiaId: 0,
      diaSemana: 0,
      voluntario: false,
      valor: 0,
      inicio: '',
      fim: ''
    });
   }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.spinner.show();
    forkJoin(this.comumService.listarMateria(), this.comumService.listarSemana(), this.professorService.obter({ id })).subscribe((resultados) => {
      this.spinner.hide();
      this.listaMateria = resultados[0];
      this.listaSemana = resultados[1];
      this.professor = resultados[2];

      this.form = this.fb.group({
        id: 0,
        pessoaId: this.professor.id,
        materiaId: 0,
        diaSemana: 0,
        voluntario: false,
        valor: 0,
        inicio: '',
        fim: ''
      });

    },
      (erro) => {
        this.spinner.hide();
        alert(erro.error);
      }
    );
  }

  atualizarDados(): void {
    this.router.navigateByUrl(`/professor/atualizar/${this.professor.login.id}`);
  }

  preencherAgenda(diaSemana): void {
    this.spinner.show();
    this.diaSemana = +diaSemana;
    this.professorService.listarAgenda({
      idProfessor: this.professor.id,
      diaSemana: this.diaSemana
    }).subscribe((agendas) => {
      this.spinner.hide();
      if (agendas ?.length > 0) {
        this.listaProfessorAgenda = agendas.map(
          (ProfessorAgenda) => {
            ProfessorAgenda.nomeMateria = this.listaMateria.find(x => x.id === ProfessorAgenda.materiaId).nome;
            return ProfessorAgenda;
          });
      }

      this.listaProfessorAgenda = agendas;
    });
  }

  removerAgenda(id: number): void {
    this.spinner.show();
    this.professorService.excluirAgenda({ id }).subscribe(() => {
    }, (error) => {
      this.spinner.hide();
      console.log(error.error);
    }, () => {
      this.preencherAgenda(this.diaSemana.toString());
    });
  }

  incluirAgenda(): void {
    const ProfessorAgenda = this.form.value as ProfessorAgenda;

    ProfessorAgenda.diaSemana = +this.diaSemana;
    ProfessorAgenda.materiaId = +ProfessorAgenda.materiaId;

    if (ProfessorAgenda.voluntario) {
      ProfessorAgenda.valor = 0;
    }

    if (!ProfessorAgenda.diaSemana) {
      alert('Selecione a dia da semana.');
      return;
    }

    if (!ProfessorAgenda.materiaId) {
      alert('Selecione a materia.');
      return;
    }

    if (!ProfessorAgenda.voluntario && !ProfessorAgenda.valor) {
      alert('Informe o valor aula.');
      return;
    }

    if (!ProfessorAgenda.inicio) {
      alert('Selecione a horário de início.');
      return;
    }

    if (!ProfessorAgenda.fim) {
      alert('Selecione a horário de fim.');
      return;
    }

    this.spinner.show();
    this.professorService.incluirAgenda(ProfessorAgenda).subscribe((response) => {
      this.spinner.hide();
      this.preencherAgenda(this.diaSemana.toString());
      this.form.controls.inicio.setValue(ProfessorAgenda.fim);
      this.form.controls.fim.setValue('');
    },
      (error) => {
        this.spinner.hide();
        alert(error.error);
      });
  }
}
