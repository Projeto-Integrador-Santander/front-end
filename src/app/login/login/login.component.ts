import { AlunoService } from './../../services/aluno.service';
import { ProfessorService } from './../../services/professor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = '';
  urlEsqueciMinhaSenha = '';
  form = new FormGroup({});
  tipoLogin = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
              private professorService: ProfessorService, private alunoService: AlunoService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      senha: ['']
    });

    this.tipoLogin = this.route.snapshot.parent.url[0].path;

    if (this.tipoLogin !== 'professor' && this.tipoLogin !== 'aluno') {
      this.router.navigateByUrl('/');
      return;
    }

    if (this.tipoLogin === 'professor') {
      this.urlEsqueciMinhaSenha = `/professor/esqueci-minha-senha`;
    } else {
      this.urlEsqueciMinhaSenha = `/aluno/esqueci-minha-senha`;
    }
  }

  entrar(): void {
    const email = this.form.controls.email.value;
    const senha = this.form.controls.senha.value;

    if (!email) {
      Swal.fire('Oops...', 'E-mail em branco.', 'error')
      return;
    }

    if (!senha) {
      Swal.fire('Oops...', 'Senha em branco.', 'error')
      return;
    }

    this.spinner.show();
    if (this.tipoLogin === 'professor') {

      this.professorService.login({ email, senha }).subscribe((professor) => {
        this.spinner.hide();
        if (!professor || !professor.id) {
          Swal.fire('Oops...', 'E-mail/ Senha inválidos.', 'error')
          return;
        }
        this.router.navigateByUrl(`/professor/aula/${professor.id}`);
      },
        (error) => {
          this.trataErro(error);
        }
      );

    } else {

      this.alunoService.login({ email, senha }).subscribe((login) => {
        this.spinner.hide();
        if (!login || !login.id) {
          Swal.fire('Oops...', 'E-mail/ Senha inválidos.', 'error')
          return;
        }

        this.router.navigateByUrl(`/aluno/aula/${login.id}`);
      },
        (error) => {
          this.trataErro(error);
        }
      );
    }
  }

  enviarCadastro(): void {
    if (this.tipoLogin === 'professor') {
      this.router.navigateByUrl('/professor/cadastro');
    } else {
      this.router.navigateByUrl('/aluno/cadastro');
    }
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
