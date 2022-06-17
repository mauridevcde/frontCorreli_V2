import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerPuntero, BusquedaPuntero, tablaPuntero, modalNuevoEditarPuntero } from '../views/TemplatePuntero.js';
import { api_get_PunteroAll, api_get_Puntero_by_id, api_post_puntero } from "../apis/apiPuntero.js";
import { navbar } from '../views/templatesHome.js'

export function puntero() {
    inicioPuntero()
}

async function inicioPuntero() {

    let view = {};
    view.navbar = navbar();
    view.header = headerPuntero(); //header con icono
    view.BusquedaPuntero = BusquedaPuntero();
    view.modalNuevoEditarPuntero = modalNuevoEditarPuntero();
    render(view, true);
    renderTablePuntero(view);

}

//!se ejecuta 3~Tercero
async function renderTablePuntero(view) {
    //console.log('renderTable', await getAllClientes())
    const Puntero = await getAllPuntero();
    console.log('punteros', Puntero);
    //console.log('clientes', clientes);
    view.table = tablaPuntero(Puntero);
    render(view, true);
    despuesdelRender(Puntero, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(punteros, view) {
    addNavBarFunctions();
    nuevoPuntero();
    botoneraTable(punteros, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(punteros, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    await Ver_Editar_Modal_Table(view, punteros);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

}

//!All apis

async function getAllPuntero() {
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

async function getPuntero_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Puntero_by_id(id);
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

async function nuevoPuntero() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarPuntero2'))
    let btnNuevapuntero = document.getElementById('btnModalAggPuntero');
    let btnGuardar = document.getElementById('btnGuardarNuevoPuntero')
    let btnEditar = document.getElementById('btnGuardarEditarPuntero')

    btnNuevapuntero.addEventListener('click', () => {
        limpiarCampsoModal();
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevo_puntero');
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

            const crear = api_post_puntero(datito).then((result) => {
                if (result.message == 'ok') {
                    modal.hide();
                    inicioPuntero();
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
    let btnCerrarModal = document.getElementById('btnCerrarNuevoPuntero');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

async function Ver_Editar_Modal_Table(punteros) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditPuntero');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoPuntero')
    let btnEditar = document.getElementById('btnGuardarEditarPuntero')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarPuntero2'))
            tituloModal.innerHTML = 'Ver/Editar puntero';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            //let punteroPorId = await getPuntero_by_id(id);
            let punterosFiltrados = punteros.filter(puntero => console.log('puntero', puntero));
            console.log('punteroPorId', punteroPorId);

            // document.getElementById('inpNombreFraccion').value = punteroPorId[0].nombre;
            // document.getElementById('inpDesFraccion').value = punteroPorId[0].descripcion;
            // document.getElementById('selectProvNuevoFraccion').value = punteroPorId[0].localidad_descripcion;
            // document.getElementById('inpObsNuevoCliente').value = punteroPorId[0].creada_por_user;

            modal.show();
        }
        )
    })
}

function getCamposModal(fecha, user) {

    let datos = {};
    datos.nombre = document.getElementById('inpNombrePuntero').value;
    datos.telefono = document.getElementById('inpTelefonoPuntero').value;
    datos.ci = document.getElementById('inpCiPuntero').value;
    datos.email = document.getElementById('inpEmailPuntero').value;
    datos.password = document.getElementById('inpPasswordPuntero').value;
    datos.fecha_creado = fecha;
    datos.creada_por_user = user;
    return datos;

}

async function limpiarCampsoModal() {

    document.getElementById('inpNombrePuntero').value = "";
    document.getElementById('inpTelefonoPuntero').value = "";
    document.getElementById('inpCiPuntero').value = "";
    document.getElementById('inpEmailPuntero').value = "";
    document.getElementById('inpPasswordPuntero').value = "";

}