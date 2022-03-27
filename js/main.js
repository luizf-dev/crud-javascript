//=============ATIVAR MODAL==================
const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active');
}
//===========================================

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));



//===== CRUD INICIO ==============
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
//==== CRUD FIM ===============

//==== INTERAÇAO CRUD COM O LAYOUT =====

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = "");
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            cidade: document.getElementById('cidade').value
        }
        createClient(client);
        updateTable();
        closeModal();
    }
}

//Carregando os registros do LocalStorage

const createRow = (client) => {
    const newRow = document.createElement('tr') 
    newRow.innerHTML = `
        <td data-label="Nome">${client.nome}</td>
        <td data-label="Email">${client.email}</td>
        <td data-label="Telefone">${client.telefone}</td>
        <td data-label="Cidade">${client.cidade}</td>
        <td data-label="Editar"><button type="button" class="action" data-action="edit"><i class="fas fa-edit fa-2x edit"></i></button></td>
        <td data-label="Deletar"><button type="button" class="action" data-action="delete"><i class="fas fa-trash fa-2x delete"></i></button></td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const editDelete = (event) => {
    if(event.target.type == 'button'){
        console.log(event.target.dataset.action);
    }
}

updateTable();







//===============EVENTOS=======
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener('click', saveClient)

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)






//===========================================