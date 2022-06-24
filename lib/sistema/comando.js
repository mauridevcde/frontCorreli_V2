import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerComando, BusquedaComando, tablaComando, modalNuevoEditarComando } from '../views/TemplateComando.js';
import { api_get_ComandoAll, api_post_Comando, api_update_comando, api_delete_comando } from "../apis/apiComandos.js";
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
    await Ver_Editar_Modal_Table(view, comandos);
    deleteComando_Table()
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
async function delete_Comando(datos) {
    let nuevaPersona = await api_delete_comando(datos);
    return nuevaPersona;
}
async function put_Comando(datos) {
    let nuevaPersona = await api_update_comando(datos);
    return nuevaPersona;
}

//!funciones.

async function nuevoComando() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarComando2'))
    let btnNuevacomando = document.getElementById('btnModalAggComando');
    let btnGuardar = document.getElementById('btnGuardarNuevoComando');
    let btnEditar = document.getElementById('btnGuardarEditarComando');
    let optionMovimientoComandos = document.getElementById('selectMovEditar');
    let movimientosRender = ``;

    btnNuevacomando.addEventListener('click', async () => {
        limpiarCampsoModal();
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';

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

async function Ver_Editar_Modal_Table(view, comandos) {
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
            btnGuardar.style.display = 'none';
            btnEditar.style.display = 'grid';

            let movimientos = await getAllMovimiento();

            let comandosFiltrados = comandos.filter(comando => comando.id_comando == id);

            document.getElementById('inpNombreComando').value = comandosFiltrados[0].nombre;
            console.log('comandosFiltrados', comandosFiltrados);

            let id_movimientoFiltrados = comandosFiltrados[0].id_movimiento

            let optionComandos = document.getElementById('selectMovEditar');
            let comandoRender = ``
            movimientos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 

                // c/onsole.log('py: ', element.id_dp_provi);
                if (element.id_movimiento == id_movimientoFiltrados) {
                    comandoRender += `<option value="${element.id_movimiento}" selected>${element.nombre}</option>`
                }

                if (element.id_movimiento != id_movimientoFiltrados) {
                    comandoRender += `<option value="${element.id_movimiento}" >${element.nombre}</option>`
                }
            });

            optionComandos.innerHTML = comandoRender
            comandoRender = ``;


            btnEditar.addEventListener("click", function (e) {

                let nombreComandoAct = document.getElementById("inpNombreComando").value
                let movimientoComandoAct = document.getElementById("selectMovEditar").value

                let comandoActualizado = {
                    id_comando: id,
                    id_movimiento: movimientoComandoAct,
                    nombre: nombreComandoAct
                }
                if (validaObject(comandoActualizado)) {
                    console.log("true");
                    console.log(comandoActualizado);

                    put_Comando(comandoActualizado).then((res) => {
                        if (res.message == 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: "Comando Actualizado!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });

                            modal.hide();
                            inicioComando()

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error al Actualizar Comando!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });
                        }
                    })
                    console.log('ok', comandoActualizado);
                } else {
                    console.log(comandoActualizado);
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
        )
    })
}

async function deleteComando_Table() {
    let btnEliminarComando = document.querySelectorAll(".btnEliminarComando");
    btnEliminarComando.forEach(btn => {
        btn.addEventListener('click', async () => {

            let id = btn.id;
            let deleteComand = {
                id_comando: id,

            }

            if (validaObject(deleteComand)) {

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
                        'Comando Eliminado.',
                        'success'
                      )
        
                      //lo eliminamos
                      delete_Comando(deleteComand).then((res) => {
                            if (res.message == 'ok') {
                                        
                                inicioComando()
        
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Eliminar Comando!",
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
                        'Tu Comando no se ha eliminado!',
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


async function limpiarCampsoModal() {

    document.getElementById('inpNombreComando').value = "";
    document.getElementById('selectMovEditar').value = "";


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