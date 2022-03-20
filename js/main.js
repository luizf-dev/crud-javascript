//=============ATIVAR MODAL==================
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => document.getElementById('modal')
    .classList.remove('active')
//===========================================

//===VARIAVEL GLOBAL=========================
const tempClient = {
    nome: "Carlos Gil",
    email: "teste@gmail.com",
    telefone: "1122334455",
    cidade: "São Paulo"
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));



//===== CRUD==============

// Create ==================
const createClient = (client) => {
    const dbClient = getLocalStorage();
    dbClient.push (client);
    setLocalStorage(dbClient);    
}


// Read ==================


//===============EVENTOS=====================
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
//===========================================