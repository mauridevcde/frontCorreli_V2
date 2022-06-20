import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerComando, BusquedaComando, tablaComando, modalNuevoEditarComando } from '../views/TemplateComando.js'
import { navbar } from '../views/templatesHome.js'


export function comando() {

    inicioComando()
}

async function inicioComando() {

    let view = {};
    view.navbar = navbar();
    view.header = headerComando(); //header con icono
    view.busqueda = BusquedaComando(); //busqueda filtro
    view.modalNuevoEditarComando = modalNuevoEditarComando();
    render(view, true);
    renderTableComando(view)
}

//!se ejecuta 3~Tercero
async function renderTableComando(view) {
    //console.log('renderTable', await getAllClientes())
    const Comando = await getAllComando();
    console.log('Comando', Comando);
    //console.log('clientes', clientes);
    view.table = tablaComando(Comando);
    render(view, true);
    despuesdelRender(Comando, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(Comando, view) {
    addNavBarFunctions();
    nuevoComando();
    botoneraTable(Comando, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(Comando, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    Ver_Editar_Modal_Table(view);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)
}