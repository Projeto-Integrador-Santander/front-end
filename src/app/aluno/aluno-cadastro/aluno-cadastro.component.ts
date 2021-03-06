import { NgxSpinnerService } from 'ngx-spinner';
import { Base } from './../../model/base';
import { ComumService } from './../../services/comum.service';
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from './../../services/aluno.service';
import { Aluno } from './../../model/aluno';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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
              private _location: Location, private spinner: NgxSpinnerService) {
      this.form = this.fb.group({
        id: 0,
        perfil: this.fb.group({
          nome: '',
          sobrenome: '',
          cpf: '',
          numero_whatsapp: '',
        }),
        login: this.fb.group({
          email: '',
          senha: '',
          senhaConfirmar: '',
        }),
        materias: this.fb.array([])
      });
     }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    this.spinner.show();
    forkJoin([this.comumService.listarMateria(), this.alunoService.obter({ id })])
      .subscribe((response) => {
        this.listaMatricula = response[0];
        this.aluno = response[1];

        this.form = this.fb.group({
          id: [this.aluno.id],
          perfil: this.fb.group({
            nome: [this.aluno.perfil.nome, Validators.required],
            sobrenome: [this.aluno.perfil.sobrenome, Validators.required],
            cpf: [this.aluno.perfil.cpf],
            numero_whatsapp: [this.aluno.perfil.numero_whatsapp, Validators.required],
          }),
          login: this.fb.group({
            id: [this.aluno.login.id, Validators.required],
            email: [this.aluno.login.email, Validators.required],
            senha: [this.aluno.login.senha, Validators.required],
            senhaConfirmar: [this.aluno.login.senha, Validators.required],
          }),
          materias: this.fb.array([])
        });

        if (id) {
          const loginForm = this.form.controls.login as FormGroup;
          loginForm.controls.email.disable();
        }

        if (this.aluno.materias?.length > 0) {
          for (const materia of this.aluno.materias) {
            this.incluirMateria(materia.id);
          }
        } else {
          this.incluirMateria(0);
        }
        this.spinner.hide();
      },
        (error) => {
          this.trataErro(error);
        }
      );
  }

  get materias(): FormArray {
    return this.form.controls.materias as FormArray;
  }

  formMateria(id: number = 0): FormGroup {
    return this.fb.group({
      id
    });
  }

  incluirMateria(id: number): void {
    this.materias.push(this.formMateria(id));
  }

  gravar(): void {
    this.aluno = this.form.value;

    if (!this.aluno.perfil.nome) {
      Swal.fire('Oops...', 'Informe o seu nome.', 'error')
      return;
    }
    if (!this.aluno.perfil.sobrenome) {
      Swal.fire('Oops...', 'Informe o seu sobrenome.', 'error')
      return;
    }

    if (!this.aluno.perfil.cpf) {
      Swal.fire('Oops...', 'Informe o seu CPF.', 'error')
      return;
    }

    if (!this.aluno.perfil.numero_whatsapp) {
      Swal.fire('Oops...', 'Informe o seu whatsapp.', 'error')
      return;
    }

    if (!this.aluno.id && !this.aluno.login.email) {
      Swal.fire('Oops...', 'Informe o seu email.', 'error')
      return;
    }

    if (!this.aluno.login.senha) {
      Swal.fire('Oops...', 'Informe a sua senha.', 'error')
      return;
    }

    const login = this.form.controls.login as FormGroup;

    if (!login.controls.senhaConfirmar.value) {
      Swal.fire('Oops...', 'Informe a senha de confirmação.', 'error')
      return;
    }

    if (this.aluno.login.senha !== login.controls.senhaConfirmar.value) {
      Swal.fire('Oops...', 'Senhas estão diferentes.', 'error') 
      return;
    }

    this.spinner.show();
    if (!this.aluno.id) {
      this.alunoService.incluir(this.aluno).subscribe((aluno) => {
        Swal.fire("Sucesso!", "Cadastro efetuado com sucesso, seja bem vindo ao Educanjos.", "success");
        this.spinner.hide();
        this.router.navigateByUrl('/aluno/login');
      },
        (error) => {
         this.trataErro(error);
        }
      );
    } else {
      this.alunoService.alterar(this.aluno).subscribe((aluno) => {
        Swal.fire("Sucesso!", "Cadastro atualizado com sucesso.", "success");
        this.spinner.hide();
        this.router.navigateByUrl(`/aluno/aula/${aluno.login.id}`);
      },
        (error) => {
          this.trataErro(error);
        }
      );
    }
  }

  voltarAula(): void {
    this._location.back();
  }

  excluirMateria(indexMateria: number): void {
    this.materias.removeAt(indexMateria);
  }

  trataErro(error): void{
      this.spinner.hide();
      if(error.error.mensagem != null && error.error.mensagem != ""){
        Swal.fire("Erro!", error.error.mensagem, "error");
      }else{
        Swal.fire("Parece que algo deu errado!", "Internal Server Error.", "error");
      }
  }
}
