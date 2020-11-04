import { ProfessorService } from './../../services/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Email } from '../../model/email';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  url = '';
  form = new FormGroup({});
  tipoLogin = '';
  emailObject = {} as Email;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private professorService: ProfessorService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['']
    });

    this.tipoLogin = this.route.snapshot.parent.url[0].path;

    if (this.tipoLogin !== 'professor' && this.tipoLogin !== 'aluno') {
      this.router.navigateByUrl('/');
      return;
    }
  }

  enviar(): void {
    const email = this.form.controls.email.value;

    if (!email) {
      Swal.fire('Oops...', 'E-mail em branco.', 'error')
      return;
    }

    this.emailObject.email = email;

    this.professorService.esqueciSenha(this.emailObject).subscribe((response) => {
      Swal.fire('Sucesso!', 'E-mail para recupeção de senha enviado.', 'success')
      this.trataRedirecionamento();
    },
      (error) => {
       this.trataErro(error);
      }
    );

  }

  trataErro(error): void{
    this.trataRedirecionamento();
    if(error.error.mensagem != null && error.error.mensagem != ""){
      Swal.fire("Erro!", error.error.mensagem, "error");
    }else{
      Swal.fire("Parece que algo deu errado!", "Internal Server Error.", "error");
    }
  }

  trataRedirecionamento():void{
    if (this.tipoLogin === 'professor') {
      this.router.navigateByUrl('/professor/login');
    } else {
      this.router.navigateByUrl('/aluno/login');
    }
  }
}
