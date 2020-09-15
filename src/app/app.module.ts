import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './principal/principal.component';
import { LoginComponent } from './login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfessorCadastroComponent } from './professor/professor-cadastro/professor-cadastro.component';
import { ProfessorAulaComponent } from './professor/professor-aula/professor-aula.component';
import { EsqueciMinhaSenhaComponent } from './login/esqueci-minha-senha/esqueci-minha-senha.component';
import { AlunoCadastroComponent } from './aluno/aluno-cadastro/aluno-cadastro.component';
import { AlunoAulaComponent } from './aluno/aluno-aula/aluno-aula.component';
import { AlunoAulaDetalheComponent } from './aluno/aluno-aula/aluno-aula-detalhe/aluno-aula-detalhe.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoginComponent,
    ProfessorCadastroComponent,
    ProfessorAulaComponent,
    EsqueciMinhaSenhaComponent,
    AlunoCadastroComponent,
    AlunoAulaComponent,
    AlunoAulaDetalheComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
