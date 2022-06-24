import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerSistema, BusquedaSistema, tablaSistema, modalNuevoEditarSistema } from '../views/TemplateSistema.js';
import { api_get_SistemaAll, api_post_Sistema, api_update_sistema } from "../apis/apiSistemas.js";
import { navbar } from '../views/templatesHome.js'

export function Sistema() {
    inicioSistema()
}

async function inicioSistema() {
    let view = {};
    view.navbar = navbar();
    view.header = headerSistema(); //header con icono
    view.BusquedaSistema = BusquedaSistema();
    view.modalNuevoEditarSistema = modalNuevoEditarSistema();
    render(view, true);
    renderTableSistema(view);
}

//!se ejecuta 3~Tercero
async function renderTableSistema(view) {
    //console.log('renderTable', await getAllClientes())
    const Sistema = await getAllSistema();
    console.log('Sistemas', Sistema);
    //console.log('clientes', clientes);
    view.table = tablaSistema(Sistema);
    render(view, true);
    despuesdelRender(Sistema, view);
}

//! se ejecuta 4~cuarto 
async function despuesdelRender(Sistemas, view) {
    addNavBarFunctions();
    nuevoSistema();
    botoneraTable(Sistemas, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(Sistemas, view) {
    await Ver_Editar_Modal_Table(Sistemas, view);
}

//!All apis
async function getAllSistema() {
    const response = await api_get_SistemaAll();
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


async function post_Sistema(datos) {
    let nuevoSistema = await api_post_Sistema(datos);
    return nuevoSistema;
}

//!funciones.

async function nuevoSistema() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarSistema2'))
    let btnNuevaSistema = document.getElementById('btnModalAggSistema');

    let btnGuardar = document.getElementById('btnGuardarNuevoSistema')
    let btnEditar = document.getElementById('btnGuardarEditarSistema')

    btnNuevaSistema.addEventListener('click', async () => {
        limpiarCampsoModal();
        btnGuardar.style.display = 'grid';
        btnEditar.style.display = 'none';

        modal.show();
        console.log('nuevo_Sistema');
    })

    btnGuardar.addEventListener('click', () => {

        let inpNombreSistema = document.getElementById('inpNombreSistema').value.trim().toUpperCase();
        let inpCiSistema = document.getElementById('inpCiSistema').value.trim().toUpperCase();
        let inpCorreoSistema = document.getElementById('inpCorreoSistema').value.trim().toUpperCase();
        let inpPassSistema = document.getElementById('inpPassSistema').value.trim().toUpperCase();
        let selectMovEditar = document.getElementById('selectMovEditar').value

        let SistemasInsert = {
            nombre: inpNombreSistema,
            ci: inpCiSistema,
            correo: inpCorreoSistema,
            pass: inpPassSistema,
            nivel: selectMovEditar
        }

        if (validaObject(SistemasInsert)) {
            //console.log("true");
            console.log(SistemasInsert);
            post_Sistema(SistemasInsert).then((res) => {
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Nuevo Usuario Agregado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                    modal.hide();
                    inicioSistema()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Error al Usuario Sistemas!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }
            })
        } else {
            console.log(SistemasInsert);
            Swal.fire({
                icon: 'error',
                title: "Algún Campo Vacio!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });
        };
    })

    let btnCerrarModal = document.getElementById('btnCerrarNuevoSistema');
    btnCerrarModal.addEventListener('click', () => {
        modal.hide();
    })
}

async function Ver_Editar_Modal_Table(Sistemas) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditSistema');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoSistema')
    let btnEditar = document.getElementById('btnGuardarEditarSistema')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);

            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarSistema2'))

            tituloModal.innerHTML = 'Ver/Editar Sistema';
            btnGuardar.style.display = 'none';
            btnEditar.style.visibility = 'visible';

            console.log('Sistemas', Sistemas);
            //let SistemaPorId = await getSistema_by_id(id);
            let SistemasFiltrados = Sistemas.filter(Sistema => Sistema.id_usuario == id);
            console.log('SistemaPorId', SistemasFiltrados);

            document.getElementById('inpNombreSistema').value = SistemasFiltrados[0].nombre
            document.getElementById('inpCiSistema').value = SistemasFiltrados[0].ci
            document.getElementById('inpCorreoSistema').value = SistemasFiltrados[0].correo
            document.getElementById('inpPassSistema').value = SistemasFiltrados[0].pass
            document.getElementById('selectMovEditar').value = SistemasFiltrados[0].nivel

            let btnGuardarEditarSistema = document.getElementById('btnGuardarEditarSistema');
            btnGuardarEditarSistema.addEventListener('click', () => {
                let inpNombreSistema = document.getElementById('inpNombreSistema').value.trim().toUpperCase();
                let inpCiSistema = document.getElementById('inpCiSistema').value.trim().toUpperCase();
                let inpCorreoSistema = document.getElementById('inpCorreoSistema').value.trim().toUpperCase();
                let inpPassSistema = document.getElementById('inpPassSistema').value.trim().toUpperCase();
                let selectMovEditar = document.getElementById('selectMovEditar').value

                let SistemasUpdate = {
                    id_usuario:id,
                    nombre: inpNombreSistema,
                    ci: inpCiSistema,
                    correo: inpCorreoSistema,
                    pass: inpPassSistema,
                    estado: 1,
                    nivel: selectMovEditar
                }

                if (validaObject(SistemasUpdate)) {
                    //console.log("true");
                    console.log(SistemasUpdate);
                        updateSistema(SistemasUpdate).then((res) => {
                            if (res.message == 'ok') {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Nuevo Usuario Actualizado!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                                modal.hide();
                                inicioSistema()
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al Usuario Sistemas!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                            }
                        })
                    } else {
                        console.log(SistemasUpdate);
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


async function limpiarCampsoModal() {

    document.getElementById('inpNombreSistema').value = "";
    document.getElementById('selectMovEditar').value = "";


}


async function updateSistema(producto) {
    let productoUpdate = await api_update_sistema(producto)

    return productoUpdate

}