import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerComando, BusquedaComando, tablaComando, modalNuevoEditarComando } from '../views/TemplateComando.js';
//import { api_get_ComandoAll, api_get_Comando_by_id, api_post_comando } from "../apis/apiComando.js";
import { navbar } from '../views/templatesHome.js'

export function comando() {
    inicioComando()
}

async function inicioComando() {

    let view = {};
    view.navbar = navbar();
    view.header = headerComando(); //header con icono
    view.BusquedaComando = BusquedaComando();
    view.modalNuevoEditarComando = modalNuevoEditarComando();
    render(view, true);
    renderTableComando(view);

}

//!se ejecuta 3~Tercero
async function renderTableComando(view) {
    //console.log('renderTable', await getAllClientes())
    const Comando = await getAllComando();
    console.log('comandos', Comando);
    //console.log('clientes', clientes);
    view.table = tablaComando(Comando);
    render(view, true);
    despuesdelRender(Comando, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(comandos, view) {
    addNavBarFunctions();
    nuevoComando();
    botoneraTable(comandos, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(comandos, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    await Ver_Editar_Modal_Table(view, comandos);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

}

//!All apis

async function getAllComando() {
    const response = await api_get_ComandoAll();
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

async function getComando_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Comando_by_id(id);
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

async function nuevoComando() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarComando2'))
    let btnNuevacomando = document.getElementById('btnModalAggComando');
    let btnGuardar = document.getElementById('btnGuardarNuevoComando')
    let btnEditar = document.getElementById('btnGuardarEditarComando')

    btnNuevacomando.addEventListener('click', () => {
        limpiarCampsoModal();
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevo_comando');
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

            const crear = api_post_comando(datito).then((result) => {
                if (result.message == 'ok') {
                    modal.hide();
                    inicioComando();
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
    let btnCerrarModal = document.getElementById('btnCerrarNuevoComando');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

async function Ver_Editar_Modal_Table(comandos) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditComando');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoComando')
    let btnEditar = document.getElementById('btnGuardarEditarComando')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarComando2'))
            tituloModal.innerHTML = 'Ver/Editar comando';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            //let comandoPorId = await getComando_by_id(id);
            let comandosFiltrados = comandos.filter(comando => console.log('comando', comando));
            console.log('comandoPorId', comandoPorId);

            // document.getElementById('inpNombreFraccion').value = comandoPorId[0].nombre;
            // document.getElementById('inpDesFraccion').value = comandoPorId[0].descripcion;
            // document.getElementById('selectProvNuevoFraccion').value = comandoPorId[0].localidad_descripcion;
            // document.getElementById('inpObsNuevoCliente').value = comandoPorId[0].creada_por_user;

            modal.show();
        }
        )
    })
}

function getCamposModal(fecha, user) {

    let datos = {};
    datos.nombre = document.getElementById('inpNombreComando').value;
    datos.telefono = document.getElementById('inpTelefonoComando').value;
    datos.ci = document.getElementById('inpCiComando').value;
    datos.email = document.getElementById('inpEmailComando').value;
    datos.password = document.getElementById('inpPasswordComando').value;
    datos.fecha_creado = fecha;
    datos.creada_por_user = user;
    return datos;

}

async function limpiarCampsoModal() {

    document.getElementById('inpNombreComando').value = "";
    document.getElementById('inpTelefonoComando').value = "";
    document.getElementById('inpCiComando').value = "";
    document.getElementById('inpEmailComando').value = "";
    document.getElementById('inpPasswordComando').value = "";

}