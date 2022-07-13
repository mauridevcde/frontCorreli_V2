import { render } from '../others/renderizado.js';
import { addNavBarFunctions } from '../others/utils.js';
import { headerPersona, formularioPersona, modalGrupos } from '../views/TemplatePersona.js'
import { navbar } from '../views/templatesHome.js'
import { api_post_Persona, api_get_getPersonaForCi, api_put_Persona } from '../apis/apiPersonas.js';

import { api_get_LocalidadAll, api_get_DistritoAll, api_get_checkCedula } from "../apis/apiVariablesSis.js";

import { api_post_ListaForPuntero, api_get_check_n_cedula_listas } from "../apis/apiListas.js";


export function persona() {
    inicioPersona()
}

async function inicioPersona() {

    let view = {};
    view.navbar = navbar();
    view.header = headerPersona(); //header con icono
    view.formulario = formularioPersona(); //formulario de persona
    view.modalGrupos = await modalGrupos()
    render(view, true);

    addNavBarFunctions();

    await mapInit();

    persona_Check_Post_Put()
    ocultarTodoInputs()
}

let imagenBase64ParaElPut;
async function persona_Check_Post_Put() {

    let ci = window.searchCiColorado

    window.btnBuscarCliente.addEventListener('click', async () => {
        limpiarImputs()
        imagen()

        window.btnEditarNuevaLista.disabled = false;


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

                ocultarBtnGuardar()


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
                    document.getElementById("inputDate").value = personaFiltrada[0].c_fenaci
                    console.log(personaFiltrada[0].c_fenaci)
                    window.inputPartido.value = personaFiltrada[0].n_partido
                    window.inputDireccion.value = personaFiltrada[0].direccion
                    window.selectMovDepartamento.value = personaFiltrada[0].id_depart
                    window.selectMovDistrito.value = personaFiltrada[0].id_distrito
                    window.selectMovLocalidad.value = personaFiltrada[0].id_localidad
                    window.inputTelefonoPersonas.value = personaFiltrada[0].telefono
                    window.inputCorreo.value = personaFiltrada[0].email


                    let optionSexo = document.getElementById('selectMovSexo');
                    let sexoRender = ``
                    if (personaFiltrada[0].sexo == "M") {
                        sexoRender += `<option value="M" selected>Masculino</option>
                        <option value="F" >Femenino</option>`
                    } else {
                        sexoRender += `<option value="M" >Masculino</option>
                        <option value="F" selected >Femenino</option>`
                    }
                    optionSexo.innerHTML = sexoRender
                    sexoRender = ``;

                    let optionNacionalidad = document.getElementById('selectMovNacionalidad');
                    let NacionalidadRender = ``
                    if (personaFiltrada[0].nacional == "P") {
                        NacionalidadRender += `<option value="P" selected>Paraguayo</option>
                        <option value="E" >Extranjero</option>`
                    } else {
                        NacionalidadRender += `<option value="P">Paraguayo</option>
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
                        } else {
                            DistritoRender += `<option value="${element.distrito}" >${element.descrip}</option>`
                        }

                    });

                    optionDistrito.innerHTML = DistritoRender
                    DistritoRender = ``;

                    let optionLocalidad = document.getElementById('selectMovLocalidad');
                    let localidadRender = ``

                    localidadesApi.forEach(element => {

                        if (personaFiltrada[0].id_localidad == element.localidad) {
                            localidadRender += `<option value="${element.localidad}" selected>${element.descrip}</option>`
                        } else if (personaFiltrada[0].id_distrito == element.distrito) {
                            localidadRender += `<option value="${element.localidad}" >${element.descrip}</option>`
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

                        contenedor.innerHTML += `<img src="${imagen2}" id="imgPreviewImageNewProductoPrevia" width="350px" height="400px" class="image-preview2" alt="...">`;

                        let mensajito = document.querySelector('.imgPreviewTextNewProducto');
                        mensajito.innerHTML = ''
                    }


                    let previewImage = document.querySelector('.imgPreviewImageNewProducto');
                    let previewDefaultText = document.querySelector('.imgPreviewTextNewProducto');
                    window.inpFileNewProducto.addEventListener('change', function () {

                        let file = this.files[0];
                        //console.log("the file", file);
                        if (file) {
                            let reader = new FileReader();
                            previewDefaultText.style.display = 'none';
                            previewImage.style.display = 'block';
                            reader.addEventListener('load', function () {
                                //console.log("the reader", reader);
                                previewImage.setAttribute('src', this.result);
                                imagenBase64ParaElPut = this.result;
                            });
                            reader.readAsDataURL(file);
                        } else {
                            previewDefaultText.style.display = null;
                            previewImage.style.display = null;
                            previewImage.setAttribute('src', '');
                        }
                        if (window.imgPreviewImageNewProductoPrevia) {
                            window.imgPreviewImageNewProductoPrevia.remove()
                        }

                    });
                    //imagenPUT()

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

                        foto: cargaImagenPersona,

                        observaciones: textAreaObs,
                        depart: selectMovDepartamento,
                        distrito: selectMovDistrito,
                        zona: "0", //eliminar
                        localidad: selectMovLocalidad,
                        sexo: inpSexo,
                        nacional: inpNacionalidad // agg
                    }

                    if (validaObject(datosNuevaPersona)) {

                        console.log("🚀 ~ file: Persona.js ~ line 242 ~ window.btnGurdarNuevaPersona.addEventListener ~ datosNuevaPersona", datosNuevaPersona)

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
                        console.log("🚀 ~ file: Persona.js ~ line 265 ~ window.btnGurdarNuevaPersona.addEventListener ~ datosNuevaPersona", datosNuevaPersona)
                        Swal.fire({
                            icon: 'error',
                            title: "Algún Campo Vacio!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    };

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

    window.btnEditarNuevaPersona.addEventListener('click', async (event) => {

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

        let datosNuevaPersona2 = {
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

            foto: imagenBase64ParaElPut,

            observaciones: textAreaObs,
            depart: selectMovDepartamento,
            distrito: selectMovDistrito,
            zona: "0", //eliminar
            localidad: selectMovLocalidad,
            sexo: inpSexo,
            nacional: inpNacionalidad // agg
        }


        if (validaObject(datosNuevaPersona2)) {
            console.log("true");
            console.log("🚀 ~ file: Persona.js ~ line 97 ~ window.btnEditarNuevaPersona.addEventListener ~ datosNuevaPersona", datosNuevaPersona2)

            put_Persona(datosNuevaPersona2).then((res) => {
                console.log('res', res)
                if (res.message == 'ok') {
                    Swal.fire({
                        icon: 'success',
                        title: "Votante Actualizado!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });

                    inicioPersona()

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: "Error al Actualizar Votante!",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#6F8EAD",
                    });
                }
            })
            console.log('ok', datosNuevaPersona2);
        } else {
            console.log(datosNuevaPersona2);
            Swal.fire({
                icon: 'error',
                title: "Algún Campo Vacio!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            });
        }

    })

    if (localStorage.getItem('id_grupo_AddLista') == "noExiste" || localStorage.getItem('rol') == "admin") {
        window.btnEditarNuevaLista.style.display = "none";
    } else if ((localStorage.getItem('id_grupo_AddLista') == "noExiste" || localStorage.getItem('rol') == "dirigente")) {
        window.btnEditarNuevaLista.style.display = "none";
    } else if ((localStorage.getItem('id_grupo_AddLista') == "noExiste" || localStorage.getItem('rol') == "puntero")) {
        window.btnEditarNuevaLista.style.display = "grid";
        window.btnEditarNuevaLista.disabled = true;
    }

    window.btnEditarNuevaLista.addEventListener('click', async function (e) {

        let ci = window.searchCiColorado.value

        let validadorExistenciaCiEnListas = await getAllCheck_n_cedula_listas(ci)

        if (validadorExistenciaCiEnListas == '1') {
            Swal.fire({
                icon: 'error',
                title: "El Votante ya se encuentra en alguna lista!",
                confirmButtonText: "OK",
                confirmButtonColor: "#6F8EAD",
            }).then(function (response) {
                inicioPersona()
            })

        } else {


            let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalSeleccionarGrupo'))

            let objGrupos = JSON.parse(localStorage.getItem('id_grupo_AddLista'))

            let optionGrupos = document.getElementById('selectMovGrupo');
            let grupoRender = ``

            objGrupos.forEach(element => { //llama a la api provincias pero usa su objeto provinciaPy para mostrar 

                console.log("🚀 ~ file: Persona.js ~ line 380 ~ obj grupos", element)

                grupoRender += `<option value="${element.id_grupo}" >${element.id_grupo}</option>`

            });

            optionGrupos.innerHTML = grupoRender
            grupoRender = ``;

            modal.show()


        }




        window.btnGuardarNuevoGrupo2.addEventListener('click', async function (e) {

            let id_Final_Grupo = window.selectMovGrupo.value

            let datosNuevaLista = {
                grupos_id_grupo: id_Final_Grupo,
                n_cedula: ci,
            }
            console.log('estos datos enviare al post Nuevas lista:', datosNuevaLista)
            if (validaObject(datosNuevaLista)) {
                console.log("true");
                console.log("🚀 ~ file: Persona.js ~ line 97 ~ window.btnEditarNuevaPersona.addEventListener ~ datosNuevaPersona", datosNuevaLista)

                post_ListaForGrupo(datosNuevaLista).then((res) => {
                    console.log('res', res)
                    if (res.message == 'ok') {
                        Swal.fire({
                            icon: 'success',
                            title: "Lista Creada!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });

                        modal.hide()
                        inicioPersona()

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Error al Agg Votante!",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#6F8EAD",
                        });
                    }
                })
                console.log('ok', datosNuevaLista);
            } else {
                console.log(datosNuevaLista);
                Swal.fire({
                    icon: 'error',
                    title: "Algún Campo Vacio!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#6F8EAD",
                });
            }
        })


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
    window.textAreaObs.value = "";
    document.getElementById('selectMovSexo').value = "";
    document.getElementById('selectMovNacionalidad').value = "";
    cargaImagenPersona = ""

    if (window.imgPreviewImageNewProductoPrevia) {
        window.imgPreviewImageNewProductoPrevia.remove()
    }
    if (window.imgPreviewImageNewProducto2) {
        window.imgPreviewImageNewProducto2.setAttribute('src', '');
    }

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
async function post_ListaForGrupo(datos) {
    let nuevaPersona = await api_post_ListaForPuntero(datos);
    return nuevaPersona;
}
async function put_Persona(datos) {
    let nuevaPersona = await api_put_Persona(datos);
    return nuevaPersona;
}

async function getAllCheck_n_cedula_listas(ci) {
    const response = await api_get_check_n_cedula_listas(ci);
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

function convert_DateTime_ToMySqlFormat(date2) {
    var date = date2
    let retorno = date.toISOString().split('T')[0] + ' ' + date.toTimeString().split(' ')[0];
    return retorno
}


var cargaImagenPersona;
function imagen() {


    let inpFile = document.getElementById('inpFileNewProducto');
    let previewImage = document.querySelector('.imgPreviewImageNewProducto');
    let previewDefaultText = document.querySelector('.imgPreviewTextNewProducto');

    inpFile.addEventListener('change', function () {
        let file = this.files[0];
        //console.log("the file", file);
        if (file) {
            let reader = new FileReader();
            previewDefaultText.style.display = 'none';
            previewImage.style.display = 'block';
            reader.addEventListener('load', function () {
                //console.log("the reader", reader);
                previewImage.setAttribute('src', this.result);
                cargaImagenPersona = this.result;
            });
            reader.readAsDataURL(file);
        } else {
            previewDefaultText.style.display = null;
            previewImage.style.display = null;
            previewImage.setAttribute('src', '');
        }
        if (window.imgPreviewImageNewProductoPrevia) {
            window.imgPreviewImageNewProductoPrevia.remove()
        }
    });
}