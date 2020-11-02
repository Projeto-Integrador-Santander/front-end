import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { Professor } from './../../model/professor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {

  form: FormGroup;
  professor = {} as Professor;

  constructor(private fb: FormBuilder, private professorService: ProfessorService, private router: Router,
              private route: ActivatedRoute, private _location: Location, private spinner: NgxSpinnerService) { 
      this.form = this.fb.group({
        id: 0,
        perfil: this.fb.group({
          nome: '',
          sobrenome: '',
          cpf: '',
          numero_whatsapp: '',
          url_foto: '',
          sobre: ''
        }),
        login: this.fb.group({
          email: '',
          senha: '',
          senhaConfirmar: '',
        })
      });
    }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.spinner.show();

    this.professorService.obter({ id }).subscribe((professor) => {
      this.professor = professor;
      this.form = this.fb.group({
        id: [this.professor.id],
        perfil: this.fb.group({
          nome: [this.professor.perfil.nome, Validators.required],
          sobrenome: [this.professor.perfil.sobrenome, Validators.required],
          cpf: [this.professor.perfil.cpf],
          numero_whatsapp: [this.professor.perfil.numero_whatsapp, Validators.required],
          url_foto: [this.professor.perfil.url_foto, Validators.required],
          sobre: [this.professor.perfil.sobre, Validators.required],
        }),
        login: this.fb.group({
          id: [this.professor.login.id, Validators.required],
          email: [this.professor.login.email, Validators.required],
          senha: [this.professor.login.senha, Validators.required],
          senhaConfirmar: [this.professor.login.senha, Validators.required],
        })
      });

      if (id) {
        const loginForm = this.form.controls.login as FormGroup;
        loginForm.controls.email.disable();
      }
      this.spinner.hide();
    },
      (erro) => {
        this.spinner.hide();
        alert(erro.error);
      }
    );
  }

  gravar(): void {
    this.professor = this.form.value;

    if (!this.professor.perfil.nome) {
      Swal.fire('Oops...', 'Informe o seu nome.', 'error')
      return;
    }

    if (!this.professor.perfil.sobrenome) {
      Swal.fire('Oops...', 'Informe o seu Sobrenome.', 'error')
      return;
    }

    if (!this.professor.perfil.cpf) {
      Swal.fire('Oops...', 'Informe seu CPF.', 'error')
      return;
      }

    if (!this.professor.perfil.url_foto) {
      Swal.fire('Oops...', 'Informe o seu avatar.', 'error')
      return;
    }

    if (!this.professor.perfil.numero_whatsapp) {
      Swal.fire('Oops...', 'Informe o seu whatsapp.', 'error')
      return;
    }

    if (!this.professor.perfil.sobre) {
      Swal.fire('Oops...', 'Informe a sua biografia.', 'error')
      return;
    }

    if (!this.professor.id && !this.professor.login.email) {
      Swal.fire('Oops...', 'Informe o seu e-mail.', 'error')
      return;
    }

    if (!this.professor.login.senha) {
      Swal.fire('Oops...', 'Informe a sua senha.', 'error')
      return;
    }

    const login = this.form.controls.login as FormGroup;

    if (!login.controls.senhaConfirmar.value) {
      Swal.fire('Oops...', 'Informe a senha de confirmação.', 'error')
      return;
    }

    if (this.professor.login.senha !== login.controls.senhaConfirmar.value) {
      Swal.fire('Oops...', 'Senhas estão diferentes.', 'error')
      return;
    }

    this.spinner.show();
    if (!this.professor.id) {
      this.professorService.incluir(this.professor).subscribe((professor) => {
        Swal.fire("Sucesso!", "Cadastro efetuado com sucesso, seja bem vindo ao Educanjos.", "success");
        this.spinner.hide();
        this.router.navigateByUrl('/professor/login');
      },
        (error) => {
          this.trataErro(error);
        }
      );
    } else {
      this.professorService.alterar(this.professor).subscribe((professor) => {
        this.spinner.hide();
        this.router.navigateByUrl(`/professor/aula/${this.professor.login.id}`);
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

  trataErro(error): void{
    this.spinner.hide();
    if(error.error.mensagem != null && error.error.mensagem != ""){
      Swal.fire("Erro!", error.error.mensagem, "error");
    }else{
      Swal.fire("Parece que algo deu errado!", "Internal Server Error.", "error");
    }
  }
}
