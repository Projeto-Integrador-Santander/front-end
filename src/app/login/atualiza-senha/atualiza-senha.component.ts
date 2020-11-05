import { Component, OnInit } from '@angular/core';
import { ComumService } from './../../services/comum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Email } from '../../model/email';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-atualiza-senha',
  templateUrl: './atualiza-senha.component.html',
  styleUrls: ['./atualiza-senha.component.css']
})
export class AtualizaSenhaComponent implements OnInit {

  url = '';
  form = new FormGroup({});
  tipoLogin = '';
  idRequisicao = 0;
  emailObject = {} as Email;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private comumService: ComumService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.fb.group({  
      email: [''],
      senha: [''],
      confirmasenha: ['']
    });

    this.tipoLogin = this.route.snapshot.parent.url[0].path;
    this.idRequisicao = +this.route.snapshot.paramMap.get('id');

    if (this.tipoLogin !== 'professor' && this.tipoLogin !== 'aluno') {
      this.router.navigateByUrl('/');
      return;
    }
  }

  enviar(): void {
    const email = this.form.controls.email.value;
    const senha = this.form.controls.senha.value;
    const confirmasenha = this.form.controls.confirmasenha.value;

    if (!email) {
      Swal.fire('Oops...', 'Email em branco.', 'error')
      return;
    }

    if (!senha) {
      Swal.fire('Oops...', 'Senha em branco.', 'error')
      return;
    }

    if (!confirmasenha) {
      Swal.fire('Oops...', 'Confirmação de senha em branco.', 'error')
      return;
    }

    if (senha != confirmasenha) {
      Swal.fire('Oops...', 'Senha e confirmação de senha diferem.', 'error')
      return;
    }

    this.emailObject.email = email;
    this.emailObject.senha = senha;

    this.comumService.atualizaSenha(this.emailObject, this.idRequisicao).subscribe((response) => {
      Swal.fire('Sucesso!', 'Senha atualizada com sucesso.', 'success')
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
