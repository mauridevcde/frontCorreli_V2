import { render } from '../others/renderizado.js';
import { addNavBarFunctions, spinnerRender } from '../others/utils.js';
import { headerListaVotantes, BusquedaListaVotantes, tablaListaVotantes, modalNuevoEditarListaVotantes, modalGruposLista } from '../views/TemplateListaVotantes.js';
import { api_get_ListaVotantesAll, api_getAll_Ci_grupoId, api_delete_Listas } from "../apis/apiListas.js";
import { api_get_getPersonaForCi } from "../apis/apiPersonas.js";
import { api_get_DistritoAll, api_get_LocalidadAll } from "../apis/apiVariablesSis.js";
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

    if (localStorage.getItem('rol') == 'admin') {
        objGrupos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 


            grupoRender += `<option value="${element.grupos_id_grupo}" >${element.grupos_id_grupo}</option>`

        });
        optionGrupos.innerHTML = grupoRender
        grupoRender = ``;
    } else {
        objGrupos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 


            grupoRender += `<option value="${element.id_grupo}" >${element.id_grupo}</option>`

        });

        optionGrupos.innerHTML = grupoRender
        grupoRender = ``;
    }

    modal.show()

    window.btnGuardarNuevoGrupoLista.addEventListener("click", async () => {
        let idGrupus = window.selectMovGrupoLista.value

        let allCi = await getAll_Ci_grupoId(idGrupus)

        console.log('al ci', allCi)

        let todosLosCiEnArray = allCi.map(element => element.n_cedula)


        const ListaVotantes = await getAllListaVotantes(idGrupus, todosLosCiEnArray);

        console.log('ListaVotantess', ListaVotantes);

        modal.hide()

        view.table = tablaListaVotantes(ListaVotantes);
        render(view, true);
        despuesdelRender(ListaVotantes, view);

    });



}

//! se ejecuta 4~cuarto 
async function despuesdelRender() {
    addNavBarFunctions();
    botoneraTable();
}

//! Se ejecuta 5~quinto
async function botoneraTable() {
    await Ver_Editar_Modal_Table();
    await elminar_ListaVotante()
    mapInit()
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

async function getAllPersonaForCi(ci) {
    const response = await api_get_getPersonaForCi(ci);
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

async function getAllDistritos() {
    const response = await api_get_DistritoAll();
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

async function getAllLocalidades() {
    const response = await api_get_LocalidadAll();
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

async function delete_Lista(data) {
    const response = await api_delete_Listas(data);
    return response;

}

//!funciones.

async function Ver_Editar_Modal_Table() {
    let modal2 = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNuevoEditarListaVotantes2'))
    let btnVerListaVotantes = document.querySelectorAll('.btnNewViewEditListaVotantes')


    btnVerListaVotantes.forEach(async (btn) => {

        btn.addEventListener('click', async (e) => {

            console.log(btn.id)
            if (window.imgPreviewImageNewProductoPrevia) {
                window.imgPreviewImageNewProductoPrevia.remove()
            }
            if (window.imgPreviewImageNewProducto2) {
                window.imgPreviewImageNewProducto2.setAttribute('src', '');
            }
            
            let personaFiltrada = await getAllPersonaForCi(btn.id)
            console.log("🚀 ~ file: ListaVotantes.js ~ line 157 ~ btn.addEventListener ~ personaFiltrada", personaFiltrada)

            window.searchCiColorado.value = personaFiltrada[0].n_cedula
            window.inputName.value = personaFiltrada[0].nombre
            window.inputSurname.value = personaFiltrada[0].apellido
            document.getElementById("inputDate").value = personaFiltrada[0].c_fenaci
            console.log(personaFiltrada[0].c_fenaci)
            window.inputPartido.value = personaFiltrada[0].n_partido
            window.inputDireccion.value = personaFiltrada[0].direccion
            window.selectMovDepartamento.value = personaFiltrada[0].id_depart
            window.selectMovDistrito.value = personaFiltrada[0].id_distrito
            window.selectMovLocalidad.value = personaFiltrada[0].id_localidad
            window.inputTelefonoPersonas.value = personaFiltrada[0].telefono
            window.inputCorreo.value = personaFiltrada[0].email
            window.textAreaObs.value = personaFiltrada[0].observaciones


            let distritoApi = await getAllDistritos();
            let localidadesApi = await getAllLocalidades();

            let optionSexo = document.getElementById('selectMovSexo');
            let sexoRender = ``
            if (personaFiltrada[0].sexo == "M") {
                sexoRender += `<option value="M" selected>Masculino</option>
                <option value="F" >Femenino</option>`
            }
            optionSexo.innerHTML = sexoRender
            sexoRender = ``;

            let optionNacionalidad = document.getElementById('selectMovNacionalidad');
            let NacionalidadRender = ``
            if (personaFiltrada[0].nacional == "P") {
                NacionalidadRender += `<option value="P" selected>Paraguayo</option>
                <option value="E" >Extranjero</option>`
            } else {
                NacionalidadRender += `<option value="P" >Paraguayo</option>
                <option value="E" selected>Extranjero</option>`
            }
            optionNacionalidad.innerHTML = NacionalidadRender
            NacionalidadRender = ``;


            let optionDepar = document.getElementById('selectMovDepartamento');
            let deparRender = ``

            if (personaFiltrada[0].id_depart == 10) {
                deparRender = `<option value="10" selected>Alto Parana</option>`
            }

            optionDepar.innerHTML = deparRender
            deparRender = ``;

            let optionDistrito = document.getElementById('selectMovDistrito');
            let DistritoRender = ``
            distritoApi.forEach(element => {

                if (personaFiltrada[0].id_distrito == element.distrito) {
                    DistritoRender += `<option value="${element.distrito}" selected>${element.descrip}</option>`
                }

            });

            optionDistrito.innerHTML = DistritoRender
            DistritoRender = ``;

            let optionLocalidad = document.getElementById('selectMovLocalidad');
            let localidadRender = ``

            localidadesApi.forEach(element => {

                if (personaFiltrada[0].id_localidad == element.localidad) {
                    localidadRender += `<option value="${element.localidad}" selected>${element.descrip}</option>`
                }
            });

            optionLocalidad.innerHTML = localidadRender
            localidadRender = ``;

            optionDistrito.addEventListener('change', function (e) {


                localidadesApi.forEach(element => {

                    if (element.distrito == optionDistrito.value) {
                        localidadRender += `<option value="${element.localidad}" selected>${element.descrip}</option>`
                    }
                })

                optionLocalidad.innerHTML = localidadRender
                localidadRender = ``;

            })

            window.contactLat.value = personaFiltrada[0].latitud
            window.contactLng.value = personaFiltrada[0].longitud

            let imagen2 = '';
            let datito;
            let contenedor = document.getElementById('imagePreviewNewProducto');
            datito = personaFiltrada[0].foto;
            console.log("🚀 ~ file: Persona.js ~ line 173 ~ window.btnBuscarCliente.addEventListener ~ datito", datito)

            if (datito == null || datito == undefined) {

                if (window.imgPreviewImageNewProducto2) {
                    window.imgPreviewImageNewProducto2.setAttribute('src', '');
                }

            } else {
                console.log("datito 1:", datito);

                datito = datito.data.forEach(element => {
                    element = String.fromCharCode(element);
                    imagen2 = imagen2 + element;
                });

                contenedor.innerHTML += `<img src="${imagen2}" id="imgPreviewImageNewProductoPrevia"  class="image-preview2" width="350px" height="400px"  alt="...">`;

                let mensajito = document.querySelector('.imgPreviewTextNewProducto');
                mensajito.innerHTML = ''
            }




            modal2.show()

        });
    });

    window.btnCerrarNuevoListaVotantes2.addEventListener('click', function (e) {
        modal2.hide()
    })
}

async function elminar_ListaVotante() {

    let btnEliminarListaVotantes = document.querySelectorAll('.btnEliminarListaVotantes')

    btnEliminarListaVotantes.forEach(async (btn) => {

        btn.addEventListener('click', async (e) => {

            console.log(btn.value)
            let id = btn.value

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
                        'Votante Eliminado de la lista.',
                        'success'
                    )

                    //lo eliminamos
                    delete_Lista(id).then((res) => {
                        if (res.message == 'ok') {

                            inicioListaVotantes()

                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: "Error al Eliminar Votante de la lista!",
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
                        'Tu Votante no se ha eliminado!',
                        'error'
                    )
                }
            })

        });
    });
}

function mapInit() {
    var map = L.map('map').fitWorld();
    map.locate({
        setView: true,
        maxZoom: 16
    });

    async function onLocationFound(location) {
        console.log("lo que devuelve onLocationFound", location);
        //var radius = location.accuracy;
        const coords = location.latlng;
        const marker = L.marker(coords, {
            draggable: true
        }).addTo(map);

        document.querySelector('#contactLat').value = location.latitude;
        document.querySelector('#contactLng').value = location.longitude;


        marker.on('dragend', function async(e) {
            document.getElementById('contactLat').value = marker.getLatLng().lat;
            document.getElementById('contactLng').value = marker.getLatLng().lng;
        });
    }

    map.on('locationfound', onLocationFound);

    const tileURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileURL).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {
        foo: 'bar',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
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