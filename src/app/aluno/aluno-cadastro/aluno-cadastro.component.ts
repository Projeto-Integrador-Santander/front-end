import { Base } from './../../model/base';
import { ComumService } from './../../services/comum.service';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from './../../services/aluno.service';
import { Aluno } from './../../model/aluno';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  form: FormGroup;
  aluno = {} as Aluno;
  listaMatricula = [] as Base[];

  constructor(private fb: FormBuilder, private comumService: ComumService,
    private alunoService: AlunoService, private router: Router, private route: ActivatedRoute,
    private _location: Location) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    forkJoin([this.comumService.listarMateria(), this.alunoService.obter({ id })])
      .subscribe((response) => {
        this.listaMatricula = response[0];
        this.aluno = response[1];
        this.form = this.fb.group({
          id: [this.aluno.id],
          nome: [this.aluno.nome, Validators.required],
          email: [this.aluno.email, Validators.required],
          senha: [this.aluno.senha, Validators.required],
          senhaConfirmar: [this.aluno.senha, Validators.required],
          whatsapp: [this.aluno.whatsapp, Validators.required],
          materias: this.fb.array([])
        });


        if (this.aluno.materias ?.length > 0) {
          for (const materia of this.aluno.materias) {
            this.incluirMateria(materia.idMateria);
          }
        } else {
          this.incluirMateria(0);
        }

      },
        (erro) => {
          alert(erro.error);
        }
      );
  }

  get materias(): FormArray {
    return this.form.controls.materias as FormArray;
  }

  formMateria(idMateria: number = 0): FormGroup {
    return this.fb.group({
      idMateria
    });
  }

  incluirMateria(idMateria: number): void {
    this.materias.push(this.formMateria(idMateria));
  }

  gravar(): void {
    this.aluno = this.form.value;

    if (!this.aluno.nome) {
      alert('Informe o seu nome.');
      return;
    }

    if (!this.aluno.email) {
      alert('Informe o seu e-mail.');
      return;
    }

    if (!this.aluno.senha) {
      alert('Informe a sua senha.');
      return;
    }

    if (!this.form.controls.senhaConfirmar.value) {
      alert('Informe a senha de confirmação.');
      return;
    }

    if (this.aluno.senha !== this.form.controls.senhaConfirmar.value) {
      alert('Senhas estão diferentes.');
      return;
    }

    if (!this.aluno.whatsapp) {
      alert('Informe o seu whatsapp.');
      return;
    }

    if (!this.aluno.id) {
      this.alunoService.incluir(this.aluno).subscribe((aluno) => {
        this.router.navigateByUrl('/aluno/login');
      },
        (error) => {
          alert(error.error);
        }
      );
    } else {
      this.alunoService.alterar(this.aluno).subscribe((aluno) => {
        this.router.navigateByUrl(`/aluno/aula/${this.aluno.id}`);
      },
        (error) => {
          alert(error.error);
        }
      );
    }
  }

  voltarAula(): void {
    this._location.back();
  }
}
