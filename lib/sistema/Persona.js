import { render } from '../others/renderizado.js';
import { addNavBarFunctions } from '../others/utils.js';
import { headerPersona, formularioPersona } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { } from '../apis/apiPersonas.js';

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

   

    ocultarTodoInputs()
    persona_Check_Post_Put()
}


async function persona_Check_Post_Put() {

    let ci = window.searchCiColorado

    window.btnBuscarCliente.addEventListener('click', async () => {
        limpiarImputs()
  
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

                await mapInit();
            } else {
                await mapInit();
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

                        foto: "0", //agg

                        observaciones: textAreaObs,
                        depart: selectMovDepartamento,
                        distrito: selectMovDistrito,
                        zona: "0", //eliminar
                        localidad: selectMovLocalidad,
                        sexo: inpSexo,
                        nacional: inpNacionalidad // agg
                    }

                    console.log("🚀 ~ file: Persona.js ~ line 94 ~ window.btnBuscarCliente.addEventListener ~ datosNuevaPersona", datosNuevaPersona)
                })



                Swal.fire({
                    icon: 'success',
                    title: "Favor Crear un nuevo Votante",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD"
                }).then(async () => {
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

    function mostrarBtnEditar() {
        let btnEditarNuevaPersona = document.getElementById('btnEditarNuevaPersona');
        btnEditarNuevaPersona.style.display = 'grid'; //
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

                        if (element.distrito == optionDistrito.value) {
                            LocalidadRender += `<option value="${element.distrito}" selected>${element.descrip}</option>`
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

        function onLocationFound(location) {
            console.log("lo que devuelve onLocationFound", location);
            //var radius = location.accuracy;
            const coords = location.latlng;
            const marker = L.marker(coords, {
                draggable: true
            }).addTo(map);

            document.querySelector('#contactLat').value = location.latitude;
            document.querySelector('#contactLng').value = location.longitude;


            marker.on('dragend', function (e) {
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



