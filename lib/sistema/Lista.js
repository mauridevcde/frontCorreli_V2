import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerLista, BusquedaLista, tablaLista, modalNuevoEditarLista } from '../views/TemplateLista.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_ListaAll } from '../apis/apiListas.js';

export function lista() {

    inicioLista()
}

async function inicioLista() {

    let view = {};
    view.navbar = navbar();
    view.header = headerLista(); //header con icono
    view.busqueda = BusquedaLista(); //busqueda filtro
    view.modalNuevoEditarLista = modalNuevoEditarLista();
    render(view, true);
    renderTableLista(view)
}

//!se ejecuta 3~Tercero
async function renderTableLista(view) {
    //console.log('renderTable', await getAllClientes())
    const Lista = await getAllLista();
    console.log('Lista', Lista);
    //console.log('clientes', clientes);
    view.table = tablaLista(Lista);
    render(view, true);
    despuesdelRender(Lista, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(Lista, view) {
    addNavBarFunctions();
    nuevoLista();
    botoneraTable(Lista, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(Lista, view) {

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

async function getAllLista() {
    const response = await api_get_ListaAll();
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

async function getLista_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Lista_by_id(id);
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

function nuevoLista() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarLista'))
    let btnNuevaLista = document.getElementById('btnModalAggLista');
    let btnGuardar = document.getElementById('btnGuardarNuevoLista')
    let btnEditar = document.getElementById('btnGuardarEditarLista')

    btnNuevaLista.addEventListener('click', () => {
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevaLista');
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
    let btnCerrarModal = document.getElementById('btnCerrarNuevoLista');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

function Ver_Editar_Modal_Table() {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditLista');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoLista')
    let btnEditar = document.getElementById('btnGuardarEditarLista')
    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarLista'))
            tituloModal.innerHTML = 'Ver/Editar Lista';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            let ListaPorId = await getLista_by_id(id);
            console.log('ListaPorId', ListaPorId);

            document.getElementById('inpNombreFraccion').value = ListaPorId[0].nombre;
            document.getElementById('inpDesFraccion').value = ListaPorId[0].descripcion;
            document.getElementById('selectProvNuevoFraccion').value = ListaPorId[0].localidad_descripcion;
            document.getElementById('inpObsNuevoCliente').value = ListaPorId[0].creada_por_user;



            modal.show();
        }
        )
    })
}