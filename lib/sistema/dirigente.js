import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerDirigente, BusquedaDirigente, tablaDirigente, modalNuevoEditarDirigente } from '../views/TemplateDirigente.js';
import { api_get_DirigenteAll, api_post_dirigente, api_update_dirigente, api_delete_dirigente } from "../apis/apiDirigente.js";
import { api_get_ComandoAll } from "../apis/apiComandos.js";

import { navbar } from '../views/templatesHome.js'

export function dirigente() {
    inicioDirigente()
}

async function inicioDirigente() {

    let view = {};
    view.navbar = navbar();
    view.header = headerDirigente(); //header con icono
    view.BusquedaDirigente = BusquedaDirigente();
    view.modalNuevoEditarDirigente = modalNuevoEditarDirigente();
    render(view, true);
    renderTableDirigente(view);

}

//!se ejecuta 3~Tercero
async function renderTableDirigente(view) {
    //console.log('renderTable', await getAllClientes())
    const Dirigente = await getAllDirigente();
    console.log('dirigentes', Dirigente);
    //console.log('clientes', clientes);
    view.table = tablaDirigente(Dirigente);
    render(view, true);
    despuesdelRender(Dirigente, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(dirigentes, view) {
    addNavBarFunctions();
    nuevoDirigente();
    botoneraTable(dirigentes, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(dirigentes, view) {

    await Ver_Editar_Modal_Table(view, dirigentes);
    deleteDirigente_Table()


}

//!All apis

async function getAllDirigente() {
    const response = await api_get_DirigenteAll();
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
async function getAllComandos() {
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

async function post_Dirigente(datos) {
    let nuevaPersona = await api_post_dirigente(datos);
    return nuevaPersona;
}

async function delete_Dirigente(datos) {
    let neuevoMovimiento = await api_delete_dirigente(datos);
    return neuevoMovimiento;
}

async function put_Dirigente(datos) {
    let neuevoMovimiento = await api_update_dirigente(datos);
    return neuevoMovimiento;
}

//!funciones.


async function nuevoDirigente() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarDirigente2'))
    let btnNuevadirigente = document.getElementById('btnModalAggDirigente');
    let btnGuardar = document.getElementById('btnGuardarNuevoDirigente')
    let btnEditar = document.getElementById('btnGuardarEditarDirigente')

    btnNuevadirigente.addEventListener('click', async() => {
        limpiarCampsoModal();
        let allComandos = await getAllComandos()
        let usarComandos = allComandos
        
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';

        let optionComandos = document.getElementById('selectComando');
        let comandosRender = ``;

        usarComandos.forEach(element => {
            console.log("🚀 ~ file: dirigente.js ~ line 116 ~ btnNuevadirigente.addEventListener ~ element", element)
            comandosRender += `<option value="${element.id_comando}" selected>${element.nombre}</option>`
        });
        optionComandos.innerHTML = comandosRender
        comandosRender = ``;


        modal.show();
        console.log('nuevo_dirigente');
    })

    btnGuardar.addEventListener('click', () => {

        let fecha = convert_DateTime_ToMySqlFormat();


        let nombreDirigente = document.getElementById('inpNombreDirigente').value.trim()
        let telefonoDirigente = document.getElementById('inpTelefonoDirigente').value.trim().toUpperCase();
        let ciDirigente = document.getElementById('inpCiDirigente').value.trim().toUpperCase();
        let passwordDirigente = document.getElementById('inpCiPasswordDirigente').value.trim().toUpperCase();
        let idComando = document.getElementById('selectComando').value

        let dirigenteInsert = {
            nombre: nombreDirigente,
            ci: ciDirigente,
            telefono: telefonoDirigente,
            pass: passwordDirigente,
            fecha_creado: fecha,
            id_comando: idComando
        }

        if (validaObject(dirigenteInsert)) {
            //console.log("true");
            console.log(dirigenteInsert);
            post_Dirigente(dirigenteInsert).then((res) => {
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Nuevo Dirigente Agregado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                    modal.hide();
                    inicioDirigente()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Error al agregar Dirigente!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }
            })
        } else {
            console.log(dirigenteInsert);
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
    let btnCerrarModal = document.getElementById('btnCerrarNuevoDirigente');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

async function Ver_Editar_Modal_Table(view, dirigentes) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditDirigente');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoDirigente')
    let btnEditar = document.getElementById('btnGuardarEditarDirigente')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            limpiarCampsoModal();
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarDirigente2'))
            tituloModal.innerHTML = 'Ver/Editar dirigente';
            btnGuardar.style.display = 'none';
            btnEditar.style.display = 'grid';

            let allComandos = await getAllComandos()
            let usarComandos = allComandos

            let optionComandos = document.getElementById('selectComando');
            let comandosRender = ``;


            let dirigentesFiltrados = dirigentes.filter(dirigente => dirigente.id_dirigente == id);
            console.log('dirigentePorId', dirigentesFiltrados);

            usarComandos.forEach(element => {

                console.log("🚀 ~ file: dirigente.js ~ line 116 ~ btnNuevadirigente.addEventListener ~ element", element)
                if (element.id_comando == dirigentesFiltrados[0].id_comando){
                    comandosRender += `<option value="${element.id_comando}" selected>${element.nombre}</option>`
                }else {
                    comandosRender += `<option value="${element.id_comando}">${element.nombre}</option>`
                }
                  
            });
            optionComandos.innerHTML = comandosRender
            comandosRender = ``;

            document.getElementById('inpNombreDirigente').value = dirigentesFiltrados[0].nombre
            document.getElementById('inpCiDirigente').value = dirigentesFiltrados[0].ci
            document.getElementById('inpTelefonoDirigente').value = dirigentesFiltrados[0].telefono
            document.getElementById('inpCiPasswordDirigente').value = dirigentesFiltrados[0].pass

            modal.show();

            btnEditar.addEventListener('click', (e) => {
                let inpNombreDirigenteUp = document.getElementById('inpNombreDirigente').value
                let inpCiDirigenteUp = document.getElementById('inpCiDirigente').value
                let inpTelefonoDirigenteUp = document.getElementById('inpTelefonoDirigente').value
                let inpCiPasswordDirigenteUp = document.getElementById('inpCiPasswordDirigente').value
                let idComandoDirigenteUp = document.getElementById('selectComando').value

                let updDirigente = {
                    id_dirigente: id,
                    nombre: inpNombreDirigenteUp,
                    ci: inpCiDirigenteUp,
                    telefono: inpTelefonoDirigenteUp,
                    password: inpCiPasswordDirigenteUp,
                    id_comando: idComandoDirigenteUp
                }

             

                if (validaObject(updDirigente)) {
                    //console.log("🚀 ~ file: dirigente.js ~ line 207 ~ btnEditar.addEventListener ~ updDirigente", updDirigente)

                    console.log("true");


                    put_Dirigente(updDirigente).then((res) => {
                        if (res.message == 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: "Dirigente Actualizado!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });

                            modal.hide();
                            inicioDirigente()

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error al Actualizar Dirigente!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });
                        }
                    })

                } else {
                    console.log(updDirigente);
                    Swal.fire({
                        icon: 'error',
                        title: "Algún Campo Vacio!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }
            });
        }
        )
    })
}

async function deleteDirigente_Table() {
    let btnEliminarDirigente = document.querySelectorAll(".btnEliminarDirigente");
    btnEliminarDirigente.forEach(btn => {
        btn.addEventListener('click', async () => {

            let id = btn.id;
            let deleteComand = {
                id_dirigente: id,

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
                            'Dirigente Eliminado.',
                            'success'
                        )

                        //lo eliminamos
                        delete_Dirigente(deleteComand).then((res) => {
                            if (res.message == 'ok') {
                                inicioDirigente()
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Eliminar Dirigente!",
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
                            'Tu Dirigente no se ha eliminado!',
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

    document.getElementById('inpNombreDirigente').value = ""
    document.getElementById('inpCiDirigente').value = ""
    document.getElementById('inpTelefonoDirigente').value = ""
    document.getElementById('inpCiPasswordDirigente').value = ""

}

export async function validaObject(datos) {

    let conta = 0;
    for (const property in datos) {
        if (datos[property] == '' || datos[property] == null || datos[property] == undefined) {
            conta++;
        }
    }

    if (conta > 0) { return false; } else { return true; }

}