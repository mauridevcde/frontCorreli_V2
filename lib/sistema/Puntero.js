import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerPuntero, BusquedaPuntero, tablaPuntero, modalNuevoEditarPuntero } from '../views/TemplatePuntero.js';
import { api_get_PunteroAll, api_post_puntero, api_update_puntero, api_delete_puntero } from "../apis/apiPuntero.js";
import { api_get_PunteroXBy_idDirigente } from '../apis/apiListas.js';
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

    if (localStorage.getItem('id_dirigente')) {

        let id = localStorage.getItem('id_dirigente');
       
        let Lista = await getAllPunterosXIdDirigente(id);

        console.log("🚀 ~ file: Puntero.js ~ line 33 ~ renderTablePuntero ~ Lista", Lista)

        view.table = tablaPuntero(Lista);

        render(view, true);
        despuesdelRender(Lista, view);

    }else{

        const Puntero = await getAllPuntero();
        view.table = tablaPuntero(Puntero);
        render(view, true);
        despuesdelRender(Puntero, view);
    }
    
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
    await deletePuntero_Table(punteros)
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

async function updatePuntero(data) {
    let puntero = await api_update_puntero(data)

    return puntero
}
async function deletePuntero(data) {
    let puntero = await api_delete_puntero(data)

    return puntero
}

//!funciones.

async function nuevoPuntero() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarPuntero2'))
    let btnNuevapuntero = document.getElementById('btnModalAggPuntero');
    let btnGuardar = document.getElementById('btnGuardarNuevoPuntero')
    let btnEditar = document.getElementById('btnGuardarEditarPuntero')

    btnNuevapuntero.addEventListener('click', () => {
        limpiarCampsoModal();
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';
        modal.show();

    })

    btnGuardar.addEventListener('click', () => {
        let usuario = '@alguien';
        let fecha = convert_DateTime_ToMySqlFormat();
        // console.log('fecha', fecha);

        const datito = getCamposModal(fecha, usuario)

        if (validaObject(datito)) {
            console.log('el datito', datito);
            console.log(typeof datito);

            api_post_puntero(datito).then((result) => {
                if (result.message == 'ok') {
                    modal.hide();
                    inicioPuntero();
                } else {
                    console.log('algo no se guardo');
                }
            })
        } else {
            swal.fire({
                icon: 'error',
                title: 'Algun Campo Vacio'
            })
            console.log('nde tavy');
        }
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

async function Ver_Editar_Modal_Table(view, punteros) {
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
            btnGuardar.style.display = 'none';
            btnEditar.style.display = 'grid';

            let punterosFiltrados = punteros.filter(puntero => puntero.id_puntero == id);

            console.log('punteroPorId', punterosFiltrados);

            document.getElementById('inpNombrePuntero').value = punterosFiltrados[0].nombre
            document.getElementById('inpTelefonoPuntero').value = punterosFiltrados[0].telefono
            document.getElementById('inpCiPuntero').value = punterosFiltrados[0].ci
            document.getElementById('inpEmailPuntero').value = punterosFiltrados[0].email
            document.getElementById('inpPasswordPuntero').value = punterosFiltrados[0].pass

            btnEditar.addEventListener('click', function (e) {
                let nombrePuntero = document.getElementById('inpNombrePuntero').value.trim().toUpperCase()
                let telefonoPuntero = document.getElementById('inpTelefonoPuntero').value.trim().toUpperCase()
                let ciPunteto = document.getElementById('inpCiPuntero').value.trim().toUpperCase()
                let emailPuntero = document.getElementById('inpEmailPuntero').value.trim()
                let passPuntero = document.getElementById('inpPasswordPuntero').value.trim().toUpperCase()

                function convert_DateTime_ToMySqlFormat() {
                    var date = new Date();
                    let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
                    return retorno
                }
                let date = convert_DateTime_ToMySqlFormat()
                let updatePunt = {
                    id_puntero: id,
                    nombre: nombrePuntero,
                    telefono: telefonoPuntero,
                    email: emailPuntero,
                    password: passPuntero,
                    ci: ciPunteto,
                    fecha_creado: date
                }

                if (validaObject(updatePunt)) {
                    //console.log("true");
                    console.log(updatePunt);
                    updatePuntero(updatePunt).then((res) => {
                        if (res.message == 'ok') {
                            Swal.fire({
                                icon: 'success',
                                title: "Nuevo Puntero Actualizado!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });

                            modal.hide();
                            inicioPuntero()

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error al Actualizar Puntero!",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#6F8EAD",
                            });
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




            modal.show();
        }
        )
    })
}

async function deletePuntero_Table() {
    let btnEliminarProducto = document.querySelectorAll(".btnEliminarPuntero");
    btnEliminarProducto.forEach(btn => {
        btn.addEventListener('click', async () => {

            let id = btn.id;
            let updatePunt = {
                id_puntero: id,

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
                            'Puntero Eliminado.',
                            'success'
                        )

                        //lo eliminamos
                        deletePuntero(updatePunt).then((res) => {
                            if (res.message == 'ok') {

                                inicioPuntero()

                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Eliminar Puntero!",
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
                            'Tu Puntero no se ha eliminado!',
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
function getCamposModal(fecha, user) {

    let datos = {};
    datos.nombre = document.getElementById('inpNombrePuntero').value;
    datos.telefono = document.getElementById('inpTelefonoPuntero').value;
    datos.ci = document.getElementById('inpCiPuntero').value;
    datos.email = document.getElementById('inpEmailPuntero').value;
    datos.password = document.getElementById('inpPasswordPuntero').value;
    datos.fecha_creado = fecha;
    datos.creada_por_user = user;
    if(!localStorage.getItem('id_dirigente')){
        datos.id_dirigente = "0"
    }else{
        datos.id_dirigente = localStorage.getItem('id_dirigente');
    }
    

    return datos;

}

async function limpiarCampsoModal() {

    document.getElementById('inpNombrePuntero').value = "";
    document.getElementById('inpTelefonoPuntero').value = "";
    document.getElementById('inpCiPuntero').value = "";
    document.getElementById('inpEmailPuntero').value = "";
    document.getElementById('inpPasswordPuntero').value = "";

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



async function getAllPunterosXIdDirigente(id) {
    const response = await api_get_PunteroXBy_idDirigente(id);
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