// //procurar o botão
document.querySelector("#add-time")
.addEventListener("click", cloneField)
//quando clicar no botão

//executar uma ação
function cloneField(){
    //Duplicar os campos
 const newFiedContainer = document.querySelector('.schedule-item').cloneNode(true)
 //limpar
 const fields = newFiedContainer.querySelectorAll("input")
 fields.forEach(function(field){
     field.value = ""
     
 })
 //colocar na página
 document.querySelector("#schedule-items").appendChild(newFiedContainer)
}