
//Servidor
const express = require('express')
const server = express()
const {
    pageLanding,
    pageStudy,
    pageGiveclasses,
    saveClasses,

    paginaLoginEstudante,
    paginaCadastrarEstudante,
    logarEstudante,

    paginaLoginProfessor,
    paginaCadastrarProfessor,
    logarProfessor,

    paginaEsqueciMinhaSenha
} = require('./pages')

//conf nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})
//Inicio e configuração do servidor
server
    //receber os dados do req.body
    .use(express.urlencoded({ extended: true }))
    //conf arquivos staticos
    .use(express.static("public"))
    //rotas
    .get("/", (pageLanding))
    .post("/logar-aluno", (logarEstudante))
    .get("/login/aluno", (paginaLoginEstudante))
    .get("/aluno/aulas", (pageStudy))
    .get("/aluno/cadastro", (paginaCadastrarEstudante))


    .get("/professor/aulas", (pageGiveclasses))
    .post("/save-classes", saveClasses)
    .get("/login/professor", (paginaLoginProfessor))
    .get("/professor/cadastrar", (paginaCadastrarProfessor))
    .post("/logar-professor", (logarProfessor))

    .get("/login/esqueci-minha-senha", (paginaEsqueciMinhaSenha))
    //start do servidor
    .listen(5500)
