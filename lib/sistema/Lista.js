import { render } from '../others/renderizado.js';

import { addNavBarFunctions, spinnerRender } from '../others/utils.js';

import { headerLista, BusquedaLista, tablaLista, modalNuevoEditarLista } from '../views/TemplateLista.js'

import { navbar } from '../views/templatesHome.js'

import { api_get_ListaAll, api_post_Lista, api_update_Lista, api_delete_Lista, api_get_grupoByX_idDirigente, api_get_grupoByDirigentes } from '../apis/apiListas.js';

import { api_get_ComandoAll } from '../apis/apiComandos.js';

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
    let dirigentes = await cargaDirigentes();
    let comandos = await cargaComandos();
    let punteros = await cargaPunteros();
    renderTableLista(view, dirigentes, comandos, punteros)

}

//!se ejecuta 3~Tercero
async function renderTableLista(view, dirigentes, comandos, punteros) {

    if (localStorage.getItem('id_dirigente') != null || localStorage.getItem('id_dirigente') != undefined) {

        let id = localStorage.getItem('id_dirigente');
        console.log("🚀 ~ file: Lista.js ~ line 45 ~ renderTableLista ~ id", id)

        let Lista = await getAllGrupoXIdDirigente(id);
        view.table = tablaLista(Lista);
        render(view, true);
        despuesdelRender(Lista, view, dirigentes, comandos, punteros);


    } else {

        let Lista = await getAllLista();
        view.table = tablaLista(Lista);
        render(view, true);
        despuesdelRender(Lista, view, dirigentes, comandos, punteros);
    }



}

//! se ejecuta 4~cuarto 
async function despuesdelRender(Lista, view, dirigentes, comandos, punteros) {
    addNavBarFunctions();

    nuevoLista(dirigentes, comandos, punteros);
    botoneraTable(Lista, view, dirigentes, comandos, punteros);
}

//! Se ejecuta 5~quinto
async function botoneraTable(Lista, view, dirigentes, comandos, punteros) {

    Ver_Editar_Modal_Table(Lista, view, dirigentes, comandos, punteros);
    deleteLista_Table()
}

//!funciones.

async function nuevoLista(dirigentes, comandos, punteros) {

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
        limpiarImputs()

        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';




        modal.show();

    });

    comandos.forEach(element => {
        movimientosRender += `<option value="${element.id_comando}" selected>${element.nombre}</option>`
    });
    optionMovimientos.innerHTML = movimientosRender
    movimientosRender = ``;

    dirigentes.forEach(element => {
        //console.log();
        if (element.id_dirigente == localStorage.getItem('id_dirigente') ) {
            dirigentesRender += `<option value="${element.id_dirigente}" selected>${element.nombre}</option>`
        }
       
    });
    optionDirigentes.innerHTML = dirigentesRender
    dirigentesRender = ``;

    punteros.forEach(element => {
        console.log(element);
        if (element.id_dirigente == localStorage.getItem('id_dirigente') ) {
            punterosRender += `<option value="${element.id_puntero}" selected>${element.nombre}</option>`
        }
        
    });
    optionPunteros.innerHTML = punterosRender
    punterosRender = ``;



    btnGuardar.addEventListener('click', async () => {
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

        spinnerRender()
        if (validaObject(postObject)) {

            post_Lista(postObject).then( async (res) => {
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Nuevo Grupo Agregado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });


                    let allIdGrupos = await getDirigentesByDirigentes(localStorage.getItem('id_dirigente'));

                    console.log("🚀 ~ file: main.js ~ line 75 ~ btnLog.addEventListener ~ allIdGrupos", allIdGrupos)

                    if (allIdGrupos != false) {

                        localStorage.setItem("id_grupo_AddLista", JSON.stringify(allIdGrupos));

                    } else {
                        localStorage.setItem('id_grupo_AddLista', "noExiste")
                    }




                    modal.hide();
                    inicioLista()
                    swal.close()
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

            Swal.fire({
                icon: 'error',
                title: "Algún Campo Vacio!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });
        };
    });


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

async function Ver_Editar_Modal_Table(Lista, view, dirigentes, comandos, punteros) {

    let btnVerEditar = document.querySelectorAll('.btnNewViewEditLista');
    let tituloModal = document.getElementById('ListaNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoLista')
    let btnEditar = document.getElementById('btnGuardarEditarLista')

    let optionDirigentes = document.getElementById('selectDirigente');
    let dirigentesRender = ``;

    let optionMovimientos = document.getElementById('selectMovimiento');
    let movimientosRender = ``;

    let optionPunteros = document.getElementById('selectPuntero');
    let punterosRender = ``;


    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!localStorage.getItem('id_dirigente')) {
                let id = btn.id;

                let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarLista'))

                tituloModal.innerHTML = 'Ver/Editar Lista';
                btnGuardar.style.display = 'none';
                btnEditar.style.display = 'grid';

                let ListaFiltrado = Lista.filter(listas => listas.id_grupo == id)
                console.log("🚀 ~ file: Lista.js ~ line 220 ~ btn.addEventListener ~ ListaFiltrado", ListaFiltrado)

                document.getElementById("inpNombreLista").value = ListaFiltrado[0].nombre;

                comandos.forEach(element => {

                    if (element.id_comando == ListaFiltrado[0].id_comando) {
                        movimientosRender += `<option value="${element.id_comando}" selected>${element.nombre}</option>`
                    } else {
                        movimientosRender += `<option value="${element.id_comando}" >${element.nombre}</option>`
                    }
                });
                optionMovimientos.innerHTML = movimientosRender
                movimientosRender = ``;

                dirigentes.forEach(element => {

                    if (element.id_dirigente == ListaFiltrado[0].dirigentes_id_dirigente) {
                        dirigentesRender += `<option value="${element.id_dirigente}" selected>${element.nombre}</option>`
                    } else {
                        dirigentesRender += `<option value="${element.id_dirigente}" >${element.nombre}</option>`
                    }
                });
                optionDirigentes.innerHTML = dirigentesRender
                dirigentesRender = ``;

                punteros.forEach(element => {

                    if (element.id_puntero == ListaFiltrado[0].punteros_id_puntero) {
                        punterosRender += `<option value="${element.id_puntero}" selected>${element.nombre}</option>`
                    } else {
                        punterosRender += `<option value="${element.id_puntero}" >${element.nombre}</option>`
                    }
                });
                optionPunteros.innerHTML = punterosRender
                punterosRender = ``;

                btnEditar.addEventListener("click", function (e) {

                    let inpNombreLista2 = document.getElementById('inpNombreLista').value
                    let punteros_id_puntero2 = document.getElementById('selectPuntero').value
                    let dirigentes_id_dirigente2 = document.getElementById('selectDirigente').value
                    let dirigentes_id_movimiento2 = document.getElementById('selectMovimiento').value
                    let fecha2 = convert_DateTime_ToMySqlFormat()

                    let ListaActualizado = {
                        id_grupo: id,
                        nombre: inpNombreLista2,
                        punteros_id_puntero: punteros_id_puntero2,
                        dirigentes_id_dirigente: dirigentes_id_dirigente2,
                        fecha_creado: fecha2,
                        creada_por_user: localStorage.getItem('user'),
                        id_movimiento: dirigentes_id_movimiento2
                    }

                    if (validaObject(ListaActualizado)) {
                        console.log("🚀 ~ file: Lista.js ~ line 287 ~ ListaActualizado", ListaActualizado)
                        console.log("true");
                        spinnerRender()
                        put_Lista(ListaActualizado).then((res) => {
                            if (res.message == 'ok') {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Grupo Actualizado!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });

                                modal.hide();
                                inicioLista()
                                swal.close()
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Actualizar Grupo!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                            }
                        })
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: "Algún Campo Vacio!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    }

                })
                modal.show();
            } else {
                let id = btn.id;

                let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarLista'))

                tituloModal.innerHTML = 'Ver/Editar Lista';
                btnGuardar.style.display = 'none';
                btnEditar.style.display = 'grid';

                console.log('Ver si llega listas', Lista)

                let ListaFiltrado = Lista.filter(listas => listas.grupos.id_grupo == id)

                console.log('lista filtrado por dirigente', ListaFiltrado);
                
                document.getElementById("inpNombreLista").value = ListaFiltrado[0].grupos.nombre;

                comandos.forEach(element => {

                    if (element.id_comando == ListaFiltrado[0].grupos.id_comando) {
                        movimientosRender += `<option value="${element.id_comando}" selected>${element.nombre}</option>`
                    } else {
                        movimientosRender += `<option value="${element.id_comando}" >${element.nombre}</option>`
                    }
                });
                optionMovimientos.innerHTML = movimientosRender
                movimientosRender = ``;

                dirigentes.forEach(element => {

                    if (element.id_dirigente == ListaFiltrado[0].grupos.dirigentes_id_dirigente) {
                        dirigentesRender += `<option value="${element.id_dirigente}" selected>${element.nombre}</option>`
                    } else {
                        dirigentesRender += `<option value="${element.id_dirigente}" >${element.nombre}</option>`
                    }
                });
                optionDirigentes.innerHTML = dirigentesRender
                dirigentesRender = ``;

                punteros.forEach(element => {

                    if (element.id_puntero == ListaFiltrado[0].grupos.punteros_id_puntero) {
                        punterosRender += `<option value="${element.id_puntero}" selected>${element.nombre}</option>`
                    } else {
                        punterosRender += `<option value="${element.id_puntero}" >${element.nombre}</option>`
                    }
                });
                optionPunteros.innerHTML = punterosRender
                punterosRender = ``;

                btnEditar.addEventListener("click", function (e) {

                    let inpNombreLista2 = document.getElementById('inpNombreLista').value
                    let punteros_id_puntero2 = document.getElementById('selectPuntero').value
                    let dirigentes_id_dirigente2 = document.getElementById('selectDirigente').value
                    let dirigentes_id_movimiento2 = document.getElementById('selectMovimiento').value
                    let fecha2 = convert_DateTime_ToMySqlFormat()

                    let ListaActualizado = {
                        id_grupo: id,
                        nombre: inpNombreLista2,
                        punteros_id_puntero: punteros_id_puntero2,
                        dirigentes_id_dirigente: dirigentes_id_dirigente2,
                        fecha_creado: fecha2,
                        creada_por_user: localStorage.getItem('user'),
                        id_movimiento: dirigentes_id_movimiento2
                    }

                    if (validaObject(ListaActualizado)) {
                        console.log("🚀 ~ file: Lista.js ~ line 287 ~ ListaActualizado", ListaActualizado)
                        console.log("true");

                        put_Lista(ListaActualizado).then((res) => {
                            if (res.message == 'ok') {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Grupo Actualizado!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });

                                modal.hide();
                                inicioLista()

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Actualizar Grupo!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                            }
                        })
                    } else {

                        Swal.fire({
                            icon: 'error',
                            title: "Algún Campo Vacio!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    }

                })
                modal.show();
            }

        }
        )
    })
}

async function deleteLista_Table() {
    let btnEliminarLista = document.querySelectorAll(".btnEliminarLista");
    btnEliminarLista.forEach(btn => {
        btn.addEventListener('click', async () => {

            let id = btn.id;
            let updatePunt = {
                id_grupo: id,

            }

            if (validaObject(updatePunt)) {

                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Estas seguro de Eliminar?',
                    text: "Atención!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Cancelar!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                            'Eliminado!',
                            'Grupo Eliminado.',
                            'success'
                        )

                        //lo eliminamos
                        delete_Lista(updatePunt).then((res) => {
                            if (res.message == 'ok') {

                                inicioLista()

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Eliminar Grupo!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                            }
                        })

                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            'Tu Grupo no se ha eliminado!',
                            'error'
                        )
                    }
                })

            } else {
                console.log(updatePunt);
                Swal.fire({
                    icon: 'error',
                    title: "Algún Campo Vacio!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                });
            }
        });
    });

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
async function getAllGrupoXIdDirigente(id) {
    const response = await api_get_grupoByX_idDirigente(id);
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
async function delete_Lista(datos) {
    let nuevaPersona = await api_delete_Lista(datos);
    return nuevaPersona;
}
async function put_Lista(datos) {
    let nuevaPersona = await api_update_Lista(datos);
    return nuevaPersona;
}

async function cargaComandos() {
    let movimientos = await api_get_ComandoAll();
    //  console.log('movimientos', movimientos);
    if (movimientos.message == 'ok') {

        return movimientos.result;
    } else {
        return false;
    }
}

async function cargaPunteros() {
    let punteros = await api_get_PunteroAll();
    //  console.log('movimientos', movimientos);
    if (punteros.message == 'ok') {

        return punteros.result;
    } else {
        return false;
    }
}

async function cargaDirigentes() {
    let dirigentes = await api_get_DirigenteAll();
    //  console.log('movimientos', movimientos);
    if (dirigentes.message == 'ok') {

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

function limpiarImputs() {
    document.getElementById("selectDirigente").value = "";
    document.getElementById("selectMovimiento").value = "";
    document.getElementById("selectPuntero").value = "";
    document.getElementById("inpNombreLista").value = "";
}


async function getDirigentesByDirigentes(id) {


    let usuario = await api_get_grupoByDirigentes(id);

    console.log('estoy en grupos: ', usuario)


    if (usuario.message == 'ok') {
        let { result } = usuario
        if (result.length > 0) {
            return result
        } else {
            return false
        }
    } else {
        swal.fire({
            icon: 'error',
            title: "error grupos",
        });
    }
}