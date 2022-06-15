import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerFaccion, BusquedaFaccion, tablaFaccion, modalNuevoEditarFaccion } from '../views/TemplateFacciones.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_FaccionesAll, api_get_Facciones_by_id } from '../apis/apiFaciones.js';

export function faccion() {

    inicioFaccion()
}

async function inicioFaccion() {

    let view = {};
    view.navbar = navbar();
    view.header = headerFaccion(); //header con icono
    view.busqueda = BusquedaFaccion(); //busqueda filtro
    view.modalNuevoEditarFaccion = modalNuevoEditarFaccion();
    render(view, true);
    renderTableFaccion(view)
}

//!se ejecuta 3~Tercero
async function renderTableFaccion(view) {
    //console.log('renderTable', await getAllClientes())
    const facciones = await getAllFacciones();
    console.log('facciones', facciones);
    //console.log('clientes', clientes);
    view.table = tablaFaccion(facciones);
    render(view, true);
    despuesdelRender(facciones, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(facciones, view) {
    addNavBarFunctions();
    nuevaFaccion();
    botoneraTable(facciones, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(facciones, view) {

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

//!All apis

async function getAllFacciones() {
    const response = await api_get_FaccionesAll();
    if (response.message == 'ok') {
        let { result } = response;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}

async function getFacciones_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Facciones_by_id(id);
        if (response.message == 'ok') {
            let { result } = response;
            return result;
        } else {
            swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo obtener los datos'
            })
        }
    }

}

//!funciones.

function nuevaFaccion() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarFaccion'))
    let btnNuevaFaccion = document.getElementById('btnModalAggFaccion');
    let btnGuardar = document.getElementById('btnGuardarNuevoFaccion')
    let btnEditar = document.getElementById('btnGuardarEditarFaccion')

    btnNuevaFaccion.addEventListener('click', () => {
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevaFaccion');
    })

    btnGuardar.addEventListener('click', () => {
        
        let fecha = convert_DateTime_ToMySqlFormat();
        console.log('fecha', fecha);
        //console.log("Date: " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
        // let nombre = document.getElementById('inpNombreFraccion').value;
        // let descripcion = document.getElementById('inpDesFraccion').value;
        // let localidad_id = 10 //colocar el que sea luego dinamicamente.
        // let localidad_descripcion = document.getElementById('selectProvNuevoFraccion').value;
        // let fechaCreacion = ;
        // let creadoPor = "mauridevcde@cde.com"
    })
    function convert_DateTime_ToMySqlFormat() {
        var date = new Date();
        let retorno = date.toISOString().split('T')[0] + ' '+ date.toTimeString().split(' ')[0];
        return retorno
    }
    let btnCerrarModal = document.getElementById('btnCerrarNuevoFaccion');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

function Ver_Editar_Modal_Table() {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditFaccion');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoFaccion')
    let btnEditar = document.getElementById('btnGuardarEditarFaccion')
    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarFaccion'))
            tituloModal.innerHTML = 'Ver/Editar Faccion';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            let faccionPorId = await getFacciones_by_id(id);
            console.log('faccionPorId', faccionPorId);

            document.getElementById('inpNombreFraccion').value = faccionPorId[0].nombre;
            document.getElementById('inpDesFraccion').value = faccionPorId[0].descripcion;
            document.getElementById('selectProvNuevoFraccion').value = faccionPorId[0].localidad_descripcion;
            document.getElementById('inpObsNuevoCliente').value = faccionPorId[0].creada_por_user;



            modal.show();
        }
        )
    })
}