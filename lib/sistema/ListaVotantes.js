import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender, validaObject } from '../others/utils.js';
import { headerListaVotantes, BusquedaListaVotantes, tablaListaVotantes, modalNuevoEditarListaVotantes, modalGruposLista } from '../views/TemplateListaVotantes.js';
import { api_get_ListaVotantesAll, api_getAll_Ci_grupoId } from "../apis/apiListas.js";
import { navbar } from '../views/templatesHome.js'

export function ListaVotantes() {
    inicioListaVotantes()
}

async function inicioListaVotantes() {

    let view = {};
    view.navbar = navbar();
    view.header = headerListaVotantes(); //header con icono
    view.BusquedaListaVotantes = BusquedaListaVotantes();
    view.modalGruposLista = modalGruposLista()
    view.modalNuevoEditarListaVotantes = modalNuevoEditarListaVotantes();
    render(view, true);


    renderTableListaVotantes(view);

}

//!se ejecuta 3~Tercero
async function renderTableListaVotantes(view) {

    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalSeleccionarGrupoLista'))

    let objGrupos = JSON.parse(localStorage.getItem('id_grupo_AddLista'))
    let optionGrupos = document.getElementById('selectMovGrupoLista');
    let grupoRender = ``

    objGrupos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 

        console.log("🚀 ~ file: Persona.js ~ line 380 ~ obj grupos", element)

        grupoRender += `<option value="${element.id_grupo}" >${element.id_grupo}</option>`

    });

    optionGrupos.innerHTML = grupoRender
    grupoRender = ``;

    modal.show()

    window.btnGuardarNuevoGrupoLista.addEventListener("click", async () => {
        let idGrupus = window.selectMovGrupoLista.value

        let allCi = await getAll_Ci_grupoId(idGrupus)

        console.log('al ci', allCi)

        let todosLosCiEnArray = allCi.map(element => element.n_cedula)

        console.log("🚀 ~ file: ListaVotantes.js ~ line 55 ~ window.btnGuardarNuevoGrupoLista.addEventListener ~ todosLosCiEnArray", todosLosCiEnArray)

        
        const ListaVotantes = await getAllListaVotantes(idGrupus, todosLosCiEnArray );

        console.log('ListaVotantess', ListaVotantes);

        modal.hide()

        view.table = tablaListaVotantes(ListaVotantes);
        render(view, true);
        despuesdelRender(ListaVotantes, view);     

    });

}

//! se ejecuta 4~cuarto 
async function despuesdelRender(ListaVotantess, view) {
    addNavBarFunctions();
    botoneraTable(ListaVotantess, view);
}

//! Se ejecuta 5~quinto
async function botoneraTable(ListaVotantess, view) {

    // //Editar Cliente
    // let provincias = await getAllProvincia(); //llamando a la api provincia  
    // let contactos = await getAllContacto();

    // //funcion EDITAR CLIENTE MODAL
    await Ver_Editar_Modal_Table(view, ListaVotantess);

    // //funcion VER CLIENTE MODAL
    // verClienteModalTable(provincias, clientes, contactos)

    // //funcion eliminar cliente MODAL
    // eliminarClienteModalTable(clientes)

}

//!All apis

async function getAllListaVotantes(id, cedulas) {
    let votante = await api_get_ListaVotantesAll(id, cedulas);
    if (votante.message == 'ok') {
        let { result } = votante;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}


async function getAll_Ci_grupoId(id) {
    let votante = await api_getAll_Ci_grupoId(id);
    if (votante.message == 'ok') {
        let { result } = votante;
        return result;
    } else {
        swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo obtener los datos'
        })
    }
}


//!funciones.
async function Ver_Editar_Modal_Table(ListaVotantess) {
    let btnVerEditar = document.querySelectorAll('.btnNewViewEditListaVotantes');
    let tituloModal = document.getElementById('clientesNuevoEditar');
    let btnGuardar = document.getElementById('btnGuardarNuevoListaVotantes')
    let btnEditar = document.getElementById('btnGuardarEditarListaVotantes')

    btnVerEditar.forEach(btn => {
        btn.addEventListener('click', async () => {
            let id = btn.id;
            console.log('id', id);
            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarListaVotantes2'))
            tituloModal.innerHTML = 'Ver/Editar ListaVotantes';
            btnGuardar.style.visibility = 'hidden';
            btnEditar.style.visibility = 'visible';
            //let ListaVotantesPorId = await getListaVotantes_by_id(id);
            let ListaVotantessFiltrados = ListaVotantess.filter(ListaVotantes => console.log('ListaVotantes', ListaVotantes));
            console.log('ListaVotantesPorId', ListaVotantesPorId);

            // document.getElementById('inpNombreFraccion').value = ListaVotantesPorId[0].nombre;
            // document.getElementById('inpDesFraccion').value = ListaVotantesPorId[0].descripcion;
            // document.getElementById('selectProvNuevoFraccion').value = ListaVotantesPorId[0].localidad_descripcion;
            // document.getElementById('inpObsNuevoCliente').value = ListaVotantesPorId[0].creada_por_user;

            modal.show();
        }
        )
    })
}
