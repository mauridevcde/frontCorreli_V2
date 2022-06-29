import { render } from '../others/renderizado.js';
import { addNavBarFunctions } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_post_Persona, api_get_getPersonaForCi } from '../apis/apiPersonas.js';

import { api_get_LocalidadAll, api_get_DistritoAll, api_get_checkCedula } from "../apis/apiVariablesSis.js";


export function persona() {
    inicioPersona()
}

async function inicioPersona() {

    let view = {};
    view.navbar = navbar();
    view.header = headerPersona(); //header con icono
    view.formulario = formularioPersona(); //formulario de persona

    render(view, true);

    addNavBarFunctions();

    await mapInit();

    persona_Check_Post_Put()
    ocultarTodoInputs()
}


async function persona_Check_Post_Put() {

    let ci = window.searchCiColorado

    window.btnBuscarCliente.addEventListener('click', async () => {
        //limpiarImputs()

        if (ci.value == "" || ci.value == "0" || ci.value == null || ci.value == undefined || ci.value == " ") {
            Swal.fire({
                icon: 'error',
                title: "Cargar Cedula Correctamente",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });

        } else {
            let VerificadorCi = await get_Check_Ci(ci.value)
            console.log("🚀 ~ file: Persona.js ~ line 47 ~ window.btnBuscarCliente.addEventListener ~ VerificadorCi", VerificadorCi)

            if (VerificadorCi == 1) {
                //put


                window.btnEditarNuevaPersona.addEventListener('click', async (event) => {




                })

                Swal.fire({
                    icon: 'success',
                    title: "Existe Votante",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD"
                }).then(async () => {

                    
                 
                    let distritoApi = await getAllDistritos();
                    let localidadesApi = await getAllLocalidades();
               

                    let personaFiltrada = await getAllPersonaForCi(ci.value)
                    window.searchCiColorado.value = personaFiltrada[0].n_cedula
                    window.inputName.value = personaFiltrada[0].nombre
                    window.inputSurname.value = personaFiltrada[0].apellido
                    window.inputDate.value = personaFiltrada[0].c_fenaci
                    window.inputPartido.value = personaFiltrada[0].n_partido
                    window.inputDireccion.value = personaFiltrada[0].direccion
                    window.selectMovDepartamento.value = personaFiltrada[0].depart
                    window.selectMovDistrito.value = personaFiltrada[0].distrito
                    window.selectMovLocalidad.value = personaFiltrada[0].localidad
                    window.inputTelefonoPersonas.value = personaFiltrada[0].telefono
                    window.inputCorreo.value = personaFiltrada[0].email

                    let optionDepar = document.getElementById('selectMovDepartamento');
                    let deparRender = ``

                    
                    if (personaFiltrada[0].depart == "Alto Parana") {
                        deparRender = `<option value="10" selected>"Alto Parana</option>`
                    }

                    optionDepar.innerHTML = deparRender
                    deparRender = ``;

                    let optionDistrito = document.getElementById('selectMovDistrito');
                    let DistritoRender = ``
                    distritoApi.forEach(element => { 

                        
                        if (personaFiltrada[0].distrito == element.distrito) {
                            DistritoRender += `<option value="${element.distrito}" selected>${element.nombre}</option>`
                        } else {
                            DistritoRender += `<option value="${element.distrito}" >${element.nombre}</option>`
                        }

                    });

                    optionDistrito.innerHTML = DistritoRender
                    DistritoRender = ``;

                    let optionLocalidad = document.getElementById('selectMovLocalidad');
                    let localidadRender = ``

                    localidadesApi.forEach(element => {  

                        // c/onsole.log('py: ', element.id_dp_provi);
                        if (personaFiltrada[0].localidad == element.localidad) {
                            localidadRender += `<option value="${element.localidad}" selected>${element.nombre}</option>`
                        }else  {
                            localidadRender += `<option value="${element.localidad}" >${element.nombre}</option>`
                        }
                    });

                    optionLocalidad.innerHTML = localidadRender
                    localidadRender = ``;

                    await mostrarTodoInputs()
                    mostrarBtnEditar()
                })

            } else {

                //post

                window.btnGurdarNuevaPersona.addEventListener("click", (e) => {

                    let searchCiColorado = window.searchCiColorado.value
                    let inputName = window.inputName.value
                    let inputSurname = window.inputSurname.value
                    let inputDate = window.inputDate.value
                    let inputPartido = window.inputPartido.value
                    let inputDireccion = window.inputDireccion.value
                    let selectMovDepartamento = window.selectMovDepartamento.value
                    let selectMovDistrito = window.selectMovDistrito.value
                    let selectMovLocalidad = window.selectMovLocalidad.value
                    let inputTelefonoPersonas = window.inputTelefonoPersonas.value
                    let inputCorreo = window.inputCorreo.value

                    let contactLat = window.contactLat.value
                    let contactLng = window.contactLng.value
                    let textAreaObs = window.textAreaObs.value
                    let inpSexo = document.getElementById('selectMovSexo').value
                    let inpNacionalidad = document.getElementById('selectMovNacionalidad').value

                    let datosNuevaPersona = {
                        n_cedula: searchCiColorado,
                        nombre: inputName,
                        apellido: inputSurname,
                        c_fenaci: inputDate,
                        n_partido: inputPartido,
                        direccion: inputDireccion,
                        telefono: inputTelefonoPersonas,
                        email: inputCorreo,
                        latitud: contactLat,
                        longitud: contactLng,

                        foto: "data:image/jpeg;base64,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",

                        observaciones: textAreaObs,
                        depart: selectMovDepartamento,
                        distrito: selectMovDistrito,
                        zona: "0", //eliminar
                        localidad: selectMovLocalidad,
                        sexo: inpSexo,
                        nacional: inpNacionalidad // agg
                    }

                    if (validaObject(datosNuevaPersona)) {
                        //console.log("true");
                        console.log(datosNuevaPersona);
                        post_Persona(datosNuevaPersona).then((res) => {
                            if (res.message == 'ok') {
                                Swal.fire({
                                    icon: 'success',
                                    title: "Votante Agregado!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });

                                inicioPersona()
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: "Error al agregar Votante!",
                                    confirmButtonText: "OK",
                                    confirmButtonColor: "#6F8EAD",
                                });
                            }
                        })
                    } else {
                        console.log(datosNuevaPersona);
                        Swal.fire({
                            icon: 'error',
                            title: "Algún Campo Vacio!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    };
                    console.log("🚀 ~ file: Persona.js ~ line 94 ~ window.btnBuscarCliente.addEventListener ~ datosNuevaPersona", datosNuevaPersona)
                })

                Swal.fire({
                    icon: 'success',
                    title: "Favor Crear un nuevo Votante",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD"
                }).then(async () => {
                    ocultarBtnEditar()
                    await mostrarTodoInputs()
                    mostrarBtnGuardar()
                    seleccion_Departamento()

                })

            }

        }
    });
}


function ocultarTodoInputs() {

    let contFechaNacimiento = document.getElementById('contFechaNacimiento');
    let contDireccion = document.getElementById('contDireccion');
    let contDepartamento = document.getElementById('contDepartamento');
    let contLocalidad = document.getElementById('contLocalidad');
    let contNombre = document.getElementById('contNombre');
    let contApellido = document.getElementById('contApellido');
    let contPartido = document.getElementById('contPartido');
    let contDistrito = document.getElementById('contDistrito');
    let contTelefono = document.getElementById('contTelefono');
    let contCorreo = document.getElementById('contCorreo');
    let contImagen = document.getElementById('contImagen');
    let contMapa1 = document.getElementById('contMapa1');
    let contLatitud = document.getElementById('contLatitud');
    let contLongitud = document.getElementById('contLongitud');
    let contObs = document.getElementById('contObs');
    let contSexo = document.getElementById('contSexo');
    let contNacionalidad = document.getElementById('contNacionalidad');

    contSexo.style.display = 'none';
    contObs.style.display = 'none';
    contLatitud.style.display = 'none';
    contLongitud.style.display = 'none';
    contMapa1.style.display = 'none';
    contImagen.style.display = 'none';
    contCorreo.style.display = 'none';
    contTelefono.style.display = 'none';
    contDistrito.style.display = 'none';
    contPartido.style.display = 'none';
    contApellido.style.display = 'none';
    contNombre.style.display = 'none';
    contFechaNacimiento.style.display = 'none';
    contDireccion.style.display = 'none';
    contDepartamento.style.display = 'none';
    contLocalidad.style.display = 'none';
    contNacionalidad.style.display = 'none';




}


function limpiarImputs() {
    window.inputName.value = "";
    window.inputSurname.value = "";
    window.inputDate.value = "";
    window.inputPartido.value = "";
    window.inputDireccion.value = "";
    window.selectMovDepartamento.value = "";
    window.selectMovDistrito.value = "";
    window.selectMovLocalidad.value = "";
    window.inputTelefonoPersonas.value = "";
    window.inputCorreo.value = "";
    window.contactLat.value = "";
    window.contactLng.value = "";
    window.textAreaObs.value = "";
    document.getElementById('selectMovSexo').value = "";
    document.getElementById('selectMovNacionalidad').value = "";
}


async function mostrarTodoInputs() {

    let contFechaNacimiento = document.getElementById('contFechaNacimiento');
    let contDireccion = document.getElementById('contDireccion');
    let contDepartamento = document.getElementById('contDepartamento');
    let contLocalidad = document.getElementById('contLocalidad');
    let contNombre = document.getElementById('contNombre');
    let contApellido = document.getElementById('contApellido');
    let contPartido = document.getElementById('contPartido');
    let contDistrito = document.getElementById('contDistrito');
    let contTelefono = document.getElementById('contTelefono');
    let contCorreo = document.getElementById('contCorreo');
    let contImagen = document.getElementById('contImagen');
    let contMapa1 = document.getElementById('contMapa1');
    let contLatitud = document.getElementById('contLatitud');
    let contLongitud = document.getElementById('contLongitud');
    let contObs = document.getElementById('contObs');
    let contSexo = document.getElementById('contSexo');
    let contNacionalidad = document.getElementById('contNacionalidad');

    contNacionalidad.style.display = 'grid';
    contObs.style.display = 'grid';
    contLatitud.style.display = 'grid';
    contLongitud.style.display = 'grid';
    contMapa1.style.display = 'grid';
    contImagen.style.display = 'grid';
    contCorreo.style.display = 'grid';
    contTelefono.style.display = 'grid';
    contDistrito.style.display = 'grid';
    contPartido.style.display = 'grid';
    contApellido.style.display = 'grid';
    contNombre.style.display = 'grid';
    contFechaNacimiento.style.display = 'grid';
    contDireccion.style.display = 'grid';
    contDepartamento.style.display = 'grid';
    contLocalidad.style.display = 'grid';
    contSexo.style.display = 'grid';



}

function mostrarBtnGuardar() {
    let btnGuardarNuevaPersona = document.getElementById('btnGurdarNuevaPersona');
    btnGuardarNuevaPersona.style.display = 'grid'; //
}
function ocultarBtnGuardar() {
    let btnGuardarNuevaPersona = document.getElementById('btnGurdarNuevaPersona');
    btnGuardarNuevaPersona.style.display = 'none'; //
}

function mostrarBtnEditar() {
    let btnEditarNuevaPersona = document.getElementById('btnEditarNuevaPersona');
    btnEditarNuevaPersona.style.display = 'grid'; //
}
function ocultarBtnEditar() {
    let btnEditarNuevaPersona = document.getElementById('btnEditarNuevaPersona');
    btnEditarNuevaPersona.style.display = 'none'; //
}


async function seleccion_Departamento() {


    let estadoInicial = {
        distrito: [],
        Localidad: []
    }
    let distritoApi = await getAllDistritos();
    let localidadesApi = await getAllLocalidades();

    estadoInicial.distrito = distritoApi
    estadoInicial.Localidad = localidadesApi

    let selectMovDepartamento = document.getElementById("selectMovDepartamento")

    let optionDistrito = document.getElementById('selectMovDistrito');
    let DistritoRender = ``;

    let optionLocalidad = document.getElementById('selectMovLocalidad');
    let LocalidadRender = ``;

    selectMovDepartamento.addEventListener("change", function (e) {
        if (selectMovDepartamento.value == 10) {

            estadoInicial.distrito.forEach(element => {
                if (element.depart == 10) {
                    DistritoRender += `<option value="${element.distrito}" selected>${element.descrip}</option>`
                }
            })

            optionDistrito.innerHTML = DistritoRender
            DistritoRender = ``;

            optionDistrito.addEventListener("change", function (e) {

                estadoInicial.Localidad.forEach(element => {
                    console.log("🚀 ~ file: Persona.js ~ line 308 ~ element", element)

                    if (element.distrito == optionDistrito.value) {
                        LocalidadRender += `<option value="${element.localidad}" selected>${element.descrip}</option>`
                    }
                })

                optionLocalidad.innerHTML = LocalidadRender
                LocalidadRender = ``;

            })

        }
    })
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

async function mapInit() {
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


//*apis*
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

async function get_Check_Ci(ci) {
    const response = await api_get_checkCedula(ci);
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

async function post_Persona(datos) {
    let nuevaPersona = await api_post_Persona(datos);
    return nuevaPersona;
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
async function getAllMovimiento(ci) {
    const response = await api_get_MovimientosAll(ci);
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

