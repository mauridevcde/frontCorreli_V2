import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerFaccion, BusquedaFaccion } from '../views/TemplateFacciones.js'
import { navbar } from '../views/templatesHome.js'

export function faccion() {
    inicioFaccion()
}

async function inicioFaccion() {

    let view = {};
    view.navbar = navbar();
    view.header =  await headerFaccion(); //header con icono
    view.busqueda = await BusquedaFaccion(); //busqueda
    renderTableCliente(view)

}

//!se ejecuta 3~Tercero
async function renderTableCliente(view) {
    //console.log('renderTable', await getAllClientes())
    const clientes = await getAllFacciones();
    //console.log('clientes', clientes);
    view.table = await tablaFacciones(clientes);
    render(view, true);
    despuesdelRender(clientes, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(clientes, view) {
    addNavBarFunctions();
    modalNuevoClientebtn();
    botoneraTable(clientes, view);

    swal.close()
}

//! Se ejecuta 5~quinto
async function botoneraTable(clientes, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    // EditarClienteModalTable(provincias, clientes, contactos, view);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

}