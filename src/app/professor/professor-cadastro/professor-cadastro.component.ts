import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorService } from './../../services/professor.service';
import { Professor } from './../../model/professor';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor-cadastro',
  templateUrl: './professor-cadastro.component.html',
  styleUrls: ['./professor-cadastro.component.css']
})
export class ProfessorCadastroComponent implements OnInit {

  form: FormGroup;
  professor = {} as Professor;

  constructor(private fb: FormBuilder, private professorService: ProfessorService, private router: Router,
    private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {

    const id = +this.route.snapshot.paramMap.get('id');

    this.professorService.obter({ id }).subscribe((professor) => {
      this.professor = professor;
      this.form = this.fb.group({
        id: [this.professor.id],
        nome: [this.professor.nome, Validators.required],
        email: [this.professor.email, Validators.required],
        senha: [this.professor.senha, Validators.required],
        senhaConfirmar: [this.professor.senha, Validators.required],
        avatar: [this.professor.avatar, Validators.required],
        whatsapp: [this.professor.whatsapp, Validators.required],
        biografia: [this.professor.biografia, Validators.required]
      });
    },
      (erro) => {
        alert(erro.error);
      }
    );


  }

  gravar(): void {
    this.professor = this.form.value;

    if (!this.professor.nome) {
      alert('Informe o seu nome.');
      return;
    }

    if (!this.professor.email) {
      alert('Informe o seu e-mail.');
      return;
    }

    if (!this.professor.senha) {
      alert('Informe a sua senha.');
      return;
    }

    if (!this.form.controls.senhaConfirmar.value) {
      alert('Informe a senha de confirmação.');
      return;
    }

    if (this.professor.senha !== this.form.controls.senhaConfirmar.value) {
      alert('Senhas estão diferentes.');
      return;
    }

    if (!this.professor.avatar) {
      alert('Informe o seu avatar.');
      return;
    }

    if (!this.professor.whatsapp) {
      alert('Informe o seu whatsapp.');
      return;
    }

    if (!this.professor.biografia) {
      alert('Informe a sua biografia.');
      return;
    }

    if (!this.professor.id) {
      this.professorService.incluir(this.professor).subscribe((professor) => {
        this.router.navigateByUrl('/professor/login');
      },
        (error) => {
          alert(error.error);
        }
      );
    } else {
      this.professorService.alterar(this.professor).subscribe((professor) => {
        this.router.navigateByUrl(`/professor/aula/${this.professor.id}`);
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
