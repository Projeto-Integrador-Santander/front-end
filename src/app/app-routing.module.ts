import { AlunoAulaComponent } from './aluno/aluno-aula/aluno-aula.component';
import { AlunoCadastroComponent } from './aluno/aluno-cadastro/aluno-cadastro.component';
import { EsqueciMinhaSenhaComponent } from './login/esqueci-minha-senha/esqueci-minha-senha.component';
import { ProfessorAulaComponent } from './professor/professor-aula/professor-aula.component';
import { ProfessorCadastroComponent } from './professor/professor-cadastro/professor-cadastro.component';
import { LoginComponent } from './login/login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'aluno',
    children: [
      {
        path: 'aula/:id',
        component: AlunoAulaComponent
      },
      {
        path: 'atualizar/:id',
        component: AlunoCadastroComponent
      },
      {
        path: 'cadastro',
        component: AlunoCadastroComponent
      },
      {
        path: 'esqueci-minha-senha',
        component: EsqueciMinhaSenhaComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'professor',
    children: [
      {
        path: 'aula/:id',
        component: ProfessorAulaComponent
      },
      {
        path: 'atualizar/:id',
        component: ProfessorCadastroComponent
      },
      {
        path: 'cadastro',
        component: ProfessorCadastroComponent
      },
      {
        path: 'esqueci-minha-senha',
        component: EsqueciMinhaSenhaComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    component: PrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
