'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () =>{
     document.getElementById('modal')
    .classList.remove('active')
    clearFields()
}

// pega localStorage 

const getLocalStorage = () =>JSON.parse(localStorage.getItem("dbCliente")) ?? [];

//  envia para o localStorage 
const sendLocalStorage = (cliente) => localStorage.setItem("dbCliente",JSON.stringify(cliente));

// create
const creatCliente = (cliente) =>{
    let dbCliente = readCliente();
    dbCliente.push(cliente);
    sendLocalStorage(dbCliente);

}



//read 

const readCliente = () => getLocalStorage()


//update

const updateCliente = (index,cliente) =>{
  let dbCliente = readCliente();
  dbCliente[index] = cliente;
  sendLocalStorage(dbCliente);
}


// delete

const deleteCliente = (index) =>{
    let dbCliente = readCliente();
     dbCliente.splice(index,1)
     sendLocalStorage(dbCliente);
     updateTable();
}

const fillFields = (cliente) =>{
document.getElementById("nome").value = cliente.nome;
document.getElementById("email").value = cliente.email;
document.getElementById("telefone").value = cliente.telefone;
document.getElementById("cidade").value = cliente.cidade
document.getElementById("nome").dataset.index = cliente.index 



}


// função que ira resceber o indice do elemento clicado 

const editCliente = (index) =>{
    const cliente = readCliente()[index]
    cliente.index = index
    fillFields(cliente)
    openModal()
}






// função que irá deletar ou editar 

const editDelete = (event) =>{
if(event.target.type == ("button")){

    const [action,index] = event.target.id.split("-");
    console.log(action,index)

    if(action == "edit"){
        editCliente(index)
    }else{
        deleteCliente(index)
    }
}
}









// validação de campos 
const isValid = () =>{
  return  document.getElementById("form").reportValidity()

}


//limpar filhos 

const clearFields = () =>{
    const field = document.querySelectorAll(".modal-field");
    field.forEach(field => field.value = "")
}

// limpar clientes 

const clearTable = () =>{
    const rows = document.querySelector("#tbody");
    rows.innerHTML = ""
    
}




//interação com layout

const saveCliente = () =>{

    if(isValid()){
        const cliente = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            telefone: document.getElementById("telefone").value,
            cidade: document.getElementById("cidade").value
        }
        const index = document.getElementById("nome").dataset.index;
        if(index == "new"){
            creatCliente(cliente);
          updateTable();
          closeModal();
        }else{
            updateCliente(index,cliente);
            updateTable();
            closeModal();
        }
         
    }
}

const createRow = (cliente,index) =>{
    const newCli = document.createElement("tr");
    newCli.innerHTML = `
        <td>${cliente.nome}</td>
        <td>${cliente.email}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.cidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">editar</button>
            <button type="button" class="button red" id="delete-${index}">excluir</button>
        </td>
     `
    document.getElementById("tbody").prepend(newCli);
}

const updateTable = () =>{
    const dataBase =  readCliente();
     clearTable()
    dataBase.forEach(createRow);
}

updateTable()


    //eventos 

document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById("salvar")
    .addEventListener("click",saveCliente);

document.getElementById("tbody")
.addEventListener("click",editDelete)
