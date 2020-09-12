// //procurar o botão
document.querySelector("#add-materia")
.addEventListener("click", cloneMateria)
//quando clicar no botão

//executar uma ação
function cloneMateria(){
//Duplicar os campos
 const newFiedContainer = document.querySelector('.select-block').cloneNode(true)
 //limpar
 const fields = newFiedContainer.querySelectorAll("select")
 fields.forEach(function(field){
     field.value = ""
     
 })
 //colocar na página
 document.querySelector("#materia-items").appendChild(newFiedContainer)
}

