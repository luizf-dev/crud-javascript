//=============ATIVAR MODAL==================
const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}
//=======================================

//========GETTERS AND SETTERS 

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));
//=======================================


//===== CRUD INICIO 
// Create -------------------
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push (client);
    setLocalStorage(dbClient);    
}//----------

//Read -----------------
const readClient = () => getLocalStorage();
//---------------

//Update ---------------
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
} //---------

//Delete --------------
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient);
}//---------
//==== CRUD FIM 

//****************************************************************************//

//==================== INTERAÇAO CRUD COM O LAYOUT ===========================//

//===LIMPAR OS CAMPOS DO MODAL
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}//============================

//=====VERIFICANDO SE OS CAMPOS DOS INPUTS ESTÃO PREENCHIDOS
const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}//============================


//=====VERIFICA SE OS CAMPOS SÃO VÁLIDOS E SALVA OS DADOS NO LOCALSTORAGE
const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value
        }
        const index = document.getElementById('nome').dataset.index;
        if(index == 'new'){
            createClient(client);
            updateTable();
            closeModal();
        }else{
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
}//==============================================

//=======CARREGA OS REGISTROS DO LOCALSTORAGE
const createRow = (client, index) => {
    const newRow = document.createElement('tr') 
    newRow.innerHTML = `
        <td data-label="Id:">${index}</td>
        <td data-label="Nome:">${client.nome}</td>
        <td data-label="Email:">${client.email}</td>
        <td data-label="Telefone:">${client.telefone}</td>
        <td data-label="Cidade:">${client.cidade}</td>
        <td><button type="button" class="button green" id="edit" data-action="edit-${index}">Editar</button><button type="button" class="button red" id="del" data-action="delete-${index}">Deletar</button></td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}//======================================

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

//=====ATUALIZA A TABELA
const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}//===================

//====PREENCHE OS CAMPOS DO MODAL
const fillFields = (client) => {
    document.getElementById('nome').value = client.nome;
    document.getElementById('email').value = client.email;
    document.getElementById('telefone').value = client.telefone;
    document.getElementById('cidade').value = client.cidade;
    document.getElementById('nome').dataset.index = client.index;
}//=======================

//=====ABRE O MODAL COM OS CAMPOS PREENCHIDOS PARA EDIÇAO
const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);   
    openModal();
}//===============


//====EDITA E DELETA OS REGISTROS 
const editDelete = (event) => {
    if(event.target.type == 'button'){
        const [action, index] = event.target.dataset.action.split('-');
        if(action == 'edit'){
           editClient(index);
        }else{
            const client = readClient()[index];
            const response = confirm(`Deseja realmente excluir o registro ${client.nome}`);
            if(response){
                deleteClient(index);
                updateTable();
            }
        }
    }
}
//=================

updateTable();


//=============== EVENTOS DE CLICK DOS BOTÕES
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
//===========================================