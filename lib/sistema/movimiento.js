import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerMovimiento, BusquedaMovimiento, tablaMovimiento, modalNuevoEditarMovimiento } from '../views/TemplateMovimiento.js'
import { navbar } from '../views/templatesHome.js'
import { api_get_MovimientosAll, api_get_Movimientos_by_id, api_post_movimientos, api_update_movimientos, api_delete_movimientos } from '../apis/apiMovimientos.js';

export function movimiento() {

    inicioMovimiento()
}

async function inicioMovimiento() {

    let view = {};
    view.navbar = navbar();
    view.header = headerMovimiento(); //header con icono
    view.busqueda = BusquedaMovimiento(); //busqueda filtro
    view.modalNuevoEditarmovimiento = modalNuevoEditarMovimiento();
    render(view, true);
    renderTableMovimientos(view)
}

//!se ejecuta 3~Tercero
async function renderTableMovimientos(view) {
    //console.log('renderTable', await getAllClientes())
    const movimientos = await getAllMovimientos();
    console.log('movimientos', movimientos);
    //console.log('clientes', clientes);
    view.table = tablaMovimiento(movimientos);
    render(view, true);
    despuesdelRender(movimientos, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(movimientos, view) {
    addNavBarFunctions();
    nuevoMovimientos();
    botoneraTable(movimientos, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(movimientos, view) {
    Ver_Editar_Modal_Table(view, movimientos);
    deletemovimiento_Table();
}

//!All apis

async function getAllMovimientos() {
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

async function getMovimientos_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Movimientos_by_id(id);
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

function nuevoMovimientos() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarmovimiento'))
    let btnNuevamovimiento = document.getElementById('btnModalAggmovimiento');
    let btnGuardar = document.getElementById('btnGuardarNuevomovimiento')
    let btnEditar = document.getElementById('btnGuardarEditarmovimiento')

    btnNuevamovimiento.addEventListener('click', () => {
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';
        limpiarCampos();
        modal.show();

    })

    btnGuardar.addEventListener('click', () => {

        let fecha = convert_DateTime_ToMySqlFormat();
        console.log('fecha', fecha);


        let nombre = document.getElementById('inpNombreFraccion').value;
        let descripcion = document.getElementById('inpDesFraccion').value;
        //let localidad_descripcion = document.getElementById('selectProvNuevoFraccion').value;
        let fechaCreacion = fecha;
        let creadoPor = localStorage.getItem('user');

        let movimiento = {

            nombre: nombre,
            descripcion: descripcion,
            localidad_id: "10",
            localidad_descripcion: "Alto Parana",
            fecha_creado: fechaCreacion,
            creada_por_user: creadoPor,

        }

        if (validaObject(movimiento)) {
            //console.log("true");
            console.log(movimiento);
            post_movimientos(movimiento).then((res) => {
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Nuevo Movimiento Agregado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                    modal.hide();
                    inicioMovimiento()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Error al agregar la Movimiento!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });

                }

            })

        } else {
            console.log(movimiento);
            Swal.fire({
                icon: 'error',
                title: "Alg??n Campo Vacio!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });
        };

    })

    let btnCerrarModal = document.getElementById('btnCerrarNuevomovimiento');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

function Ver_Editar_Modal_Table(view, movimientos) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditmovimiento');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevomovimiento')
    let btnEditar = document.getElementById('btnGuardarEditarmovimiento')
    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarmovimiento'))
            tituloModal.innerHTML = 'Ver/Editar movimiento';
            btnGuardar.style.display = 'none';
            btnEditar.style.display = 'grid';
            let movimientoPorId = await getMovimientos_by_id(id);
            console.log('movimientoPorId', movimientoPorId);

            document.getElementById('inpNombreFraccion').value = movimientoPorId[0].nombre;
            document.getElementById('inpDesFraccion').value = movimientoPorId[0].descripcion;
            document.getElementById('selectProvNuevoFraccion').value = movimientoPorId[0].localidad_descripcion;
            document.getElementById('inpObsNuevoCliente').value = movimientoPorId[0].creada_por_user;

            btnEditar.addEventListener('click', function (e) {
                let idUpd = movimientoPorId[0].id_movimiento
                let nombreUpd = document.getElementById('inpNombreFraccion').value.trim().toUpperCase()
                let descripcionUpd = document.getElementById('inpNombreFraccion').value.trim().toUpperCase()
                let creadoPorUpd = `Creado por: ${localStorage.getItem('user')}`
                let fechaCreacionUpd = convert_DateTime_ToMySqlFormat();


                let updMovimiento = {
                    id_movimiento: idUpd,
                    nombre: nombreUpd,
                    descripcion: descripcionUpd,
                    localidad_id: 10,
                    localidad_descripcion: "Alto Parana",
                    fecha_creado: fechaCreacionUpd,
                    creada_por_user: creadoPorUpd
                }

                if (validaObject(updMovimiento)) {
                    console.log("???? ~ file: movimiento.js ~ line 221 ~ updMovimiento", updMovimiento)
                    console.log("true");


                    put_movimientos(updMovimiento).then((res) => {
                        if (res.message == 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: "Movimiento Actualizado!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });

                            modal.hide();
                            inicioMovimiento()

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error al Actualizar Movimiento!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });
                        }
                    })

                } else {
                    console.log(updMovimiento);
                    Swal.fire({
                        icon: 'error',
                        title: "Alg??n Campo Vacio!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }


            });


            modal.show();
        }
        )
    })
}

async function deletemovimiento_Table() {
    let btnEliminarmovimiento = document.querySelectorAll(".btnEliminarmovimiento");
    btnEliminarmovimiento.forEach(btn => {
        btn.addEventListener('click', async () => {

            let id = btn.id;
            let deleteComand = {
                id_movimiento: id,

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
                    text: "Atenci??n!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, Eliminar!',
                    cancelButtonText: 'No, Cancelar!',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                      swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'Movimiento Eliminado.',
                        'success'
                      )
        
                      //lo eliminamos
                      delete_movimientos(deleteComand).then((res) => {
                            if (res.message == 'ok') {
                                        
                                inicioMovimiento()
        
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Eliminar Movimiento!",
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
                        'Tu Movimiento no se ha eliminado!',
                        'error'
                      )
                    }
                  })

            } else {
                console.log(updatePunt);
                Swal.fire({
                    icon: 'error',
                    title: "Alg??n Campo Vacio!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                });
            }
        });
    });

}


//apis
async function post_movimientos(datos) {
    let neuevoMovimiento = await api_post_movimientos(datos);
    return neuevoMovimiento;
}
async function put_movimientos(datos) {
    let neuevoMovimiento = await api_update_movimientos(datos);
    return neuevoMovimiento;
}
async function delete_movimientos(datos) {
    let neuevoMovimiento = await api_delete_movimientos(datos);
    return neuevoMovimiento;
}

//! validador de campos vacios
function validaObject(datos) {
    let conta = 0;
    for (const property in datos) {
        if (datos[property] == '' || datos[property] == null || datos[property] == undefined) {
            conta++;
        }
    }
    if (conta > 0) { return false; } else { return true; }
}

function limpiarCampos() {
    document.getElementById('inpNombreFraccion').value = "";
    document.getElementById('inpDesFraccion').value = "";
    document.getElementById('selectProvNuevoFraccion').value = "";
    document.getElementById('inpObsNuevoCliente').value = "";
}

function convert_DateTime_ToMySqlFormat() {
    var date = new Date();
    let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return retorno
}