import { NgxSpinnerService } from 'ngx-spinner';
import { Professor, ProfessorPerfil } from './../../model/professor';
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
  private professores = [] as Professor[];
  listaProfessor = [] as Professor[];
  aluno = {} as Aluno;
  form = new FormGroup({});
  loading = false;

  constructor(private fb: FormBuilder, private comumService: ComumService, private alunoService: AlunoService,
    private professorService: ProfessorService, private route: ActivatedRoute, private router: Router, private spinner: NgxSpinnerService) { 
      this.form = this.fb.group({
        id: 0,
        idAluno: 0,
        materiaId: 0,
        diaSemana: 0,
        voluntario: false,
      });
    }

  ngOnInit(): void {

    this.spinner.show();
    const id = +this.route.snapshot.paramMap.get('id');

    forkJoin([
      this.comumService.listarMateria(), 
      this.comumService.listarSemana(), 
      this.alunoService.obter({ id }),
      this.professorService.listarProfessor()
    ]).subscribe((resultados) => {
      this.spinner.hide();
      this.listaSemana = resultados[1];
      this.aluno = resultados[2];
      this.listaMateria = resultados[0].filter(mat => this.aluno.materias.findIndex(al => al.id === mat.id) >= 0);
      this.professores = resultados[3];
      this.form = this.fb.group({
        id: 0,
        idAluno: this.aluno.id,
        materiaId: 0,
        diaSemana: 0,
        voluntario: false,
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
    this.router.navigateByUrl(`/aluno/atualizar/${this.aluno.login.id}`);
  }

  filtrarProfessorAgenda(): void {

    this.loading = true;
    const listaMatriculaAluno = +this.form.controls.materiaId.value ?
      [+this.form.controls.materiaId.value] : this.listaMateria.map((materia) => materia.id);
    this.listaProfessor = [];
    
    this.professorService.listarProfessorAgenda({
      idsMateria: listaMatriculaAluno,
      diaSemana: +this.form.controls.diaSemana.value,
    }).subscribe((listaAgenda) => {
      this.loading = false;
      if (listaAgenda?.length) {
        this.listaProfessor = this.professores.map((professor) => {
          const p = { ...professor};
          p.agenda = listaAgenda.filter(x => x.pessoaId === professor.id);
          return p;
        });

        this.listaProfessor = this.listaProfessor.filter(x => x.agenda?.length);
      }
    });
  }

  obterMateria(professor: Professor): string {
    const materias = [] as string[];
    let materiaExibida = '';

    for (const agenda of professor.agenda) {
      agenda.nomeMateria = this.listaMateria.find(x => x.id === agenda.materiaId).nome;
      if (materias.findIndex(x => x === agenda.nomeMateria) < 0) {
        materias.push(agenda.nomeMateria);
        materiaExibida += `/ ${agenda.nomeMateria}`;
      }
    }

    return materiaExibida.substring(2);
  }

  obterLinkWhatsapp(perfil: ProfessorPerfil): string {
    return `https://api.whatsapp.com/send?phone=55${perfil.numero_whatsapp}&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20a%20disponibilidade%20das%20aulas`;
  }
}
