import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerLista, BusquedaLista, tablaLista, modalNuevoEditarLista } from '../views/TemplateLista.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_ListaAll,api_post_Lista } from '../apis/apiListas.js';
import { api_get_MovimientosAll } from '../apis/apiMovimientos.js';
import { api_get_PunteroAll } from '../apis/apiPuntero.js';
import { api_get_DirigenteAll } from '../apis/apiDirigente.js';

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

    Ver_Editar_Modal_Table(Lista, view);

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
async function post_Lista(datos) {
    let nuevaPersona = await api_post_Lista(datos);
    return nuevaPersona;
}


//!funciones.

function nuevoLista() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarLista'))
    let btnNuevaLista = document.getElementById('btnModalAggLista');
    let btnGuardar = document.getElementById('btnGuardarNuevoLista')
    let btnEditar = document.getElementById('btnGuardarEditarLista')

    let optionDirigentes = document.getElementById('selectDirigente');
    let dirigentesRender = ``;

    let optionMovimientos = document.getElementById('selectMovimiento');
    let movimientosRender = ``;

    let optionPunteros = document.getElementById('selectPuntero');
    let punterosRender = ``;

    btnNuevaLista.addEventListener('click', async () => {
        console.log('nuevaLista');
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';

        let movimientos = await cargaMovimientos();
        let dirigentes = await cargaDirigentes();
        let punteros = await cargaPunteros();

        movimientos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 
            movimientosRender += `<option value="${element.id_movimiento}" selected>${element.nombre}</option>`
        });
        optionMovimientos.innerHTML = movimientosRender
        movimientosRender = ``;

        dirigentes.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 
            dirigentesRender += `<option value="${element.id_dirigente}" selected>${element.nombre}</option>`
        });
        optionDirigentes.innerHTML = dirigentesRender
        dirigentesRender = ``;

        punteros.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 
            punterosRender += `<option value="${element.id_puntero}" selected>${element.nombre}</option>`
        });
        optionPunteros.innerHTML = punterosRender
        punterosRender = ``;



        btnGuardar.addEventListener('click', () => {
            let inpNombreLista = document.getElementById('inpNombreLista').value
            let punteros_id_puntero = document.getElementById('selectPuntero').value
            let dirigentes_id_dirigente = document.getElementById('selectDirigente').value
            let dirigentes_id_movimiento = document.getElementById('selectMovimiento').value
            let fecha = convert_DateTime_ToMySqlFormat()

            let postObject = {
                nombre: inpNombreLista,
                punteros_id_puntero: punteros_id_puntero,
                dirigentes_id_dirigente: dirigentes_id_dirigente,
                fecha_creado: fecha,
                creada_por_user: localStorage.getItem('user'),
                id_movimiento: dirigentes_id_movimiento
            }
            console.log('envio al post ', postObject)

            if (validaObject(postObject)) {
                //console.log("true");
                console.log(postObject);
                post_Lista(postObject).then((res) => {
                    if (res.message == 'ok') {
                        Swal.fire({
                            icon: 'success',
                            title: "Nuevo Grupo Agregado!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                        modal.hide();
                        inicioLista()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Error al agregar Grupo!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    }
                })
            } else {
                console.log(postObject);
                Swal.fire({
                    icon: 'error',
                    title: "Algún Campo Vacio!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                });
            };
        });
        modal.show();

    });

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
        let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
        return retorno
    }

    let btnCerrarModal = document.getElementById('btnCerrarNuevoLista');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

function Ver_Editar_Modal_Table(Lista, view) {
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


async function cargaMovimientos() {
    let movimientos = await api_get_MovimientosAll();
    //  console.log('movimientos', movimientos);
    if (movimientos.message == 'ok') {
        console.log('movimientos', movimientos.result);
        return movimientos.result;
    } else {
        return false;
    }
}

async function cargaPunteros() {
    let punteros = await api_get_PunteroAll();
    //  console.log('movimientos', movimientos);
    if (punteros.message == 'ok') {
        console.log('punteros', punteros.result);
        return punteros.result;
    } else {
        return false;
    }
}

async function cargaDirigentes() {
    let dirigentes = await api_get_DirigenteAll();
    //  console.log('movimientos', movimientos);
    if (dirigentes.message == 'ok') {
        console.log('dirigentes', dirigentes.result);
        return dirigentes.result;
    } else {
        return false;
    }
}

function convert_DateTime_ToMySqlFormat() {
    var date = new Date();
    let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return retorno
}

function validaObject(datos) {

    let conta = 0;
    for (const property in datos) {
        if (datos[property] == '' || datos[property] == null || datos[property] == undefined) {
            conta++;
        }
    }

    if (conta > 0) { return false; } else { return true; }

}