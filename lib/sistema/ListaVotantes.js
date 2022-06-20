import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerListaVotantes, BusquedaListaVotantes, tablaListaVotantes, modalNuevoEditarListaVotantes } from '../views/TemplateListaVotantes.js';
import { api_get_PunteroAll  } from "../apis/apiPuntero.js";
import { navbar } from '../views/templatesHome.js'

export function ListaVotantes() {
    inicioListaVotantes()
}

async function inicioListaVotantes() {

    let view = {};
    view.navbar = navbar();
    view.header = headerListaVotantes(); //header con icono
    view.BusquedaListaVotantes = BusquedaListaVotantes();
    view.modalNuevoEditarListaVotantes = modalNuevoEditarListaVotantes();
    render(view, true);
    renderTableListaVotantes(view);

}

//!se ejecuta 3~Tercero
async function renderTableListaVotantes(view) {
    //console.log('renderTable', await getAllClientes())
    const ListaVotantes = await getAllListaVotantes();
    console.log('ListaVotantess', ListaVotantes);
    //console.log('clientes', clientes);
    view.table = tablaListaVotantes(ListaVotantes);
    render(view, true);
    despuesdelRender(ListaVotantes, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(ListaVotantess, view) {
    addNavBarFunctions();
    nuevoListaVotantes();
    botoneraTable(ListaVotantess, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(ListaVotantess, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    await Ver_Editar_Modal_Table(view, ListaVotantess);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

}

//!All apis

async function getAllListaVotantes() {
    const response = await api_get_PunteroAll();
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

async function getListaVotantes_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_ListaVotantes_by_id(id);
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

async function nuevoListaVotantes() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarListaVotantes2'))
    let btnNuevaListaVotantes = document.getElementById('btnModalAggListaVotantes');
    let btnGuardar = document.getElementById('btnGuardarNuevoListaVotantes')
    let btnEditar = document.getElementById('btnGuardarEditarListaVotantes')

    btnNuevaListaVotantes.addEventListener('click', () => {
        limpiarCampsoModal();
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevo_ListaVotantes');
    })

    btnGuardar.addEventListener('click', () => {
        let usuario = '@alguien';
        let fecha = convert_DateTime_ToMySqlFormat();
        // console.log('fecha', fecha);

        const datito = getCamposModal(fecha, usuario)


        //console.log('datos', datito);
        //console.log(typeof datito);

        if (validaObject(datito)) {
            console.log('el datito', datito);
            console.log(typeof datito);

            const crear = api_post_ListaVotantes(datito).then((result) => {
                if (result.message == 'ok') {
                    modal.hide();
                    inicioListaVotantes();
                } else {
                    console.log('algo no se guardo');
                }
            })


        } else {
            console.log('nde tavy');
        }



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
        let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
        return retorno
    }
    let btnCerrarModal = document.getElementById('btnCerrarNuevoListaVotantes');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

async function Ver_Editar_Modal_Table(ListaVotantess) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditListaVotantes');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoListaVotantes')
    let btnEditar = document.getElementById('btnGuardarEditarListaVotantes')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarListaVotantes2'))
            tituloModal.innerHTML = 'Ver/Editar ListaVotantes';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            //let ListaVotantesPorId = await getListaVotantes_by_id(id);
            let ListaVotantessFiltrados = ListaVotantess.filter(ListaVotantes => console.log('ListaVotantes', ListaVotantes));
            console.log('ListaVotantesPorId', ListaVotantesPorId);

            // document.getElementById('inpNombreFraccion').value = ListaVotantesPorId[0].nombre;
            // document.getElementById('inpDesFraccion').value = ListaVotantesPorId[0].descripcion;
            // document.getElementById('selectProvNuevoFraccion').value = ListaVotantesPorId[0].localidad_descripcion;
            // document.getElementById('inpObsNuevoCliente').value = ListaVotantesPorId[0].creada_por_user;

            modal.show();
        }
        )
    })
}

function getCamposModal(fecha, user) {

    let datos = {};
    datos.nombre = document.getElementById('inpNombreListaVotantes').value;
    datos.telefono = document.getElementById('inpTelefonoListaVotantes').value;
    datos.ci = document.getElementById('inpCiListaVotantes').value;
    datos.email = document.getElementById('inpEmailListaVotantes').value;
    datos.password = document.getElementById('inpPasswordListaVotantes').value;
    datos.fecha_creado = fecha;
    datos.creada_por_user = user;
    return datos;

}

async function limpiarCampsoModal() {

    document.getElementById('inpNombreListaVotantes').value = "";
    document.getElementById('inpTelefonoListaVotantes').value = "";
    document.getElementById('inpCiListaVotantes').value = "";
    document.getElementById('inpEmailListaVotantes').value = "";
    document.getElementById('inpPasswordListaVotantes').value = "";

}