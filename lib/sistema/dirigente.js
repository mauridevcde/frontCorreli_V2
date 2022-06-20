import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerDirigente, BusquedaDirigente, tablaDirigente, modalNuevoEditarDirigente } from '../views/TemplateDirigente.js';
import { api_get_DirigenteAll, api_get_Dirigente_by_id, api_post_dirigente } from "../apis/apiDirigente.js";
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

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    await Ver_Editar_Modal_Table(view, dirigentes);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

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

async function getDirigente_by_id(id) {
    if (id == null || id == 0 || id == '' || id == undefined) {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'id no puede estar vacio'
        })
    } else {
        const response = await api_get_Dirigente_by_id(id);
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

async function post_Dirigente(datos) {
    let nuevaPersona = await api_post_dirigente(datos);
    return nuevaPersona;
}

//!funciones.

async function nuevoDirigente() {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarDirigente2'))
    let btnNuevadirigente = document.getElementById('btnModalAggDirigente');
    let btnGuardar = document.getElementById('btnGuardarNuevoDirigente')
    let btnEditar = document.getElementById('btnGuardarEditarDirigente')

    btnNuevadirigente.addEventListener('click', () => {
        limpiarCampsoModal();
        btnGuardar.style.visibility = 'visible';
        btnEditar.style.visibility = 'hidden';
        modal.show();
        console.log('nuevo_dirigente');
    })

    btnGuardar.addEventListener('click', () => {

        let fecha = convert_DateTime_ToMySqlFormat();


        let nombreDirigente = document.getElementById('inpNombreDirigente').value.trim()
        let telefonoDirigente = document.getElementById('inpTelefonoDirigente').value.trim().toUpperCase();
        let ciDirigente = document.getElementById('inpCiDirigente').value.trim().toUpperCase();
        let passwordDirigente = document.getElementById('inpCiPasswordDirigente').value.trim().toUpperCase();


        let dirigenteInsert = {
            nombre: nombreDirigente,
            ci: ciDirigente,
            telefono: telefonoDirigente,
            pass: passwordDirigente,
            fecha_creado: fecha

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

async function Ver_Editar_Modal_Table(dirigentes) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditDirigente');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoDirigente')
    let btnEditar = document.getElementById('btnGuardarEditarDirigente')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarDirigente2'))
            tituloModal.innerHTML = 'Ver/Editar dirigente';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            //let dirigentePorId = await getDirigente_by_id(id);
            let dirigentesFiltrados = dirigentes.filter(dirigente => console.log('dirigente', dirigente));
            console.log('dirigentePorId', dirigentePorId);

            // document.getElementById('inpNombreFraccion').value = dirigentePorId[0].nombre;
            // document.getElementById('inpDesFraccion').value = dirigentePorId[0].descripcion;
            // document.getElementById('selectProvNuevoFraccion').value = dirigentePorId[0].localidad_descripcion;
            // document.getElementById('inpObsNuevoCliente').value = dirigentePorId[0].creada_por_user;

            modal.show();
        }
        )
    })
}

async function limpiarCampsoModal() {

    document.getElementById('inpNombreDirigente').value = "";
    document.getElementById('inpCiDirigente').value = "";
    document.getElementById('inpCiPasswordDirigente').value = "";

}