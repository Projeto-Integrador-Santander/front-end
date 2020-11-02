import { ProfessorService } from './../../services/professor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  url = '';
  form = new FormGroup({});
  tipoLogin = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private professorService: ProfessorService) { }

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

    Swal.fire('Sucesso!', 'E-mail para recupeção de senha enviado.', 'success')

    if (this.tipoLogin === 'professor') {
      this.router.navigateByUrl('/professor/login');
    } else {
      this.router.navigateByUrl('/aluno/login');
    }
  }
}
