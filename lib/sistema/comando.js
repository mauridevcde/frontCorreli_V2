import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerComando, BusquedaComando, tablaComando, modalNuevoEditarComando } from '../views/TemplateComando.js';
import { api_get_ComandoAll, api_post_Comando } from "../apis/apiComandos.js";
import { api_get_MovimientosAll } from "../apis/apiMovimientos.js";
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

async function getAllMovimiento() {
    const response = await api_get_MovimientosAll();
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


async function post_Comando(datos) {
    let nuevaPersona = await api_post_Comando(datos);
    return nuevaPersona;
}

//!funciones.

async function nuevoComando() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarComando2'))
    let btnNuevacomando = document.getElementById('btnModalAggComando');
    let btnGuardar = document.getElementById('btnGuardarNuevoComando')
    let btnEditar = document.getElementById('btnGuardarEditarComando')
    let optionMovimientoComandos = document.getElementById('selectMovEditar');
    let movimientosRender = ``;

    btnNuevacomando.addEventListener('click', async () => {
        limpiarCampsoModal();
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';

        let movimientos = await getAllMovimiento();

        movimientos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 
            movimientosRender += `<option value="${element.id_movimiento}" selected>${element.nombre}</option>`
        });

        optionMovimientoComandos.innerHTML = movimientosRender
        movimientosRender = ``;

        modal.show();
        console.log('nuevo_comando');
    })

    btnGuardar.addEventListener('click', () => {
        let usuario = '@alguien';
        let fecha = convert_DateTime_ToMySqlFormat();


        let idMovimientos = document.getElementById('selectMovEditar').value
        let nombreComando = document.getElementById('inpNombreComando').value.trim().toUpperCase();
        console.log('idMovimientos', idMovimientos);

        let comandosInsert = {
            id_movimiento: idMovimientos,
            nombre: nombreComando,
            fecha_creado: fecha
        }

        if (validaObject(comandosInsert)) {
            //console.log("true");
            console.log(comandosInsert);
            post_Comando(comandosInsert).then((res) => {
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Nuevo Comando Agregado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                    modal.hide();
                    inicioComando()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Error al agregar Comandos!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }
            })
        } else {
            console.log(comandosInsert);
            Swal.fire({
                icon: 'error',
                title: "Algún Campo Vacio!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });
        };
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


async function limpiarCampsoModal() {

    document.getElementById('inpNombreComando').value = "";
    document.getElementById('selectMovEditar').value = "";


}